import Global from "/system/data/global";
import Icons from "/system/assets/icons";
import { uiConfig } from "/system/ui/menu";

/**
 * 获取扫描数据
 * @param {Server} hostServer
 * @param {string} exclude
 * @return {Server[]}
 */
function getScanResult(hostServer, exclude) {
  const { ns } = Global;
  const list = ns.scan(hostServer.hostname);
  const serverList = list.map((item) => {
    return ns.getServer(item);
  });

  const filterServerList = serverList.filter((item) => {
    if (item.hostname === "home" || item.hostname === exclude) return undefined;

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

/**
 * 事件触发 - 扫描
 */
export function eventTriggerScan(data) {

  const { ns, doc, theme } = Global;
  const result = getScanResult(ns.getServer("home"));
  const panel = doc.getElementById(uiConfig.id.panelScan);
  if (!panel || panel === null) {
    logError("扫描面板不存在，无法展示扫描结果");
    return;
  }

  // 已经存在则移除
  const panelContentId = uiConfig.id.panelScan + "-content";
  $(`#${panelContentId}`).remove();

  /**
   * 单个服务器Item
   * @type {(item: Server) => void}
   */
  const createItem = (server) => {
    const canHack = canHackServer(server);
    const org =
      server.purchasedByPlayer || server.hostname === "home"
        ? "玩家"
        : server.organizationName;

    const createInfo = (value) => {
      return `
        <div
          style="margin-top: 10px; font-size: 14px; color: ${theme.primary};"
        >${value}</div>
      `;
    };

    const createButton = (title, callback) => {
      return `
        <div>${title}</div>
      `;
    };

    return `
       <div id="${server.ip}">
         <div style="margin: 10px 0; padding: 10px; border: 1px solid ${
           canHack ? theme.primary : theme.error
         };" class="flex-row">
            <div style="margin-top: 2px;">${Icons.server}</div>
            <div style="margin-left: 10px; flex-grow:1;">
              <div style="font-size:14px; color:${
                theme.primary
              };" class="flex-row flex-cross-axis-center" >
                <span style="font-size: 16px; font-weight: bold;">${
                  server.hostname
                }</span>
                <span style="margin-left: 8px;">势力: ${org}</span>
                <span style="margin-left: 8px;">IP: ${server.ip}</span>
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
              ${createInfo(
                `端口: ${server.numOpenPortsRequired}　RAM: ${
                  server.maxRam
                } GB　所需Hack: ${
                  server.requiredHackingSkill
                }　最大金额: ${formatMoney(server.moneyMax)}　最低安全: ${
                  server.minDifficulty
                }`
              )}
            </div>
         </div>
       </div>
     `;
  };

  panel.insertAdjacentHTML(
    "beforeend",
    `
     <div id="${panelContentId}" style="flex-grow:1; overflow-y: scroll; padding: 20px">
       ${result
         .map((item) => {
           return createItem(item);
         })
         .join("")}
     </div>
   `
  );
}

/**
 * 金额格式化
 */
function formatMoney(money) {
  if (money >= 1e12) {
    return `${(money / 1e12).toFixed(2)} t`;
  } else if (money >= 1e9) {
    return `${(money / 1e9).toFixed(2)} b`;
  } else if (money >= 1e6) {
    return `${(money / 1e6).toFixed(2)} m`;
  } else if (money >= 1000) {
    return `${(money / 1000).toFixed(2)} k`;
  } else {
    return `${money}`;
  }
}

// 检查当前破解工具个数
function getCurrentPortTools() {
  const { ns } = Global;
  var tools = 0;
  if (ns.fileExists("BruteSSH.exe", "home")) tools++;

  if (ns.fileExists("FTPCrack.exe", "home")) tools++;

  if (ns.fileExists("relaySMTP.exe", "home")) tools++;

  if (ns.fileExists("HTTPWorm.exe", "home")) tools++;

  if (ns.fileExists("SQLInject.exe", "home")) tools++;

  return tools;
}

/**
 * 服务器是否可以Hack
 * @param {Server} server
 **/
function canHackServer(server) {
  const { ns } = Global;
  // 检查hack等级
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
