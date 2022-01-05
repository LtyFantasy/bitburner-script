/** @param {NS} ns **/
export async function main(ns) {

	const name = ns.args[0];
	const delay = ns.args[1];
	const hackScript = ns.args[2];
	const growScript = ns.args[3];
	const weakenScript = ns.args[4];
	
	await hackEventLoop(ns, name, delay, hackScript, growScript, weakenScript);
}

/**
   * 分析目标服务器
   * @param {NS} ns
   * @param {Server} server
   */
function analyzeServer(ns, server) {

	// 单个Thread一次hack
	const hackPercent = ns.hackAnalyze(server.hostname);
	ns.print(`HackPercent: ${hackPercent * 100} %`);

	// // hack成功率
	// const hackChance = ns.hackAnalyzeChance(server.hostname);
	// ns.print(`HackChance: ${hackChance * 100} %`);

	// hack导致的安全值上升
	// const hackSecurityGrow = ns.hackAnalyzeSecurity(1);
	// ns.print(`HackSecurityGrow: ${hackSecurityGrow}`);

	// 当前Hack时间
	const hackTime = ns.getHackTime(server.hostname);
	ns.print(`HackTime: ${hackTime / 1000} s`);

	// 单个Thread一次Weaken
	const weakenValue = ns.weakenAnalyze(1);
	ns.print(`WeakenValue: ${weakenValue}`);

	// Weaken时间
	const weakenTime = ns.getWeakenTime(server.hostname);
	ns.print(`WeakenTime: ${weakenTime / 1000} s`);

	// // 单个Thread一次grow
	// const growPercent = ns.getServerGrowth(server.hostname);
	// ns.print(`GrowPercent: ${growPercent / 100} %`);

	// // grow导致的安全值上升
	// const growSecurityGrow = ns.growthAnalyzeSecurity(1);
	// ns.print(`GrowSecurityGrow: ${growSecurityGrow}`);

	// grow时间
	const growTime = ns.getGrowTime(server.hostname);
	ns.print(`GrowTime: ${growTime / 1000} s`);

	return {
		hackPercent,
		// hackChance,
		// hackSecurityGrow,
		hackTime,
		weakenValue,
		weakenTime,
		//growPercent,
		// growSecurityGrow,
		growTime
	};
}

/**
   * Hack事件循环
   * @param {NS} ns
   * @param {string} name
   * @param {number} delayInterval
   * @param {string} hackScript
   * @param {string} growScript
   * @param {string} weakenScript
   */
