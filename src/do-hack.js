/** @param {NS} ns **/
export async function main(ns) {
	const name = ns.args[0];
	const delay = ns.args[1];
	await ns.sleep(delay);
	await ns.hack(name);	
}