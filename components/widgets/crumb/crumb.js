'use strict';

/**
 * 面包屑组件
 *
 * @class crumb
 * @constructor
 */

var tpl = __inline('crumb.tpl');
var crumb = Vue.extend({
    template: tpl,
    data: function () {
        return {
            result: {
                list: [
                    {
                        name: '首页',
                        url: '#!/index'
                    },
                    {
                        name: '文件列表',
                        url: '#!/dash/filemanage/filelist'
                    },
                    {
                        name: 'vip-oam',
                        url: 'javascript:void(0)'
                    }
                ]
            }
        }
    },
    ready: function () {
        // Vue.nextTick(materialize);
    },
    events: {
        'crumb-update': function (data) {
            this.result = data.result;
        }
    },
    props: ['page'],
    methods: {},
    replace: false
});


/**
 * @method init
 * @return {Object} Returns crumb component
 */
var init = function () {
    return crumb;
}

module.exports = init;