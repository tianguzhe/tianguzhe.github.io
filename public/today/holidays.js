/**
 * 假期数据：与 index.html 放在同一目录，直接打开 HTML 即可加载。
 * 后续只需修改本文件，并刷新日历；不需要修改 HTML。
 *
 * 更新方法：在 years 中新增或替换对应年份。
 * confirmed: true  = 已公布的完整放假、调休安排。
 * confirmed: false = 仅标注法定当日，连休和调休仍待公布。
 * holidays: 放假区间，start / end 均包含在内，格式为 YYYY-MM-DD。
 * workdays: 调休上班日期，优先于节假日和大小周规则。
 * sources: 参考通知链接，可随年份一起更新。
 * 正式安排公布后，将对应年份的 confirmed 改为 true，
 * 用完整放假区间替换 holidays，并填写 workdays。
 */
window.CALENDAR_HOLIDAY_DATA = {
  version: 1,
  years: {
    2026: {
      confirmed: true,
      // 国办发明电〔2025〕7号，2025-11-04。
      holidays: [
        { name: '元旦', start: '2026-01-01', end: '2026-01-03' },
        { name: '春节', start: '2026-02-15', end: '2026-02-23' },
        { name: '清明节', start: '2026-04-04', end: '2026-04-06' },
        { name: '劳动节', start: '2026-05-01', end: '2026-05-05' },
        { name: '端午节', start: '2026-06-19', end: '2026-06-21' },
        { name: '中秋节', start: '2026-09-25', end: '2026-09-27' },
        { name: '国庆节', start: '2026-10-01', end: '2026-10-07' }
      ],
      workdays: [
        { date: '2026-01-04', name: '元旦' },
        { date: '2026-02-14', name: '春节' },
        { date: '2026-02-28', name: '春节' },
        { date: '2026-05-09', name: '劳动节' },
        { date: '2026-09-20', name: '国庆节' },
        { date: '2026-10-10', name: '国庆节' }
      ],
      sources: [
        { label: '2026 年放假通知', url: 'https://peking.bjd.com.cn/content/s690a0f11e4b02424b0c2840c.html' }
      ]
    },
    2027: {
      confirmed: true,
      // 国务院办公厅关于2027年部分节假日安排的通知，2026-11-05。
      holidays: [
        { name: '元旦', start: '2027-01-01', end: '2027-01-03' },
        { name: '春节', start: '2027-02-05', end: '2027-02-13' },
        { name: '清明节', start: '2027-04-03', end: '2027-04-05' },
        { name: '劳动节', start: '2027-05-01', end: '2027-05-05' },
        { name: '端午节', start: '2027-06-09', end: '2027-06-09' },
        { name: '中秋节', start: '2027-09-15', end: '2027-09-15' },
        { name: '国庆节', start: '2027-10-01', end: '2027-10-07' }
      ],
      workdays: [
        { date: '2027-01-31', name: '春节' },
        { date: '2027-02-14', name: '春节' },
        { date: '2027-05-08', name: '劳动节' },
        { date: '2027-09-26', name: '国庆节' },
        { date: '2027-10-09', name: '国庆节' }
      ],
      sources: [
        { label: '2027 年放假通知（新华社）', url: 'https://m.sohu.com/a/1097630407_267106' }
      ]
    }
  }
};
