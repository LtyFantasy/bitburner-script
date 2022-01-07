import "/system/jquery-3.6.0.min.js";
import { injectStyle } from "/system/ui/styles";
import { createMenu } from "/system/ui/menu";

const iconServer = `
  <svg t="1641088564439" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2336" width="20" height="20">
    <path d="M512.209065 948.945692m-56.0294 0a56.0294 56.0294 0 1 0 112.0588 0 56.0294 56.0294 0 1 0-112.0588 0Z" fill="#00cc00" p-id="2337"></path>
    <path d="M883.926501 948.945692m-56.0294 0a56.0294 56.0294 0 1 0 112.058799 0 56.0294 56.0294 0 1 0-112.058799 0Z" fill="#00cc00" p-id="2338"></path>
    <path d="M140.073499 948.945692m-56.029399 0a56.0294 56.0294 0 1 0 112.058799 0 56.0294 56.0294 0 1 0-112.058799 0Z" fill="#00cc00" p-id="2339"></path>
    <path d="M925.94855 63.764802c0-35.122907-28.641895-63.764802-63.764802-63.764802H162.234381C127.111474 0 98.469579 28.641895 98.469579 63.764802v144.463863c0 17.352389 7.108207 33.241323 18.397714 44.739894-11.289506 11.498571-18.397713 27.387505-18.397714 44.739893v144.463863c0 17.352389 7.108207 33.241323 18.397714 44.739894-11.289506 11.498571-18.397713 27.387505-18.397714 44.739894v144.463863c0 35.122907 28.641895 63.764802 63.764802 63.764802h699.949367c35.122907 0 63.764802-28.641895 63.764802-63.764802v-144.463863c0-17.352389-7.108207-33.241323-18.397713-44.739894 11.289506-11.498571 18.397713-27.387505 18.397713-44.739894v-144.463863c0-17.352389-7.108207-33.241323-18.397713-44.739893 11.289506-11.498571 18.397713-27.387505 18.397713-44.739894V63.764802z m-789.638219 0c0-14.216415 11.498571-25.714986 25.714985-25.714986h699.949368c14.216415 0 25.924051 11.498571 25.92405 25.714986v144.463863c0 14.216415-11.498571 25.924051-25.92405 25.92405H162.234381c-14.216415 0-25.714986-11.498571-25.714985-25.92405V63.764802h-0.209065z m751.797468 233.94365v144.463863c0 14.216415-11.498571 25.714986-25.924051 25.714986H162.234381c-14.216415 0-25.714986-11.498571-25.714985-25.714986v-144.463863c0-14.216415 11.498571-25.714986 25.714985-25.714985h699.949367c14.216415 0 25.924051 11.498571 25.924051 25.714985z m0 378.407514c0 14.216415-11.498571 25.714986-25.924051 25.714985H162.234381c-14.216415 0-25.714986-11.498571-25.714985-25.714985v-144.463863c0-14.216415 11.498571-25.714986 25.714985-25.714986h699.949367c14.216415 0 25.924051 11.498571 25.924051 25.714986v144.463863z" fill="#00cc00" p-id="2340"></path><path d="M503.846468 154.917109h236.243365c10.453246 0 19.024908-8.571662 19.024908-19.024908s-8.571662-19.024908-19.024908-19.024908H503.846468c-10.453246 0-19.024908 8.571662-19.024908 19.024908s8.571662 19.024908 19.024908 19.024908z" fill="#00cc00" p-id="2341"></path><path d="M311.088608 136.101266m-22.579012 0a22.579012 22.579012 0 1 0 45.158023 0 22.579012 22.579012 0 1 0-45.158023 0Z" fill="#00cc00" p-id="2342"></path><path d="M503.846468 388.860759h236.243365c10.453246 0 19.024908-8.571662 19.024908-19.024908s-8.571662-19.024908-19.024908-19.024908H503.846468c-10.453246 0-19.024908 8.571662-19.024908 19.024908 0.209065 10.662311 8.571662 19.024908 19.024908 19.024908zM740.089833 584.963659H503.846468c-10.453246 0-19.024908 8.571662-19.024908 19.024908s8.571662 19.024908 19.024908 19.024908h236.243365c10.453246 0 19.024908-8.571662 19.024908-19.024908s-8.571662-19.024908-19.024908-19.024908z" fill="#00cc00" p-id="2343"></path><path d="M311.088608 370.044916m-22.579012 0a22.579012 22.579012 0 1 0 45.158023 0 22.579012 22.579012 0 1 0-45.158023 0Z" fill="#00cc00" p-id="2344"></path><path d="M311.088608 603.988567m-22.579012 0a22.579012 22.579012 0 1 0 45.158023 0 22.579012 22.579012 0 1 0-45.158023 0Z" fill="#00cc00" p-id="2345"></path><path d="M883.926501 873.891384c-34.704777 0-63.973867 23.833401-72.545529 56.0294H584.754594a75.305186 75.305186 0 0 0-53.520621-53.520621v-59.374438c0-10.453246-8.571662-19.024908-19.024908-19.024908s-19.024908 8.571662-19.024908 19.024908v59.374438a75.305186 75.305186 0 0 0-53.520621 53.520621H212.409963c-8.362597-32.195998-37.631686-56.0294-72.545529-56.0294-41.394855 0-75.054308 33.659453-75.054307 75.054308s33.659453 75.054308 75.054307 75.054308c34.704777 0 63.973867-23.833401 72.545529-56.0294h227.253573c8.362597 32.195998 37.631686 56.0294 72.545529 56.0294 34.913842 0 63.973867-23.833401 72.545529-56.0294h226.835443c8.362597 32.195998 37.631686 56.0294 72.545529 56.0294 41.394855 0 75.054308-33.659453 75.054307-75.054308s-33.868518-75.054308-75.263372-75.054308zM140.073499 985.950184c-20.488363 0-37.213557-16.725194-37.213556-37.213557S119.585137 911.523071 140.073499 911.523071s37.213557 16.725194 37.213557 37.213556-16.934259 37.213557-37.213557 37.213557z m372.135566 0c-20.488363 0-37.213557-16.725194-37.213557-37.213557s16.725194-37.213557 37.213557-37.213556 37.213557 16.725194 37.213556 37.213556-16.725194 37.213557-37.213556 37.213557z m371.717436 0c-20.488363 0-37.213557-16.725194-37.213557-37.213557s16.725194-37.213557 37.213557-37.213556 37.213557 16.725194 37.213556 37.213556-16.725194 37.213557-37.213556 37.213557z" fill="#00cc00" p-id="2346"></path>
  </svg>
`;

