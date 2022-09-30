import { Plugin } from 'rollup';

interface userOptions {
    /**
     * npm账号名
     */
    npm: string;
    /**
     * github账号名
     */
    github: string;
    /**
     * 默认package.json
     */
    pkg: string | object;
    [props: string]: any;
}
interface pkgOptions {
    /**
     * 来源
     */
    input: string;
    /**
     * 存放目录
     */
    dest: string;
}
declare function config(opts: userOptions): Plugin;
/**
 * 打包
 * @param {*} param.input 来源
 * @param {*} param.dest 存放目录
 * @returns
 */
declare function pkg({ input, dest }: pkgOptions): Plugin;

export { config, pkg };
