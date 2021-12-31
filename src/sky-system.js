/**
 * @type {NS}
 */
var ns;

/**
 * 游戏主题配色
 * @type {UserInterfaceTheme}
 */
var theme;

/**
 * @type {Document}
 */
let doc = eval("document");

/**
 * 根节点
 */
let root = doc.getElementById("root");

// UI配置
const uiConfig = {
  // 菜单入口
  menuEntranceId: "sky-menu-entrance",
  // 菜单 - 统计
  meunStatisticsId: "sky-menu-statistcs",
  // 菜单 - 扫描
  menuScanId: "sky-menu-scan",
  // 菜单 - 部署
  menuDeployId: "sky-menu-deploy",
  // 面板 - 扫描
  panelScanId: 'sky-panel-scan',
};

/** @param {NS} netScript **/
export async function main(netScript) {
  ns = netScript;
  theme = ns.ui.getTheme();
  insertStyle();
  createMenu();

  while (true) {
    await ns.sleep(1000);
    let data = ns.readPort(1);
    if (data === "NULL PORT DATA") continue;
    ns.alert(data);
  }
}

/**
 * 注入全局样式
 */
function insertStyle() {

  const style = `
     <style type="text/css" id="sky-style">
       .flex-row {display: flex;flex-wrap: nowrap;flex-direction: row;}
       .flex-col {display: flex;flex-wrap: nowrap;flex-direction: column;}
       .flex-row-center {display: flex;justify-content: center;align-items: center;flex-direction: row;}
       .flex-col-center {display: flex;justify-content: center;align-items: center;flex-direction: column;}
       .flex-main-axis-center {justify-content: center;}
       .flex-main-axis-between {justify-content: space-between;}
       .flex-main-axis-end {justify-content: end;justify-content: flex-end;}
       .flex-cross-axis-center {align-items: center;}
       .flex-cross-axis-end {align-items: flex-end;}
       .ss-menu {padding: 16px 0; color: ${theme.primary}; font-family: Lucida Console;user-select: none;}
       .ss-menu-item { transition: all 0.3s ease-in-out; width: 100%; height: 2.4rem;  line-height: 2.4rem; text-align: center; cursor: pointer; }
       .ss-menu-item:hover { transition: all 0.3s ease-in-out; background-color: ${theme.primary}; color: white; }
       .ss-line {border: none; outline: none; margin: 0; background-color: ${theme.primary}; height: 1px;}
     </style>	
   `;
  const menu = doc.getElementById("sky-style");
  if (menu && menu !== null) menu.remove();
  doc.head.insertAdjacentHTML("beforeend", style);
}

/**
 * 创建左侧菜单入口
 */
function createMenu() {

  // 检查入口是否存在，存在则销毁
  checkNodeById(uiConfig.menuEntranceId, true)

  // 注入菜单
  var list = doc.getElementsByClassName("MuiList-root");
  const mainMeun = list[0];
  mainMeun.insertAdjacentHTML(
    "beforebegin",
    `
   <div id="${uiConfig.menuEntranceId}">
     <hr class="ss-line"/>
     <div class="flex-col-center ss-menu">
       <span style="font-size: 1rem;">巡天系统</span>
       <span style="font-size: 0.8rem;">Sky-System v1.0</span>
       <div style="margin-top: 10px; width: 100%;" class="flex-col flex-cross-axis-center">
         <div id="${uiConfig.meunStatisticsId}" class="ss-menu-item">统计</div>
         <div id="${uiConfig.menuScanId}" class="ss-menu-item">扫描</div>
         <div id="${uiConfig.menuDeployId}" class="ss-menu-item">部署</div>
       </div>
     </div>
     <hr class="ss-line"/>
   </div>`
  );
  // 点击 - 入口
  const entrance = doc.getElementById(uiConfig.menuEntranceId);
  entrance.addEventListener("click", onClickMenuEntrance);

  // 点击 - 统计
  const statistics = doc.getElementById(uiConfig.meunStatisticsId);
  statistics.addEventListener("click", onClickMenuStatistics);

  // 点击 - 扫描
  const scan = doc.getElementById(uiConfig.menuScanId);
  scan.addEventListener("click", onClickMenuScan);

  // 点击 - 部署
  const deploy = doc.getElementById(uiConfig.menuDeployId);
  deploy.addEventListener("click", onClickMenuDeploy);
}

/**
 * 检查节点是否存在
 * @param {string} id
 * * @param {boolean} del
 */
function checkNodeById(id, del) {
  const target = doc.getElementById(id);
  if (target && target !== null) {
    if (del) target.remove();
    return target;
  }
  return undefined;
}

/**
 * 入口点击事件
 * @param {HTMLElement} element
 */
function onClickMenuEntrance(element) {}

/**
 * 统计点击事件
 * @param {HTMLElement} element
 */
function onClickMenuStatistics(element) {}

/**
 * 扫描点击事件
 * @param {HTMLElement} element
 */
function onClickMenuScan(element) {

  // 再次点击，关闭
  const target = checkNodeById(uiConfig.panelScanId);
  if (target) {
    target.remove();
    return;
  }

  const width = 800, height = 600;

  // 添加
  root.insertAdjacentHTML('afterbegin', `
    <div
      id="${uiConfig.panelScanId}"
      style="
        position: absolute;
        width: ${width}px;
        height: ${height}px;
        top: 50%;
        left: 50%;
        transform: translate(-${width/2}px, -${height/2}px);
        border: 2px solid ${theme.primary};
        border-radius: 8px;
      "
    > 
      asdasdasd
    </div>
  `);
}

/**
 * 统计部署事件
 * @param {HTMLElement} element
 */
function onClickMenuDeploy(element) {}