const iconMoney = `
  <svg t="1641089202345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4953" width="20" height="20">
    <path d="M863.52638 160.77801h-0.275098a495.517067 495.517067 0 0 0-701.952369 0h-0.525997C70.668252 250.282809 15.045039 374.572175 15.045039 512.406278a493.010622 493.010622 0 0 0 145.72533 350.555897c90.081739 90.364478 214.09346 145.982597 351.078073 145.982598a492.563588 492.563588 0 0 0 351.131563-145.977504h0.551469a493.992567 493.992567 0 0 0 145.418393-350.560991c0-137.839198-55.344295-262.128564-145.423487-351.633362z m-54.293575 648.44588v0.275098a420.454894 420.454894 0 0 1-594.191786 0l-0.551469-0.275098a418.787752 418.787752 0 0 1-122.634959-296.817612c0-116.677058 46.679993-221.959215 122.634959-297.664555l0.551469-0.276371a419.905972 419.905972 0 0 1 594.191786 0v0.276371c76.506435 75.710435 123.186428 180.992592 123.186428 297.664555a416.976692 416.976692 0 0 1-123.186428 296.812518zM574.537589 334.679197a34.334987 34.334987 0 0 1 34.458526 34.483998 23.077635 23.077635 0 0 0 46.153996 0c0-44.001612-36.361285-80.338698-80.61889-80.338698h-39.347877v-37.966021a23.081456 23.081456 0 0 0-23.339997-23.064899 22.783433 22.783433 0 0 0-22.763055 23.064899v37.966021h-39.610239a80.630352 80.630352 0 0 0-80.313226 80.338698v81.63777a80.548842 80.548842 0 0 0 79.761757 80.588324h40.169349v157.92642h-39.61788a34.5273 34.5273 0 0 1-24.441661-10.042338v-0.275097a34.278948 34.278948 0 0 1-9.741767-24.417463 23.066172 23.066172 0 0 0-46.129798 0 81.497674 81.497674 0 0 0 23.590896 56.998702c14.674421 14.098754 35.009995 23.865993 56.72233 23.865993h39.61788v37.966021a22.685366 22.685366 0 0 0 22.763056 22.542723c12.772936 0 23.339997-10.042337 23.339996-22.542723v-37.966021h39.346604c45.32743 0 80.61889-35.812363 80.61889-80.864695v-88.451531a81.581732 81.581732 0 0 0-80.61889-80.864695h-39.354245V334.679197h39.354245z m-85.445835 150.585388h-40.169349a34.787115 34.787115 0 0 1-23.890192-9.743041 34.342628 34.342628 0 0 1-9.741767-24.716758v-81.63777a34.291684 34.291684 0 0 1 34.183428-34.483998h39.61788v150.581567z m85.445835 46.128525a36.949688 36.949688 0 0 1 24.716758 10.04361 35.586936 35.586936 0 0 1 9.741768 24.69256v88.452805a34.547678 34.547678 0 0 1-34.458526 34.734897h-39.354245v-157.92642h39.354245z" p-id="4954" fill="#00cc00"></path>
  </svg>
`

