/**
 * 本脚本适用于低内存的服务器
 * 并且不会判断服务器能不能hack，具体的判断应当交给前置脚本处理
 */

/** @param {NS} ns **/
export async function main(ns) {

	const name = ns.args[0];
	ns.disableLog("ALL");
	await taskLoop(ns, name);
}

/** 
 * @param {NS} ns 
 * @param {string} name 
 **/
async function taskLoop(ns, name) {

	const maxMoney = ns.getServerMaxMoney(name);
	const minSecurity = ns.getServerMinSecurityLevel(name);
	while (true) {

		const currentSecurity = ns.getServerSecurityLevel(name);
		const securityThreshold = minSecurity + Math.pow(minSecurity, 0.6) - 0.5;
		ns.print(`【安全】当前(${currentSecurity.toFixed(2)})，门槛${securityThreshold.toFixed(2)}`);
		if (currentSecurity > securityThreshold) {
			ns.print("开始Weaken");
			await ns.weaken(name);
		}

		const money = ns.getServerMoneyAvailable(name);
		const moneyThreshold = maxMoney * 0.8;
		ns.print(`【金额】当前(${formatMoney(money)})，门槛(${formatMoney(moneyThreshold)})`);
		if (money < moneyThreshold) {
			ns.print("开始Grow");
			await ns.grow(name);
		}

		if (money >= moneyThreshold) {
			ns.print("开始Hack");
			const result = await ns.hack(name);
			ns.print(`【收获】${formatMoney(result)}`);
		}
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