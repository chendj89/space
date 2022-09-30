import path from "path";
import fs from "fs";
import basePkg from "../../bulid/pkg/base.json";
import { dependencies, name, version } from "../../cli/package.json";
export default function pkg({ input, dest }) {
  return {
    name: "pkg",
    buildEnd(error) {
      let dir = path.join(__dirname, "../playground/cli/toNum/package.json");
      // 版本+1
      let arr = version.split(".");
      let num = parseInt(arr.pop()) + 1;
      arr.push(num);
      basePkg.version = arr.join(".");
      basePkg.name = `@chencc/${name}`;
      basePkg.dependencies = dependencies;
      basePkg.repository.url = `https://github.com/chendj89/${name}.git`;

      fs.writeFileSync(dir, JSON.stringify(basePkg, null, 2), "utf-8");
    },
  };
}
