export default function config(opts) {
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
