'use strict';

var meta = require('../package.json'),
    express = require('express'),
    config = require('../config.js'),
    api = require('./api.js'),
    model = require('./model.js'),
    crypto = require('crypto'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    func = require('./function.js'),
    q = require('q'),
    path = require('path'),
    app = module.exports = express(),
    timestamp,
    middleware = ['combo', 'router', 'proxy', 'static', 'error'];

var request = require('request'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    validator = require('validator'),
    Dbopt = require('../models/Dbopt'),
    filter = require('../models/filter'),
    User = require('../models/users');

// lazy load middlewares
middleware.forEach(function(m) {
    middleware.__defineGetter__(m, function() {
        return require('./' + m);
    });
});

process.on('uncaughtException', function(err) {
    (app.get('logger') || console).error('Uncaught exception:\n', err.stack);
});

// app.use(logger('dev'));
app.set('name', meta.name);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(api.session_secret));
app.use(session({
    secret: api.session_secret,
    cookie: {
        maxAge: 20000
    }
}));
app.set('version', meta.version);
app.set('port', process.env.PORT || 3344);
app.set('root', path.resolve(__dirname, '../').replace(/\/+$/, ''));
app.set('logger', console);
app.enable('trust proxy');

// app.use(compress());
app.use('/co', middleware.combo());
app.use(middleware.router({
    index: '/' + meta.name + '/' + meta.version + '/index.html'
}));
// app.use('/api/*', middleware.proxy('http://cors-api-host'));
app.use(middleware.static());
app.use(middleware.error());

if (require.main === module) {
    app.listen(app.get('port'), function() {
        console.log('[%s] Express server listening on port %d',
            app.get('env').toUpperCase(), app.get('port'));
    });
}

//自定义校验扩展
validator.extend('isUserName', function(str) {
    return /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/.test(str);
});

validator.extend('isGBKName', function(str) {
    return /[\u4e00-\u9fa5]/.test(str);
});

validator.extend('isPsd', function(str) {
    return /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/.test(str);
});

validator.extend('isQQ', function(str) {
    return RegExp(/^[1-9][0-9]{4,9}$/).test(str);
});


//只能是英文
validator.extend('isEn', function(str) {
    return /^\S+[a-z A-Z]$/.test(str);
});

/**
 * @method 注册
 * @param  {object} req
 * @param  {object} res
 */
app.post('/api/signup', function(req, res) {
    var errors;
    var query;
    var username = req.body.username;
    var password = req.body.password;
    var confirmPwd = req.body.confirmPwd;

    if (!validator.isUserName(username)) {
        errors = "username type fail";
    }
    if (!validator.isPsd(password) || !validator.isLength(password, 6, 12)) {
        errors = "password 6-12";
    }
    if (password !== confirmPwd) {
        errors = "password or confirmPassword fail";
    }
    if (errors) {
        res.end(errors);
    } else {
        // res.send('success!');
        query = User.find({
            username: username
        });
        query.exec(function(err, user) {
            // console.log(user);
            if (user.length > 0) {
                errors = "repeat";
                res.send(api.codeEntity(api.code.signup.confirmPwd, {}, api.codeMsg.confirmPwd));
            } else {
                var newPwd = Dbopt.encrypt(password, api.encrypt_key);
                req.body.password = newPwd;
                Dbopt.addOne(User, req, res);
            }
        });

    }
});

/**
 * @method 登录
 * @param  {object} req
 * @param  {object} res
 */
app.post('/api/signin', function(req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var newPsd = Dbopt.encrypt(password, api.encrypt_key);
    var errors;
    if (!validator.isUserName(username)) {
        errors = api.codeMsg.usernameType;
    }
    if (!validator.isPsd(password) || !validator.isLength(password, 6, 12)) {
        errors = api.codeMsg.passwordLength;
    }

    if (errors) {
        res.send(api.codeEntity(api.code.signin.loginFail, {}, errors));
    } else {
        User.findOne({
            username: username,
            password: newPsd
        }, function(err, user) {
            if (user) {
                // 将cookie存入缓存
                filter.gen_session(user, res, req);
                console.log(req.session.vipmeUserName);
                res.send(api.codeEntity(api.code.common.succ, {
                    uid: user._id,
                    username: user.username
                }, api.codeMsg.succ));
            } else {
                res.send(api.codeEntity(api.code.signin.loginFail, {}, api.codeMsg.loginFail));
            }
        })
    }
});

/**
 * @method 判断登录
 * @param  {object} req
 * @param  {object} res
 */
app.get('/api/islogin', function(req, res) {
    console.log(res);
    if(req.session.user) {
        res.send({username: req.session.user});
    } else {
        res.send('no login');
    }
    
});

/**
 * @method 登出
 * @param  {object} req
 * @param  {object} res
 */
app.get('/api/loginout', function(req, res) {
    req.session.destroy(function(err) {
        res.send(err);
    });
    res.send('destroy');
});


