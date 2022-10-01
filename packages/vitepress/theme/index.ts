import NotFound from "~vitepress/NotFound.vue";
import Layout from "./Layout.vue";
import "./theme";
import "./vars.css";
import "@src/scss/app.scss";
import VpLayoutBlog from "@/layout/vp-layout-blog/index.vue";
import scss from "@/scss/alias.module.scss";
export default {
  Layout,
  NotFound,
  // @ts-ignore
  enhanceApp({ app }) {
    app.config.globalProperties.scss = scss;
  },
  setup() {},
};
