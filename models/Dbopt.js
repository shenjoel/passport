/**
 * Created by Administrator on 2015/4/18.
 */

//加密类
var crypto = require("crypto");
var mongoose = require('mongoose');
var shortid = require('shortid');

//站点配置
var api = require("../server/api");
var db = mongoose.connect(api.dbLink);
//mongoose.connect('mongodb://'+settings.USERNAME+':'+settings.PASSWORD+'@'+settings.HOST+':'+settings.PORT+'/'+settings.DB+'');

//数据库操作
var DbOpt = {

    /**
     * 添加记录
     * @param {Object} obj model
     * @param {Object} req [description]
     * @param {Object} res [description]
     */
    addOne: function(obj, req, res) {
        var newObj = new obj(req.body);
        newObj.save(function(err) {
            if (err) {
                res.end(err);
            } else {
                res.send(api.codeEntity(api.code.common.succ, {}, api.codeMsg.succ));
            }
        });
    },

    /**
     * 加密
     * @param  {String} data [description]
     * @param  {String} key  [description]
     * @return {String}      [description]
     */
    encrypt: function(data, key) {
        var cipher = crypto.createCipher("bf", key);
        var newPsd = "";
        newPsd += cipher.update(data, "utf8", "hex");
        newPsd += cipher.final("hex");
        return newPsd;
    },

    /**
     * 解密
     * @param  {String} data [description]
     * @param  {String} key  [description]
     * @return {String}      [description]
     */
    decrypt: function(data, key) {
        var decipher = crypto.createDecipher("bf", key);
        var oldPsd = "";
        oldPsd += decipher.update(data, "hex", "utf8");
        oldPsd += decipher.final("utf8");
        return oldPsd;
    }
};



module.exports = DbOpt;