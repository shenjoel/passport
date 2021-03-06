
'use strict';

var tpl = __inline('signup.tpl');
var head = require('widgets/head');
var footer = require('widgets/footer');
var port = require('util/port');

/**
 * 注册模块
 *
 * @class index
 * @constructor
 */
var signup = Vue.extend({
    template: tpl,
    components: {
        "c-head": head(),
        "c-footer": footer()
    },
    ready: function () {
        // 事件绑定回调
        var handleEvent = {
            sumbit: function() {
                var username = $('#username').val(),
                    pwd = $('#pwd').val(),
                    confirmPwd = $('#confirmPwd').val();
                port.send.signup({username: username, password: pwd, confirmPwd: confirmPwd}, function(data) {
                    $('#msg').text('Register Success!');
                }, function(data) {
                    if(!data) return;
                    $('#msg').text(data.msg);
                });
            }
        }
        // 事件绑定
        var bindEvent = function() {
            $('#sumbit').on('click', handleEvent.sumbit);
        }
        // 加载
        var reload = function() {
            bindEvent();
        }

        reload();
    },
    methods: function() {}
});

/**
 * My method description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @method init
 * @return {Object} Returns index page component
 */
var init = function () {
    return new signup({
        el: "#page-main",
        replace: false
    })
}

module.exports = {
    init: init
}