async function hackEventLoop(ns, name, delayInterval, hackScript, growScript, weakenScript) {

	// 部署服务器
	const hostServer = ns.getServer();
	// 被Hack服务器
	const server = ns.getServer(name);

	// 目标服务器当前情况
	const moneyMax = ns.getServerMaxMoney(server.hostname);
	const moneyThreshold = moneyMax * 0.8;
	const securityMin = server.minDifficulty;
	const securityThreshold = (server.baseDifficulty - securityMin) * 0.2 + securityMin;

	// 脚本内存占用
	const hackRam = ns.getScriptRam(hackScript);
	const weakenRam = ns.getScriptRam(weakenScript);
	const growRam = ns.getScriptRam(growScript);

	// 循环计数
	var count = 0;

	while (true) {

		count++;
		// 计算本轮循环，服务器状况
		const analyze = analyzeServer(ns, server);
		var money = ns.getServerMoneyAvailable(server.hostname);
		const security = ns.getServerSecurityLevel(server.hostname);

		// 计算本次需要进行的任务
		const needWeaken = security > securityThreshold;
		const needGrow = money < moneyThreshold;

		// 计算Weaken所需线程
		var weakenThread = 0;
		if (needWeaken) {
			weakenThread = Math.floor((security - securityThreshold) / analyze.weakenValue);
		}

		// 计算Grow所需线程
		var growThread = 0;
		var moneyTarget = money;
		if (needGrow) {
			if (money <= 0) money = 1;
			ns.print(`【${count}】目标金额增长比例(${(moneyThreshold / money).toFixed(3)})`);
			growThread = Math.floor(ns.growthAnalyze(server.hostname, moneyThreshold / money));
			moneyTarget = moneyThreshold;
		}
		ns.print(`【${count}】Hack金额目标(${Format.money(moneyTarget)})`);

		// 计算Hack所需线程
		var hackThread = Math.ceil(1 / analyze.hackPercent);
		// [Bug] 防止计算出无限值，目前发现hackPercent有可能返回0
		if (hackThread === Infinity) {
			hackThread = 1000;
		}

		ns.print(`【${count}】初步计算\nWeaken(t=${weakenThread}), 安全(${security.toFixed(2)}), 阈值(${securityThreshold.toFixed(2)})\nGrow(t=${growThread}), 当前(${Format.money(money)}), 阈值(${(Format.money(moneyThreshold))}),\nHack(t=${hackThread})`);
		// 判断Ram占用是否超出上限
		let freeRam = hostServer.maxRam - ns.getServerUsedRam(hostServer.hostname);
		var totalNeedRam = 0;
		do {

			let weakenNeedRam = weakenThread * weakenRam;
			let growNeedRam = growThread * growRam;
			let hackNeedRam = hackThread * hackRam;
			totalNeedRam = weakenNeedRam + growNeedRam + hackNeedRam;
			ns.print(`【${count}】需要(${totalNeedRam.toFixed(2)} GB)，`);

			// 削减线程数
			if (totalNeedRam > freeRam) {
				ns.print(`【${count}】内存超额，剩余(${freeRam.toFixed(2)} GB)，开始削减`);
				var deltaRam = totalNeedRam - freeRam;
				// 优先削减　hack > grow > weakem
				let hackDelta = Math.min(hackNeedRam, deltaRam);
				let hackDeltaCount = Math.ceil(hackDelta / hackRam);
				deltaRam -= hackDelta;
				if (deltaRam < 0) deltaRam = 0;

				let growDelta = Math.min(growNeedRam, deltaRam);
				let growDeltaCount = Math.ceil(growDelta / growRam);
				deltaRam -= growDelta;
				if (deltaRam < 0) deltaRam = 0;

				let weakenDelta = deltaRam;
				let weakenDeltaCount = Math.ceil(weakenDelta / weakenRam);
				ns.print(`【${count}】weaken削减${weakenDeltaCount} - ${weakenDelta.toFixed(2)}GB, grow削减${growDeltaCount} - ${growDelta.toFixed(2)}GB, hack削减${hackDeltaCount} - ${hackDelta.toFixed(2)}GB`);

				weakenThread -= weakenDeltaCount;
				growThread -= growDeltaCount;
				hackThread -= hackDeltaCount;
			}

			if (weakenThread < 0) weakenThread = 0;
			if (growThread < 0) growThread = 0;
			if (hackThread < 0) hackThread = 0;
		}
		while (totalNeedRam > freeRam);

		ns.print(`【${count}】最终计算, Weaken(t=${weakenThread}), Grow(t=${growThread}), Hack(t=${hackThread})`);

		var weakenTime = weakenThread > 0 ? analyze.weakenTime : 0;
		var growTime = growThread > 0 ? analyze.growTime : 0;
		var hackTime = hackThread > 0 ? analyze.hackTime : 0;

		ns.print(`【${count}】Weaken用时(${(weakenTime / 1000).toFixed(3)} s), Grow用时(${(growTime / 1000).toFixed(3)} s), Hack用时(${(hackTime / 1000).toFixed(3)} s)`);

		// 永远先执行grow
		if (growThread > 0) {
			ns.print(`【${count}】执行Grow`);
			ns.exec(growScript, hostServer.hostname, growThread, server.hostname, 0);
		}

		// 如果需要Hack，则Grow之后再执行Hack
		if (hackThread > 0) {
			var delayTime = 0;
			if (growTime > hackTime) {
				delayTime = growTime - hackTime + delayInterval;
			}
			ns.print(`【${count}】执行Hack，延迟${(delayTime / 1000).toFixed(3)} s`);
			ns.exec(hackScript, hostServer.hostname, hackThread, server.hostname, delayTime);
			hackTime += delayTime;
		}

		// 如果需要weaken
		if (weakenThread > 0) {
			var delayTime = 0;
			let beforeTime = Math.max(growTime, hackTime);
			if (weakenTime < beforeTime) {
				delayTime = beforeTime - weakenTime + delayInterval;
			}
			ns.print(`【${count}】执行Weaken，延迟${(delayTime / 1000).toFixed(3)} s`);
			ns.exec(weakenScript, hostServer.hostname, weakenThread, server.hostname, delayTime);
			weakenTime += delayTime;
		}

		let totalTime = Math.max(weakenTime, growTime, hackTime) + 1000;
		ns.print(`【${count}】开始执行脚本，预计需要${(totalTime / 1000).toFixed(3)} s`);
		await ns.sleep(totalTime);
	}
}