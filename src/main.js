import App from "./App.vue";
import router from "./router/index";
import { setupStore } from "@/store";
import { useI18n, i18n } from "@/plugins/i18n";
import { getPlatformConfig } from "./config/index.js";
import { MotionPlugin } from "@vueuse/motion";
// import { useEcharts } from "@/plugins/echarts";
import { createApp } from "vue";
import { useElementPlus } from "@/plugins/elementPlus";
import { injectResponsiveStorage } from "@/utils/responsive";
// import Vue from "vue";

import Table from "@pureadmin/table";
// import PureDescriptions from "@pureadmin/descriptions";

// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css";
import "element-plus/dist/index.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

//打印
import print from "vue3-print-nb";

const app = createApp(App);

// 自定义指令
import * as directives from "@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, directives[key]);
});

// 全局注册@iconify/vue图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon/index.js";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth";
app.component("Auth", Auth);

// 全局注册vue-tippy
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import VueTippy from "vue-tippy";
app.use(VueTippy);

// 改写sessionStorage setItem事件
let orignialSetItem = window.sessionStorage.setItem; // 原生sessionStorage.setItem方法
sessionStorage.setItem = function (key, newValue) {
  let setItemEvent = new Event("setItemEvent"); // 重写注册setItem
  setItemEvent.key = key;
  setItemEvent.newValue = newValue;
  window.dispatchEvent(setItemEvent); // 派发setItem
  orignialSetItem.apply(this, arguments); // 设置值
};

getPlatformConfig(app).then(async config => {
  setupStore(app);
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  // app.use(MotionPlugin).use(useElementPlus).use(Table);
  app.use(MotionPlugin).use(Table).use(useI18n);
  // .use(PureDescriptions)
  // .use(useEcharts);
  app.use(print);
  app.use(useElementPlus, {
    i18n: (key, value) => i18n.vm._t(key, value)
  });
  app.mount("#app");
});
