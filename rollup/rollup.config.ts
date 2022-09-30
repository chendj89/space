// import { defineConfig } from "rollup";
import tsc from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
// @ts-ignore
import pkg from "./plugins/rollup-plugin-pkg";
// @ts-ignore
import config from "./plugins/rollup-plugin-config";

//@ts-ignore
function buildCommand({ input, dest }) {
  let list = [];
  let outputs = ["es", "cjs"].map((format) => {
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
      config({ npm: "chencc", github: "chendj89" }),
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

const gitdownload = buildCommand({
  input: "../packages/gitdownload/index.ts",
  dest: "../playground/gitdownload",
});

export default [...gitdownload];
