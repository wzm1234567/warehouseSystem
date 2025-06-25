<template>
  <div>
    <header @click="qiehuan">{{ $t("message.home") }}</header>

    <div v-t="'message.name'"></div>

    <el-dropdown trigger="click" @command="qiehuan">
      <span class="el-dropdown-link">
        {{ $t("message.switchLanguage") }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { i18n } from "../../i18n/index";

export default {
  data() {
    return {};
  },
  methods: {
    qiehuan(e) {
      console.log(e);
      console.log(i18n);
      this.$i18n.locale = e;
      localStorage.setItem("lang", e);
    },
  },
  created() {},
};
</script>
<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
