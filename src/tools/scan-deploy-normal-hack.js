
// 自动部署的Hack脚本
const scriptName = "/hack/normal-hack.js";

/** @param {NS} ns **/
export async function main(ns) {

	var host = ns.getHostname();
	await scanServer(ns, host);
}

/**
 * 检查当前破解工具个数
 *  @param {NS} ns 
 */
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
function runHackTools(ns, server) {
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
 * 扫描服务器
 * @param {NS} ns
 */
async function scanServer(ns, name, exclude) {

	// 获取扫描列表
	const scanList = ns.scan(name);
	const list = [];
	// 移除排除项
	for (var item of scanList) {
		if (item === exclude || item === 'home') continue;
		list.push(item);
	}

	if (list.length > 0) {
		for (var s of list) {
			const server = ns.getServer(s);
			const can = canHackServer(ns, server);
			if (can) {
				runHackTools(ns, server);
				if (server.moneyMax === 0) {
					ns.tprint(`${server.hostname}，最大金额为0，没有hack价值`);
				}
				else {
					ns.tprint(`${server.hostname}，最大金额${formatMoney(server.moneyMax)}`);
					await hackServer(ns, server)
				}
			}
			await scanServer(ns, s, name);
		}
	}

	return list;
}

/** 
 * 判断服务器是否可以Hack
 * @param {NS} ns
 * @param {Server} server 
 **/
function canHackServer(ns, server) {

	// 服务器属于自己的，跳过
	if (server.purchasedByPlayer) {
		return;
	}

	// 检查hack等级
	const hackLvl = ns.getHackingLevel();
	const targetHackLvl = server.requiredHackingSkill;
	if (targetHackLvl > hackLvl) {
		ns.tprint(`${server.hostname} 需求Hack等级${targetHackLvl} 大于当前 ${hackLvl}`);
		return false;
	}

	// 检查端口需求
	const tools = getCurrentPortTools(ns);
	const targetPorts = server.numOpenPortsRequired;
	if (targetPorts > tools) {
		ns.tprint(`${server.hostname} 需求Port${targetPorts} 大于工具个数 ${tools}`);
		return false;
	}

	return true;
}

/** 
 * 复制脚本到目标服务器，并执行Hack
 * @param {NS} ns
 * @param {Server} server 
 **/
async function hackServer(ns, server) {

	// 计算脚本能开多少线程
	const targetName = server.hostname;
	const needRam = ns.getScriptRam(scriptName);
	const free = server.maxRam - server.ramUsed;
	const thread = parseInt((free / needRam).toString());
	if (thread > 0) {
		ns.tprint(`${targetName}能部署线程：${thread}个`);
		await ns.scp(scriptName, 'home', targetName);
		ns.exec(scriptName, targetName, thread, server.hostname);
	}
}

/**
 * 金额格式化
 */
 function formatMoney(money) {
	if (money >= 1e12) {
		return `${(money / 1e12).toFixed(2)} t`;
	}
	else if (money >= 1e9) {
		return `${(money / 1e9).toFixed(2)} b`;
	}
	else if (money >= 1e6) {
		return `${(money / 1e6).toFixed(2)} m`;
	}
	else if (money >= 1000) {
		return `${(money / 1000).toFixed(2)} k`;
	}
	else {
		return `${money}`;
	}
}