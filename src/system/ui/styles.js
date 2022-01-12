
import Global from "/system/data/global";

/**
 * 注入全局样式
 */
export function injectStyle() {

    const {doc, theme} = Global;
    const style = `
          <style type="text/css" id="sky-style">
            .flex-row {display: flex;flex-wrap: nowrap;flex-direction: row;}
            .flex-col {display: flex;flex-wrap: nowrap;flex-direction: column;}
            .flex-row-center {display: flex;justify-content: center;align-items: center;flex-direction: row;}
            .flex-col-center {display: flex;justify-content: center;align-items: center;flex-direction: column;}
            .flex-main-axis-center {justify-content: center;}
            .flex-main-axis-between {justify-content: space-between;}
            .flex-main-axis-end {justify-content: end;justify-content: flex-end;}
            .flex-cross-axis-center {align-items: center;}
            .flex-cross-axis-end {align-items: flex-end;}
            .ss-menu {padding: 16px 0; color: ${theme.primary}; font-family: Lucida Console;user-select: none;}
            .ss-menu-item { transition: all 0.3s ease-in-out; width: 100%; height: 2.4rem;  line-height: 2.4rem; text-align: center; cursor: pointer; }
            .ss-menu-item:hover { transition: all 0.3s ease-in-out; background-color: ${theme.primary}; color: white; }
            .ss-line {border: none; outline: none; margin: 0; background-color: ${theme.primary}; height: 1px;}
          </style>	
        `;
    const menu = doc.getElementById("sky-style");
    if (menu && menu !== null) menu.remove();
    doc.head.insertAdjacentHTML("beforeend", style);
}