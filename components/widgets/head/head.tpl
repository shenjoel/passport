<header id="header" class="page-topbar">
    <!-- start header nav-->
    <div class="navbar-fixed">
        <nav class="navbar-color teal darken-4">
            <div class="nav-wrapper">
                <a v-if="page == 'dash'" id="head-menu-btn" v-on:click="onMenu" class="menu-btn btn-floating waves-effect waves-light accent-4 tooltipped" data-position="down" data-delay="50" data-tooltip="菜单控制"><i class="fa fa-list"></i></a>
                <a href="javascript:void(0);" class="brand-logo">VIPME</a>
                <ul class="index-logo-right right hide-on-med-and-down">
                    <li v-on:click="onFull">
                        <a href="javascript:void(0);" class="waves-effect waves-block waves-light toggle-fullscreen tooltipped" data-position="down" data-delay="50" data-tooltip="全屏展示">
                            <i class="mdi-action-settings-overscan"></i>
                        </a>
                    </li>
                </ul>
                <!-- <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a class="waves-effect waves-block waves-light " href="http://10.100.77.131:5555/#!/index">Pagium</a></li>
                    <li v-if="page == 'index'"><a class="waves-effect waves-block waves-light " href="#!/dash/filemanage/filelist">运营后台</a></li>
                </ul> -->
                <!-- translation-button -->

                <!-- notifications-dropdown -->

            </div>
        </nav>
    </div>
    <!-- end header nav-->
</header>