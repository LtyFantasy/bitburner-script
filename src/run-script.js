/** @param {NS} ns **/
export async function main(ns) {

	const scriptName = ns.args[0];
	const targetName = ns.args[1];
	const serverName = ns.args[2];

	const targetServer = ns.getServer(targetName);
	ns.tprint("部署目标", );
	printServer(ns, targetServer)

	const hackServer = ns.getServer(serverName);
	ns.tprint("攻击目标");
	printServer(ns, hackServer)

	ns.killall(targetName);
	await ns.sleep(1000);

	const needRam = ns.getScriptRam(scriptName);
	const free = targetServer.maxRam - targetServer.ramUsed;
	if (free >= needRam) {
		await ns.scp(scriptName, 'home', targetName);
		ns.exec(scriptName, targetName, 1, "--name", serverName);
	}
}

/** 
 * @param {NS} ns 
 * @param {Server} server 
 **/
function printServer(ns, server) {

	ns.tprint(`- 服务器 ${server.hostname}`);
	ns.tprint(`-- 基础：组织(${server.organizationName})，需求技能(${server.requiredHackingSkill})，Ram(${server.maxRam}GB)，CPU(${server.cpuCores})`);
	ns.tprint(`-- 金额：最大（${formatMoney(server.moneyMax)}）, 当前(${formatMoney(server.moneyAvailable)})，成长(${server.serverGrowth})`);
	ns.tprint(`-- 安全：最低(${server.minDifficulty})，当前(${server.hackDifficulty})`);
}

/** 
 * @param {number} money 
 **/
function formatMoney(money) {

	if (money >= 1000000000000) {
		return `${(money / 1000000000000).toFixed(2)} t`;
	}
	else if (money >= 1000000000) {
		return `${(money / 1000000000).toFixed(2)} b`;
	}
	else if (money >= 1000000) {
		return `${(money / 1000000).toFixed(2)} m`;
	}
	else if (money >= 1000) {
		return `${(money / 1000).toFixed(2)} k`;
	}
	else {
		return `${money.toFixed(2)}`;
	}
}