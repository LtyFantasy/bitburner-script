/** @param {NS} ns **/
export async function main(ns) {

	// 购买服务器，名字前缀
	const prefix = "my-";
	var params = ns.flags([
		// 服务器名字
		['name', "default"],
		// 购买大小
		['size', 0],
		// 购买单位 GB TB
		['unit', "GB"],
		// 购买后同时hack对应的服务器
		['hack', false],
		// hack的目标服务器，默认同name
		['target', ""],
		// 帮助，查询购买对应大小服务器需要多少钱
	]);

	ns.tprint(`参数：`, params);

	var { name, size, unit, hack, target } = params;
	if (name.length === 0) throw "服务器名字不能为空";
	if (size <= 0) throw "购买大小不能为0或者负数";
	if (unit !== "GB" && unit !== "TB") throw "购买大小单位只能为GB 或者 TB";

	// 计算购买大小
	if (unit === "TB") size *= 1024;
	// 检查target
	if (target.length === 0) target = name;
	if (hack && !ns.serverExists(target)) {
		ns.tprint(`需要被攻击的服务器${target}不存在`);
		return;
	}

	const servers = ns.getPurchasedServers();
	for (var obj of servers) {
		if (obj === (prefix + name)) {
			ns.tprint(`${name} 服务器已经购买过`);
			return;
		}
	}

	const limit = ns.getPurchasedServerLimit();
	ns.tprint(`当前已购买${servers.length}个服务器，最大${limit}个`);
	if (servers.length >= limit) {
		ns.tprint(`购买失败，不能超出最大购买个数${limit}`);
		return;
	}

	const maxRam = ns.getPurchasedServerMaxRam();
	ns.tprint("最大可购买" + (maxRam / 1024) + "TB的服务器");
	if (size > maxRam) {
		ns.tprint(`购买失败，购买Ram${size} GB超出最大额度`);
		return;
	}

	const currentMoney = ns.getServerMoneyAvailable("home");
	const money = ns.getPurchasedServerCost(size);
	if (currentMoney < money) {
		ns.tprint(`购买失败，当前金额${formatMoney(currentMoney)}，购买所需${formatMoney(money)}`);
		return;
	}

	const resultName = ns.purchaseServer(prefix + name, size);
	ns.tprint(`购买成功，服务器名字${resultName}，花销${formatMoney(money)}`);
	if (hack) {
		ns.exec("run-script.ns", "home", 1, "hack-server.ns", resultName, target);
	}
}

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
		return `${money}`;
	}
}