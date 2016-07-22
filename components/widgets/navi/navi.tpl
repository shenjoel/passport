<aside id="left-sidebar-nav">
    <ul id="slide-out" class="side-nav leftside-navigation ps-container ps-active-y nav-show {{nconfig.defaultClass}}">
        <!-- 用户信息 -->
        <li class="user-details teal darken-1">
            <div class="row">
                <div class="col col s4 m4 l4">
                    <img v-bind:src="nconfig.user.img" alt="" class="circle responsive-img valign profile-image">
                </div>
                <div class="col col s8 m8 l8">

                    <a class="btn-flat dropdown-button waves-effect waves-light white-text profile-btn" href="#"
                       data-activates="profile-dropdown">{{nconfig.user.name}}</a>

                    <p class="user-roal">{{nconfig.user.role}}</p>
                </div>
            </div>
        </li>
        <!-- 用户信息 -->

        <!-- 菜单信息 -->
        <li v-if="menu.isChild == 'false'" class="bold {{menu.isAct}}" v-for="menu in nconfig.menus">
            <a href="{{menu.url}}" class="waves-effect waves-cyan">
                <i class="{{menu.icon}}"></i>{{menu.name}}
            </a>
        </li>


        <li v-if="menu.isChild == 'true'" class="no-padding" v-for="menu in nconfig.menus">
            <ul class="collapsible collapsible-accordion">
                <li class="bold {{menu.isAct}}">
                    <a class="collapsible-header waves-effect waves-cyan {{menu.isAct}}">
                        <i class="{{menu.icon}}"></i>{{menu.name}}</a>

                    <div class="collapsible-body" style="display: block;">
                        <ul>
                            <li class="{{menu.isAct}}" v-for="child in menu.children">
                                <a href="{{child.url}}">{{child.name}}</a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</aside>