// ------------------------------------------------------------------------------------------
// ------------------------------------------ 全局数据 ------------------------------------------
// ------------------------------------------------------------------------------------------

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

// 事件系统
const eventSystem = { // 事件标记
    flasg: { // 需要扫描
        needScan: false
    },
    // 事件处理器
    scheduler: {},
    // 事件队列
    queue: new Array()
};

// ------------------------------------------------------------------------------------------
// ------------------------------------------ 入口 ------------------------------------------
// ------------------------------------------------------------------------------------------

/** @param {NS} netScript **/
export async function main(netScript) {

    ns = netScript;
    ns.disableLog("ALL");
    const host = ns.getHostname();
    if (host !== "home") {
        throw "只能从home运行该脚本";
    }

    theme = ns.ui.getTheme();
    // 注入style，创建入口菜单
    injectStyle(doc, theme);
    createMenu(theme);
    // 事件初始化
    eventRegister();

    while (true) {
        await ns.sleep(200);
        eventLoop();
    }
}

// ------------------------------------------------------------------------------------------
// ------------------------------------------ 界面 ------------------------------------------
// ------------------------------------------------------------------------------------------

// /**
//  * 创建左侧菜单入口
//  */
// function createMenu() { // 检查入口是否存在，存在则销毁

//     $(`#${uiConfig.id.menuEntrance}`).remove();

//     // 注入菜单
//     $(".MuiList-root").first().prepend(`
//     <div id="${
//       uiConfig.id.menuEntrance
//   }">
//       <hr class="ss-line"/>
//       <div class="flex-col-center ss-menu">
//         <span style="font-size: 1rem;">巡天系统</span>
//         <span style="font-size: 0.8rem;">Sky-System v1.0</span>
//         <div style="margin-top: 10px; width: 100%;" class="flex-col flex-cross-axis-center">
//           <div id="${
//       uiConfig.id.meunStatistics
//   }" class="ss-menu-item">统计</div>
//           <div id="${
//       uiConfig.id.menuScan
//   }" class="ss-menu-item">扫描</div>
//           <div id="${
//       uiConfig.id.menuDeploy
//   }" class="ss-menu-item">部署</div>
//         </div>
//       </div>
//       <hr class="ss-line"/>
//     </div>`);

//     // 点击 - 入口
//     const entrance = doc.getElementById(uiConfig.id.menuEntrance);
//     entrance.addEventListener("click", onClickMenuEntrance);

//     // 点击 - 统计
//     const statistics = doc.getElementById(uiConfig.id.meunStatistics);
//     statistics.addEventListener("click", onClickMenuStatistics);

//     // 点击 - 扫描
//     const menuScan = doc.getElementById(uiConfig.id.menuScan);
//     menuScan.addEventListener("click", onClickMenuScan);

//     // 点击 - 部署
//     const deploy = doc.getElementById(uiConfig.id.menuDeploy);
//     deploy.addEventListener("click", onClickMenuDeploy);
// }

/**
 * 检查节点是否存在
 * @param {string} id
 * * @param {boolean} del
 */
function checkNodeById(id) {
    const target = doc.getElementById(id);
    if (target && target !== null) {
        return target;
    }
    return undefined;
}

/**
 * 销毁节点
 */
