import { defineConfig } from "vitepress";
import Icons from "unplugin-icons/vite";
import path from "path";
import { mdCode, mdImage } from "../md";
let alias = {
  "@": path.resolve(__dirname, "../../src"),
  "@src": path.resolve(__dirname, "../../src"),
  "@docs": path.resolve(__dirname, ".."),
  "@root": path.resolve(__dirname, "../.."),
  "~vitepress": "vitepress/dist/client/theme-default",
};
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
    resolve: {
      alias: alias,
    },
    plugins: [
      Icons({
        autoInstall: true,
      }),
    ],
  },
});
