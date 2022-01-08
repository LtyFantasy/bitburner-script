/**
 * 创建界面
 * @param {UserInterfaceTheme} theme
 */
export function createPanel(
  theme,
  { panelId = "", closeId = "", title = "", panelWidth = 0, panelHeight = 0 }
) {
  return `
   <div
       id="${panelId}"
       style="
         position: fixed;
         z-index: 9000;
         width: ${panelWidth}px;
         height: ${panelHeight}px;
         top: 50%;
         left: 50%;
         transform: translate(-${panelWidth / 2}px, -${panelHeight / 2}px);
         border: 2px solid ${theme.primary};
         border-radius: 8px;
         background-color: ${theme.backgroundprimary};
         box-shadow: 0 0 30px 4px ${theme.primary};
       "
       class="flex-col"
     > 
      ${createTitleArea(theme, closeId, title)}
    </div>
   `;
}

/**
 * 创建界面标题栏
 *
 * @param {UserInterfaceTheme} theme
 * @param {string} closeId
 * @param {string} title
 */
function createTitleArea(theme, closeId, title) {
  return `
    <div
      style="
        position: relative;
        width: 100%;
        height: 60px; 
        font-size: 20px;
        font-weight: bold;
        color: ${theme.primary};
        text-align: center;
        line-height: 60px;
        border-bottom: 1px solid ${theme.primary};
      "
    >
      ${title}
      <div
       id="${closeId}"
       style="
         position: absolute;
         padding: 0 20px;
         top: 0;
         right: 10px;
         font-size: 14px;
         color: ${theme.primary};
         cursor: pointer;
       "
     >X</div>
    </div>
  `;
}