function deleteNodeById(id) {
    const target = doc.getElementById(id);
    if (target && target !== null) {
        target.remove();
    }
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
function onClickMenuScan(element) { // 再次点击，关闭
    const target = checkNodeById(uiConfig.id.panelScan);
    if (target) {
        target.remove();
        return;
    }

    // 添加
    const closeId = uiConfig.id.panelScan + "-close";
    root.insertAdjacentHTML('afterend', createPanel({
        panelId: uiConfig.id.panelScan,
        closeId: closeId,
        title: "扫描",
        panelWidth: 900,
        panelHeight: 700
    }));

    // 关闭事件
    const closeBtn = doc.getElementById(closeId);
    closeBtn.addEventListener("click", () => {
        deleteNodeById(uiConfig.id.panelScan);
    });

    // 触发扫描事件
    eventSend("scan");
}

/**
 * 统计部署事件
 * @param {HTMLElement} element
 */
function onClickMenuDeploy(element) {}

/**
 * 创建界面标题栏
 * 
 * @param {string} closeId
 * @param {string} title
 */
function createTitleArea(closeId, title) {

    return `
      <div
        style="
          position: relative;
          width: 100%;
          height: 60px; 
          font-size: 20px;
          font-weight: bold;
          color: ${
        theme.primary
    };
          text-align: center;
          line-height: 60px;
          border-bottom: 1px solid ${
        theme.primary
    };
        "
      >
        ${title}
        <div
         id="${closeId}"
         style="
           position: absolute;
           padding: 0 20px;
           top: 0;
           right: 10px;
           font-size: 14px;
           color: ${
        theme.primary
    };
           cursor: pointer;
         "
       >X</div>
      </div>
    `;
}
/**
 * 创建界面
 */
function createPanel({
    panelId = '',
    closeId = '',
    title = '',
    panelWidth = 0,
    panelHeight = 0
}) {

    return `
     <div
         id="${panelId}"
         style="
           position: fixed;
           z-index: 9000;
           width: ${panelWidth}px;
           height: ${panelHeight}px;
           top: 50%;
           left: 50%;
           transform: translate(-${
        panelWidth / 2
    }px, -${
        panelHeight / 2
    }px);
           border: 2px solid ${
        theme.primary
    };
           border-radius: 8px;
           background-color: ${
        theme.backgroundprimary
    };
           box-shadow: 0 0 30px 4px ${
        theme.primary
    };
         "
         class="flex-col"
       > 
        ${
        createTitleArea(closeId, title)
    }
      </div>
     `;
}

/**
 * 获取扫描数据
 * @param {Server} hostServer
 * @param {string} exclude
 * @return {Server[]}
 */
function getScanResult(hostServer, exclude) {

    const list = ns.scan(hostServer.hostname);
    const serverList = list.map((item) => {
        return ns.getServer(item);
    });

    const filterServerList = serverList.filter((item) => {
        if (item.hostname === 'home' || item.hostname === exclude) 
            return undefined;
        
        return item;
    });

    const resultList = [];
    for (var item of filterServerList) {
        resultList.push(item);
        const result = getScanResult(item, hostServer.hostname);
        for (var i of result) {
            resultList.push(i);
        }
    }

    return resultList;
}

// ------------------------------------------------------------------------------------------
// ------------------------------------------ 事件模块 ------------------------------------------
// ------------------------------------------------------------------------------------------

/**
 * 触发事件
 * @param {string} event 事件名
 * @param {any} data 事件数据
 */
function eventSend(event, data) {
    eventSystem.queue.push({name: event, data: data});
}

/**
 * 事件注册
 */
function eventRegister() {
    eventSystem.scheduler = {
        scan: eventTriggerScan
    };
}

/**
 * 事件循环
 */
function eventLoop() { // 遍历事件
    while (eventSystem.queue.length > 0) { // 查找对应的处理器
        const event = eventSystem.queue.shift();
        const scheduler = eventSystem.scheduler[event.name];
        if (scheduler) {
            log(`处理事件(${
                event.name
            })，信息(${
                event.data
            })`);
            scheduler(event.data);
        } else {
            logError(`事件(${
                event.name
            })找不到对应的处理器`);
        }
    }
}

/**
 * 事件触发 - 扫描
 */
function eventTriggerScan(data) {

    const result = getScanResult(ns.getServer("home"));
    const panel = doc.getElementById(uiConfig.id.panelScan);
    if (! panel || panel === null) {
        logError("扫描面板不存在，无法展示扫描结果");
        return;
    }

    // 已经存在则移除
    const panelContentId = uiConfig.id.panelScan + "-content";
    deleteNodeById(panelContentId);

    /**
   * 单个服务器Item
   * @type {(item: Server) => void}
   */
    const createItem = (server) => {

        const canHack = canHackServer(server);
        const org = server.purchasedByPlayer || server.hostname === 'home' ? "玩家" : server.organizationName;

        const createInfo = (value) => {
            return `
        <div
          style="margin-top: 10px; font-size: 14px; color: ${
                theme.primary
            };"
        >${value}</div>
      `;
        };

        const createButton = (title, callback) => {
            return `
        <div>${title}</div>
      `;
        };

        return `
       <div id="${
            server.ip
        }">
         <div style="margin: 10px 0; padding: 10px; border: 1px solid ${
            canHack ? theme.primary : theme.error
        };" class="flex-row">
            <div style="margin-top: 2px;">${iconServer}</div>
            <div style="margin-left: 10px; flex-grow:1;">
              <div style="font-size:14px; color:${
            theme.primary
        };" class="flex-row flex-cross-axis-center" >
                <span style="font-size: 16px; font-weight: bold;">${
            server.hostname
        }</span>
                <span style="margin-left: 8px;">势力: ${org}</span>
                <span style="margin-left: 8px;">IP: ${
            server.ip
        }</span>
                <div style="margin-left: 8px; padding: 2px 6px; background-color:${
            server.hasAdminRights ? theme.primary : theme.error
        }; border-radius: 4px; font-weight: bold; color: white;">
                  Root
                </div>
                <div style="margin-left: 8px; padding: 2px 6px; background-color:${
            server.backdoorInstalled ? theme.primary : theme.error
        }; border-radius: 4px; font-weight: bold; color: white;">
                  Backdoor
                </div>
              </div>
              ${
            createInfo(`端口: ${
                server.numOpenPortsRequired
            }　RAM: ${
                server.maxRam
            } GB　所需Hack: ${
                server.requiredHackingSkill
            }　最大金额: ${
                formatMoney(server.moneyMax)
            }　最低安全: ${
                server.minDifficulty
            }`)
        }
            </div>
         </div>
       </div>
     `;
    };

    panel.insertAdjacentHTML("beforeend", `
     <div id="${panelContentId}" style="flex-grow:1; overflow-y: scroll; padding: 20px">
       ${
        result.map((item) => {
            return createItem(item);
        }).join("")
    }
     </div>
   `);
}

// ------------------------------------------------------------------------------------------
// ---------------------------------------- 其他工具 ----------------------------------------
// ------------------------------------------------------------------------------------------

// 打印错误日志
function log(msg) {
    ns.print(`【Info】：${msg}`);
}

// 打印错误日志
function logError(msg) {
    ns.print(`【Error】：${msg}`);
}

// 金额格式化
function formatMoney(money) {

    if (money >= 1000000000000) {
        return `${
            (money / 1000000000000).toFixed(2)
        } t`;
    } else if (money >= 1000000000) {
        return `${
            (money / 1000000000).toFixed(2)
        } b`;
    } else if (money >= 1000000) {
        return `${
            (money / 1000000).toFixed(2)
        } m`;
    } else if (money >= 1000) {
        return `${
            (money / 1000).toFixed(2)
        } k`;
    } else {
        return `${money}`;
    }
}

// 检查当前破解工具个数
function getCurrentPortTools() {
    var tools = 0;
    if (ns.fileExists("BruteSSH.exe", "home")) 
        tools++;
    
    if (ns.fileExists("FTPCrack.exe", "home")) 
        tools++;
    
    if (ns.fileExists("relaySMTP.exe", "home")) 
        tools++;
    
    if (ns.fileExists("HTTPWorm.exe", "home")) 
        tools++;
    
    if (ns.fileExists("SQLInject.exe", "home")) 
        tools++;
    
    return tools;
}

/** 
 * 服务器是否可以Hack
 * @param {Server} server 
 **/
function canHackServer(server) { // 检查hack等级
    const hackLvl = ns.getHackingLevel();
    const targetHackLvl = server.requiredHackingSkill;
    if (targetHackLvl > hackLvl) {
        return false;
    }

    // 检查端口需求
    const tools = getCurrentPortTools(ns);
    const targetPorts = server.numOpenPortsRequired;
    if (targetPorts > tools) {
        return false;
    }

    return true;
}
