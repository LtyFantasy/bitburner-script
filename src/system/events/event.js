import Global from "/system/data/global";
import { eventTriggerScan } from "/system/events/event-scan";

// 事件系统
const eventSystem = {
  // 事件处理器
  scheduler: {},
  // 事件队列
  queue: new Array(),
};

/**
 * 触发事件
 * @param {string} event 事件名
 * @param {any} data 事件数据
 */
export function eventSend(event, data) {
  eventSystem.queue.push({ name: event, data: data });
}

/**
 * 事件注册
 */
export function eventRegister() {
  eventSystem.scheduler = {
    scan: eventTriggerScan,
  };
}

/**
 * 事件循环
 */
export function eventLoop() {
  // 遍历事件
  while (eventSystem.queue.length > 0) {
    // 查找对应的处理器
    const event = eventSystem.queue.shift();
    const scheduler = eventSystem.scheduler[event.name];
    if (scheduler) {
      log(`处理事件(${event.name})，信息(${event.data})`);
      scheduler(event.data);
    } else {
      logError(`事件(${event.name})找不到对应的处理器`);
    }
  }
}

// 打印错误日志
function log(msg) {
  Global.ns.print(`【Info】：${msg}`);
}

// 打印错误日志
function logError(msg) {
  Global.ns.print(`【Error】：${msg}`);
}
