import "/system/jquery-3.6.0.min.js";
import Global from "/system/data/global";
import { injectStyle } from "/system/ui/styles";
import { createMenu } from "/system/ui/menu";
import { eventRegister, eventLoop, eventSend } from "/system/events/event";

// ------------------------------------------------------------------------------------------
// ------------------------------------------ 入口 ------------------------------------------
// ------------------------------------------------------------------------------------------

/** @param {NS} ns **/
export async function main(ns) {

  Global.ns = ns;
  Global.doc = eval("document");
  Global.sendEvent = eventSend;

  ns.disableLog("ALL");
  const host = ns.getHostname();
  if (host !== "home") {
    throw "只能从home运行该脚本";
  }

  // 注入style，创建入口菜单
  injectStyle();
  createMenu();
  // 事件初始化
  eventRegister();

  while (true) {
    await ns.sleep(200);
    eventLoop();
  }
}