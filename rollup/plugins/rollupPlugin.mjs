/*
* 格式:es
*/
import path from 'path';
import fs from 'fs-extra';

function config(opts) {
    return {
        name: "rollupPluginConfig",
        api: {
            // 返回插件数据
            getConfig() {
                return opts;
            },
        },
    };
}
/**
 * 打包
 * @param {*} param.input 来源
 * @param {*} param.dest 存放目录
 * @returns
 */
function pkg({ input, dest }) {
    let configPlugin;
    return {
        name: "rollupPluginPkg",
        buildStart(opts) {
            configPlugin = opts.plugins.find((plugin) => {
                return plugin.name === "rollupPluginConfig";
            });
        },
        buildEnd() {
            if (!configPlugin) {
                return;
            }
            let config = configPlugin.api.getConfig();
            // import basePkg from "../pkg/base.json";
            // 提供
            let basePkg = {};
            if (config.pkg) {
                if (typeof config.pkg === "string") {
                    // 读取文件
                    basePkg = fs.readFileSync(path.join(__dirname, config.pkg), "utf-8");
                    // 转换为json对象
                    basePkg = JSON.parse(basePkg);
                }
                else {
                    basePkg = config.pkg;
                }
            }
            // 来源目录
            let src = path.dirname(path.join(__dirname, `${input}`));
            // 来源目录中的package.json
            let pkg = path.join(src, "package.json");
            let readme = path.join(src, "readme.md");
            // 确保目标目录存在
            fs.ensureDirSync(path.join(__dirname, dest));
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
                basePkg.name = `@${config.npm}/${name}`;
                basePkg.dependencies = dependencies;
                basePkg.repository.url = `https://github.com/${config.github}/${name}.git`;
                basePkg.scripts.push = "npm publish";
                let dir = path.join(__dirname, `${dest}/package.json`);
                fs.writeFileSync(dir, JSON.stringify(basePkg, null, 2), "utf-8");
            }
            // 说明文件
            if (fs.existsSync(readme)) {
                let readmeContent = fs.readFileSync(readme, "utf-8");
                let dir = path.join(__dirname, `${dest}/readme.md`);
                fs.writeFileSync(dir, readmeContent, "utf-8");
            }
        },
    };
}

export { config, pkg };
