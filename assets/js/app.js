/*!
 * AL-1S v2 · app.js — 简洁重设计 · 全部交互逻辑
 * 纯原生 JS · 无框架 · 无构建
 * 数据来源：window.AL1S（assets/js/data.js）
 */
(function () {
  'use strict';

  const D = window.AL1S || {};
  const LANGS = ['zh', 'ja', 'en'];
  let lang = localStorage.getItem('al1s-lang') || detectLang();

  function detectLang() {
    const n = (navigator.language || '').toLowerCase();
    if (n.startsWith('ja')) return 'ja';
    if (n.startsWith('en')) return 'en';
    return 'zh';
  }

  function t(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.zh || obj.en || '';
  }

  /* ─── i18n translations ─── */
  const UI = {
    zh: {
      'nav.profile': '档案', 'nav.story': '故事', 'nav.gallery': '相册', 'nav.voices': '语音',
      'sec.profile': '学生档案', 'sec.story': '关于爱丽丝', 'sec.gallery': '相册', 'sec.voices': '语音台词',
      'sec.voicesSub': '台词取自官方剧情文本。点击条目朗读日文。',
      'hero.tagline': '「肯定。爱丽丝是本机体的识别名。」',
      'story.highlight': '「先生，我最喜欢游戏了！和大家在一起的时候，感觉整个世界都在闪闪发光。」',
      'story.p1': '天童爱丽丝——代号「AL-1S」，是千禧年科技学园游戏开发部的成员。与其他学生不同，爱丽丝实际上是一个人工智能机器人，但她自己并不完全理解这一点。',
      'story.p2': '她在千禧年某处废墟中被游戏开发部的伙伴们发现后，成为了社团的一员。爱丽丝天真无邪、对世界充满好奇，最喜欢的事情就是和大家一起玩游戏——尤其是复古游戏。',
      'story.p3': '对爱丽丝来说，游戏开发部的伙伴们是她最珍贵的「家人」。桃井、绿、柚子，还有老师——她那颗纯粹的心，温暖了身边每一个人。',
      'profile.name': '天童爱丽丝',
      'profile.intro': '单位识别：爱丽丝。系统状态……正常。确认。请求：与老师同行。',
      'voice.all': '全部', 'voice.login': '登录', 'voice.battle': '战斗',
      'voice.interact': '互动', 'voice.idle': '空闲', 'voice.gacha': '招募', 'voice.other': '其它',
      'lang.label': '中'
    },
    ja: {
      'nav.profile': 'プロフィール', 'nav.story': 'ストーリー', 'nav.gallery': 'ギャラリー', 'nav.voices': 'ボイス',
      'sec.profile': '学生プロフィール', 'sec.story': 'アリスについて', 'sec.gallery': 'ギャラリー', 'sec.voices': 'ボイス',
      'sec.voicesSub': '公式シナリオテキストより。クリックで日本語音声合成。',
      'hero.tagline': '「肯定。アリスは本ユニットの識別名である。」',
      'story.highlight': '「先生、私はゲームが大好きです！みんなと一緒にいるとき、世界全体がキラキラ輝いているように感じます。」',
      'story.p1': '天童アリス——コードネーム「AL-1S」。ミレニアムサイエンススクールゲーム開発部のメンバー。他の生徒とは異なり、アリスは実際にはAIロボットですが、本人はそのことを完全には理解していません。',
      'story.p2': 'ミレニアムの廃墟でゲーム開発部のメンバーたちに発見された後、部の一員となりました。アリスは無邪気で世界に対する好奇心に満ちており、みんなとゲームをすること——特にレトロゲームが大好きです。',
      'story.p3': 'アリスにとって、ゲーム開発部のみんなは最も大切な「家族」。モモイ、ミドリ、ユズ、そして先生——その純粋な心は、周りのすべての人を温かくします。',
      'profile.name': '天童アリス',
      'profile.intro': 'ユニット識別：アリス。システム状態……正常。確認。リクエスト：先生と同行。',
      'voice.all': 'すべて', 'voice.login': 'ログイン', 'voice.battle': 'バトル',
      'voice.interact': 'インタラクト', 'voice.idle': '待機', 'voice.gacha': '募集', 'voice.other': 'その他',
      'lang.label': '日'
    },
    en: {
      'nav.profile': 'Profile', 'nav.story': 'Story', 'nav.gallery': 'Gallery', 'nav.voices': 'Voices',
      'sec.profile': 'Student Profile', 'sec.story': 'About Aris', 'sec.gallery': 'Gallery', 'sec.voices': 'Voice Lines',
      'sec.voicesSub': 'Lines from official story text. Click to hear Japanese TTS.',
      'hero.tagline': '"Affirmative, Aris is the designated name of this unit."',
      'story.highlight': '"Sensei, I love games! When I\'m with everyone, I feel like the whole world is sparkling."',
      'story.p1': 'Tendou Aris — codename "AL-1S" — is a member of the Game Development Club at Millennium Science School. Unlike other students, Aris is actually an AI robot, though she doesn\'t fully understand this herself.',
      'story.p2': 'After being discovered in the ruins of Millennium by the Game Development Club members, she became part of the team. Aris is innocent, full of curiosity about the world, and her favorite thing is playing games with everyone — especially retro games.',
      'story.p3': 'To Aris, the members of the Game Development Club are her most precious "family." Momoi, Midori, Yuzu, and Sensei — her pure heart warms everyone around her.',
      'profile.name': 'Tendou Aris',
      'profile.intro': 'Unit designation: Aris. System status… normal. Confirmed. Request: accompany Sensei.',
      'voice.all': 'All', 'voice.login': 'Login', 'voice.battle': 'Battle',
      'voice.interact': 'Interact', 'voice.idle': 'Idle', 'voice.gacha': 'Recruit', 'voice.other': 'Other',
      'lang.label': 'EN'
    }
  };

  function ui(key) { return (UI[lang] || UI.zh)[key] || (UI.zh)[key] || key; }

  /* ─── Profile data ─── */
  const PROFILE_ROWS = [
    ['所属学园', '千禧年科技学园', 'ミレニアムサイエンススクール', 'Millennium Science School'],
    ['所属社团', '游戏开发部', 'ゲーム開発部', 'Game Development Club'],
    ['定位', '特殊・爆发', 'ストライカー・爆発', 'Striker · Explosive'],
    ['武器', '光之剑：超新星', '光の剣：スーパーノヴァ', 'Supernova: Sword of Light'],
    ['身高', '152cm', '152cm', '152cm'],
    ['生日', '3月25日', '3月25日', 'March 25'],
    ['年龄', '???', '???', '???'],
    ['画师', 'DoReMi', 'DoReMi', 'DoReMi'],
    ['CV', '近藤玲奈', '近藤玲奈', 'Reina Kondō']
  ];
  const PROFILE_LABELS = {
    zh: ['所属学园','所属社团','定位','武器','身高','生日','年龄','画师','CV'],
    ja: ['所属学園','所属部活','ロール','武器','身長','誕生日','年齢','イラスト','CV'],
    en: ['School','Club','Role','Weapon','Height','Birthday','Age','Illustrator','CV']
  };

  /* ─── Gallery data ─── */
  const GALLERY_ITEMS = [
    'assets/img/gallery/gallery-01.jpg',
    'assets/img/gallery/gallery-02.jpg',
    'assets/img/gallery/gallery-03.jpg',
    'assets/img/gallery/gallery-04.jpg',
    'assets/img/gallery/gallery-05.jpg',
    'assets/img/gallery/gallery-06.jpg',
    'assets/img/gallery/gallery-07.jpg',
    'assets/img/gallery/gallery-08.jpg'
  ];

  /* ─── Voice data (from data.js) ─── */
  const VOICES = (D.voices || []);
  const VOICE_CATS = ['all', 'login', 'battle', 'interact', 'idle', 'gacha', 'other'];
  let voiceCat = 'all';
  let ttsUtterance = null;

  /* ─── DOM ─── */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    applyI18n();
    renderProfile();
    renderStory();
    renderGallery();
    renderVoiceTabs();
    renderVoices();
    initNav();
    initScrollReveal();
    initBackToTop();
    initLangToggle();
    initMobileMenu();
  }

  /* ─── i18n ─── */
  function applyI18n() {
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = ui(key);
      if (val && val !== key) el.textContent = val;
    });
    // Update hero title per lang
    const heroTitle = $('.hero-title');
    if (heroTitle) heroTitle.textContent = ui('profile.name');
    // Lang button label
    const langBtn = $('#langBtn');
    if (langBtn) langBtn.textContent = ui('lang.label');
  }

  /* ─── Profile ─── */
  function renderProfile() {
    const grid = $('#profileGrid');
    if (!grid) return;
    const labels = PROFILE_LABELS[lang] || PROFILE_LABELS.zh;
    const li = lang === 'ja' ? 1 : lang === 'en' ? 3 : 0;
    grid.innerHTML = PROFILE_ROWS.map((row, i) =>
      '<div class="profile-row">' +
        '<span class="profile-row-k">' + labels[i] + '</span>' +
        '<span class="profile-row-v">' + (li === 0 ? row[1] : row[li]) + '</span>' +
      '</div>'
    ).join('');
  }

  /* ─── Story ─── */
  function renderStory() {
    const body = $('#storyBody');
    if (!body) return;
    body.innerHTML = ['story.p1', 'story.p2', 'story.p3'].map(k =>
      '<p>' + ui(k) + '</p>'
    ).join('');
  }

  /* ─── Gallery ─── */
  function renderGallery() {
    const grid = $('#galleryGrid');
    if (!grid) return;
    const alt = ui('profile.name');
    grid.innerHTML = GALLERY_ITEMS.map(src =>
      '<figure class="gallery-item">' +
        '<img src="' + src + '" alt="' + alt + '" loading="lazy">' +
      '</figure>'
    ).join('');
  }

  /* ─── Voice tabs ─── */
  function renderVoiceTabs() {
    const wrap = $('#voiceTabs');
    if (!wrap) return;
    wrap.innerHTML = VOICE_CATS.map(cat =>
      '<button class="voice-tab' + (cat === voiceCat ? ' is-active' : '') + '" data-cat="' + cat + '">' +
        ui('voice.' + cat) +
      '</button>'
    ).join('');
    wrap.addEventListener('click', e => {
      const btn = e.target.closest('.voice-tab');
      if (!btn) return;
      voiceCat = btn.dataset.cat;
      $$('.voice-tab', wrap).forEach(b => b.classList.toggle('is-active', b === btn));
      renderVoices();
    });
  }

  /* ─── Voices ─── */
  function renderVoices() {
    const list = $('#voiceList');
    if (!list) return;
    const filtered = voiceCat === 'all' ? VOICES : VOICES.filter(v => v.cat === voiceCat);
    list.innerHTML = filtered.map(v =>
      '<div class="voice-item" data-id="' + v.id + '">' +
        '<div class="voice-jp">' + (v.jp || '') + '</div>' +
        '<div class="voice-zh">' + (v.zh || '') + '</div>' +
        '<div class="voice-en">' + (v.en || '') + '</div>' +
        (v.note ? '<div class="voice-note">' + v.note + '</div>' : '') +
      '</div>'
    ).join('');
    list.addEventListener('click', e => {
      const item = e.target.closest('.voice-item');
      if (!item) return;
      const v = VOICES.find(x => x.id === item.dataset.id);
      if (!v || !v.jp) return;
      // TTS
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        $$('.voice-item.is-playing', list).forEach(el => el.classList.remove('is-playing'));
        ttsUtterance = new SpeechSynthesisUtterance(v.jp);
        ttsUtterance.lang = 'ja-JP';
        ttsUtterance.rate = 0.9;
        ttsUtterance.onend = () => item.classList.remove('is-playing');
        ttsUtterance.onerror = () => item.classList.remove('is-playing');
        item.classList.add('is-playing');
        window.speechSynthesis.speak(ttsUtterance);
      }
    });
  }

  /* ─── Nav scroll ─── */
  function initNav() {
    const nav = $('#nav');
    const links = $$('.nav-links a');
    const sections = ['profile', 'story', 'gallery', 'voices'].map(id => document.getElementById(id)).filter(Boolean);

    function onScroll() {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 40);

      // Active link
      let activeId = '';
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop - 120 <= y) {
          activeId = sections[i].id;
          break;
        }
      }
      links.forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('is-active', href === '#' + activeId);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Scroll reveal ─── */
  function initScrollReveal() {
    const els = $$('.reveal');
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      els.forEach(el => obs.observe(el));

      // Fallback for background tabs
      setTimeout(() => {
        els.forEach(el => {
          if (!el.classList.contains('is-in')) {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
          }
        });
      }, 2000);
    } else {
      els.forEach(el => el.classList.add('is-in'));
    }
  }

  /* ─── Back to top ─── */
  function initBackToTop() {
    const btn = $('#btnTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Language toggle ─── */
  function initLangToggle() {
    const btn = $('#langBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const idx = LANGS.indexOf(lang);
      lang = LANGS[(idx + 1) % LANGS.length];
      localStorage.setItem('al1s-lang', lang);
      applyI18n();
      renderProfile();
      renderStory();
      renderGallery();
      renderVoiceTabs();
      renderVoices();
    });
  }

  /* ─── Mobile menu ─── */
  function initMobileMenu() {
    const btn = $('#menuBtn');
    const links = $('#navLinks');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      btn.classList.toggle('is-open', open);
    });

    links.addEventListener('click', e => {
      if (e.target.closest('a')) {
        links.classList.remove('is-open');
        btn.classList.remove('is-open');
      }
    });

    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('is-open');
        btn.classList.remove('is-open');
      }
    });
  }

})();
