'use strict';

/**
 * 菜单栏组件
 *
 * @class navi
 * @constructor
 */

var tpl = __inline('navi.tpl');
var nconfig = require('config/n-config.js');
var navi = Vue.extend({
    data: function () {
        var showMenu = localStorage.getItem('showMenu');
        if(showMenu === "show"){
            nconfig.defaultClass = "fadeInLeft animated";
        }
        return {
            nconfig:nconfig,
            activeMenu:activeMenu
        }
    },
    template: tpl,
    ready: function () {
        materialize();
    },
    events: {
        'navi-update': function (page, router) {
            console.log(page + '-' + router);
            this.nconfig = this.activeMenu(page, router);
            Vue.nextTick(materialize)
        }
    },
    props: ['page'],
    methods: {},
    replace: false
});

/**
 *
 * @param page
 * @param router
 * @returns {Object}
 */
var activeMenu = function(page, router){
    var menuData = nconfig;
    var menus = menuData.menus;
    for (var i = 0; i < menus.length; i++) {
        if (menus[i].id === router) {
            menus[i].isAct = "active"
            if (menus[i].isChild === "true") {
                for (var j = 0; j < menus[i].children.length; j++) {
                    if (menus[i].children[j].id === page) {
                        menus[i].children[j].isAct = "active";
                    } else {
                        menus[i].children[j].isAct = "";
                    }
                }
            }
        } else {
            menus[i].isAct = "";
            if (menus[i].isChild === "true") {
                for (var j = 0; j < menus[i].children.length; j++) {
                    menus[i].children[j].isAct = "";
                }
            }
        }
    }
    menuData.menus = menus;
    return menuData;
}

var init = function () {
    return navi;
}

module.exports = init;