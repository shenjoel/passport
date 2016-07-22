'use strict';

/**
 * This is the description for my class.
 *
 * @class Port  负责网络层调用
 * @constructor
 */

var net = require('./net'),
    config = require('config/a-config.js');

/**
 * @property send 发送数据接口对象
 * @type {Object}
 */
var send = {
    /**
     * @method 注册接口
     * @param {Object}  param 接口传参
     * @param {Function} successFn 成功回调
     * @param {Function} errorFn  失败回调
     * @param {Function} completeFn 完成回调
     */
    signup: function (param, successFn, errorFn) {
        net.net(config.path.signup, config.ajaxType.post, param, successFn, errorFn);
    },
    /**
     * @method 登录接口
     * @param {Object}  param 接口传参
     * @param {Function} successFn 成功回调
     * @param {Function} errorFn  失败回调
     * @param {Function} completeFn 完成回调
     */
    signin: function (param, successFn, errorFn) {
        net.net(config.path.signin, config.ajaxType.post, param, successFn, errorFn);
    },
}

module.exports = {
    send: send
}