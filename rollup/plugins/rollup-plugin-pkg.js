import path from "path";
import fs from "fs-extra";
import basePkg from "../pkg/base.json";
/**
 * 打包
 * @param {*} param
 * @returns
 */
export default function pkg({ input, dest }) {
  return {
    name: "pkg",
    buildEnd() {
      // 来源目录
      let src = path.dirname(path.join(__dirname, `${input}`));
      // 来源目录中的package.json
      let pkg = path.join(src, "package.json");

      // 判断是否存在
      if (fs.existsSync(pkg)) {
        let pkgJson = fs.readFileSync(pkg, "utf-8");
        pkgJson = JSON.parse(pkgJson);
        const { dependencies, name, version } = pkgJson;
        // 版本+1
        let arr = version.split(".");
        let num = parseInt(arr.pop()) + 1;
        arr.push(num);
        basePkg.version = arr.join(".");
        basePkg.name = `@chencc/${name}`;
        basePkg.dependencies = dependencies;
        basePkg.repository.url = `https://github.com/chendj89/${name}.git`;
        basePkg.scripts.push = "npm publish";
        // 确保目标目录存在
        fs.ensureDirSync(path.join(__dirname, dest));
        let dir = path.join(__dirname, `${dest}/package.json`);
        fs.writeFileSync(dir, JSON.stringify(basePkg, null, 2), "utf-8");
      }
    },
  };
}
