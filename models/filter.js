/**
 * Created by Administrator on 2015/9/9.
 */
var api = require('../server/api');

var gen_session = function (user, res, req) {
    var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    req.session.uid = user._id;
    req.session.user = user.username;
    res.cookie(
        api.auth_cookie_name, 
        auth_token,
        {
            path: '/',
            signed: true,
            httpOnly: true
        }
    ); //cookie 有效期30天
}

exports.gen_session = gen_session;