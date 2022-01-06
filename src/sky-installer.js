const logo = `
███████╗██╗  ██╗██╗   ██╗     ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
██╔════╝██║ ██╔╝╚██╗ ██╔╝     ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
███████╗█████╔╝  ╚████╔╝█████╗███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
╚════██║██╔═██╗   ╚██╔╝ ╚════╝╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
███████║██║  ██╗   ██║        ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
╚══════╝╚═╝  ╚═╝   ╚═╝        ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
`;

// Sky插件安装配置
const setupConfig = {
  // 代码源地址
  github:
    "https://raw.githubusercontent.com/LtyFantasy/bitburner-script/main/src",
  // 模块配置，后续在这里追加其他模块配置
  modules: [
    {
      enable: false,
      name: "巡天系统",
      folder: "system",
      files: []
    },
    {
      enable: true,
      name: 'Hack模块',
      folder: "hack",
      files: [
        "normal-hack.js",
        "analyze-hack.js",
        "hack-loop.js",
        "do-hack.js",
        "do-grow.js",
        "do-weaken.js"
      ]
    },
    {
      enable: false,
      name: "工具集",
      folder: "tools",
      files: [
        "scan-deploy.js"
      ]
    },
  ],
};

/** @param {NS} ns **/
export async function main(ns) {

  const log = createLogger(ns, "巡天系统");
  if (ns.getHostname !== 'home') {
    throw "⚠ 脚本只能从home执行";
  }

  const success = await downloadFiles(ns);
  if (!success) {
    log("下载脚本文件失败，请检查网络环境，稍候重试");
    return;
  }

  log(logo);
  log("巡天系统安装完毕，欢迎使用本系列脚本~");
  log("未来，完整版巡天系统会附带UI操作界面，敬请期待");
}

/**
 * 下载各模块文件
 * 
 * @param {NS} ns
 */
async function downloadFiles(ns) {

  const log = createLogger(ns, '下载');
  log("准备下载Sky系列脚本文件，请稍候...");

  var count = 0;
  var retry = 0;
  const list = [];
  // 读取所有需要下载的文件
  for (const mod of setupConfig.modules) {
    if (!mod.enable || mod.files.length === 0) continue;
    for (const file of mod.files) {
      list.push({
        url: `${setupConfig.github}/${mod.folder}/${file}`,
        path: `/${mod.folder}/${file}`,
        module: mod.name,
        success: false,
      });
    }
  }

  while(count != list.length && retry < 3); {
    
    retry > 0 && log(`下载重试，第${retry}次`);
    for (const file of list.length) {
      log(`开始下载模块(${file.module})，下属文件(${file.path})，[${count} / ${list.length}]`);
      const success = await ns.wget(file.url, file.path);
      if (success) {
        log(`😡 文件${file.path}下载失败`);
        count++;
      }
      else {
        log(`😁 文件${file.path}下载成功`);
      }
    }

    retry++;
  }
  return count === list.length;
}

/**
 * Logger
 * 
 * @param {NS} ns
 * @param {string} name
 */
function createLogger(ns, name) {
  return (msg) => {
    ns.tprintf(`[${name}]：${msg}`);
  };
}