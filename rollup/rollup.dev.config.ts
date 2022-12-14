// import { defineConfig } from "rollup";
import tsc from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
// @ts-ignore
import pkg from "./plugins/rollup-plugin-pkg";
// @ts-ignore
import config from "./plugins/rollup-plugin-config";

//@ts-ignore
function buildCommand({ input, dest, formats = ["es", "cjs"] }) {
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
      file: `${dest}/dist/index.${extname}`,
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
      pkg({ input, dest }),
      tsc(),
    ],
  });

  // dts
  list.push({
    input: input,
    output: {
      file: `${dest}/dist/index.d.ts`,
      format: "es",
      exports: "auto",
    },
    plugins: [dts()],
  });

  return list;
}

const rollupPlugin = buildCommand({
  input: "../packages/rollupPlugin/index.ts",
  dest: "../rollup/plugins/configPkg",
});

export default [...rollupPlugin];
