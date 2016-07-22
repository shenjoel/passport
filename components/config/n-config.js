'use strict';

/**
 *   navi config
 */
module.exports = {
    default: 'index', //配置默认显示页面
    defaultClass: 'fadeOutLeft animated',//默认样式
    user: {
        name: "游客",
        img: "http://7xawfk.com1.z0.glb.clouddn.com/profile_small.jpg",
        //img: "/c/vipme-pagium/0.0.1/widgets/navi/img/avator.jpg",
        role: "admin"
    },
    menus: [
        {
            id: "filemanage",
            name: "文件管理",
            isChild: "true",
            icon: "mdi-action-account-circle",
            isAct: "",
            isNew: "false",
            children: [
                {
                    id: "filelist",
                    name: "文件列表",
                    isChild: "false",
                    icon: "mdi-action-view-carousel",
                    isAct: "",
                    isNew: "false",
                    url: "#!/dash/filemanage/filelist"
                }
            ]
        }
    ]
};