import { defineConfig } from "vitepress";
import Icons from "unplugin-icons/vite";
import { mdCode, mdImage } from "../md";
export default defineConfig({
  title: "飞翔的鱼",
  lastUpdated: true,
  markdown: {
    theme: "css-variables",
    lineNumbers: true,
    config: (md: any) => {
      mdImage(md);
      mdCode(md);
    },
  },
  vite: {
    plugins: [
      Icons({
        autoInstall: true,
      }),
    ],
  },
});
