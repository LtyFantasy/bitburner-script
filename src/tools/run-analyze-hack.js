const analyzeHackScript = "/hack/analyze-hack.js";

/** @param {NS} ns **/
export async function main(ns) {

	// 部署服务器名
	const deployName = ns.args[0];
	// 被Hack服务器名
	const serverName = ns.args[1];

	if (!ns.serverExists(deployName)) {
		throw `部署服务器${deployName}不存在`;
	}

	if (!ns.serverExists(serverName)) {
		throw `Hack目标服务器${serverName}不存在`;
	}

	// 拷贝脚本到部署服务器上，并执行
	await ns.scp(analyzeHackScript, 'home', deployName);
	ns.exec(analyzeHackScript, deployName, 1, "--name", serverName);
}