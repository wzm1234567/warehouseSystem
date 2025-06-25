<template>
  <div class="tdesign-demo-item--layout">
    <t-layout>
      <t-aside>
        <t-menu theme="light" :value="value" style="margin-right: 50px" height="550px" :collapsed="false"
          :defaultExpanded="expanded">
          <img slot="logo" width="136" class="t-menu__logo--center" src="../assets/logo.svg" alt="logo" />

          <!-- <t-menu-item :value="item.name" :to="item.path" @click="onClick(item.name)" v-for="(item, index) in this.$router.options.routes[1].children" :key="index">
            <icon slot="icon" name="edit-1" />{{ item.title }}
          </t-menu-item> -->

          <template v-for="(item, index) in menulist">
            <t-menu-item :value="item.name" :to="item.path" @click="onClick(item.name)" :key="index"
              v-if="item.children.length == 0">
              <icon slot="icon" :name="item.icon" />{{ item.title }}
            </t-menu-item>
            <t-submenu v-else :title="item.title" :value="item.path" :key="index">
              <t-menu-item :value="ele.name" @click="onClick(ele.name)" :to="ele.path" v-for="(ele, i) in item.children"
                :key="i">
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
        <t-header>Header</t-header>
        <t-content>

          <t-breadcrumb>

            <t-breadcrumbItem v-for="(item, index) in breadList" :key="index" v-show="item.meta.title">
              <bookmark-icon name="bookmark" slot="icon" />{{ item.meta.title }}</t-breadcrumbItem>
          </t-breadcrumb>


          <router-view></router-view>
        </t-content>
      </t-layout>
    </t-layout>
  </div>
</template>
<script>
import { Icon } from "tdesign-icons-vue";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      value: "work",
      menulist: [],
      expanded: ["/home", "/yunying"],
      breadList: []
    };
  },
  created() {
    console.log(this.$router.options.routes[2]);
    this.menulist = this.$store.getters.getmenu;
    console.log(this.menulist);
    this.breadList = this.$route.matched;
    console.log(this.breadList);

  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
      this.breadList = this.$route.matched;

      // this.breadList = to.matched;
    }
  },
  methods: {
    onClick(e) {
      console.log(e);

      this.value = e;
    },
  },
};
</script>
<style lang="scss" scoped>
.t-layout {
  height: 100vh;
}

.t-layout__header {
  height: 6vh;
}

.t-layout__content {
  box-sizing: border-box;
  padding: 15px;
  overflow-y: auto;
}
</style>
