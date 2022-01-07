
/**
 * 注入JQuery
 * 
 * @param {Document} doc
 * @param {NS} ns
 */
 export function injectJQuery(doc, ns) {

    const data = ns.read("/system/jquery-3.6.0.min.js");
    ns.tprint(data);
}