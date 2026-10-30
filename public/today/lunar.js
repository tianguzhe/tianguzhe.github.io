/**
 * 离线农历转换，支持公历 2026-01-01 至 2029-12-31。
 * 与 index.html 放在同一目录即可使用，无网络请求、无第三方依赖。
 * 调用 Lunar.fromSolar(年, 月, 日)，月份为 1—12，参数为北京时间的民用日期。
 * 无效日期、超出数据范围时返回 null。
 *
 * 年度编码：低 4 位表示闰月；第 4—15 位表示十二个月的大小月；
 * 第 16 位表示闰月大小。大月 30 天，小月 29 天。
 * 2025 年是边界数据，用于转换公历 2026 年初、春节前的日期。
 */
(function () {
  'use strict';

  const DAY_MS = 86400000;
  const FIRST_LUNAR_YEAR = 2025;
  const BASE_DAY = Date.UTC(2025, 0, 29) / DAY_MS; // 农历 2025 年正月初一。
  const START_DAY = Date.UTC(2026, 0, 1) / DAY_MS;
  const END_DAY = Date.UTC(2029, 11, 31) / DAY_MS;
  const YEAR_DATA = Object.freeze([
    0x0a6e6, // 2025：闰六月（用于公历年初的边界转换）。
    0x0a4e0, // 2026。
    0x0d260, // 2027。
    0x0ea65, // 2028：闰五月。
    0x0d530  // 2029。
  ]);
  const MONTH_NAMES = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
  const DAY_NAMES = [
    '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
  ];

  // Build month boundaries once using UTC solely for date arithmetic.
  // The caller supplies Beijing civil dates, so the computer's timezone has no effect.
  const months = [];
  let nextStart = BASE_DAY;
  YEAR_DATA.forEach((code, index) => {
    const year = FIRST_LUNAR_YEAR + index;
    const leapMonth = code & 0x0f;
    for (let month = 1; month <= 12; month++) {
      const days = code & (0x10000 >> month) ? 30 : 29;
      months.push({ year, month, isLeap: false, start: nextStart, days });
      nextStart += days;
      if (month === leapMonth) {
        const leapDays = code & 0x10000 ? 30 : 29;
        months.push({ year, month, isLeap: true, start: nextStart, days: leapDays });
        nextStart += leapDays;
      }
    }
  });

  function fromSolar(year, month, day) {
    if (![year, month, day].every(Number.isInteger)) return null;
    if (year < 2026 || year > 2029 || month < 1 || month > 12 || day < 1 || day > 31) return null;
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
    const solarDay = date.getTime() / DAY_MS;
    if (solarDay < START_DAY || solarDay > END_DAY) return null;

    let low = 0;
    let high = months.length - 1;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      if (months[middle].start <= solarDay) low = middle;
      else high = middle - 1;
    }
    const lunarMonth = months[low];
    const lunarDay = solarDay - lunarMonth.start + 1;
    if (lunarDay < 1 || lunarDay > lunarMonth.days) return null;
    const monthName = `${lunarMonth.isLeap ? '闰' : ''}${MONTH_NAMES[lunarMonth.month - 1]}`;
    const dayName = DAY_NAMES[lunarDay - 1];
    return {
      year: lunarMonth.year,
      month: lunarMonth.month,
      day: lunarDay,
      isLeap: lunarMonth.isLeap,
      monthName,
      dayName,
      text: `农历${monthName}${dayName}`
    };
  }

  window.Lunar = Object.freeze({ startYear: 2026, endYear: 2029, fromSolar });
}());
