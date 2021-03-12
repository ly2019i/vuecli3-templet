import { isAndroid } from "./checkUserAgent";
function toast($msg, $time) {
  var oDiv = document.createElement("div");
  oDiv.setAttribute("id", "toast");
  var oBody = document.getElementsByTagName("body")[0];
  oBody.append(oDiv);
  oDiv.innerText = $msg;
  oDiv.style.display = "block";
  setTimeout(function() {
    oDiv.style.display = "none";
  }, $time);
}
function clientError() {
  toast("系统异常，请稍后重试！", 2000);
}
export function DotData(item) {
  /**
   * 向客户端提交商品信息
   * 2.4.2版本修改统计接口 新增三个字段
   * pageId 页面id
   * containerType 1.运营位2.商品列表3.搜索列表 4.特权列表不传入代表无容器类型，默认为0
   * containerId当containerType=1时 运营位ID（marketingBlockId）当containerType=2时 materialsListId当containerType=3时不传当containerType=4当containerType不传（默认值时）默认为0
   */
  if (isAndroid()) {
    try {
      // eslint-disable-next-line no-undef
      supercard.log(item);
      console.log("安卓客户端调用成功");
    } catch (e) {
      console.error("安卓客户端调用失败");
      console.error(e);
    }
  } else {
    try {
      window.webkit.messageHandlers.CommodityStatistics.postMessage(item);
      console.log("IOS客户端调用成功");
    } catch (e) {
      console.error("IOS客户端调用失败");
      console.error(e);
    }
  }
}
function updateVersion() {
  let updateVersionDom = document.getElementById("updateVersion");
  updateVersionDom.style.display = "block";
}
//  0元购详情页面
export function freePurchase(data) {
  if (isAndroid()) {
    try {
      // eslint-disable-next-line no-undef
      supercard.launchFreePurchase(JSON.stringify(data));
      console.log("安卓客户端调用成功");
    } catch (e) {
      updateVersion();
      console.error("安卓客户端调用失败");
      console.error(e);
    }
  } else {
    try {
      window.webkit.messageHandlers.DidClickFreeGoodsListItem.postMessage(data);
      console.log("IOS客户端调用成功");
    } catch (e) {
      updateVersion();
      console.error("IOS客户端调用失败");
      console.error(e);
    }
  }
}
//  普通详情页面
export function normalPurchase(data) {
  if (isAndroid()) {
    try {
      // eslint-disable-next-line no-undef
      supercard.dispatchMaterial(JSON.stringify(data));
      console.log("安卓客户端调用成功");
    } catch (e) {
      console.error("安卓客户端调用失败");
      console.error(e);
    }
  } else {
    try {
      window.webkit.messageHandlers.DidClickActivityGoodsListItem.postMessage(
        data
      );
      console.log("IOS客户端调用成功");
    } catch (e) {
      console.error("IOS客户端调用失败");
      console.error(e);
    }
  }
}
