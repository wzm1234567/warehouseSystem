/**
 * 获取当前时间
 * @param {string} spacer 日期分隔符
 * @returns {string} 时间格式 年月日时分秒
 */
export function getTime(spacer = "-") {
  const now = new Date();
  const year = now.getFullYear(); // 年
  const month = now.getMonth() + 1; // 月（注意：月份从 0 开始，所以要加 1）
  const day = now.getDate(); // 日
  const hour = now.getHours(); // 时
  const minute = now.getMinutes(); // 分
  const second = now.getSeconds(); // 秒

  // 补零函数（可选）
  function padZero(num) {
    return num < 10 ? "0" + num : num;
  }

  // 格式化输出
  const formatted = `${year}${spacer}${padZero(month)}${spacer}${padZero(
    day
  )} ${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;

  return formatted;
}
/**
 * 获取当前时间与前些天的时间
 * @param {number} Interval 时间间隔 例如前30天与今天（默认为前30天）
 */
export function getTimeInterval(Interval = 30) {
  /* 1. Date 对象 */
  const now = new Date(); // 当前时间
  const thirtyDaysAgo = new Date(Date.now() - Interval * 24 * 60 * 60 * 1000);

  /* 2. 格式化函数 */
  function fmt(d) {
    const y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, "0");
    const D = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");
    return `${y}-${M}-${D} ${h}:${m}:${s}`;
  }

  const nowStr = fmt(now); // "2025-10-13 14:07:28"
  const thirtyStr = fmt(thirtyDaysAgo); // "2025-09-13 14:07:28"
  return [thirtyStr, nowStr];
  // console.log("现在:", nowStr);
  // console.log("30 天前:", thirtyStr);
}

export function getTodayRange() {
  const now = new Date();
  // 当天 0 点
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // 格式化函数
  const format = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  };

  return {
    start: format(start),
    end: format(now)
  };
}

/**
 * 安全复制文本到剪贴板（带降级方案）
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} - 是否复制成功
 */
export async function safeCopyText(text) {
  // 1. 优先使用现代 Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('✅ 复制成功（使用 Clipboard API）');
      return true;
    } catch (err) {
      console.warn('Clipboard API 失败，尝试降级方案:', err);
    }
  }

  // 2. 降级方案：使用传统的 execCommand
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.left = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    if (successful) {
      console.log('✅ 复制成功（使用降级方案）');
      return true;
    } else {
      throw new Error('execCommand 执行失败');
    }
  } catch (err) {
    console.error('❌ 复制失败:', err);
    alert('复制失败，请手动复制或检查浏览器权限');
    return false;
  }
}
