<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/gismap">gismap</router-link> |
      <router-link to="/i18n">i18n</router-link> |
      <router-link to="/lianxi">lianxi</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <aside class="toolbar">
      <toolbar @flagColor="flagColor"></toolbar>
    </aside>
    <router-view v-if="isShow"/>
  </div>
</template>

<script>
// import "./style/themeOrange.css";
import toolbar from "./components/toolbar";

export default {
  name: "App",
  provide(){
    return {
      reloads:this.reload
    }
  },
  components: {
    toolbar,
  },
  
  data() {
    return {
      link: "",
      isShow:true
    };
  },
  created() {
    document.documentElement.setAttribute("theme-mode", "dark");

  },
  mounted() {
    this.$nextTick(() => {
      if (localStorage.getItem("color")) {
        this.flagColor(localStorage.getItem("color"));
      }
    });
  },
  methods: {
    // 切换主题样式
    flagColor(color) {
      console.log(color);
      var links = document.querySelectorAll('link[flag="color"]');
      for (var i = 0; i < links.length; i++) {
        document.head.removeChild(links[i]);
      }
      localStorage.setItem("color", color);
      switch (color) {
        case 'Orange':
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/css/themeOrange.css'; // 确保路径正确
          // link.flag = 'color'
          link.setAttribute('flag', 'color')
          console.log(link);
          
          document.head.appendChild(link);
          break;
        case 'Blue':
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/css/themeBlue.css'; // 确保路径正确
          link.setAttribute('flag', 'color')
          document.head.appendChild(link);
          break;
        case 'Skyblue':
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/css/themeSkyblue.css'; // 确保路径正确
          link.setAttribute('flag', 'color')
          document.head.appendChild(link);
          break;
      }
    },
    reload(){
      this.isShow= false;
      this.$nextTick(()=>{
        this.isShow= true;
      })
    }
  },
};
</script>

<style lang="scss">
* {
  transition: background-color 0.3s, color 0.1s;
  /* 应用过渡动画 */
}

.toolbar {
  position: fixed;
  top: 10px;
  right: 5px;
  z-index: 9999;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  padding: 0 !important;
  margin: 0 !important;
}

ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
}
</style>
