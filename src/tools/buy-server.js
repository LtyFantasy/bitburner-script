/** @param {NS} ns **/
export async function main(ns) {

	var params = ns.flags([
		// 服务器名字
		['name', ""],
		// 购买大小
		['size', 0],
		// 购买单位 GB TB
		['unit', "GB"],
		// 帮助，查询购买对应大小服务器需要多少钱
		['help', false],
	]);

	var { name, size, unit, help } = params;
	if (size <= 0) throw "购买大小不能为0或者负数";
	if (unit !== "GB" && unit !== "TB") throw "购买大小单位只能为GB 或者 TB";

	// 计算购买大小
	if (unit === "TB") size *= 1024;

	// 仅仅只是查询
	if (help) {
		const money = ns.getPurchasedServerCost(size);
		ns.tprint(`购买 ${size}GB 的服务器，需要${formatMoney(money)}`);
		return;
	}

    if (name.length === 0) throw "服务器名字不能为空";

    // 检查该服务器名是否已存在
	if (ns.serverExists(name)) {
        ns.tprint(`${name} 服务器已存在`);
        return;
    }

	const servers = ns.getPurchasedServers();
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

	const resultName = ns.purchaseServer(name, size);
	ns.tprint(`购买成功，服务器名字${resultName}，花销${formatMoney(money)}`);
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