import Global from "/system/data/global";

export default class HackTools {

  static get ns() {
    return Global.ns;
  }

  /**
   * 获取扫描数据
   * @param {Server} hostServer
   * @param {string} exclude
   * @return {Server[]}
   */
  static getScanResult(hostServer, exclude) {

    const { ns } = Global;
    const list = ns.scan(hostServer.hostname);
    const serverList = list.map((item) => {
      return ns.getServer(item);
    });

    const filterServerList = serverList.filter((item) => {
      if (item.hostname === "home" || item.hostname === exclude)
        return undefined;

      return item;
    });

    const resultList = [];
    for (var item of filterServerList) {
      resultList.push(item);
      const result = this.getScanResult(item, hostServer.hostname);
      for (var i of result) {
        resultList.push(i);
      }
    }

    return resultList;
  }

  // 检查当前破解工具个数
  static getCurrentPortTools() {
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
  static canHackServer(server) {
    const { ns } = Global;
    // 检查hack等级
    const hackLvl = ns.getHackingLevel();
    const targetHackLvl = server.requiredHackingSkill;
    if (targetHackLvl > hackLvl) {
      return false;
    }

    // 检查端口需求
    const tools = this.getCurrentPortTools();
    const targetPorts = server.numOpenPortsRequired;
    if (targetPorts > tools) {
      return false;
    }

    return true;
  }
}
