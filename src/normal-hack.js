/** @param {NS} ns **/
export async function main(ns) {
	const server = JSON.parse(ns.args[0]);
	await taskLoop(ns, server,);
}

/** 
 * @param {NS} ns 
 * @param {Server} server 
 **/
async function taskLoop(ns, server) {

	const target = server.hostname;
	const maxMoney = server.moneyMax;
	if (maxMoney === 0) {
		return;
	}

	while (true) {
		const baseSecurity = server.baseDifficulty;
		const currentSecurity = ns.getServerSecurityLevel(target);
		const minSecurity = server.minDifficulty;
		const threshold = minSecurity + (baseSecurity - minSecurity) * 0.3;
		ns.print(`【安全】当前(${currentSecurity.toFixed(2)})，最低(${minSecurity.toFixed(2)})，门槛${threshold.toFixed(2)}`);
		if (currentSecurity > minSecurity + 10 || (currentSecurity > threshold && currentSecurity > minSecurity + 2)) {
			await ns.weaken(target);
		}

		var money = ns.getServerMoneyAvailable(target);
		ns.print(`【金额】当前(${formatMoney(money)})，最大(${formatMoney(maxMoney)})`);
		if (money < maxMoney * 0.9) {
			await ns.grow(target);
		}

		if (money > maxMoney * 0.5 && money > 1000 * 1000) {
			const result = await ns.hack(target);
			ns.print(`【收获】${formatMoney(result)}`);
		}
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
		return `${money.toFixed(2)}`;
	}
}