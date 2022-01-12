import Global from "/system/data/global";
import HackTools from "/system/utils/hack-tools";
import { uiConfig } from "/system/ui/menu";
import { createScanItem } from "/system/ui/components/scan/item";

/**
 * 事件触发 - 扫描
 */
export function eventTriggerScan(data) {
  const { ns, doc } = Global;
  const result = HackTools.getScanResult(ns.getServer("home"));
  const panel = doc.getElementById(uiConfig.id.panelScan);
  if (!panel || panel === null) {
    logError("扫描面板不存在，无法展示扫描结果");
    return;
  }

  // 已经存在则移除
  const panelContentId = uiConfig.id.panelScan + "-content";
  $(`#${panelContentId}`).remove();

  panel.insertAdjacentHTML(
    "beforeend",
    `
     <div id="${panelContentId}" style="flex-grow:1; overflow-y: scroll; padding: 20px">
       ${result
         .map((item) => {
           return createScanItem(item, HackTools.canHackServer(item));
         })
         .join("")}
     </div>
   `
  );
}


