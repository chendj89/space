import path from "path";
import fs from "fs";
import basePkg from "../../bulid/pkg/base.json";
import { dependencies } from "../../cli/package.json";
export default function pkg({ input, dest }) {
  return {
    name: "pkg",
    buildEnd(error) {
      let dir = path.join(__dirname, "../playground/cli/toNum/package.json");
      let updateData = {
        name: `@chencc`,
        version: "1.0.0",
        repo: "",
      };
      basePkg.dependencies = dependencies;

      fs.writeFileSync(dir, JSON.stringify(basePkg, null, 2), "utf-8");
    },
  };
}
