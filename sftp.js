const Client = require("ssh2-sftp-client");
const path = require("path");
// const path = require('path')

// 先配置一下,个人习惯
const config = {
  path: {
    // 远程地址 从根目录开始的路径
    romotePath: "/data1/web/activity/flashSale",

    // 本地地址 相对于当前文件夹所在的路径
    localPath: path.join(__dirname, "./dist").replace(/\\/g, "/"),
  },
  romote: {
    // 服务器 ip 地址
    host: "47.105.91.70",
    // 端口号,默认是 22
    port: "22",
    // 登录的用户名
    username: "root",
    // 登录密码
    password: "Supercard12347890",
  },
};

/* 主方法
 * @method main
 * @param{String} localPath 本地路径,不用 path 模块,直接字符串就好了,这个包自己有格式化的
 * @param{String} romotePath 远程路径
 * @return{undefined} 返回个*
 */

function main(localPath, romotePath) {
  // 实例化
  const sftp = new Client();
  sftp
    .connect(config.romote)
    //  先递归删除服务器上的文件夹
    .then(() => {
      console.log(
        "----------------------------- 删除服务器缓存中... -----------------------------"
      );
      return sftp.rmdir(romotePath, true);
    })
    .then((data) => {
      console.log(
        "----------------------------- 删除完成 ----------------------------"
      );
    })
    .then(() => {
      console.log(
        "----------------------------- 连接成功,上传中... -----------------------------"
      );
      return sftp.uploadDir(localPath, romotePath);
    })
    .then((data) => {
      console.log(
        "----------------------------- 上传完成,及时清除缓存 ----------------------------"
      );
    })
    .catch((err) => {
      console.log(
        "----------------------------- 失败了!出事了!快看看怎么回事! -----------------------------"
      );
      console.log(err);
    })
    .finally(() => {
      // 断开连接
      sftp.end();
    });
}
main(config.path.localPath, config.path.romotePath);
