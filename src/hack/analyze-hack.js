

/**
 * version: 1.0.0
 * 本文件是Hack启动脚本，负责检查服务器基本情况
 * 确认可以Hack后，会启动hack-loop.js，进入任务循环
 */

/**
 * analyze-hack.js hack-loop.js do-weaken.js do-grow.js do-hack.js 
 * 这5个脚本都应该在home的sky-hack-server文件夹下
 */
const folder = "/hack";
const loopScript = `${folder}/hack-loop.js`;
const weakenScript = `${folder}/do-weaken.js`;
const growScript = `${folder}/do-grow.js`;
const hackScript = `${folder}/do-hack.js`;

/** @param {NS} ns **/
export async function main(ns) {

	const params = ns.flags([
		// 被Hack服务器名
		['name', ''],
		// 延迟附加值，默认200ms
		['delay', 200]
	]);

	const { name, delay } = params;

	ns.disableLog("ALL");

	// 检查基本运行环境
	checkEnv(ns, name);
	// 判断服务器是否可以root	
	const server = ns.getServer(name);
	if (!canHackServer(ns, server)) return;
	rootServer(ns, server);
	// 清空所有脚本
	ns.killall(server.hostname);
	await ns.sleep(1000);
	// 复制执行脚本到目标服务器
	await copyScriptToHostServer(ns);
	ns.tprint(`开启Hack循环任务，目标(${name})，预计10秒钟后启动`);
	// 开始循环任务，系统规定，spawn需要等待大约10秒才会启动新脚本
	ns.spawn(loopScript, 1, name, delay, hackScript, growScript, weakenScript);
}

// 命令行 自动补全
export function autocomplete(data, args) {
	return [...data.servers];
}

/**
   * 检查运行环境
   * @param {NS} ns
   * @param {string} name
   */
function checkEnv(ns, name) {

	// 检查部署服务器内存是否足够
	if (ns.getServerMaxRam(ns.getHostname()) < 32) {
		throw "部署服务器内存低于32GB，不推荐使用当前脚本进行Hack，建议改用普通串行weaken grow hack脚本";
	}

	// 验证Hack目标是否存在
	if (!ns.serverExists(name)) {
		throw "Hack目标服务器不存在，请检查name是否正确";
	}
}

/** 
   * 检查当前破解工具个数
   * @param {NS} ns
   **/
function getCurrentPortTools(ns) {
	var tools = 0;
	if (ns.fileExists("BruteSSH.exe", "home")) tools++;
	if (ns.fileExists("FTPCrack.exe", "home")) tools++;
	if (ns.fileExists("relaySMTP.exe", "home")) tools++;
	if (ns.fileExists("HTTPWorm.exe", "home")) tools++;
	if (ns.fileExists("SQLInject.exe", "home")) tools++;
	return tools;
}

/** 
   * 使用破解工具
   * @param {NS} ns 
   * @param {Server} server 
   **/
function rootServer(ns, server) {
	// 已经root
	if (server.hasAdminRights) return;
	if (!server.sshPortOpen && ns.fileExists("BruteSSH.exe", "home")) ns.brutessh(server.hostname);
	if (!server.ftpPortOpen && ns.fileExists("FTPCrack.exe", "home")) ns.ftpcrack(server.hostname);
	if (!server.smtpPortOpen && ns.fileExists("relaySMTP.exe", "home")) ns.relaysmtp(server.hostname);
	if (!server.httpPortOpen && ns.fileExists("HTTPWorm.exe", "home")) ns.httpworm(server.hostname);
	if (!server.sqlPortOpen && ns.fileExists("SQLInject.exe", "home")) ns.sqlinject(server.hostname);
	ns.nuke(server.hostname);
}

/** 
   * 判断服务器是否可以Hack
   * @param {NS} ns
   * @param {Server} server 
   **/
function canHackServer(ns, server) {

	// 服务器属于自己的
	if (server.purchasedByPlayer) {
		ns.print(`${server.hostname}属于自己的服务器，不能Hack`);
		return false;
	}

	// 检查hack等级
	const hackLvl = ns.getHackingLevel();
	const targetHackLvl = server.requiredHackingSkill;
	if (targetHackLvl > hackLvl) {
		ns.print(`${server.hostname} 需求Hack等级${targetHackLvl} 大于当前 ${hackLvl}`);
		return false;
	}

	// 检查端口需求
	const tools = getCurrentPortTools(ns);
	const targetPorts = server.numOpenPortsRequired;
	if (targetPorts > tools) {
		ns.print(`${server.hostname} 需求Port${targetPorts} 大于工具个数 ${tools}`);
		return false;
	}
	return true;
}

/**
   * 复制执行脚本到部署服务器
   * @param {NS} ns
   */
async function copyScriptToHostServer(ns) {

	const hostName = ns.getHostname();
	if (hostName === 'home') return;
	const result = await ns.scp(
		[loopScript, weakenScript, growScript, hackScript],
		`home`,
		hostName
	);
	ns.print(`复制执行脚本到目标：${result ? '成功' : '失败'}`);
}

