import createPanelScan from "/system/ui/panel-scan";


// UI配置
const uiConfig = {
    id: {
        // 菜单入口
        menuEntrance: "sky-menu-entrance",
        // 菜单 - 统计
        meunStatistics: "sky-menu-statistics",
        // 菜单 - 扫描
        menuScan: "sky-menu-scan",
        // 菜单 - 部署
        menuDeploy: "sky-menu-deploy",
        // 面板 - 扫描
        panelScan: 'sky-panel-scan'
    }
};

/**
 * 创建系统入口菜单
 * @param {UserInterfaceTheme} theme 
 */
export function createMenu(theme) {

    $(`#${uiConfig.id.menuEntrance}`).remove();

    // 注入菜单
    $(".MuiList-root").first().prepend(`
    <div id="${uiConfig.id.menuEntrance}">
      <hr class="ss-line"/>
      <div class="flex-col-center ss-menu">
        <span style="font-size: 1rem;">巡天系统</span>
        <span style="font-size: 0.8rem;">Sky-System v1.0</span>
        <div style="margin-top: 10px; width: 100%;" class="flex-col flex-cross-axis-center">
          <div id="${uiConfig.id.meunStatistics}" class="ss-menu-item">统计</div>
          <div id="${uiConfig.id.menuScan}" class="ss-menu-item">扫描</div>
          <div id="${uiConfig.id.menuDeploy}" class="ss-menu-item">部署</div>
        </div>
      </div>
      <hr class="ss-line"/>
    </div>`);

    // 注册事件
    $(`#${uiConfig.id.meunStatistics}`).on("click", onTapMenuStatistics);
    $(`#${uiConfig.id.menuScan}`).on("click", onTapMenuScan);
    $(`#${uiConfig.id.menuDeploy}`).on("click", onTapMenuDeploy);
}

// 事件 - 点击统计菜单
function onTapMenuStatistics() {

}

// 事件 - 点击扫描菜单
function onTapMenuScan()  {

  const target = $(`#${uiConfig.id.panelScan}`);
  if (target) {
      target.remove();
      return;
  }

  createPanelScan(uiConfig.id.panelScan);
}

// 事件 - 点击部署菜单
function onTapMenuDeploy() {

}