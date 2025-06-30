<template>
  <div class="tdesign-demo-item--layout">
    <t-layout>
      <t-aside :style="collapsed ? { width: '70px' } : { width: '260px' }">
        <t-menu
          theme="light"
          :value="value"
          style="margin-right: 50px"
          height="550px"
          :width="['260px', 70]"
          :collapsed="collapsed"
          :defaultExpanded="expanded"
        >
          <template #logo>
            <img
              slot="logo"
              width="35"
              style="margin-left: 30px"
              class="t-menu__logo--center"
              src="../assets/v2-fd2e5e24f68861548dbb24d3e2096efd_r.png"
              alt="logo"
            />
            <span
              v-show="!collapsed"
              style="
                font-family: '手札体-中黑';
                color: var(--sidebar-title-color);
                font-size: 1.3em;
                margin-left: 10px;
                font-weight: 600;
              "
              >仓储管理系统</span
            >
          </template>

          <!-- <div style="padding-bottom: 0px;display: flex;align-items: center;">
            
            
          </div> -->

          <!-- <t-menu-item :value="item.name" :to="item.path" @click="onClick(item.name)" v-for="(item, index) in this.$router.options.routes[1].children" :key="index">
            <icon slot="icon" name="edit-1" />{{ item.title }}
          </t-menu-item> -->

          <template v-for="(item, index) in menulist">
            <t-menu-item
              :value="item.name"
              :to="item.path"
              @click="onClick(item.name)"
              :key="index"
              v-if="item.children.length == 0"
            >
              <icon slot="icon" :name="item.icon" />{{ item.title }}
            </t-menu-item>

            <t-submenu
              v-else
              :title="item.title"
              :value="item.path"
              :key="index"
            >
              <template #icon>
                <icon :name="item.icon" />
              </template>
              <t-menu-item
                :value="ele.name"
                @click="onClick(ele.name)"
                :to="ele.path"
                v-for="(ele, i) in item.children"
                :key="i"
              >
                <icon slot="icon" :name="ele.icon" />{{ ele.title }}
              </t-menu-item>
            </t-submenu>
          </template>

          <!-- <template v-for="(item, index) in menulist" >
                    
                  </template> -->

          <!-- <t-menu-item value="dashboard"> <icon slot="icon" name="dashboard" />仪表盘 </t-menu-item>
                  <t-menu-item value="resource"> <icon slot="icon" name="server" />资源列表 </t-menu-item>
                  <t-menu-item value="root"> <icon slot="icon" name="root-list" />根目录 </t-menu-item>
                  <t-menu-item value="control-platform"> <icon slot="icon" name="control-platform" />调度平台 </t-menu-item>
                  <t-menu-item value="precise-monitor"> <icon slot="icon" name="precise-monitor" />精准监控 </t-menu-item>
                  <t-menu-item value="mail"> <icon slot="icon" name="mail" />消息区 </t-menu-item>
                  <t-menu-item value="user-circle"> <icon slot="icon" name="user-circle" />个人中心 </t-menu-item>
                  <t-menu-item value="play-circle"> <icon slot="icon" name="play-circle" />视频区 </t-menu-item>
                  <t-menu-item value="edit1"> <icon slot="icon" name="edit-1" />资源编辑 </t-menu-item> -->

          <!-- <t-submenu title="财务管理" value="2">
                    <template #icon>
                      <icon name="control-platform" />
                    </template>
                    <t-menu-item value="2-1" :to="item.path" v-for="(item, index) in [this.$router.options.routes[2]]" :key="index">{{item.title}}</t-menu-item>
                   
                  </t-submenu> -->
        </t-menu>
      </t-aside>
      <t-layout>
        <t-header>
          <div style="margin-right: 15px; display: flex; align-items: center">
            <icon
              name="menu-unfold"
              size="20px"
              v-if="!collapsed"
              style="cursor: pointer"
              @click="changeCollapsed"
            />

            <icon
              name="menu-fold"
              size="20px"
              v-else
              style="cursor: pointer"
              @click="changeCollapsed"
            />

            <icon
              name="refresh"
              size="20px"
              style="cursor: pointer; margin: 0 25px"
              @click="changeRenovate"
            />

            <t-breadcrumb>
              <t-breadcrumbItem>
                <bookmark-icon
                  name="bookmark"
                  slot="icon"
                />主页</t-breadcrumbItem
              >

              <t-breadcrumbItem
                v-for="(item, index) in breadList"
                :key="index"
                v-show="item.meta.title"
              >
                <bookmark-icon name="bookmark" slot="icon" />{{
                  item.meta.title
                }}</t-breadcrumbItem
              >
            </t-breadcrumb>
          </div>
          <p style="color: red">
            温馨提示：在使用此系统前请优先创建仓库、物料、以及客户信息
          </p>
          <el-button @click="sc" type="primary" size="mini">大屏</el-button>
          <div style="margin-right: 15px; display: flex; align-items: center">
            <!-- <t-dropdown>
              <span class="user-name">{{  }}</span>
              <template #content>
                <t-dropdown-menu>
                  <t-dropdown-item>个人中心</t-dropdown-item>
                  <t-dropdown-item>退出登录</t-dropdown-item>
                </t-dropdown-menu>
              </template>
            </t-dropdown> -->
            <!-- <p>{{$store.getters.getuser}}</p> -->
            <t-dropdown :options="options" @click="clickHandler">
              <t-button variant="text">
                <span class="tdesign-demo-dropdown__text">
                  {{ user }}
                  <chevron-down-icon size="16" />
                </span>
              </t-button>
            </t-dropdown>
          </div>
        </t-header>
        <t-content data-barba="container" data-barba-namespace="home">
          <router-view></router-view>
        </t-content>
      </t-layout>
    </t-layout>
  </div>
