module.exports = {
  publicPath: "./",
  lintOnSave: false,
  filenameHashing: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "限时秒杀";
      return args;
    });
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 108, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ],
      },
    },
  },
  configureWebpack: (config) => {
    config.optimization = {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    };
  },
};
