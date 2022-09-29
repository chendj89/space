// import { defineConfig } from "rollup";
import tsc from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

//@ts-ignore
function buildCommand({ input, dest }) {
  let list = [];
  let outputs = ["es", "amd", "cjs"].map((format) => {
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
    plugins: [tsc()],
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

const game = buildCommand({
  input: "../cli/game.ts",
  dest: "../playground/cli/game",
});
const index = buildCommand({
  input: "../cli/index.ts",
  dest: "../playground/cli/index",
});

export default [...game, ...index];
