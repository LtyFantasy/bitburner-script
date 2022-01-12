const analyzeHackScript = "/hack/analyze-hack.js";

/** @param {NS} ns **/
export async function main(ns) {

	var params = ns.flags([
		// 部署服务器
		['deploy', "home"],
		// Hack目标服务器，可以多选指定
		['target', []],
		// 是否Hack所有可Hack的服务器，为true时忽略target值
		['all', false],
		// Hack ALL时，筛选的最小金额值
		["minmoney", 1],
		// Hack ALL时，筛选的最大金额值
		["maxmoney", Infinity],
	]);

	var {deploy, target, all, minmoney, maxmoney} = params;

	if (!ns.serverExists(deploy)) {
		throw `部署服务器${deploy}不存在`;
	}

	// hack所有目标
	if (all) {
		target = scanServer(ns, "home", minmoney, maxmoney);
	}
	else {
		for (const name of target) {
			if (!ns.serverExists(name)) {
				throw `Hack目标服务器${name}不存在`;
			}
		}
	}

	// 拷贝脚本到部署服务器上，并执行
	await ns.scp(analyzeHackScript, 'home', deploy);
	for (const name of target) {
		ns.exec(analyzeHackScript, deploy, 1, "--name", name);	
	}
}

// 命令行 自动补全
export function autocomplete(data, args) {
	return [...data.servers];
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
 * @param {NS} name 当前被扫描的对象
 * @param {number} minMoney 最小金额
 * @param {number} maxMoney 最大金额
 * @param {name} exclude 排除名字
 */
function scanServer(ns, name, minMoney, maxMoney, exclude) {

	// 获取扫描列表
	const scanList = ns.scan(name);
	const filterList = [];
	const resultList = [];
	// 移除排除项
	for (var item of scanList) {
		if (item === exclude || item === 'home') continue;
		filterList.push(item);
	}

	if (filterList.length > 0) {
		for (var s of filterList) {
			const server = ns.getServer(s);
			const can = canHackServer(ns, server);
			if (can) {
				runHackTools(ns, server);
				if (server.moneyMax >= minMoney && server.moneyMax <= maxMoney) {
					resultList.push(s);//
				}
			}
			const subList = scanServer(ns, s, minMoney, maxMoney, name);
			subList.forEach((v) => resultList.push(v));
		}
	}

	return resultList;
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