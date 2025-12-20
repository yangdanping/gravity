import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/zh-cn'; // 添加中文语言包

// 加载插件
// relativeTime: 用于 "X ago" 格式化
// utc: 用于更好的 UTC 日期解析和操作
dayjs.extend(relativeTime);
dayjs.extend(utc);
console.log('import.meta.env.DEV----', import.meta.env.DEV);
// 在开发环境强制使用中文
if (import.meta.env.DEV) {
  dayjs.locale('zh-cn');
}
/**
 * 格式化日期字符串或时间戳。
 * 如果没有提供模板，则默认为相对时间（例如："3天前"）。
 *
 * @param {string | number | Date} date - 输入日期（时间戳，ISO 8601字符串等）
 * @param {string} [template] - 可选的格式模板（例如：'YYYY-MM-DD HH:mm:ss'）
 * @returns {string} 格式化后的日期字符串。
 */
export const dateFormat = (date?: string | number | Date, template?: string): string => {
  const d = date ? dayjs(date) : dayjs();

  if (!d.isValid()) {
    return 'Invalid Date';
  }

  if (template) {
    return d.format(template);
  }

  return d.fromNow();
};
