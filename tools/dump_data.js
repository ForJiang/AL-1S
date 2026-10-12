#!/usr/bin/env node
/* 把 data.js 加载后导出为 JSON，供 python 门禁检查。用法: node tools/dump_data.js [out.json] */
const fs = require('fs');
const path = require('path');
global.window = {};
global.document = { createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), documentElement: { style: {} }, addEventListener() {} };
global.navigator = { language: 'zh-CN' };
global.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
const dataPath = path.join(__dirname, '..', 'assets', 'js', 'data.js');
const outPath = process.argv[2] || path.join(__dirname, 'data-dump.json');
try {
  require(dataPath);
} catch (e) {
  console.error('data.js load error:', e.message);
  process.exit(2);
}
const data = global.window.AL1S;
if (!data) { console.error('window.AL1S missing'); process.exit(2); }
fs.writeFileSync(outPath, JSON.stringify(data, null, 1));
const langs = global.window.AL1S_LANGS || [];
console.log(`dumped ${outPath}: top keys=${Object.keys(data).length}, langs=${langs.join(',')}`);
