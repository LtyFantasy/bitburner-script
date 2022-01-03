// 自己服务器的前缀
const myServerPrifix = "my";
// 搜索金额
let minMoney = 0;
let maxMoney = 0;
// 冗余日志
let verboseLog = false;
/**
 * @type {Server[]}
 */
var resultList;

/** @param {NS} ns **/
export async function main(ns) {

	const params = ns.flags([
		// 最低金额
		['minmoney', 0],
		// 最高金额
		['maxmoney', Infinity],
		// 冗余信息
		['verbose', false],
		// 排序规则，0 降序-默认， 1 升序
		['orderby', 0],
	]);
	resultList = [];

	ns.tprint(`参数：`, params);
	const { minmoney, maxmoney, verbose, orderby } = params;
	minMoney = minmoney;
	maxMoney = maxmoney;
	verboseLog = verbose;

	var host = ns.getHostname();
	await scanServer(ns, host);

	resultList.sort((a, b) => orderby === 0 ? b.moneyMax - a.moneyMax : a.moneyMax - b.moneyMax);
	resultList.forEach((server) => ns.tprint(`【${server.hostname}】 - \$ ${formatMoney(server.moneyMax)}`));
}

// 检查当前破解工具个数
/** @param {NS} ns **/
function getCurrentPortTools(ns) {
	var tools = 0;
	if (ns.fileExists("BruteSSH.exe", "home")) tools++;
	if (ns.fileExists("FTPCrack.exe", "home")) tools++;
	if (ns.fileExists("relaySMTP.exe", "home")) tools++;
	if (ns.fileExists("HTTPWorm.exe", "home")) tools++;
	if (ns.fileExists("SQLInject.exe", "home")) tools++;
	return tools;
}

// 使用破解工具
/** 
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

// 扫描服务器
/** @param {NS} ns **/
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
			if (can && server.moneyMax >= minMoney && server.moneyMax <= maxMoney) {
				runHackTools(ns, server);
				resultList.push(server);
			}
			await scanServer(ns, s, name);
		}
	}

	return list;
}

// 判断服务器是否需要被布置hack脚本
/** 
 * @param {NS} ns
 * @param {Server} server 
 **/
function canHackServer(ns, server) {

	// 服务器前缀属于自己的，跳过
	const serverName = server.hostname;
	if (serverName.startsWith(myServerPrifix)) {
		return;
	}

	// 检查hack等级
	const hackLvl = ns.getHackingLevel();
	const targetHackLvl = server.requiredHackingSkill;
	if (targetHackLvl > hackLvl) {
		verboseLog && ns.tprint(`${serverName} 需求Hack等级${targetHackLvl} 大于当前 ${hackLvl}`);
		return false;
	}

	// 检查端口需求
	const tools = getCurrentPortTools(ns);
	const targetPorts = server.numOpenPortsRequired;
	if (targetPorts > tools) {
		verboseLog && ns.tprint(`${serverName} 需求Port${targetPorts} 大于工具个数 ${tools}`);
		return false;
	}

	return true;
}

function formatMoney(money) {

	if (money >= 1000000000000) {
		return `${money / 1000000000000} t`;
	}
	else if (money >= 1000000000) {
		return `${money / 1000000000} b`;
	}
	else if (money >= 1000000) {
		return `${money / 1000000} m`;
	}
	else if (money >= 1000) {
		return `${money / 1000} k`;
	}
	else {
		return `${money}`;
	}
}