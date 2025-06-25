import Vue from "vue";
import createI18n  from "vue-i18n";
Vue.use(createI18n);

import zh from "./langs/zh"; // 导入中文包
import en from "./langs/en"; // 导入英文包

const messages = {
  zh,
  en
};


export const i18n = new createI18n({
  legacy:false,
  locale: localStorage.getItem("lang") || "zh",
  messages: messages
});

