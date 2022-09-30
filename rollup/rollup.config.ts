// import { defineConfig } from "rollup";
import tsc from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import { pkg, config } from "./plugins/configPkg";

// let a = {
//   exports: {
//     ".": {
//       import: "./dist/index.mjs",
//       require: "./dist/index.js",
//       types: "./dist/index.d.ts",
//     },
//   },
// };

function buildCommand({
  //@ts-ignore
  input,
  //@ts-ignore
  dest,
  //@ts-ignore
  formats = ["es", "cjs"],
  //@ts-ignore
  external = [],
}) {
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
    external,
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
  // @ts-ignore
  external: ["shelljs"],
});

export default [...gitdownload];
