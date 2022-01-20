import Global from "/system/data/global";
import Icons from "/system/assets/icons";
import Format from "/system/utils/format";

/**
 * 单个服务器Item
 * @param {Server} server
 * @param {boolean} canHack
 */
export function createScanItem(server, canHack) {
  
  const { theme } = Global;
  var org = server.organizationName;
  if (server.purchasedByPlayer || server.hostname === "home") {
    org = "玩家";
  }

  // 标签
  const createLabel = (value, enable) => {
    return `
    <div
      style="
        margin-left: 8px; 
        padding: 2px 6px; 
        background-color:${enable ? theme.primary : theme.error}; 
        border-radius: 4px; 
        font-weight: bold; 
        color: white;
      "
    >
      ${value}
    </div>
  `;
  };

  // 单行信息
  const createInfo = (value) => {
    return `<div style="margin-top: 10px; font-size: 14px; color: ${theme.primary};">${value}</div>`;
  };

  // 按钮
  const createButton = (title, name) => {
    return `
      <div 
        style="
          margin: 0 10px; 
          padding: 4px 8px;
          cursor: pointer; 
          font-size: 14px; 
          color: ${theme.primary}; 
          border-radius: 2px;
          border: 1px solid ${theme.primary};
        "
        name="${name}"
      >
        ${title}
      </div>
    `;
  };

  // 第一行，服务器名
  const row1UI = `
  <div 
    style="font-size:14px; color:${theme.primary};" 
    class="flex-row flex-cross-axis-center" 
  >
    <span style="font-size: 16px; font-weight: bold;">
      ${server.hostname}
    </span>
    <span style="margin-left: 8px;">势力: ${org}</span>
    <span style="margin-left: 8px;">IP: ${server.ip}</span>
    ${createLabel("Root", server.hasAdminRights)}
    ${createLabel("Backdoor", server.backdoorInstalled)}
  </div> 
  `;

  // 第二行，Hack信息
  const row2UI = createInfo(`
    端口: ${server.numOpenPortsRequired}　RAM: ${server.maxRam} GB　
    所需Hack: ${server.requiredHackingSkill}　
    最大金额: ${Format.money(server.moneyMax)}　
    最低安全: ${server.minDifficulty}
  `);

  // 第三行，按钮
  const row3UI = `
    <div style="margin-top: 20px;" class="flex-row flex-main-axis-center">
      ${createButton("连接")}
      ${createButton("查看")}
      ${createButton("Hack")}
    </div>
  `;

  return `
    <div id="${server.ip}">
      <div 
        style="
        margin: 10px 0; 
        padding: 10px; 
        border: 1px solid ${canHack ? theme.primary : theme.error};" 
        class="flex-row"
      >
        <div style="margin-top: 2px;">${Icons.server}</div>
          <div style="margin-left: 10px; flex-grow:1;">
            ${row1UI}
            ${row2UI}
            ${row3UI}
        </div>
      </div>
    </div>
  `;
}
