import * as shell from "shelljs";
export default function getDownload() {
  let code = shell.exec(
    "git clone --progress --depth 1 https://github.com/chendj89/cli.git"
  );
  return code;
}
