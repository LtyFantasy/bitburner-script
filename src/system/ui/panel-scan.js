import Global from "/system/data/global";
import { createPanel } from "/system/ui/panel-common";
/**
 * 创建扫描面板
 *
 * @param {string} id
 */
export function createPanelScan(id) {
  // 添加
  const closeId = id + "-close";
  $("#root").after(
    createPanel({
      panelId: id,
      closeId: closeId,
      title: "扫描",
      panelWidth: 800,
      panelHeight: 700,
    })
  );

  // 关闭事件
  $(`#${closeId}`).on("click", function () {
    $(`#${id}`).remove();
  });

  // 触发扫描
  Global.sendEvent("scan");
}

