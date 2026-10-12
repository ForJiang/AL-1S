/*!
 * AL-1S · assets/js/main.js
 * 蔚蓝档案「天童爱丽丝」主题粉丝站 —— 全部交互逻辑
 * 纯原生 ES2020 · 无框架 · 无构建 · 单文件 IIFE
 *
 * 数据来源：window.AL1S（assets/js/data.js，由 W4 提供，schema 见 CONTRACT §5）
 * DOM 契约：CONTRACT §3（index.html）；类名规范：CONTRACT §4
 * 模块清单：CONTRACT §6 / 派工单 16 模块，下方按序号分节。
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
   * 0. 通用工具 / 全局状态 / 数据访问（全部防御性）
   * ═══════════════════════════════════════════════════════════ */

  const IMG_BASE = 'assets/img/';

  /** 语言首访推断：localStorage → navigator.language → 默认 zh */
  const LANGS = ['zh', 'ja', 'en'];

  const state = {
    lang: 'zh',
    // stats
    statMax: 80,
    statMin: 1,
    // skills
    skillId: 'ex',
    skillLevel: 1,
    skillMax: 10,
    // weapon
    weaponLevel: '1',
    // voices
    voiceCat: 'all',
    voicePlayingId: null,
    voiceTimer: 0,
    // momotalk
    mtActive: '',
    mtUnread: {},
    mtThreads: {},
    mtTypingTimer: 0,
    // quiz
    quizIdx: 0,
    quizAnswers: [],
    quizDone: false,
    // gacha
    gachaClicks: 0,
    gachaTimer: 0,
    confettiToken: 0,
    // boot
    bootDone: false
  };

  function qs(sel, root) {
    try { return (root || document).querySelector(sel); } catch (e) { return null; }
  }
  function qsa(sel, root) {
    try { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    catch (e) { return []; }
  }
  function ce(tag, cls, text) {
    let n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null && text !== '') n.textContent = String(text);
    return n;
  }
  function img(cls, src, alt) {
    let n = document.createElement('img');
    if (cls) n.className = cls;
    if (src) n.setAttribute('src', src);
    n.setAttribute('alt', alt === undefined ? '' : String(alt));
    return n;
  }
  /** data.js 里的资源名 → 站点相对路径 */
  function asset(name) {
    if (!name) return '';
    let s = String(name);
    if (/^(https?:|data:|#|\/)/.test(s) || s.indexOf('/') !== -1) return s;
    return IMG_BASE + s;
  }
  /** 唯一允许的「内联样式」：CSS 变量 */
  function setVar(node, name, value) {
    if (!node || !node.style || typeof node.style.setProperty !== 'function') return;
    try { node.style.setProperty(name, value); } catch (e) { /* ignore */ }
  }
  /**
   * 显隐控制：hidden 属性 + display 兜底。
   * W1 的 CSS 给 #voice-now / .mt-typing / .quiz-box / .quiz-result / #boot 等
   * 写了显式 display，会覆盖 UA 的 [hidden]{display:none}，故必须双保险。
   * （协调项：W1 若在 base.css 加 [hidden]{display:none!important}，可去掉兜底）
   */
  function setVisible(el, visible) {
    if (!el) return;
    try { el.hidden = !visible; } catch (e) { /* ignore */ }
    try { el.style.display = visible ? '' : 'none'; } catch (e) { /* ignore */ }
  }
  function clampText(str, n) {
    const t = String(str === undefined || str === null ? '' : str);
    return t.length > n ? t.slice(0, n) + '…' : t;
  }
  function getPath(obj, path) {
    if (!obj || !path) return undefined;
    let parts = String(path).split('.');
    let cur = obj;
    for (let i = 0; i < parts.length; i++) {
      if (cur === null || typeof cur !== 'object') return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }
  /** data() 永远返回对象，data.js 缺失也不 throw */
  function data() {
    let d = window.AL1S;
    return (d && typeof d === 'object') ? d : {};
  }
  /** 取三语字段：当前语言 → en → zh → 空串 */
  function L(obj) {
    if (obj === undefined || obj === null) return '';
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
    if (typeof obj !== 'object') return '';
    let order = [state.lang, 'en', 'zh'];
    for (let i = 0; i < order.length; i++) {
      let v = obj[order[i]];
      if (v !== undefined && v !== null && v !== '') return v;
    }
    if (Array.isArray(obj)) return obj;
    return '';
  }
  /** 文本型取值（三语对象/数组/标量 → 字符串） */
  function T(v) {
    let r = L(v);
    if (Array.isArray(r)) return r.length ? String(r[0]) : '';
    return r === undefined || r === null ? '' : String(r);
  }
  function num(v) {
    let n = typeof v === 'number' ? v : parseFloat(v);
    return isFinite(n) ? n : null;
  }
  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }
  function reduced() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }
  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { /* 隐私模式 / 禁用存储：静默降级 */ }
    return null;
  }
  function detectLang() {
    let saved = store('al1s-lang');
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    let nav = (navigator && navigator.language) || '';
    if (/^ja/i.test(nav)) return 'ja';
    if (/^zh/i.test(nav)) return 'zh';
    return 'zh';
  }

  /* ═══════════════════════════════════════════════════════════
   * 15. toast（提前定义，其他模块降级提示要用）
   * ═══════════════════════════════════════════════════════════ */
  function showToast(text) {
    let root = qs('#toast-root');
    if (!root || !text) return;
    try {
      let t = ce('div', 'toast', String(text));
      t.setAttribute('role', 'status');
      root.appendChild(t);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { t.classList.add('is-show'); });
      });
      let kill = function () {
        if (t.parentNode) t.parentNode.removeChild(t);
      };
      window.setTimeout(kill, 2400);
      t.addEventListener('click', kill);
    } catch (e) { /* toast 失败不影响主流程 */ }
  }

  /* ═══════════════════════════════════════════════════════════
   * 1. boot —— 启动层逐行日志 + 进度条 + 6s 硬超时兜底
   * ═══════════════════════════════════════════════════════════ */
  function finishBoot() {
    if (state.bootDone) return;
    state.bootDone = true;
    let boot = qs('#boot');
    let bar = qs('#boot-bar');
    let pct = qs('#boot-pct');
    if (bar) setVar(bar, '--pct', '100%');
    if (boot) setVar(boot, '--pct', '100%');
    if (pct) pct.textContent = '100%';
    document.body.classList.remove('booting');
    if (boot) {
      boot.classList.add('is-done');
      boot.setAttribute('aria-hidden', 'true');
      setVisible(boot, false); // hidden + display:none 双保险，确保不挡交互
    }
  }

  function runBoot() {
    let boot = qs('#boot');
    let log = qs('#boot-log');
    let bar = qs('#boot-bar');
    let pct = qs('#boot-pct');
    let ui = data().ui || {};
    let bootUi = ui.boot || {};
    let lines = Array.isArray(bootUi.lines)
      ? bootUi.lines.map(function (x) { return typeof x === 'string' ? x : T(x); })
          .filter(function (x) { return typeof x === 'string' && x.length; })
      : [];

    // 6s 硬超时：任何异常都不能把页面锁在遮罩里
    window.setTimeout(finishBoot, 6000);

    if (!boot || reduced() || lines.length === 0) { finishBoot(); return; }

    let i = 0;
    let step = function () {
      if (i >= lines.length) {
        if (bar) setVar(bar, '--pct', '100%');
        if (boot) setVar(boot, '--pct', '100%');
        if (pct) pct.textContent = '100%';
        window.setTimeout(finishBoot, 400);
        return;
      }
      let line = lines[i];
      let p = Math.round(((i + 1) / lines.length) * 100);
      try {
        if (log) {
          let row = ce('div', 'boot-line', line);
          log.appendChild(row);
        }
      } catch (e) { /* ignore */ }
      if (bar) setVar(bar, '--pct', p + '%');
      if (boot) setVar(boot, '--pct', p + '%');
      if (pct) pct.textContent = p + '%';
      i++;
      window.setTimeout(step, 180 + Math.random() * 140);
    };
    window.setTimeout(step, 120);
  }

  /* ═══════════════════════════════════════════════════════════
   * 2. i18n —— applyLang 全量刷新 + 语言按钮
   * ═══════════════════════════════════════════════════════════ */
  function resolveI18n(d, key) {
    let raw = getPath(d, key);
    if (raw === undefined || raw === null) return '';
    return T(raw);
  }

  function applyLang(lang) {
    let d = data();
    if (LANGS.indexOf(lang) === -1) lang = 'zh';
    state.lang = lang;
    store('al1s-lang', lang);

    let html = document.documentElement;
    if (html) {
      html.setAttribute('lang', lang === 'zh' ? 'zh-CN' : (lang === 'ja' ? 'ja-JP' : 'en'));
    }
    let btnMap = { zh: '#lang-zh', ja: '#lang-ja', en: '#lang-en' };
    Object.keys(btnMap).forEach(function (k) {
      let b = qs(btnMap[k]);
      if (b) b.classList.toggle('is-active', k === lang);
    });

    // 静态文本 / 占位符 / 富文本
    qsa('[data-i18n]').forEach(function (node) {
      let v = resolveI18n(d, node.getAttribute('data-i18n'));
      if (v !== '') node.textContent = v;
    });
    qsa('[data-i18n-ph]').forEach(function (node) {
      let v = resolveI18n(d, node.getAttribute('data-i18n-ph'));
      if (v !== '') node.setAttribute('placeholder', v);
    });
    qsa('[data-i18n-html]').forEach(function (node) {
      let v = resolveI18n(d, node.getAttribute('data-i18n-html'));
      if (v !== '') node.innerHTML = v; // 仅限契约内的安全静态串
    });

    // 动态列表全量重渲染（语音播报中则先停止，避免状态悬空）
    stopVoice();
    renderAll();
  }

  function bindLangButtons() {
    [['#lang-zh', 'zh'], ['#lang-ja', 'ja'], ['#lang-en', 'en']].forEach(function (pair) {
      let b = qs(pair[0]);
      if (!b) return;
      b.addEventListener('click', function () {
        if (state.lang === pair[1]) return;
        applyLang(pair[1]);
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
   * 3. nav —— scrollspy / 汉堡菜单 / 阅读进度
   * ═══════════════════════════════════════════════════════════ */
  const NAV_IDS = ['profile', 'stats', 'skills', 'stories', 'voices', 'momotalk', 'memoria', 'timeline', 'quiz'];
  let navRaf = 0;

  function updateNav() {
    navRaf = 0;
    let y = window.scrollY || window.pageYOffset || 0;
    let vh = window.innerHeight || 800;
    let doc = document.documentElement;
    let max = (doc.scrollHeight || 0) - vh;
    let pct = max > 0 ? clamp((y / max) * 100, 0, 100) : 0;
    const navBar = qs('#nav-progress');
    setVar(navBar, '--pct', pct.toFixed(2) + '%');
    setVar(navBar, '--w', pct.toFixed(2) + '%');

    let line = vh * 0.4;
    let current = '';
    for (let i = 0; i < NAV_IDS.length; i++) {
      let s = document.getElementById(NAV_IDS[i]);
      if (!s) continue;
      if (s.getBoundingClientRect().top <= line) current = NAV_IDS[i];
    }
    if (max > 0 && y >= max - 4) current = NAV_IDS[NAV_IDS.length - 1];
    qsa('.nav-links a[data-nav]').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-nav') === current);
    });
  }
  function onScroll() {
    if (navRaf) return;
    navRaf = requestAnimationFrame(updateNav);
  }
  function closeMobileMenu() {
    let m = qs('#mobile-menu');
    let b = qs('#nav-burger');
    if (m) m.classList.remove('is-open');
    if (b) b.setAttribute('aria-expanded', 'false');
  }
  function bindNav() {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    let burger = qs('#nav-burger');
    if (burger) {
      burger.addEventListener('click', function () {
        let m = qs('#mobile-menu');
        if (!m) return;
        let open = m.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    // 点任意导航链接（页眉/移动菜单/页脚）后关闭移动菜单
    qsa('a[data-nav]').forEach(function (a) {
      a.addEventListener('click', closeMobileMenu);
    });
    let back = qs('#back-top');
    if (back) {
      back.addEventListener('click', function () {
        try {
          window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
        } catch (e) { window.scrollTo(0, 0); }
      });
    }
    updateNav();
  }

  /* ═══════════════════════════════════════════════════════════
   * 4. stats —— 等级滑块 + 档位间线性插值
   * ═══════════════════════════════════════════════════════════ */
  // 字段顺序 + 对应 ui.stats.barLabels.* 字面键（门禁反查用）
  const STAT_FIELDS = [
    { key: 'hp', label: 'ui.stats.barLabels.hp' },
    { key: 'atk', label: 'ui.stats.barLabels.atk' },
    { key: 'def', label: 'ui.stats.barLabels.def' },
    { key: 'heal', label: 'ui.stats.barLabels.heal' },
    { key: 'acc', label: 'ui.stats.barLabels.acc' },
    { key: 'eva', label: 'ui.stats.barLabels.eva' },
    { key: 'crit', label: 'ui.stats.barLabels.crit' },
    { key: 'critDmg', label: 'ui.stats.barLabels.critDmg' }
  ];

  function statLevels() {
    let s = data().stats || {};
    let byLevel = s.byLevel || {};
    let out = [];
    Object.keys(byLevel).forEach(function (k) {
      let n = parseInt(k, 10);
      if (!isNaN(n)) out.push(n);
    });
    if (!out.length && Array.isArray(s.levels)) {
      s.levels.forEach(function (v) { let n = num(v); if (n !== null) out.push(n); });
    }
    out.sort(function (a, b) { return a - b; });
    return out;
  }

  function statFieldMax(levels, byLevel, key) {
    let m = null;
    levels.forEach(function (lv) {
      let row = byLevel[String(lv)];
      let v = row ? num(row[key]) : null;
      if (v !== null && (m === null || v > m)) m = v;
    });
    return m;
  }

  /** 线性插值：在相邻档位之间按比例计算 */
  function statAt(level) {
    let s = data().stats || {};
    let byLevel = s.byLevel || {};
    let levels = statLevels();
    if (!levels.length) return null;
    let lv = clamp(Math.round(level), levels[0], levels[levels.length - 1]);
    let exact = byLevel[String(lv)];
    if (exact) return exact;
    let lo = null, hi = null;
    for (let i = 0; i < levels.length; i++) {
      if (levels[i] <= lv) lo = levels[i];
      if (levels[i] >= lv && hi === null) hi = levels[i];
    }
    if (lo === null) lo = levels[0];
    if (hi === null) hi = levels[levels.length - 1];
    let a = byLevel[String(lo)] || {};
    let b = byLevel[String(hi)] || {};
    let t = hi === lo ? 0 : (lv - lo) / (hi - lo);
    let out = {};
    STAT_FIELDS.forEach(function (f) {
      let va = num(a[f.key]);
      let vb = num(b[f.key]);
      if (va === null && vb === null) { out[f.key] = null; return; }
      if (va === null) { out[f.key] = vb; return; }
      if (vb === null) { out[f.key] = va; return; }
      let r = va + (vb - va) * t;
      out[f.key] = (Number.isInteger(va) && Number.isInteger(vb)) ? Math.round(r) : Math.round(r * 100) / 100;
    });
    if (a.cost !== undefined) out.cost = a.cost;
    return out;
  }

  function renderStats() {
    let d = data();
    let levels = statLevels();
    let slider = qs('#stat-level');
    let valOut = qs('#stat-level-val');
    let bars = qs('#stat-bars');
    let grid = qs('#stat-grid');
    let formula = qs('#stat-formula');

    if (!levels.length) {
      // 数据缺失降级：隐藏控件区，给可见空态
      if (slider) slider.disabled = true;
      if (valOut) valOut.textContent = '—';
      if (bars) bars.textContent = '';
      if (grid) grid.textContent = '';
      if (formula) formula.textContent = '—';
      return;
    }
    state.statMin = levels[0];
    state.statMax = levels[levels.length - 1];
    if (slider) {
      slider.disabled = false;
      slider.min = String(state.statMin);
      slider.max = String(state.statMax);
      slider.step = '1';
      let cur = clamp(num(slider.value) === null ? state.statMin : num(slider.value), state.statMin, state.statMax);
      state.statLevel = cur;
      slider.value = String(cur);
    }
    let row = statAt(state.statLevel) || {};
    let byLevel = (d.stats && d.stats.byLevel) || {};

    if (valOut) valOut.textContent = 'Lv.' + state.statLevel;

    if (bars) {
      bars.textContent = '';
      STAT_FIELDS.forEach(function (f) {
        let v = num(row[f.key]);
        let mx = statFieldMax(levels, byLevel, f.key);
        let w = (v !== null && mx !== null && mx > 0) ? clamp((v / mx) * 100, 0, 100) : 0;
        let label = T(getPath(d, f.label)) || f.key;
        let r = ce('div', 'stat-row');
        r.appendChild(ce('span', 'stat-row-label', label));
        let meter = ce('div', 'ba-meter');
        let fill = ce('div', 'ba-meter-fill');
        setVar(fill, '--w', w.toFixed(2) + '%');
        meter.appendChild(fill);
        r.appendChild(meter);
        r.appendChild(ce('span', 'stat-row-val', v === null ? '—' : String(v)));
        bars.appendChild(r);
      });
    }
    if (grid) {
      grid.textContent = '';
      STAT_FIELDS.forEach(function (f) {
        let v = num(row[f.key]);
        let cell = ce('div', 'stat-cell');
        cell.appendChild(ce('span', 'stat-cell-label', T(getPath(d, f.label)) || f.key));
        cell.appendChild(ce('strong', 'stat-cell-val', v === null ? '—' : String(v)));
        grid.appendChild(cell);
      });
    }
    if (formula) {
      let f = d.stats ? d.stats.formulas : null;
      formula.textContent = '';
      if (typeof f === 'string' && f.trim()) {
        formula.textContent = f;
      } else if (f && typeof f === 'object') {
        let keys = Object.keys(f);
        if (!keys.length) {
          formula.textContent = '—';
        } else {
          keys.forEach(function (k, idx) {
            if (idx) formula.appendChild(document.createTextNode('  ·  '));
            let b = ce('b', 'stat-formula-k', T(getPath(d, 'ui.stats.barLabels.' + k)) || k);
            formula.appendChild(b);
            formula.appendChild(document.createTextNode(' ' + T(f[k])));
          });
        }
      } else {
        formula.textContent = '—';
      }
    }
  }

  function bindStats() {
    let slider = qs('#stat-level');
    if (!slider) return;
    let evt = ('oninput' in slider) ? 'input' : 'change';
    slider.addEventListener(evt, function () {
      let v = num(slider.value);
      if (v === null) return;
      state.statLevel = clamp(Math.round(v), state.statMin, state.statMax);
      renderStats(); // 即时刷新，不依赖过渡动画
    });
  }

  /* ═══════════════════════════════════════════════════════════
   * 5. skills —— 四技能页签 + 技能等级数值表
   * ═══════════════════════════════════════════════════════════ */
  const SKILL_ORDER = ['ex', 'basic', 'enhanced', 'sub'];
  const SKILL_TAB_KEY = {
    ex: 'ui.skills.tabEX',
    basic: 'ui.skills.tabBasic',
    enhanced: 'ui.skills.tabEnhanced',
    sub: 'ui.skills.tabSub'
  };

  function skillList() {
    let arr = data().skills;
    return Array.isArray(arr) ? arr.filter(function (s) { return s && typeof s === 'object'; }) : [];
  }
  function currentSkill() {
    let list = skillList();
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === state.skillId) return list[i];
    }
    return list[0] || null;
  }
  /** valueLabels 与 values 行字段配对（数组或对象两种 schema 都支持） */
  function flattenRow(row, prefix, out) {
    out = out || [];
    prefix = prefix || '';
    if (row && typeof row === 'object' && !Array.isArray(row)) {
      let keys = Object.keys(row);
      if (!keys.length && prefix) out.push({ path: prefix, value: row });
      keys.forEach(function (k) {
        flattenRow(row[k], prefix ? prefix + '.' + k : k, out);
      });
    } else if (prefix) {
      out.push({ path: prefix, value: row });
    }
    return out;
  }
  function labelPairs(labelsObj, rowObj) {
    let leaves = flattenRow(rowObj);
    let labels = L(labelsObj);
    return leaves.map(function (leaf, i) {
      let lab;
      if (Array.isArray(labels)) lab = labels[i];
      else if (labels && typeof labels === 'object') lab = labels[leaf.path];
      return [leaf.path, (lab === undefined || lab === null || lab === '') ? leaf.path : String(lab)];
    });
  }
  function skillValueRow(skill, level) {
    let values = (skill && skill.values) || {};
    let nums = [];
    Object.keys(values).forEach(function (k) {
      let n = parseInt(k, 10);
      if (!isNaN(n)) nums.push(n);
    });
    nums.sort(function (a, b) { return a - b; });
    let maxNum = nums.length ? nums[nums.length - 1] : 10;
    let atMax = false;
    let row = null;
    if (level <= maxNum) {
      row = values[String(level)];
      if (!row) {
        for (let i = nums.length - 1; i >= 0; i--) {
          if (nums[i] <= level && values[String(nums[i])]) { row = values[String(nums[i])]; break; }
        }
      }
      if (!row) { row = values['max'] || null; atMax = !!values['max']; }
    } else {
      row = values['max'] || values[String(maxNum)] || null;
      atMax = true;
    }
    return { row: row, max: maxNum, atMax: atMax };
  }

  function renderSkills() {
    let d = data();
    let tabs = qs('#skill-tabs');
    let list = skillList();

    // 页签（按 data.skills 重建，保证与数据一致且语言可刷新）
    if (tabs) {
      tabs.textContent = '';
      if (!list.length) {
        tabs.appendChild(ce('span', 'ba-tabs-empty', '—'));
      } else {
        list.forEach(function (s, i) {
          let id = (typeof s.id === 'string' && s.id) ? s.id : (SKILL_ORDER[i] || ('skill' + i));
          let key = SKILL_TAB_KEY[id];
          let label = key ? T(getPath(d, key)) : '';
          if (!label) label = T(s.name) || (s.slot ? String(s.slot) : id);
          let b = ce('button', 'ba-tab', label);
          b.type = 'button';
          b.setAttribute('role', 'tab');
          b.setAttribute('data-skill', id);
          if (id === state.skillId) b.classList.add('is-active');
          tabs.appendChild(b);
        });
      }
    }
    // 修正当前选中项（数据里没有时回落第一项）
    let cur = currentSkill();
    if (cur && typeof cur.id === 'string' && cur.id) state.skillId = cur.id;
    else if (list.length) state.skillId = (typeof list[0].id === 'string' && list[0].id) ? list[0].id : (SKILL_ORDER[0] || 'ex');

    let icon = qs('#skill-icon');
    let nameEl = qs('#skill-name');
    let costEl = qs('#skill-cost');
    let descEl = qs('#skill-desc');
    let slider = qs('#skill-level');
    let valOut = qs('#skill-level-val');
    let table = qs('#skill-values');

    if (!cur) {
      if (icon) icon.setAttribute('src', asset('icon-skill-ex.svg'));
      if (nameEl) nameEl.textContent = '—';
      if (costEl) costEl.textContent = '';
      if (descEl) descEl.textContent = '';
      if (slider) slider.disabled = true;
      if (valOut) valOut.textContent = '—';
      if (table) table.textContent = '';
      return;
    }

    if (icon) {
      let src = asset(cur.icon);
      if (src) icon.setAttribute('src', src);
    }
    if (nameEl) nameEl.textContent = T(cur.name) || '—';
    if (costEl) {
      let costLabel = T(getPath(d, 'ui.skills.costLabel')) || 'COST';
      let c = num(cur.cost);
      costEl.textContent = c === null ? (costLabel + ' · —') : (costLabel + ' · ' + c);
    }
    if (descEl) descEl.textContent = T(cur.desc);

    let probe = skillValueRow(cur, 1);
    // 滑块 1..10（CONTRACT §6）；数据里若有更高档位则放宽上限
    let maxLv = probe.max;
    // 数据仅有 'max' 兜底档（无数字档）时放宽到 10，让滑块可用
    if (maxLv < 10 && cur.values && cur.values['max']) maxLv = 10;
    if (maxLv < 1) maxLv = 1;
    state.skillMax = maxLv;
    if (slider) {
      slider.disabled = false;
      slider.min = '1';
      slider.max = String(maxLv);
      slider.step = '1';
      let v = clamp(num(slider.value) === null ? 1 : num(slider.value), 1, maxLv);
      state.skillLevel = Math.round(v);
      slider.value = String(state.skillLevel);
    }
    if (valOut) valOut.textContent = 'Lv.' + state.skillLevel;

      if (table) {
        table.textContent = '';
        let res = skillValueRow(cur, state.skillLevel);
        let row = res.row;
        if (!row || typeof row !== 'object') {
          table.appendChild(ce('caption', 'skill-values-empty', '—'));
        } else {
          let pairs = labelPairs(cur.valueLabels, row);
          let thead = ce('thead', 'skill-values-head');
          let htr = ce('tr');
          pairs.forEach(function (p) { htr.appendChild(ce('th', null, p[1])); });
          thead.appendChild(htr);
          table.appendChild(thead);
          let tbody = ce('tbody', 'skill-values-body');
          let tr = ce('tr');
          pairs.forEach(function (p) {
            let cell = num(getPath(row, p[0]));
            tr.appendChild(ce('td', 'skill-values-num', cell === null ? '—' : String(cell)));
          });
          tbody.appendChild(tr);
          table.appendChild(tbody);
          if (res.atMax && state.skillLevel > res.max) {
            let note = ce('p', 'skill-values-note', (T(getPath(d, 'ui.skills.maxLabel')) || 'MAX') + ' · Lv.' + state.skillLevel);
            table.appendChild(note);
          }
        }
      }
  }

  function bindSkills() {
    let tabs = qs('#skill-tabs');
    if (tabs) {
      tabs.addEventListener('click', function (e) {
        let btn = e.target && e.target.closest ? e.target.closest('[data-skill]') : null;
        if (!btn || !tabs.contains(btn)) return;
        let id = btn.getAttribute('data-skill');
        if (!id || id === state.skillId) return;
        state.skillId = id;
        state.skillLevel = 1;
        let slider = qs('#skill-level');
        if (slider) slider.value = '1';
        renderSkills();
      });
    }
    let slider = qs('#skill-level');
    if (slider) {
      let evt = ('oninput' in slider) ? 'input' : 'change';
      slider.addEventListener(evt, function () {
        let v = num(slider.value);
        if (v === null) return;
        state.skillLevel = clamp(Math.round(v), 1, state.skillMax);
        renderSkills();
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
   * 6. weapon —— 专属武器（1 / MAX 两档按钮）
   * ═══════════════════════════════════════════════════════════ */
  function renderWeapon() {
    let d = data();
    let w = d.weapon;
    let nameEl = qs('#weapon-name');
    let descEl = qs('#weapon-desc');
    let icon = qs('#weapon-icon');
    let statsBox = qs('#weapon-stats');
    let skName = qs('#weapon-skill-name');
    let skDesc = qs('#weapon-skill-desc');

    if (!w || typeof w !== 'object') {
      if (nameEl) nameEl.textContent = '—';
      if (descEl) descEl.textContent = '';
      if (statsBox) statsBox.textContent = '';
      if (skName) skName.textContent = '—';
      if (skDesc) skDesc.textContent = '';
      return;
    }
    if (nameEl) nameEl.textContent = T(w.name) || '—';
    if (descEl) descEl.textContent = T(w.desc);
    if (icon) { let s = asset(w.icon); if (s) icon.setAttribute('src', s); }

    let lv = state.weaponLevel === 'max' ? 'max' : '1';
    let rows = w.stats || {};
    let row = rows[lv] || rows['1'] || rows['max'] || null;
    if (statsBox) {
      statsBox.textContent = '';
      if (!row || typeof row !== 'object') {
        statsBox.appendChild(ce('p', 'weapon-stats-empty', '—'));
      } else {
        labelPairs(w.statLabels, row).forEach(function (p) {
          let cell = num(getPath(row, p[0]));
          let box = ce('div', 'weapon-stat');
          box.appendChild(ce('span', 'weapon-stat-label', p[1]));
          box.appendChild(ce('strong', 'weapon-stat-val', cell === null ? '—' : String(cell)));
          statsBox.appendChild(box);
        });
      }
    }
    let sk = w.skill || {};
    if (skName) skName.textContent = T(sk.name) || '—';
    if (skDesc) skDesc.textContent = T(sk.desc);
  }

  function bindWeapon() {
    let box = qs('#weapon-levels');
    if (!box) return;
    box.addEventListener('click', function (e) {
      let btn = e.target && e.target.closest ? e.target.closest('[data-wlv]') : null;
      if (!btn || !box.contains(btn)) return;
      let lv = btn.getAttribute('data-wlv') === 'max' ? 'max' : '1';
      if (lv === state.weaponLevel) return;
      state.weaponLevel = lv;
      qsa('[data-wlv]', box).forEach(function (b) {
        b.classList.toggle('is-active', (b.getAttribute('data-wlv') === 'max' ? 'max' : '1') === lv);
      });
      renderWeapon();
    });
  }

  /* ═══════════════════════════════════════════════════════════
   * 7. stories —— 羁绊故事手风琴
   * ═══════════════════════════════════════════════════════════ */
  function renderStories() {
    let d = data();
    let list = qs('#story-list');
    let empty = qs('#story-empty');
    let stories = Array.isArray(d.stories)
      ? d.stories.filter(function (s) { return s && typeof s === 'object'; })
      : [];

    setVisible(empty, stories.length === 0);
    if (!list) return;
    list.textContent = '';
    stories.forEach(function (s, i) {
      let isOfficial = s.source === 'official';
      let item = ce('div', 'ba-acc-item');
      let head = ce('button', 'ba-acc-head');
      head.type = 'button';
      head.setAttribute('aria-expanded', 'false');
      head.setAttribute('aria-controls', 'story-body-' + i);
      let idx = ce('span', 'story-num', String(i + 1).padStart(2, '0'));
      let title = ce('span', 'story-title', T(s.title) || '—');
      let tag = ce('span', 'story-src ba-tag',
        T(getPath(d, isOfficial ? 'ui.stories.officialTag' : 'ui.stories.summaryTag')) || (isOfficial ? 'OFFICIAL' : 'SUMMARY'));
      head.appendChild(idx);
      head.appendChild(title);
      head.appendChild(tag);
      let body = ce('div', 'ba-acc-body');
      body.id = 'story-body-' + i;
      let inner = ce('div', 'ba-acc-body-inner');
      let text = T(s.body);
      if (text) {
        text.split(/\n\n+/).forEach(function (para) {
          if (para.trim()) inner.appendChild(ce('p', null, para.trim()));
        });
      } else {
        inner.appendChild(ce('p', null, '—'));
      }
      body.appendChild(inner);
      item.appendChild(head);
      item.appendChild(body);
      list.appendChild(item);
    });
  }

  function bindStories() {
    let list = qs('#story-list');
    if (!list) return;
    list.addEventListener('click', function (e) {
      let head = e.target && e.target.closest ? e.target.closest('.ba-acc-head') : null;
      if (!head || !list.contains(head)) return;
      let item = head.closest('.ba-acc-item');
      if (!item) return;
      let open = item.classList.toggle('is-open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      let d = data();
      head.title = T(getPath(d, open ? 'ui.stories.closeHint' : 'ui.stories.openHint'));
    });
  }

  /* ═══════════════════════════════════════════════════════════
   * 8. voices —— 语音分类过滤 + speechSynthesis 朗读
   * ═══════════════════════════════════════════════════════════ */
  const VOICE_CATS = ['login', 'battle', 'interact', 'idle', 'gacha', 'other'];
  const VOICE_CAT_KEY = {
    login: 'ui.voices.catNames.login',
    battle: 'ui.voices.catNames.battle',
    interact: 'ui.voices.catNames.interact',
    idle: 'ui.voices.catNames.idle',
    gacha: 'ui.voices.catNames.gacha',
    other: 'ui.voices.catNames.other'
  };
  const VOICE_ALL_LABEL = { zh: '全部', ja: 'すべて', en: 'ALL' };

  function voiceList() {
    let arr = data().voices;
    return Array.isArray(arr) ? arr.filter(function (v) { return v && typeof v === 'object'; }) : [];
  }
  function ttsOk() {
    return typeof window.speechSynthesis !== 'undefined' &&
      typeof window.SpeechSynthesisUtterance !== 'undefined';
  }
  function stopVoice() {
    if (state.voiceTimer) { window.clearTimeout(state.voiceTimer); state.voiceTimer = 0; }
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    state.voicePlayingId = null;
    setVisible(qs('#voice-now'), false);
    qsa('.v-item.is-playing').forEach(function (n) { n.classList.remove('is-playing'); });
  }
  function findVoice(id) {
    let list = voiceList();
    for (let i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; }
    return null;
  }
  function playVoice(id) {
    let v = findVoice(id);
    if (!v) return;
    let jp = T(v.jp);
    if (!jp) { showToast(T(getPath(data(), 'ui.voices.ttsHint')) || 'TTS unavailable'); return; }
    if (!ttsOk()) {
      // 特性检测降级：可见提示，不静默失败
      showToast(T(getPath(data(), 'ui.voices.ttsHint')) || '当前浏览器不支持语音合成');
      return;
    }
    try { window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    if (state.voiceTimer) { window.clearTimeout(state.voiceTimer); state.voiceTimer = 0; }

    let u = new window.SpeechSynthesisUtterance(jp);
    u.lang = 'ja-JP';
    u.rate = 0.95;
    u.pitch = 1;
    let done = function () {
      if (state.voiceTimer) { window.clearTimeout(state.voiceTimer); state.voiceTimer = 0; }
      state.voicePlayingId = null;
      let node = qs('.v-item[data-voice="' + id + '"]');
      if (node) node.classList.remove('is-playing');
      let now = qs('#voice-now');
      setVisible(now, false);
    };
    u.onstart = function () {
      state.voicePlayingId = id;
      let node = qs('.v-item[data-voice="' + id + '"]');
      if (node) node.classList.add('is-playing');
      let now = qs('#voice-now');
      let txt = qs('#voice-now-text');
      if (txt) txt.textContent = jp;
      setVisible(now, true);
    };
    u.onend = done;
    u.onerror = done;
    // 某些浏览器不触发 onend：兜底计时器
    state.voiceTimer = window.setTimeout(done, Math.min(30000, 2500 + jp.length * 320));
    try { window.speechSynthesis.speak(u); } catch (e) { done(); }
  }

  function renderVoices() {
    let d = data();
    let tabs = qs('#voice-tabs');
    let listBox = qs('#voice-list');
    let all = voiceList();

    // 分类页签：all + 数据中实际出现的分类
    let cats = ['all'];
    VOICE_CATS.forEach(function (c) {
      for (let i = 0; i < all.length; i++) { if (all[i].cat === c) { cats.push(c); break; } }
    });
    if (cats.indexOf(state.voiceCat) === -1) state.voiceCat = 'all';

    if (tabs) {
      tabs.textContent = '';
      cats.forEach(function (c) {
        let label = c === 'all' ? (VOICE_ALL_LABEL[state.lang] || 'ALL') : T(getPath(d, VOICE_CAT_KEY[c]));
        if (!label) label = c.toUpperCase();
        let b = ce('button', 'ba-tab', label);
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.setAttribute('data-vcat', c);
        if (c === state.voiceCat) b.classList.add('is-active');
        tabs.appendChild(b);
      });
    }
    if (!listBox) return;
    listBox.textContent = '';
    let shown = all.filter(function (v) { return state.voiceCat === 'all' || v.cat === state.voiceCat; });
    if (!shown.length) {
      // voices 无专用空态键，回落 ui.stories.empty
      listBox.appendChild(ce('p', 'voice-empty', T(getPath(d, 'ui.stories.empty')) || '—'));
      return;
    }
    shown.forEach(function (v) {
      let b = ce('button', 'v-item voice-item');
      b.type = 'button';
      b.setAttribute('data-voice', String(v.id));
      if (String(v.id) === String(state.voicePlayingId)) b.classList.add('is-playing');
      b.appendChild(ce('span', 'v-jp', T(v.jp) || '—'));
      let play = ce('span', 'v-play');
      play.setAttribute('aria-hidden', 'true');
      b.appendChild(play);
      b.appendChild(ce('span', 'v-zh', T(v.zh) || '—'));
      let wave = ce('span', 'v-wave');
      wave.setAttribute('aria-hidden', 'true');
      for (let k = 0; k < 4; k++) wave.appendChild(ce('span'));
      b.appendChild(wave);
      b.appendChild(ce('span', 'v-en', T(v.en) || '—'));
      let note = T(v.note);
      if (note) b.appendChild(ce('span', 'v-note', note));
      listBox.appendChild(b);
    });
  }
  // voices 空态文案（ui 里无专用键，回落 ui.stories.empty，见上）

  function bindVoices() {
    let tabs = qs('#voice-tabs');
    if (tabs) {
      tabs.addEventListener('click', function (e) {
        let btn = e.target && e.target.closest ? e.target.closest('[data-vcat]') : null;
        if (!btn || !tabs.contains(btn)) return;
        let c = btn.getAttribute('data-vcat');
        if (!c || c === state.voiceCat) return;
        state.voiceCat = c;
        stopVoice();
        renderVoices();
      });
    }
    let listBox = qs('#voice-list');
    if (listBox) {
      listBox.addEventListener('click', function (e) {
        let btn = e.target && e.target.closest ? e.target.closest('[data-voice]') : null;
        if (!btn || !listBox.contains(btn)) return;
        playVoice(btn.getAttribute('data-voice'));
      });
    }
    let stop = qs('#voice-stop');
    if (stop) stop.addEventListener('click', stopVoice);
  }

  /* ═══════════════════════════════════════════════════════════
   * 9. momotalk —— 联系人 / 线程 / 发送 / 自动回复
   * ═══════════════════════════════════════════════════════════ */
  const MT_ELLIPSIS = { zh: '……', ja: '……', en: '…' };

  function mtData() {
    let m = data().momotalk;
    return (m && typeof m === 'object') ? m : {};
  }
  function mtContacts() {
    let arr = mtData().contacts;
    return Array.isArray(arr) ? arr.filter(function (c) { return c && typeof c === 'object'; }) : [];
  }
  function mtThreadOf(id) {
    if (!state.mtThreads[id]) return [];
    return state.mtThreads[id];
  }
  function mtLastText(thread) {
    for (let i = thread.length - 1; i >= 0; i--) {
      let t = T(thread[i].text);
      if (t) return t;
    }
    return '';
  }
  function mtNow() {
    let d = new Date();
    let h = String(d.getHours()).padStart(2, '0');
    let m = String(d.getMinutes()).padStart(2, '0');
    return h + ':' + m;
  }
  function mtScrollBottom() {
    let chat = qs('#mt-chat');
    if (chat) chat.scrollTop = chat.scrollHeight;
  }
  function mtInitThreads() {
    let threads = mtData().threads || {};
    state.mtThreads = {};
    Object.keys(threads).forEach(function (id) {
      let arr = Array.isArray(threads[id]) ? threads[id] : [];
      state.mtThreads[id] = arr.filter(function (m) { return m && typeof m === 'object'; })
        .map(function (m) { return { from: m.from === 'out' ? 'out' : 'in', text: m.text, time: m.time }; });
    });
    let cs = mtContacts();
    state.mtUnread = {};
    let firstId = cs.length ? String(cs[0].id) : '';
    cs.forEach(function (c) {
      let id = String(c.id);
      state.mtUnread[id] = (id !== 'alice' && id !== firstId) ? 1 : 0;
    });
    state.mtActive = firstId;
  }
  function renderMomotalk() {
    let d = data();
    let box = qs('#mt-contacts');
    let contacts = mtContacts();
    if (!box) return;
    box.textContent = '';
    if (!contacts.length) {
      box.appendChild(ce('p', 'mt-contacts-empty', '—'));
      return;
    }
    if (!state.mtActive || !state.mtThreads[state.mtActive]) state.mtActive = String(contacts[0].id);
    contacts.forEach(function (c) {
      let id = String(c.id);
      let thread = mtThreadOf(id);
      let unread = state.mtUnread[id] || 0;
      let b = ce('button', 'mt-contact');
      b.type = 'button';
      b.setAttribute('data-mt', id);
      if (id === state.mtActive) b.classList.add('is-active');
      b.appendChild(img('mt-avatar', asset(c.avatar), ''));
      // .mt-contact 是 44px / 1fr / auto 三列网格：头像 + 文本块 + 未读点
      let nameBox = ce('span', 'mt-contact-name', T(c.name) || id);
      nameBox.appendChild(ce('span', 'mt-contact-summary', clampText(mtLastText(thread) || '—', 24)));
      b.appendChild(nameBox);
      if (unread > 0) {
        // .mt-unread 是 10px 圆点（CSS 无文字空间），未读数放 title/aria
        let badge = ce('span', 'mt-unread');
        badge.setAttribute('aria-label', 'unread ' + unread);
        badge.setAttribute('title', String(unread));
        b.appendChild(badge);
      }
      box.appendChild(b);
    });
    renderMtChat();
  }
  function renderMtChat() {
    let chat = qs('#mt-chat');
    let avatar = qs('#mt-avatar');
    let nameEl = qs('#mt-name');
    let statusEl = qs('#mt-status');
    let contacts = mtContacts();
    let cur = null;
    for (let i = 0; i < contacts.length; i++) {
      if (String(contacts[i].id) === state.mtActive) { cur = contacts[i]; break; }
    }
    if (!cur) {
      if (chat) chat.textContent = '';
      return;
    }
    let av = asset(cur.avatar);
    if (avatar && av) avatar.setAttribute('src', av);
    if (nameEl) nameEl.textContent = T(cur.name) || '';
    if (statusEl) statusEl.textContent = T(cur.status) || '';
    if (!chat) return;
    chat.textContent = '';
    let thread = mtThreadOf(String(cur.id));
    if (!thread.length) {
      chat.appendChild(ce('p', 'mt-empty', MT_ELLIPSIS[state.lang] || '…'));
      return;
    }
    thread.forEach(function (m) {
      let out = m.from === 'out';
      let row = ce('div', 'mt-msg ' + (out ? 'mt-msg--out' : 'mt-msg--in'));
      row.appendChild(ce('div', 'mt-bubble', T(m.text) || ''));
      row.appendChild(ce('span', 'mt-time', m.time ? String(m.time) : ''));
      chat.appendChild(row);
    });
    mtScrollBottom();
  }
  function mtAppend(id, msg) {
    if (!state.mtThreads[id]) state.mtThreads[id] = [];
    state.mtThreads[id].push(msg);
    // 联系人摘要 + 消息流整体重渲染（语言切换同理）
    renderMomotalk();
  }
  function mtSend() {
    let input = qs('#mt-input');
    let sendBtn = qs('#mt-send');
    let typing = qs('#mt-typing');
    if (!input || !state.mtActive) return;
    let text = String(input.value || '').trim();
    if (!text) {
      // 空输入：按钮保持 disabled + toast 可见提示
      if (sendBtn) sendBtn.disabled = true;
      showToast(T(getPath(data(), 'ui.momotalk.inputPlaceholder')) || '…');
      return;
    }
    let id = state.mtActive;
    input.value = '';
    if (sendBtn) sendBtn.disabled = true;
    mtAppend(id, { from: 'out', text: { zh: text, ja: text, en: text }, time: mtNow() });
    setVisible(typing, true);
    if (state.mtTypingTimer) window.clearTimeout(state.mtTypingTimer);
    let delay = 800 + Math.random() * 800;
    state.mtTypingTimer = window.setTimeout(function () {
      state.mtTypingTimer = 0;
      setVisible(typing, false);
      let replies = mtData().replies;
      let pool = Array.isArray(replies) ? replies.filter(function (r) { return r !== null && r !== undefined; }) : [];
      let pick = pool.length ? pool[Math.floor(Math.random() * pool.length)] : MT_ELLIPSIS;
      mtAppend(id, { from: 'in', text: pick, time: mtNow() });
    }, delay);
  }
  function mtClear() {
    let id = state.mtActive;
    if (!id) return;
    let thread = mtThreadOf(id);
    let kept = null;
    for (let i = 0; i < thread.length; i++) {
      if (thread[i].from !== 'out') { kept = thread[i]; break; }
    }
    // 策略：保留对方首条问候；若该线程没有任何 in 消息，则补一条「……」系统问候
    state.mtThreads[id] = kept ? [kept] : [{ from: 'in', text: MT_ELLIPSIS, time: mtNow() }];
    if (state.mtTypingTimer) { window.clearTimeout(state.mtTypingTimer); state.mtTypingTimer = 0; }
    setVisible(qs('#mt-typing'), false);
    renderMomotalk();
  }
  function bindMomotalk() {
    let box = qs('#mt-contacts');
    if (box) {
      box.addEventListener('click', function (e) {
        let btn = e.target && e.target.closest ? e.target.closest('[data-mt]') : null;
        if (!btn || !box.contains(btn)) return;
        let id = btn.getAttribute('data-mt');
        if (!id) return;
        state.mtActive = id;
        state.mtUnread[id] = 0; // 读过清零
        if (state.mtTypingTimer) { window.clearTimeout(state.mtTypingTimer); state.mtTypingTimer = 0; }
        setVisible(qs('#mt-typing'), false);
        renderMomotalk();
      });
    }
    let form = qs('#mt-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        mtSend();
      });
    }
    let input = qs('#mt-input');
    let sendBtn = qs('#mt-send');
    if (input && sendBtn) {
      let sync = function () { sendBtn.disabled = !String(input.value || '').trim(); };
      input.addEventListener('input', sync);
      sync();
    }
    let clear = qs('#mt-clear');
    if (clear) clear.addEventListener('click', mtClear);
  }

  /* ═══════════════════════════════════════════════════════════
   * 10. memoria —— 记忆局限卡片
   * ═══════════════════════════════════════════════════════════ */
  function renderMemoria() {
    let d = data();
    let grid = qs('#memoria-grid');
    if (!grid) return;
    let list = Array.isArray(d.memorias)
      ? d.memorias.filter(function (m) { return m && typeof m === 'object'; })
      : [];
    grid.textContent = '';
    if (!list.length) {
      grid.appendChild(ce('p', 'memoria-empty', '—'));
      return;
    }
    list.forEach(function (m) {
      let card = ce('article', 'memoria-card');
      // W1 CSS：.memoria-card 用 background-image: var(--art) 铺卡面
      let src = asset(m.art);
      if (src) setVar(card, '--art', 'url("' + src + '")');
      // art 缺失时 --art 保持 none，卡片落回 background-color 深海军蓝占位
      let rarity = clamp(Math.round(num(m.rarity) === null ? 0 : num(m.rarity)), 0, 3);
      card.appendChild(ce('span', 'memoria-rarity', rarity ? '★' + rarity : '—'));
      let body = ce('div', 'memoria-body');
      let stars = ce('div', 'memoria-stars');
      stars.setAttribute('aria-label', (T(getPath(d, 'ui.memoria.rarityLabel')) || 'RARITY') + ' ' + rarity);
      for (let i = 0; i < rarity; i++) {
        let st = ce('span', 'ba-star ba-star--on');
        setVar(st, '--i', String(i)); // CSS 逐颗弹出延时
        st.appendChild(img(null, asset('star-on.svg'), ''));
        stars.appendChild(st);
      }
      for (let j = rarity; j < 3; j++) {
        let st2 = ce('span', 'ba-star');
        st2.appendChild(img(null, asset('star.svg'), ''));
        stars.appendChild(st2);
      }
      body.appendChild(stars);
      body.appendChild(ce('h3', 'memoria-title', T(m.title) || '—'));
      body.appendChild(ce('p', 'memoria-desc', T(m.desc)));
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ═══════════════════════════════════════════════════════════
   * 11. timeline —— 活动年表
   * ═══════════════════════════════════════════════════════════ */
  const TL_TYPES = ['release', 'event', 'story', 'rerun'];

  function renderTimeline() {
    let d = data();
    let list = qs('#timeline-list');
    if (!list) return;
    let events = Array.isArray(d.events)
      ? d.events.filter(function (e) { return e && typeof e === 'object'; })
      : [];
    list.textContent = '';
    if (!events.length) {
      let li0 = ce('li', 'timeline-empty');
      li0.appendChild(ce('p', null, '—'));
      list.appendChild(li0);
      return;
    }
    events.forEach(function (e) {
      let type = TL_TYPES.indexOf(e.type) !== -1 ? String(e.type) : 'other';
      let li = ce('li', 'timeline-item timeline-item--' + type);
      li.appendChild(ce('span', 'timeline-date', e.date ? String(e.date) : '—'));
      li.appendChild(ce('span', 'timeline-type mission-tag mission-tag--' + type,
        String(e.type || '').toUpperCase()));
      let body = ce('div', 'timeline-body');
      body.appendChild(ce('strong', 'timeline-title', T(e.title) || '—'));
      body.appendChild(ce('p', 'timeline-desc', T(e.desc)));
      li.appendChild(body);
      list.appendChild(li);
    });
  }

  /* ═══════════════════════════════════════════════════════════
   * 12. quiz —— 趣味检定
   * ═══════════════════════════════════════════════════════════ */
  function quizQuestions() {
    let arr = data().quiz && data().quiz.questions;
    return Array.isArray(arr) ? arr.filter(function (q) { return q && typeof q === 'object'; }) : [];
  }
  function quizResults() {
    let arr = data().quiz && data().quiz.results;
    return Array.isArray(arr) ? arr.filter(function (r) { return r && typeof r === 'object'; }) : [];
  }
  function quizScore() {
    let qsList = quizQuestions();
    let total = 0;
    for (let i = 0; i < qsList.length; i++) {
      let a = state.quizAnswers[i];
      if (a === undefined || a === null) continue;
      let opts = Array.isArray(qsList[i].options) ? qsList[i].options : [];
      let o = opts[a];
      if (o) { let s = num(o.score); if (s !== null) total += s; }
    }
    return total;
  }
  function quizMaxScore() {
    let qsList = quizQuestions();
    let total = 0;
    qsList.forEach(function (q) {
      let opts = Array.isArray(q.options) ? q.options : [];
      let best = 0;
      opts.forEach(function (o) { let s = num(o && o.score); if (s !== null && s > best) best = s; });
      total += best;
    });
    return total;
  }
  function quizAnsweredCount() {
    let n = 0;
    for (let i = 0; i < state.quizAnswers.length; i++) {
      if (state.quizAnswers[i] !== undefined && state.quizAnswers[i] !== null) n++;
    }
    return n;
  }
  function renderQuiz() {
    let d = data();
    let box = qs('#quiz-box');
    let result = qs('#quiz-result');
    let prog = qs('#quiz-progress');
    let qsList = quizQuestions();

    if (!qsList.length) {
      if (prog) setVar(prog, '--w', '0%');
      if (box) { box.textContent = ''; setVisible(box, true); box.appendChild(ce('p', 'quiz-empty', '—')); }
      setVisible(result, false);
      return;
    }
    if (state.quizIdx >= qsList.length) state.quizIdx = qsList.length - 1;
    if (state.quizIdx < 0) state.quizIdx = 0;

    let total = qsList.length;
    let answered = quizAnsweredCount();
    // W1 CSS：.quiz-progress > * 的宽度走 --pct（同时写 --w 兼容派工单写法）
    let fill = ensureQuizFill(prog);
    let pctTxt = (total ? (answered / total) * 100 : 0).toFixed(2) + '%';
    setVar(fill, '--pct', pctTxt);
    setVar(fill, '--w', pctTxt);

    if (state.quizDone) { renderQuizResult(); return; }
    setVisible(result, false);
    if (!box) return;
    setVisible(box, true);
    box.textContent = '';

    let q = qsList[state.quizIdx];
    box.appendChild(ce('span', 'quiz-num', (state.quizIdx + 1) + ' / ' + total));
    box.appendChild(ce('h3', 'quiz-q', T(q.q) || '—'));
    let opts = Array.isArray(q.options) ? q.options : [];
    let optsBox = ce('div', 'quiz-options');
    let picked = state.quizAnswers[state.quizIdx];
    opts.forEach(function (o, i) {
      let b = ce('button', 'quiz-option');
      b.type = 'button';
      b.setAttribute('data-qopt', String(i));
      b.appendChild(ce('span', 'quiz-option-text', T(o && o.text) || '—'));
      if (picked === i) {
        b.classList.add('is-picked');   // W1 CSS 态类
        b.classList.add('is-selected'); // 派工单态类（双写兼容）
      }
      optsBox.appendChild(b);
    });
    box.appendChild(optsBox);
    let nav = ce('div', 'quiz-nav');
    let prev = ce('button', 'ba-btn ba-btn--ghost quiz-prev', T(getPath(d, 'ui.quiz.prev')) || 'PREV');
    prev.type = 'button';
    prev.disabled = state.quizIdx === 0;
    let next = ce('button', 'ba-btn ba-btn--primary quiz-next',
      state.quizIdx === total - 1 ? (T(getPath(d, 'ui.quiz.resultTitle')) || 'RESULT') : (T(getPath(d, 'ui.quiz.next')) || 'NEXT'));
    next.type = 'button';
    nav.appendChild(prev);
    nav.appendChild(next);
    box.appendChild(nav);
  }
  /** .quiz-progress 的直接子元素即填充条（W1 CSS） */
  let quizFill = null;
  function ensureQuizFill(prog) {
    if (!prog) return null;
    if (!quizFill || quizFill.parentNode !== prog) {
      quizFill = ce('div', 'quiz-progress-fill');
      prog.appendChild(quizFill);
    }
    return quizFill;
  }

  function renderQuizResult() {
    let d = data();
    let box = qs('#quiz-box');
    let result = qs('#quiz-result');
    if (box) { box.textContent = ''; setVisible(box, false); }
    if (!result) return;
    setVisible(result, true);
    result.textContent = '';

    let score = quizScore();
    let max = quizMaxScore();
    result.appendChild(ce('span', 'quiz-result-label', T(getPath(d, 'ui.quiz.resultTitle')) || 'RESULT'));
    let sc = ce('div', 'quiz-result-score', String(score) + ' / ' + max +
      (T(getPath(d, 'ui.quiz.resultScore')) ? ' · ' + T(getPath(d, 'ui.quiz.resultScore')) : ''));
    result.appendChild(sc);

    let res = null;
    let list = quizResults();
    for (let i = 0; i < list.length; i++) {
      let lo = num(list[i].min);
      let hi = num(list[i].max);
      if (lo === null) lo = -Infinity;
      if (hi === null) hi = Infinity;
      if (score >= lo && score <= hi) { res = list[i]; break; }
    }
    if (!res) {
      for (let j = 0; j < list.length; j++) {
        let lo2 = num(list[j].min);
        if (lo2 !== null && score >= lo2) res = list[j];
      }
    }
    if (!res && list.length) res = list[list.length - 1];
    if (res) {
      result.appendChild(ce('h3', 'quiz-result-title', T(res.title) || '—'));
      result.appendChild(ce('p', 'quiz-result-desc', T(res.desc)));
    } else {
      result.appendChild(ce('h3', 'quiz-result-title', '—'));
    }
    let again = ce('button', 'ba-btn ba-btn--yellow quiz-restart', T(getPath(d, 'ui.quiz.restart')) || 'RESTART');
    again.type = 'button';
    result.appendChild(again);
  }
  function quizRestart() {
    state.quizIdx = 0;
    state.quizAnswers = [];
    state.quizDone = false;
    renderQuiz();
  }
  function bindQuiz() {
    let box = qs('#quiz-box');
    if (box) {
      box.addEventListener('click', function (e) {
        let t = e.target;
        if (!t || !t.closest) return;
        let opt = t.closest('[data-qopt]');
        if (opt && box.contains(opt)) {
          let idx = parseInt(opt.getAttribute('data-qopt'), 10);
          if (!isNaN(idx)) {
            state.quizAnswers[state.quizIdx] = idx;
            renderQuiz();
          }
          return;
        }
        let nav = t.closest('.quiz-prev, .quiz-next');
        if (nav && box.contains(nav)) {
          let qsList = quizQuestions();
          if (nav.classList.contains('quiz-prev')) {
            if (state.quizIdx > 0) { state.quizIdx--; renderQuiz(); }
          } else {
            if (state.quizIdx < qsList.length - 1) { state.quizIdx++; renderQuiz(); }
            else { state.quizDone = true; renderQuizResult(); }
          }
        }
      });
    }
    let result = qs('#quiz-result');
    if (result) {
      result.addEventListener('click', function (e) {
        let t = e.target;
        if (t && t.closest && t.closest('.quiz-restart') && result.contains(t.closest('.quiz-restart'))) {
          quizRestart();
        }
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
   * 13. gacha 彩蛋 —— 连击触发招募演出 + 粒子雨
   * ═══════════════════════════════════════════════════════════ */
  const CONFETTI_COLORS = ['#4aa8f0', '#ffc93c', '#ff9fb2', '#54e3ff', '#ffffff'];
  const CONFETTI_MS = 2500;

  function runConfetti() {
    let canvas = qs('#confetti-canvas');
    if (!canvas || !canvas.getContext) return;
    if (reduced()) return; // reduced-motion：跳过粒子，只显示卡片
    let ctx = null;
    try { ctx = canvas.getContext('2d'); } catch (e) { return; }
    if (!ctx) return;

    let token = ++state.confettiToken;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rect = canvas.getBoundingClientRect();
    let w = Math.max(1, Math.round(rect.width || window.innerWidth || 320));
    let h = Math.max(1, Math.round(rect.height || window.innerHeight || 480));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    if (ctx.setTransform) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let parts = [];
    let count = Math.round(clamp(w / 8, 90, 200));
    for (let i = 0; i < count; i++) {
      parts.push({
        x: Math.random() * w,
        y: Math.random() * -h,
        w: 3 + Math.random() * 6,
        h: 5 + Math.random() * 9,
        vy: 1.8 + Math.random() * 3.6,
        vx: -1.2 + Math.random() * 2.4,
        rot: Math.random() * Math.PI * 2,
        vr: -0.12 + Math.random() * 0.24,
        c: CONFETTI_COLORS[i % CONFETTI_COLORS.length]
      });
    }
    let start = Date.now();
    let frame = function () {
      if (token !== state.confettiToken) return;
      let el = Date.now() - start;
      if (el >= CONFETTI_MS) {
        try { ctx.clearRect(0, 0, w, h); } catch (e) { /* ignore */ }
        return;
      }
      try { ctx.clearRect(0, 0, w, h); } catch (e) { /* ignore */ }
      for (let i = 0; i < parts.length; i++) {
        let p = parts[i];
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.vr;
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.9;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  function speakIntro() {
    if (!ttsOk() || state.voicePlayingId) return; // 正在播放语音时不抢占
    let intro = (data().profile || {}).intro;
    // 与语音区一致：朗读日文原文（缺失时回落当前语言）
    let text = (intro && typeof intro === 'object' && intro.ja) ? String(intro.ja) : T(intro);
    if (!text) return;
    try {
      window.speechSynthesis.cancel();
      let u = new window.SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      u.rate = 0.95;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
    } catch (e) { /* 彩蛋语音失败忽略 */ }
  }

  function openGacha() {
    let ov = qs('#gacha-overlay');
    let d = data();
    if (!ov) return;
    setVisible(ov, true);
    ov.classList.add('is-open');
    let card = qs('#gacha-card');
    if (card) {
      card.setAttribute('aria-label', T(getPath(d, 'ui.gacha.title')) || 'AL-1S');
      card.classList.remove('is-run');
      void card.offsetWidth; // 强制重排以重放动画
      card.classList.add('is-run');
    }
    let burst = qs('#gacha-burst');
    if (burst) {
      burst.classList.remove('is-run');
      void burst.offsetWidth;
      burst.classList.add('is-run');
    }
    runConfetti();
    speakIntro();
    showToast(T(getPath(d, 'ui.toast.missionComplete')) || '');
    let close = qs('#gacha-close');
    if (close) { try { close.focus(); } catch (e) { /* ignore */ } }
  }
  function closeGacha() {
    let ov = qs('#gacha-overlay');
    state.confettiToken++;
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    if (!ov) return;
    ov.classList.remove('is-open');
    setVisible(ov, false);
  }
  function gachaIsOpen() {
    let ov = qs('#gacha-overlay');
    return !!ov && !ov.hidden && ov.classList.contains('is-open');
  }
  function bindGacha() {
    let logo = qs('#hero-logo');
    if (logo) {
      logo.addEventListener('click', function () {
        state.gachaClicks++;
        if (state.gachaTimer) window.clearTimeout(state.gachaTimer);
        state.gachaTimer = window.setTimeout(function () {
          state.gachaClicks = 0;
          state.gachaTimer = 0;
        }, 3000);
        if (state.gachaClicks >= 5) {
          state.gachaClicks = 0;
          if (state.gachaTimer) { window.clearTimeout(state.gachaTimer); state.gachaTimer = 0; }
          openGacha();
        }
      });
    }
    let cta = qs('#hero-cta-gacha');
    if (cta) cta.addEventListener('click', openGacha);
    let close = qs('#gacha-close');
    if (close) close.addEventListener('click', closeGacha);
    let ov = qs('#gacha-overlay');
    if (ov) {
      ov.addEventListener('click', function (e) {
        if (e.target === ov) closeGacha(); // 点遮罩关闭
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && gachaIsOpen()) closeGacha();
    });
  }

  /* ═══════════════════════════════════════════════════════════
   * 14. reveal —— IntersectionObserver 入场
   * ═══════════════════════════════════════════════════════════ */
  function initReveal() {
    let nodes = qsa('.reveal');
    if (!nodes.length) return;
    if (reduced() || typeof window.IntersectionObserver !== 'function') {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    // 兜底：IO 回调在后台标签页加载等场景会被挂起，导致视口内元素永不显示。
    // 只强制「当前在视口内」的元素，不影响下方区块的滚动登场效果。
    let forceInView = function () {
      nodes.forEach(function (n) {
        if (n.classList.contains('is-in')) return;
        let r = n.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) n.classList.add('is-in');
      });
    };
    try {
      let io = new window.IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.15 });
      nodes.forEach(function (n) { io.observe(n); });
      window.setTimeout(forceInView, 2000);
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) forceInView();
      });
    } catch (e) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
    }
  }

  /* ═══════════════════════════════════════════════════════════
   * 渲染总入口 / 初始化
   * ═══════════════════════════════════════════════════════════ */
  function renderAll() {
    let jobs = [
      ['profile', renderProfile],
      ['stats', renderStats],
      ['skills', renderSkills],
      ['weapon', renderWeapon],
      ['stories', renderStories],
      ['voices', renderVoices],
      ['momotalk', renderMomotalk],
      ['memoria', renderMemoria],
      ['timeline', renderTimeline],
      ['quiz', renderQuiz]
    ];
    jobs.forEach(function (j) {
      try { j[1](); } catch (e) { console.warn('[AL-1S] render ' + j[0] + ' failed:', e); }
    });
  }

  // profile 字段行标签（ui.profile 无对应键 → 内置三语标签；data.js 若补 ui.profile.rowLabels 可覆盖）
  const PROFILE_ROWS = [
    { key: 'reading', label: { zh: '读音', ja: '読み', en: 'Reading' } },
    { key: 'school', label: { zh: '学园', ja: '学園', en: 'School' } },
    { key: 'club', label: { zh: '社团', ja: '部活', en: 'Club' } },
    { key: 'role', label: { zh: '定位', ja: '役割', en: 'Role' } },
    { key: 'position', label: { zh: '站位', ja: 'ポジション', en: 'Position' } },
    { key: 'weaponType', label: { zh: '武器类型', ja: '武器種', en: 'Weapon' } },
    { key: 'armor', label: { zh: '防具类型', ja: '防具種', en: 'Armor' } },
    { key: 'attackType', label: { zh: '攻击类型', ja: '攻撃種', en: 'Attack' } },
    { key: 'rarity', label: { zh: '稀有度', ja: 'レアリティ', en: 'Rarity' } },
    { key: 'age', label: { zh: '年龄', ja: '年齢', en: 'Age' } },
    { key: 'birthday', label: { zh: '生日', ja: '誕生日', en: 'Birthday' } },
    { key: 'height', label: { zh: '身高', ja: '身長', en: 'Height' } },
    { key: 'hobby', label: { zh: '爱好', ja: '趣味', en: 'Hobby' } },
    { key: 'cv', label: { zh: 'CV', ja: 'CV', en: 'CV' } },
    { key: 'illustrator', label: { zh: '画师', ja: 'イラスト', en: 'Illustrator' } }
  ];

  function renderProfile() {
    let d = data();
    let p = d.profile || {};
    let rows = qs('#profile-rows');
    if (rows) {
      rows.textContent = '';
      PROFILE_ROWS.forEach(function (r) {
        let v = T(p[r.key]);
        if (!v) return;
        let dt = ce('dt', 'profile-row-k', r.label[state.lang] || r.label.en);
        let dd = ce('dd', 'profile-row-v', v);
        rows.appendChild(dt);
        rows.appendChild(dd);
      });
    }
    let stars = qs('#profile-stars');
    if (stars) {
      stars.textContent = '';
      let rarity = clamp(Math.round(num(p.rarity) === null ? 0 : num(p.rarity)), 0, 3);
      stars.setAttribute('aria-label', (T(getPath(d, 'ui.profile.starsLabel')) || 'RARITY') + ' ' + rarity);
      for (let i = 0; i < rarity; i++) {
        let st = ce('span', 'ba-star ba-star--on');
        setVar(st, '--i', String(i));
        st.appendChild(img(null, asset('star-on.svg'), ''));
        stars.appendChild(st);
      }
      for (let j = rarity; j < 3; j++) {
        let st2 = ce('span', 'ba-star');
        st2.appendChild(img(null, asset('star.svg'), ''));
        stars.appendChild(st2);
      }
    }
  }

  function bindAll() {
    bindLangButtons();
    bindNav();
    bindStats();
    bindSkills();
    bindWeapon();
    bindStories();
    bindVoices();
    bindMomotalk();
    bindGacha();
    bindQuiz();
  }

  function init() {
    try {
      state.lang = detectLang();
      mtInitThreads();
      bindAll();
      applyLang(state.lang);
      initReveal();
      runBoot();
    } catch (e) {
      // 关键路径兜底：异常也绝不把页面锁在遮罩里
      console.warn('[AL-1S] init failed:', e);
      finishBoot();
      initReveal();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
