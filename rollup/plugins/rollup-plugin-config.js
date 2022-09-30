export default function config({ npm = "", github = "" }) {
  return {
    name: "rollupPluginConfig",
    api: {
      // 返回插件数据
      getConfig() {
        return { npm, github };
      },
    },
    options: (inputOptions) => {
      // console.log(inputOptions);
      return inputOptions;
    },
  };
}
