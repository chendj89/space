// import { defineConfig } from "rollup";
import path from "path";
import tsc from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
// @ts-ignore
import pkg from "./plugins/rollup-plugin-pkg";
// @ts-ignore
import config from "./plugins/rollup-plugin-config";

//@ts-ignore
function buildCommand({
  //@ts-ignore
  input,
  //@ts-ignore
  dest,
  //@ts-ignore
  model = "production",
  //@ts-ignore
  formats = ["es", "cjs"],
}) {
  // 完整路径
  let src = path.dirname(path.join(__dirname, input));
  // 源文件所在目录名称
  let srcDirName = path.basename(src);
  let fileName = "";
  // 开发版本
  if (model === "development") {
    fileName = `${dest}/${srcDirName}`;
  } else {
    fileName = `${dest}/dist/index`;
  }
  let list = [];
  let outputs = formats.map((format) => {
    let ext = {
      es: "mjs",
      cjs: "js",
      amd: "amd.js",
    };
    //@ts-ignore
    let extname = ext[format];
    return {
      file: `${fileName}.${extname}`,
      format: format,
      exports: format === "cjs" ? "auto" : undefined,
      banner: `/*\n* 格式:${format}\n*/`,
    };
  });
  // 常规打包
  list.push({
    input: input,
    output: outputs,
    plugins: [
      config({ npm: "chencc", github: "chendj89", pkg: "./pkg/base.json" }),
      model === "production" ? pkg({ input, dest }) : null,
      tsc(),
    ],
  });

  if (model === "production") {
    // dts
    list.push({
      input: input,
      output: {
        file: `${fileName}.d.ts`,
        format: "es",
        exports: "auto",
      },
      plugins: [dts()],
    });
  }

  return list;
}

const rollupPlugin = buildCommand({
  input: "../packages/rollupPlugin/index.ts",
  dest: "../rollup/plugins",
  model: "development",
  formats: ["es"],
});

export default [...rollupPlugin];