</template>
<script>
import { Icon } from "tdesign-icons-vue";
import { ChevronDownIcon } from "tdesign-icons-vue";

export default {
  inject: ["reloads"],
  components: {
    Icon,
    ChevronDownIcon,
  },
  data() {
    return {
      value: "work",
      menulist: [],
      expanded: ["/home", "/yunying"],
      breadList: [],
      collapsed: false,
      user: "",
      options: [
        {
          content: "退出登录",
          value: 1,
        },
      ],
    };
  },
  computed: {
    iconName() {
      return this.collapsed ? "chevron-right" : "chevron-left";
    },
  },
  created() {
    this.menulist = this.$store.getters.getmenu;   
    this.user =
      JSON.parse(localStorage.getItem("user")).nickname ||
      JSON.parse(localStorage.getItem("user")).username;
    this.breadList = this.$route.matched;
    let arr = this.$route.path.split("/");
    let str = this.$route.path.split("/")[arr.length - 1];
    this.value = str;
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
      this.breadList = this.$route.matched;
    },
  },
  methods: {
    clickHandler(data) {
      if (data.value == 1) {
        // 退出登录
        localStorage.removeItem("token");
        this.$message.success("退出成功");
        setTimeout(() => {
          this.$router.push("/");
        }, 500);
      }
    },

    onClick(e) {
      console.log(e);
      this.value = e;
    },
    sc() {
      this.$router.push({
        path: "/largeScreen",
      });
    },
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // 刷新页面
    changeRenovate() {
      let value = this.value;
      this.reloads();
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .t-layout {
  height: 100vh;
}

::v-deep .t-layout__content {
  box-sizing: border-box;
  padding: 15px;
  overflow-y: auto;
}

::v-deep .t-layout__header {
  height: 6vh;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  padding-right: 160px;
}

::v-deep .t-menu__logo > * {
  margin-left: 7px;
}

::v-deep .t-layout__sider {
  transition: all 0.7s;
}

.tdesign-demo-dropdown {
  &__text {
    display: inline-flex;
    align-items: center;

    .t-icon {
      margin-left: 8px;
    }
  }
}
</style>
