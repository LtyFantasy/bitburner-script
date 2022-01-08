import { createPanel } from "/system/ui/panel-common.js";
/**
 * 创建扫描面板
 * 
 * @param {UserInterfaceTheme} theme
 * @param {string} id
 */
export default function createPanelScan(theme, id) {

    // 添加
    const closeId = id + "-close";
    $("#root").after(createPanel(theme ,{
      panelId: id,
      closeId: closeId,
      title: "扫描",
      panelWidth: 900,
      panelHeight: 700
  }));

    // 关闭事件
    $(`#${closeId}`).on("click", function () {
      $(`#${id}`).remove();
    });
}