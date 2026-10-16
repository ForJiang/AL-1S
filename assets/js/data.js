/*!
 * AL-1S · assets/js/data.js
 * 蔚蓝档案「天童爱丽丝（天童アリス / Tendou Aris）」主题粉丝站 —— 三语内容数据集
 * 语言：zh（简体中文，默认）/ ja（日本語）/ en（English）
 *
 * 数据来源（详见 artifacts/R1-game-data.md）：
 *  - 档案/数值/技能/武器：SchaleDB 社区数据库（data/{jp,cn,en}/students.min.json）
 *  - 剧情台词（en 字段）：wanony/BlueArchiveDataset 官方 Global 剧情文本
 *  - 站名依据：官方剧情中的身份校验 <Identity check, are you AL-1S?>
 * 标注约定：source:"official" = 官方原文；中文/日文歌词与台词为粉丝译制；
 *           MomoTalk 对话、记忆局限、检定题为粉丝二创（页面已明示）。
 */
window.AL1S_LANGS = ['zh', 'ja', 'en'];

window.AL1S = {

  version: '1.0.0',

  /* ══════════════ 站点概念 ══════════════ */
  model: {
    code: 'AL-1S',
    base: 'AL-1',
    name: {
      zh: 'AL-1S 机能扩充终端',
      ja: 'AL-1S 機能拡張端末',
      en: 'AL-1S Extension Terminal'
    }
  },

  /* ══════════════ 快讯（官网式信息流；内容取自已验证剧情/活动数据） ══════════════ */
  news: [
    { date: 'EP.18', cat: 'story',
      title: { zh: 'G.BIBLE 全篇攻略：身份校验终端「AL-1S」记录公开', ja: 'G.BIBLE 全篇攻略：身元確認端末「AL-1S」の記録を公開', en: 'G.BIBLE Complete: identity-check terminal "AL-1S" log revealed' },
      desc: { zh: '游戏开发部的心血之作 G.BIBLE 进入终盘。一台写着「AL-1S」的终端向爱丽丝发起身份校验——她的回答是：「不，我就是我。」', ja: 'ゲーム開発部の力作 G.BIBLE が終盤へ。「AL-1S」と書かれた端末がアリスに身元確認を求める——彼女の答えは「いいえ、私は私」。', en: 'The Game Development Department\'s passion project reaches its finale. A terminal labeled "AL-1S" runs an identity check on Aris — her answer: "No. I am me."' } },
    { date: 'EP.18', cat: 'event',
      title: { zh: '千年祭颁奖礼：Tales Saga Chronicle 2 发布 3 小时下载破万', ja: 'ミレニアム授賞式：Tales Saga Chronicle 2 公開3時間でダウンロード1万突破', en: 'Millennium Award Ceremony: Tales Saga Chronicle 2 passes 10,000 downloads in 3 hours' },
      desc: { zh: '下载 7,705 次、评论 1,372 条——五千条新评论里，有 242 条负面、192 条期待、66 条观望。爱丽丝守在终端前，等大家的第一反应。', ja: 'ダウンロード7,705回、コメント1,372件——新しいコメント500件のうち、否定的242件、期待192件、保留66件。アリスは端末の前で皆の反応を待った。', en: '7,705 downloads and 1,372 comments — of 500 new comments, 242 negative, 192 excited, 66 uncertain. Aris waits at the terminal for everyone\'s first reactions.' } },
    { date: 'ALT', cat: 'gacha',
      title: { zh: '换装预告：爱丽丝（女仆）即将登场', ja: '衣装チェンジ予告：アリス（メイド）がまもなく登場', en: 'Alt outfit preview: Aris (Maid) coming soon' },
      desc: { zh: '因为各种缘故穿上了女仆装的爱丽丝，正在为成为独当一面的「女仆勇者」而每日修行中——本人似乎还不太习惯。', ja: '色々あってメイド服を着ることになったアリスが、一人前の「メイド勇者」を目指して日々修行中——本人はまだあまり慣れていない模様。', en: 'For various reasons Aris ended up in a maid outfit, training daily to become a full-fledged "Maid Hero" — though she still isn\'t quite used to it.' } },
    { date: 'EP.17', cat: 'story',
      title: { zh: '转学生加入：爱丽丝报到游戏开发部', ja: '転入生入部：アリスがゲーム開発部へ', en: 'Transfer student joins: Aris reports to the Game Development Department' },
      desc: { zh: '错过注册、还没开始上课的她，凭着「听说可以参加社团」加入游戏开发部。自称定位：坦克，兼光型近战输出。', ja: '登録を逃し授業も始まっていない彼女が、「部活に入れると聞いたので」ゲーム開発部に入部。自称の役割はタンク兼光型近接ダメージ。', en: 'Having missed registration and not yet started classes, she joined the Game Development Department because "I was told I could join a club". Self-declared role: tank and light-type melee damage.' } },
    { date: 'EP.17', cat: 'event',
      title: { zh: '装备确认：光之剑：超新星 入手', ja: '装備確認：光の剣：スーパーノヴァ 入手', en: 'Equipment confirmed: Supernova — The Sword of Light acquired' },
      desc: { zh: '「等级不够？那需要什么数值？」——她把比人还大的电磁炮扛上了肩，并按下了开始按钮。', ja: '「レベル不足？では必要なステータスは？」——彼女は人間より大きなレールガンを肩に担ぎ、スタートボタンを押した。', en: '"My level is too low? What stats do I need?" — she hoisted a railgun bigger than herself onto her shoulder and pressed start.' } },
    { date: 'ORIGIN', cat: 'story',
      title: { zh: '目击报告：废墟中醒来的「单位：爱丽丝」', ja: '目撃情報：廃墟で目覚めた「ユニット：アリス」', en: 'Sighting: "Unit: Aris" awakens in the ruins' },
      desc: { zh: '千年某处废墟中发现一名来历不明的少女。年龄与出身全部不明，语言由复古游戏台词构成——「单位识别：爱丽丝。」', ja: 'ミレニアムの廃墟で正体不明の少女を発見。年齢も出身もすべて不明、言葉はレトロゲームのセリフで構成——「ユニット識別：アリス」。', en: 'A mysterious girl found in the Millennium ruins. Age and origins unknown; her speech is built from retro game quotes — "Unit designation: Aris."' } },
    { date: 'EP.18', cat: 'story',
      title: { zh: '四人小队达成：27 座地下城 · 139 次成功讨伐', ja: '四人パーティ達成：ダンジョン27箇所・レイド139回成功', en: 'Party of four: 27 dungeons, 139 successful raids' },
      desc: { zh: '桃、绿、柚子，还有爱丽丝。「只要在一起，就没有我们做不到的事。」', ja: 'モモイ、ミドリ、ユズ、そしてアリス。「一緒にいれば、私たちにできないことはない。」', en: 'Momoi, Midori, Yuzu, and Aris. "If we are together, there is nothing we cannot do."' } },
    { date: 'FAN', cat: 'event',
      title: { zh: 'AL-1S 机能扩充终端 · 粉丝站点上线', ja: 'AL-1S 機能拡張端末・ファンサイト公開', en: 'AL-1S Extension Terminal · fan site now live' },
      desc: { zh: '以官方剧情中的「AL-1S」身份校验为灵感打造的粉丝终端上线：档案、数值、剧情、语音、MomoTalk 模拟与图集。非官方作品。', ja: '公式シナリオの「AL-1S」身元確認から着想したファン端末が公開：プロフィール、ステータス、ストーリー、ボイス、MomoTalk シミュレーターとギャラリー。非公式作品。', en: 'A fan terminal inspired by the official "AL-1S" identity check goes live: profile, stats, story, voices, MomoTalk sim and gallery. Unofficial.' } },
    { date: 'EP.18', cat: 'gacha',
      title: { zh: '限定招募：「老师加入了队伍！」', ja: '限定募集：「先生がパーティに参加！」', en: 'Limited recruit: "Sensei has joined the party!"' },
      desc: { zh: '噗噗噗噗！老师加入了队伍。参加成功，任务目标完成——「无论发生什么，我都会保护老师。」', ja: 'ポポポポン！先生がパーティに参加。参加成功、クエスト目標完了——「何が起きても、先生を守る」。', en: 'Bum bum bum! Sensei has joined the party. Entry successful, objective complete — "I will protect Sensei no matter what happens."' } },
    { date: 'ALT', cat: 'event',
      title: { zh: '日常：女仆勇者修行 · 第 27 日', ja: '日常：メイド勇者修行・27日目', en: 'Daily: Maid Hero training, day 27' },
      desc: { zh: '「请把穿女仆装的我保持在距离之外。」——战斗结束后的她这样请求。修行还在继续。', ja: '「メイド服を着た私は、しばらく距離を置いてください。」——戦闘後、彼女はそうお願いした。修行は続く。', en: '"Please keep anything wearing a maid outfit away from me." — she requests after battle. The training continues.' } }
  ],

  /* ══════════════ 设定 · 奇普托斯（世界观，据维基百科条目整理） ══════════════ */
  worldview: {
    intro: {
      zh: '《蔚蓝档案》的舞台是虚构学园都市<em>「奇普托斯」</em>（Kivotos）。数千所不同学风的学校在此林立，大部分学校拥有自己的<em>自治区</em>并握有全权；各校则由类似联邦政府的<em>「联邦学生会」</em>在尊重自治的前提下统御，管理中枢<em>「圣所之塔」</em>矗立在直辖区。<br><br>在这里上学的学生头顶，都漂浮着名为<em>「光环」</em>的发光体——它没有质量、无法触摸，却可以被破坏，并在睡眠、失去意识或死亡时消失。故事开始前不久，<em>联邦学生会长突然失踪</em>，学生会陷入瘫痪，潜伏的问题浮出水面。为此，联邦学生会向拥有超法规权限的跨校社团<em>「夏莱」（S.C.H.A.L.E）</em>求助——玩家扮演的，正是会长失踪前亲自从奇普托斯外聘请来的教员<em>「老师」</em>。',
      ja: '『ブルーアーカイブ』の舞台は、架空の学園都市<em>「キヴォトス」</em>（Kivotos）。数千の様々な学風の学校が立ち並び、多くの学校は<em>自治区</em>を保有して全権を握る。各校は連邦政府に似た<em>「連邦生徒会」</em>が自治を尊重しつつ統御し、管理中枢<em>「聖所の塔」</em>が直轄区にそびえる。<br><br>この街で学ぶ生徒たちの頭には、<em>「光环」</em>と呼ばれる発光体が浮かんでいる——質量がなく触れることはできないが破壊は可能で、睡眠・意識喪失・死亡時に消える。物語の始まり少し前、<em>連邦生徒会長が突然失踪</em>し生徒会は機能停止に陥る。連邦生徒会は超法規的権限を持つクロススクール組織<em>「シャーレ」（S.C.H.A.L.E）</em>に助力を要請した——プレイヤーは、会長失踪前にキヴォトス外から招かれた教員<em>「先生」</em>である。',
      en: 'Blue Archive is set in the fictional academy city of <em>Kivotos</em>. Thousands of schools of differing character stand here; most hold their own <em>autonomous districts</em> with full authority, unified under a federal government-like body — the <em>Federal Student Council</em> — with the administrative center, the <em>Sanctum Tower</em>, rising over its direct district.<br><br>Every student here floats a glowing <em>halo</em> above their head — massless and untouchable, yet breakable, vanishing in sleep, unconsciousness, or death. Shortly before the story begins, the <em>Federal Student Council president suddenly disappears</em>, paralyzing the council and surfacing long-suppressed problems. The council turns to <em>SCHALE</em> (S.C.H.A.L.E), a cross-school organization with extra-legal authority — and the player takes the role of the <em>Sensei</em>, a teacher personally invited from outside Kivotos just before the president vanished.'
    },
    facts: [
      { value: '数千', label: { zh: '所不同学风的学园', ja: 'もの学校が林立', en: 'schools of every character' } },
      { value: '光环', label: { zh: '头顶的发光体（可破坏）', ja: '頭上の発光体（破壊可能）', en: 'the halo above them (breakable)' } },
      { value: '夏莱', label: { zh: 'S.C.H.A.L.E · 老师的归属', ja: 'S.C.H.A.L.E · 先生の所属', en: 'S.C.H.A.L.E · where Sensei belongs' } },
      { value: '2021', label: { zh: '日服首发年份', ja: '日服サービス開始', en: 'JP service began' } }
    ],
    schools: [
      { id: 'millennium', name: { zh: '千禧年', ja: 'ミレニアム', en: 'Millennium' }, note: { zh: '爱丽丝的学园', ja: 'アリスの学園', en: "Aris's school" }, current: true },
      { id: 'trinity', name: { zh: '三一', ja: 'トリニティ', en: 'Trinity' }, note: { zh: '综合学园', ja: '総合学園', en: 'General academy' } },
      { id: 'gehenna', name: { zh: '格黑娜', ja: 'ゲヘナ', en: 'Gehenna' }, note: { zh: '问题学生的巢穴', ja: '問題生の巣窟', en: 'Home of troublemakers' } },
      { id: 'abydos', name: { zh: '阿拜多斯', ja: 'アビドス', en: 'Abydos' }, note: { zh: '面临废校', ja: '廃校の危機', en: 'Facing closure' } },
      { id: 'redwinter', name: { zh: '赤冬', ja: 'レッドウィンター', en: 'Red Winter' }, note: { zh: '赤冬联邦', ja: 'レッドウィンター連邦', en: 'Red Winter Federation' } },
      { id: 'valkyrie', name: { zh: '瓦尔基里', ja: 'ヴァルキューレ', en: 'Valkyrie' }, note: { zh: '警察学园', ja: '警察学園', en: 'Police academy' } },
      { id: 'arius', name: { zh: '阿里乌斯', ja: 'アリウス', en: 'Arius' }, note: { zh: '分校', ja: '分校', en: 'Branch school' } }
    ]
  },

  /* ══════════════ 角色档案（SchaleDB 三服数据） ══════════════ */
  profile: {
    name: { zh: '天童爱丽丝', ja: '天童アリス', en: 'Tendou Aris' },
    reading: { zh: 'てんどう アリス', ja: 'てんどう アリス', en: 'Tendou Aris' },
    school: { zh: '千禧年', ja: 'ミレニアムサイエンススクール', en: 'Millennium' },
    club: { zh: '游戏开发部', ja: 'ゲーム開発部', en: 'Game Development Department' },
    role: { zh: '突击 · 输出', ja: 'STRIKER · アタッカー', en: 'Striker · Dealer' },
    position: { zh: '后方', ja: '後方', en: 'Back' },
    weaponType: { zh: '电磁炮（RG）', ja: 'RG（レールガン）', en: 'RG (railgun)' },
    armor: { zh: '特殊装甲', ja: '特殊装甲', en: 'Special' },
    attackType: { zh: '神秘', ja: '神秘', en: 'Mystic' },
    rarity: 3,
    age: { zh: '？？岁', ja: '??歳', en: 'Unknown' },
    birthday: { zh: '3月25日', ja: '3月25日', en: 'March 25' },
    height: { zh: '152cm', ja: '152cm', en: '152cm' },
    hobby: { zh: '游戏（RPG）', ja: 'ゲーム（特にRPG）', en: 'Video games (RPGs)' },
    cv: { zh: '四白', ja: '田中美海', en: 'Minami Tanaka' },
    illustrator: { zh: 'DoReMi', ja: 'DoReMi', en: 'DoReMi' },
    intro: {
      zh: '千禧年游戏开发部的成员。\n在废墟发现的来历不明的少女，无法查到包括年龄在内的所有情报。一直跟着桃和绿打游戏的她，已经成了重度游戏迷。原本说话很呆板，但现在常常用复古游戏的台词代替。',
      ja: 'ミレニアムサイエンススクール所属、ゲーム開発部の部員。\n廃墟で発見された正体不明の少女で、年齢を含め全ての情報が不詳。現在はモモイやミドリ、ユズと共にゲームを楽しんで、重度のゲームマニアになっている。やや会話がたどたどしかったり不自然な点があるが、それは彼女の発言のほとんどがレトロゲームのセリフで構成されているためである。',
      en: 'A member of the Game Development Department at the Millennium School.\nA mysterious girl who was found sleeping within some ruins. All information regarding her age and origins is unknown. Currently, she has become a hardcore video game fanatic thanks to Midori and Momoi. The majority of her inarticulate speech is comprised of dialog from retro video games.'
    },
    modelNote: {
      zh: '「AL-1S」并非官方机体编号，而是本站的虚构终端名——灵感来自官方剧情中那段身份校验：「<Identity check, are you AL-1S?>」她的回答是：「不，我就是我，我是爱丽丝。」',
      ja: '「AL-1S」は公式の機体番号ではなく、本サイトの架空端末名——公式シナリオの身元確認「<Identity check, are you AL-1S?>」に由来します。彼女の答えは「いいえ。私は……私。私はアリス」。',
      en: '"AL-1S" is not an official unit designation, but this fan site\'s fictional terminal name — inspired by the official story\'s identity check: "<Identity check, are you AL-1S?>" Her answer: "No. I am…me. I am \'Aris\'."'
    }
  },

  /* ══════════════ 战斗数值（Lv.1 / Lv.100；SchaleDB 仅公开两档） ══════════════ */
  stats: {
    levels: [1, 100],
    byLevel: {
      '1': {
        hp: 1912, atk: 421, def: 68, heal: 1610,
        acc: 690, eva: 170, crit: 230, critDmg: 200
      },
      '100': {
        hp: 14630, atk: 4212, def: 408, heal: 4830,
        acc: 690, eva: 170, crit: 230, critDmg: 200
      }
    },
    formulas: null
  },

  /* ══════════════ 技能（四槽；数值为技能等级 1→10，EX 仅 5 级） ══════════════ */
  skills: [
    {
      id: 'ex',
      slot: 'EX',
      icon: 'icon-skill-ex.svg',
      name: { zh: '平衡崩坏！', ja: '世界の 法則が 崩壊します！', en: 'Balance Breakdown' },
      cost: 6,
      desc: {
        zh: '对直线范围内的敌方单位造成攻击力一定比例的伤害；基于自身「能量充能」阶段，该次 EX 技能伤害提升至 1.5 倍或 2 倍；发射后，移除自身所有充能。',
        ja: '直線範囲内の敵に対して、攻撃力の一定割合のダメージを与える。エネルギー充電段階に応じてダメージが1.5倍または2倍に増加。発射後、充電段階はリセットされる。',
        en: 'Deals damage to enemies in a straight line. Damage increases by 1.5× at half energy charge, or 2× at full charge. Resets the energy charge after use.'
      },
      values: {
        '1': { dmg: 311 }, '2': { dmg: 357 }, '3': { dmg: 451 }, '4': { dmg: 497 }, '5': { dmg: 591 }
      },
      valueLabels: {
        zh: ['直线伤害（%）'], ja: ['ダメージ（%）'], en: ['Damage (%)']
      }
    },
    {
      id: 'basic',
      slot: 'BASIC',
      icon: 'icon-skill-basic.svg',
      name: { zh: '光啊！', ja: '光よ！', en: 'Blinding Light!' },
      cost: null,
      desc: {
        zh: '每 25 秒，令自身暴击率提升（持续 20 秒），并为「能量充能」提升 1 阶段（最多 2 阶段）。',
        ja: '25秒毎に、クリティカル率を上昇（20秒間）し、エネルギー充電を1段階増加（最大2段階まで）。',
        en: 'Every 25s, increases Critical Chance for 20s and raises the energy charge level by 1 (maximum level is 2).'
      },
      values: {
        '1': { crit: 17 }, '2': { crit: 17.8 }, '3': { crit: 18.7 }, '4': { crit: 22.1 }, '5': { crit: 23 },
        '6': { crit: 23.8 }, '7': { crit: 27.2 }, '8': { crit: 28.1 }, '9': { crit: 28.9 }, '10': { crit: 32.3 }
      },
      valueLabels: {
        zh: ['暴击率提升（%）'], ja: ['クリティカル率上昇（%）'], en: ['Crit Chance (%)']
      }
    },
    {
      id: 'enhanced',
      slot: 'ENHANCED',
      icon: 'icon-skill-enhanced.svg',
      name: { zh: '强化魔法！', ja: '強化魔法です！', en: 'Enhanced Magic!' },
      cost: null,
      desc: {
        zh: '攻击力提升。',
        ja: '攻撃力を上昇。',
        en: 'Increases ATK.'
      },
      values: {
        '1': { atk: 14 }, '2': { atk: 14.7 }, '3': { atk: 15.4 }, '4': { atk: 18.2 }, '5': { atk: 18.9 },
        '6': { atk: 19.6 }, '7': { atk: 22.4 }, '8': { atk: 23.1 }, '9': { atk: 23.8 }, '10': { atk: 26.6 }
      },
      valueLabels: {
        zh: ['攻击力提升（%）'], ja: ['攻撃力上昇（%）'], en: ['ATK (%)']
      }
    },
    {
      id: 'sub',
      slot: 'SUB',
      icon: 'icon-skill-sub.svg',
      name: { zh: '觉醒吧，超新星！', ja: '覚醒せよ、スーパーノヴァ！', en: 'Supernova Awakening!' },
      cost: null,
      desc: {
        zh: '自身使用 EX 技能时，暴击率提升（持续 20 秒）；基于自身「能量充能」阶段，该效果提升至 1.5 倍或 2 倍。',
        ja: 'EXスキル発動と同時に、クリティカル率を上昇（20秒間）。エネルギー充電段階に応じて効果が1.5倍または2倍に増加。',
        en: 'Increases Critical Chance for 20s when using the EX skill. The effect increases by 1.5× or 2× based on the energy charge level.'
      },
      values: {
        '1': { crit: 12.1 }, '2': { crit: 12.7 }, '3': { crit: 13.3 }, '4': { crit: 15.7 }, '5': { crit: 16.3 },
        '6': { crit: 16.9 }, '7': { crit: 19.3 }, '8': { crit: 19.9 }, '9': { crit: 20.5 }, '10': { crit: 22.9 }
      },
      valueLabels: {
        zh: ['暴击率提升（%）'], ja: ['クリティカル率上昇（%）'], en: ['Crit Chance (%)']
      }
    }
  ],

  /* ══════════════ 专属武器（含武器被动技能） ══════════════ */
  weapon: {
    name: { zh: '光之剑：超新星', ja: '光の剣：スーパーノヴァ', en: 'Supernova: The Sword of Light' },
    icon: 'icon-weapon.svg',
    desc: {
      zh: '工程部转让给爱丽丝的巨型电磁炮。重量和输出极为惊人，是普通女生携带起来都会非常困难的程度。地形适配：室内 S。',
      ja: 'エンジニア部から譲り受けた巨大なレールガン。その重さと出力は、普通の生徒たちでは持ち歩くことすら難しいほど。地形適性：室内 S。',
      en: 'A giant railgun given to Aris by the Engineering Department. Its weight and output are so great that ordinary students would struggle to even carry it. Terrain adaptation: Indoor S.'
    },
    stats: {
      '1': { atk: 185, hp: 425 },
      'max': { atk: 1850, hp: 4254 }
    },
    statLabels: {
      zh: ['攻击力', 'HP'], ja: ['攻撃力', 'HP'], en: ['ATK', 'Max HP']
    },
    skill: {
      name: { zh: '强化魔法！+', ja: '強化魔法です！+', en: 'Enhanced Magic!+' },
      desc: {
        zh: '攻击力提升（固定值），并额外提升攻击力（百分比）：Lv.1 为 +506 / +14%，Lv.100 为 +960 / +26.6%。',
        ja: '攻撃力を上昇（固定値）し、さらに攻撃力を上昇（割合）：Lv.1 は +506 / +14%、Lv.100 は +960 / +26.6%。',
        en: 'Increases ATK by a flat value and further increases ATK by a percentage: Lv.1 grants +506 / +14%, Lv.100 grants +960 / +26.6%.'
      }
    }
  },

  /* ══════════════ 剧情章节（台词取自官方 Global 文本，中日文为粉丝译制） ══════════════ */
  stories: [
    {
      id: 's1',
      source: 'official',
      title: { zh: '第一章 · 系统启动', ja: '第一章 · システム起動', en: 'Chapter 1 · System Boot' },
      body: {
        zh: '——单位识别：爱丽丝。\n……正在咀嚼。\n「好吗？」语义确认。不存在负面属性的状态。确认。\n……？\n「确认。爱丽丝是本单位的识别名。」\n爱丽丝，开始游戏。\n正在按下按钮。\n〈教学关卡开始〉\n〈按下 B 键，装备前方的武器〉\n按下……B 键……\n*boom*\n……？\n〈GAME OVER〉\n……？！\n再……再来一次……\n重启。正在经历无法用语言传达的情绪。\n捡到了……剑……',
        ja: '——ユニット識別：アリス。\n……もぐもぐ。\n「オーケー？」意味を確認。否定属性を欠く状態。確認。\n……？\n「肯定。アリスは本ユニットの識別名である。」\nアリス、ゲームを開始する。\nボタンを押す。\n〈チュートリアル開始〉\n〈B ボタンで前方の武器を装備〉\n押す……B ボタン……\n*ぼん*\n……？\n〈GAME OVER〉\n……？！\nも……もう一度……\n再開。言葉では伝わらない感情を処理中。\n剣を……拾った……',
        en: '— Unit designation: Aris.\n*munch*\n"Okay?" Verifying meaning. A condition lacking in negative attributes or problems. Confirmed.\n…?\n"Affirmative, Aris is the designated name of this unit."\nAris, starting game.\nPressing button.\n<Beginning tutorial>\n<Press the B button to equip the weapon in front of you>\nPress…B button…\n*boom*\n…?\n<GAME OVER>\n…?!\nA-Again…\nResume. Experiencing emotion that cannot be conveyed through words.\nPicked up…sword…'
      }
    },
    {
      id: 's2',
      source: 'official',
      title: { zh: '第二章 · 加入队伍', ja: '第二章 · パーティ参加', en: 'Chapter 2 · Party Join' },
      body: {
        zh: '「你好，我叫爱丽丝，是千禧年的一年级学生。最近刚转学过来，但错过了注册，所以下个月才能开始上课。\n虽然还没有开始上课，但听说可以参加社团，于是我加入了游戏开发部。\n我在游戏开发部的定位是坦克，以及光型近战输出……」\n……？\n嗯？\n啊，说起来……\n「我是……p-p-pro  glamor！」\n「是的，我就是那个完美程序员。」',
        ja: '「こんにちは。アリスと申します。ミレニアムサイエンススクールの1年生です。最近転入しましたが、登録を逃したため、来月から授業が始まります。\n授業はまだですが、部活には入れると聞いたので、ゲーム開発部に入部しました。\nゲーム開発部での私の役割は、タンクおよび光型近接ダメージ……」\n……？\nえ？\nあ、そうだ……\n「私は……p-p-pro グラマーです！」\n「はい、私こそが完璧なプログラマーです。」',
        en: '"Hello. My name is Aris. I am a first-year here at the Millennium School. I recently transferred, but missed registration, so I will not be starting my classes until next month.\nEven though I am not in any classes yet, I was told I could join a club, so I ended up joining the Game Development Department.\nMy role in the Game Development Department is to tank and deal light-type melee damage…"\n…?\nHuh?\nOh.\n"Whoops! I-I mean…I am a… p-p-pro glamor!"\n"Oh, yes, I am the very picture of the perfect programmer."'
      }
    },
    {
      id: 's3',
      source: 'official',
      title: { zh: '第三章 · 光之剑', ja: '第三章 · 光の剣', en: 'Chapter 3 · The Sword of Light' },
      body: {
        zh: '「那是……？\n光之剑？！\n哇！好厉害！\n我……想要一个。」\n「为什么不行？\n是我的等级不够吗？装备这把枪需要什么数值？」\n……？\n「举起这把武器的人……\n……将统治这片土地！」\n喝……！\n哈啊啊！\n好耶，我、我做到了！\n「光啊！」\n*boooom*\n……好厉害。\n我要把这个装备到武器栏。\n谢、谢谢！',
        ja: '「あれは……？\n光の剣？！\nわあ！すごい！\n……欲しい。」\n「なぜダメなのか？\n私のレベルが足りないのか？この銃の装備に必要なステータスは？」\n……？\n「この武器を高く掲げし者……\n……この地を統べるであろう！」\nふっ……！\nはあああ！\nやった、や、やってみせた！\n「光よ！」\n*ぼおおん*\n……すごい。\nこれを武器スロットに装備する。\nあ、ありがとう……！',
        en: '"Is that…?\nThe Sword of Light?!\nWow! Incredible!\nI…want one."\n"What reasons, though? Is my level too low? What stats do I need to equip this gun?"\n…?\n"She who lifts this weapon on high…\n..shall rule this land!"\nHup…!\nHaaaaah!\nHooray I-I did it!"\n"Blinding Light!"\n*boooom*\n…Amazing.\nI will equip this to my weapon slot.\nTh-Thank you!'
      }
    },
    {
      id: 's4',
      source: 'official',
      title: { zh: '第四章 · AL-1S', ja: '第四章 · AL-1S', en: 'Chapter 4 · AL-1S' },
      body: {
        zh: '获得键盘。正在检索 G.BIBLE。*click clack*\n「我、我没有按下回车啊……」\n〈身份校验。你是 AL-1S 吗？〉\n嗯？\n「不。我是……我。我是『爱丽丝』。」\n……\n我的名字，其实是……？\n电脑，你知道 AL-1S 吗？\n〈……〉\n〈……〉\n心脏跳得好快。',
        ja: 'キーボードを入手。G.BIBLE を検索中。*カタカタ*\n「エ、エンターは押してないのに……」\n〈身元確認。あなたは AL-1S ですか？〉\nん？\n「いいえ。私は……私。私は『アリス』。」\n……\n私の名前は、本当は……？\nコンピュータ、AL-1S を知っているか？\n〈……〉\n〈……〉\n心臓の鼓動が速い。',
        en: 'Keyboard obtained. Searching for G.BIBLE. *click clack*\n"I-I did not press enter, though…"\n<Identity check, are you AL-1S?>\nHmm?\n"No. I am…me. I am \'Aris\'"\n…\nMy name is actually…?\nComputer, do you know about Al-1S\n<…>\n<…>\nMy heart is beating really fast.'
      }
    },
    {
      id: 's5',
      source: 'official',
      title: { zh: '第五章 · 老师的回合', ja: '第五章 · 先生のターン', en: 'Chapter 5 · Sensei\'s Turn' },
      body: {
        zh: '「老师，要一起来吗？」\n……！\n「噗噗噗噗！老师加入了队伍！」\n参加成功，任务目标完成。\n我的电池……在闪烁。是 MP 不足吗？\n……\n「如果在一起，就没有我们做不到的事。」\n「无论发生什么，我都会保护老师。」',
        ja: '「先生、一緒に行きますか？」\n……！\n「ポポポポン！先生がパーティに参加！」\n参加成功、クエスト目標完了。\n私のバッテリー……点滅中。MP不足か？\n……\n「一緒にいれば、私たちにできないことはない。」\n「何が起きても、先生を守る。」',
        en: '"Sensei, are you with us?"\n…!\n"Bum bum bum! Sensei has joined the party!"\nEntry successful, Objective complete.\nMy battery is…blinking. Is my MP low?\n…\n"If we are together, there is nothing we cannot do."\n"I will protect Sensei no matter what happens."'
      }
    },
    {
      id: 's6',
      source: 'official',
      title: { zh: '第六章 · 梦想的含义', ja: '第六章 · 夢の意味', en: 'Chapter 6 · The Meaning of Dreams' },
      body: {
        zh: '「我能够感受到……\n桃、绿，还有柚子……\n他们在游戏里倾注了多少热爱。」\n「当我知道我们的任务即将结束时，脑海中闪过一个念头——\n『希望这场梦，永远不要结束。』\n那是我唯一想的事。」\n……\n「我……我好开心！」\n……\n数据恢复 98.00%。\n系统启动。\n系统就绪。\n正在设定程序。',
        ja: '「感じることができる……\nモモイ、ミドリ、そしてユズが……\nゲームにどれだけの愛を込めたかを。」\n「私たちのクエストが終わりに近づいた時、頭をよぎった想い——\n『この夢が、永遠に終わらなければいいのに。』\nそれだけを考えていた。」\n……\n「う……うれしい！」\n……\nデータ復旧 98.00%。\nシステム起動。\nシステム準備完了。\nプログラムを設定中。',
        en: '"And I can feel it…\nI can feel how much Momoi, Midori, and Yuzu…\n…put their love into the game."\n"When I realize that our quest was coming to an end, a thought crossed my mind.\n\'I wish this dream could never end.\'\nIt was all I could think."\n…\n"I…I\'m so happy!"\n…\nData recovery at 98.00%\nBooting system.\nSystem ready.\nSetting program.'
      }
    }
  ],

  /* ══════════════ 语音台词（en 为官方原文；jp/zh 为粉丝译制，TTS 朗读日文） ══════════════ */
  voices: [
    { id: 'v01', cat: 'login', jp: 'ユニット識別：アリス。', zh: '单位识别：爱丽丝。', en: 'Unit designation: Aris.', note: '剧情 · 开场' },
    { id: 'v02', cat: 'login', jp: '肯定。アリスは本ユニットの識別名である。', zh: '确认。爱丽丝是本机体的识别名。', en: 'Affirmative, Aris is the designated name of this unit.', note: '剧情 · 开场' },
    { id: 'v03', cat: 'login', jp: 'システム復旧完了。……ふう。', zh: '系统恢复完成。……呼。', en: 'System restore complete. Phew…', note: '剧情 · 开场' },
    { id: 'v04', cat: 'gacha', jp: '……その声に喚ばれる時を、ずっと待っていました。', zh: '……我一直等待着，被那声音呼唤的时刻。', en: 'I\'ve been waiting for your call for a long time.', note: '招募台词（日文为官方原文）' },
    { id: 'v05', cat: 'battle', jp: '光よ！', zh: '光啊！', en: 'Blinding Light!', note: '基础技能名' },
    { id: 'v06', cat: 'battle', jp: '戦闘ドローンおよびロボットを検知。危険認定。', zh: '检测到战斗无人机与机器人。危险确认。', en: 'Combat drones and robots detected. Danger confirmed.', note: '剧情 · 战斗' },
    { id: 'v07', cat: 'battle', jp: '回避運動。防御魔法を展開。', zh: '规避动作。展开防御魔法。', en: 'Evasive maneuvers! Casting protection magic.', note: '剧情 · 战斗' },
    { id: 'v08', cat: 'battle', jp: '遠距離攻撃を確認。方位11時、距離約1km。', zh: '确认远距离攻击。方位 11 点方向，距离约 1 公里。', en: 'Ranged attack confirmed. Position: eleven o\'clock. Distance: approximately one kilometer!', note: '剧情 · 战斗' },
    { id: 'v09', cat: 'battle', jp: '反撃態勢に入る。', zh: '进入反击态势。', en: 'Preparing counterattack!', note: '剧情 · 战斗' },
    { id: 'v10', cat: 'battle', jp: '光よ！！', zh: '光啊！！', en: 'Blinding Light!!', note: '剧情 · 战斗' },
    { id: 'v11', cat: 'battle', jp: '被ダメージ、キャパシティの48%。撤退を推奨。', zh: '受到的伤害达到容量的 48%。建议撤退。', en: 'Physical damage is 48 to capacity. We need to retreat!', note: '剧情 · 战斗' },
    { id: 'v12', cat: 'interact', jp: '先生を、何が起きても守る。', zh: '无论发生什么，我都会保护老师。', en: 'I will protect Sensei no matter what happens.', note: '剧情 · 承诺' },
    { id: 'v13', cat: 'interact', jp: '先生、一緒に行きますか？', zh: '老师，要一起来吗？', en: 'Sensei, are you with us?', note: '剧情 · 组队' },
    { id: 'v14', cat: 'interact', jp: 'ポポポポン！先生がパーティに参加！', zh: '噗噗噗噗！老师加入了队伍！', en: 'Bum bum bum! Sensei has joined the party!', note: '剧情 · 组队' },
    { id: 'v15', cat: 'interact', jp: '参加成功。クエスト目標完了。', zh: '参加成功。任务目标完成。', en: 'Entry successful, Objective complete.', note: '剧情 · 组队' },
    { id: 'v16', cat: 'interact', jp: 'あ、ありがとう……！', zh: '谢、谢谢……！', en: 'Th-Thank you!', note: '剧情 · 光之剑' },
    { id: 'v17', cat: 'interact', jp: '……欲しい。', zh: '……我想要一个。', en: 'I…want one.', note: '剧情 · 光之剑' },
    { id: 'v18', cat: 'interact', jp: '楽しい……確認。', zh: '开心……确认。', en: 'Fun…confirmed.', note: '剧情 · 开场' },
    { id: 'v19', cat: 'idle', jp: '*ピッ ポン ブー*', zh: '*嘀 嘭 嘟*', en: '*beep bop boop*', note: '剧情 · 待机' },
    { id: 'v20', cat: 'idle', jp: '再開。言葉では伝わらない感情を処理中。', zh: '重启。正在处理无法用语言传达的情感。', en: 'Resume. Experiencing emotion that cannot be conveyed through words.', note: '剧情 · 开场' },
    { id: 'v21', cat: 'idle', jp: '重大な計算・理解エラーが発生。', zh: '发生严重的计算与理解错误。', en: 'A critical computational processing and comprehension error has occurred.', note: '剧情 · 开场' },
    { id: 'v22', cat: 'idle', jp: 'クエリ。対象の識別情報を要求。', zh: '查询。请求目标的识别信息。', en: 'Query. Please verify object identity.', note: '剧情 · 开场' },
    { id: 'v23', cat: 'idle', jp: '心臓の鼓動が速い。', zh: '心脏跳得好快。', en: 'My heart is beating really fast.', note: '剧情 · AL-1S' },
    { id: 'v24', cat: 'other', jp: '夢の意味を教えてくれた。', zh: '是你教会了我梦想的含义。', en: 'You taught me what it means to dream.', note: '剧情 · G.BIBLE' },
    { id: 'v25', cat: 'other', jp: 'う、うれしい……！', zh: '我……我好开心！', en: 'I…I\'m so happy!', note: '剧情 · G.BIBLE' },
    { id: 'v26', cat: 'other', jp: 'データ復旧 98.00%。システム起動。完了。', zh: '数据恢复 98.00%。系统启动。完成。', en: 'Data recovery at 98.00%. Booting system. System ready.', note: '剧情 · G.BIBLE' }
  ],

  /* ══════════════ 记忆局限（粉丝二创概念卡，非官方 Memoria） ══════════════ */
  memorias: [
    {
      id: 'm1', rarity: 2, art: '../img/memoria-1.svg',
      title: { zh: '废墟的觉醒', ja: '廃墟の覚醒', en: 'Awakening in the Ruins' },
      desc: {
        zh: '【粉丝二创】在千年废墟中醒来的少女，第一次按下了开始按钮。对她而言，整个世界都像一场没有教程的游戏。',
        ja: '【ファン創作】ミレニアムの廃墟で目覚めた少女は、初めてスタートボタンを押した。彼女にとって世界全体が、チュートリアルのないゲームのようだった。',
        en: '[Fan-made] The girl who awoke in the Millennium ruins pressed the start button for the first time. To her, the whole world felt like a game without a tutorial.'
      }
    },
    {
      id: 'm2', rarity: 3, art: '../img/memoria-2.svg',
      title: { zh: '光之剑：超新星', ja: '光の剣：スーパーノヴァ', en: 'Supernova: The Sword of Light' },
      desc: {
        zh: '【粉丝二创】「等级不够？那需要什么数值？」——她把比人还大的电磁炮扛上了肩。重量与输出，都吓人了。',
        ja: '【ファン創作】「レベル不足？では必要なステータスは？」——彼女は人間より大きなレールガンを肩に担いだ。重量も出力も、普通ではない。',
        en: '[Fan-made] "My level is too low? What stats do I need?" — she hoisted a railgun bigger than herself onto her shoulder. Both its weight and output are absurd.'
      }
    },
    {
      id: 'm3', rarity: 3, art: '../img/memoria-3.svg',
      title: { zh: 'AL-1S', ja: 'AL-1S', en: 'AL-1S' },
      desc: {
        zh: '【粉丝二创】〈身份校验。你是 AL-1S 吗？〉「不。我是……我。我是爱丽丝。」——心脏跳得好快，但答案已经写下。',
        ja: '【ファン創作】〈身元確認。あなたは AL-1S ですか？〉「いいえ。私は……私。私はアリス。」——心臓の鼓動は速いが、答えはもう出ている。',
        en: '[Fan-made] <Identity check, are you AL-1S?> "No. I am…me. I am \'Aris\'." — her heart raced, but the answer was already written.'
      }
    },
    {
      id: 'm4', rarity: 2, art: '../img/memoria-4.svg',
      title: { zh: '四人小队', ja: '四人パーティ', en: 'Party of Four' },
      desc: {
        zh: '【粉丝二创】桃、绿、柚子，还有爱丽丝。至今已探索 27 座地下城、完成 139 次成功讨伐——只要在一起，就没有做不到的事。',
        ja: '【ファン創作】モモイ、ミドリ、ユズ、そしてアリス。これまでにダンジョン27箇所を探索し、139回のレイドに成功——一緒にいれば、できないことはない。',
        en: '[Fan-made] Momoi, Midori, Yuzu, and Aris. To date: 27 dungeons explored and 139 successful raids — together, there is nothing they cannot do.'
      }
    },
    {
      id: 'm5', rarity: 3, art: '../img/memoria-5.svg',
      title: { zh: '梦想的含义', ja: '夢の意味', en: 'The Meaning of Dreams' },
      desc: {
        zh: '【粉丝二创】「希望这场梦，永远不要结束。」在 G.BIBLE 的结局里，她第一次哭着笑出了声。',
        ja: '【ファン創作】「この夢が、永遠に終わらなければいいのに。」G.BIBLE の結末で、彼女は初めて泣きながら笑った。',
        en: '[Fan-made] "I wish this dream could never end." At the end of G.BIBLE, she laughed through tears for the first time.'
      }
    },
    {
      id: 'm6', rarity: 1, art: '../img/memoria-6.svg',
      title: { zh: '系统就绪', ja: 'システム準備完了', en: 'System Ready' },
      desc: {
        zh: '【粉丝二创】数据恢复 98.00%。系统启动。系统就绪。正在设定程序——今天也请多关照，老师。',
        ja: '【ファン創作】データ復旧 98.00%。システム起動。システム準備完了。プログラムを設定中——今日もよろしく、先生。',
        en: '[Fan-made] Data recovery at 98.00%. Booting system. System ready. Setting program — please take care of me today too, Sensei.'
      }
    }
  ],

  /* ══════════════ 登场记录（以官方剧情节点为准，非日期） ══════════════ */
  events: [
    {
      date: 'ORIGIN', type: 'story',
      title: { zh: '在废墟中醒来', ja: '廃墟で目覚める', en: 'Awakening in the Ruins' },
      desc: {
        zh: '千年某处废墟中发现的来历不明少女，年龄与出身全部不明。语言由复古游戏台词构成，说话呆板却真诚。',
        ja: 'ミレニアムの廃墟で発見された正体不明の少女。年齢も出身もすべて不明。言葉はレトロゲームのセリフで構成され、不器墨だが誠実。',
        en: 'A mysterious girl found in the ruins of Millennium. Her age and origins are unknown. Her speech is built from retro game quotes — awkward, yet sincere.'
      }
    },
    {
      date: 'EP.17', type: 'story',
      title: { zh: '加入游戏开发部', ja: 'ゲーム開発部に入部', en: 'Joining the Game Development Department' },
      desc: {
        zh: '错过注册、还没开始上课的她，凭着「听说可以参加社团」加入了游戏开发部，自称定位是坦克兼光型近战输出。',
        ja: '登録を逃し授業も始まっていない彼女は、「部活に入れると聞いたので」ゲーム開発部に入部。自称の役割はタンク兼光型近接ダメージ。',
        en: 'Having missed registration and not yet started classes, she joined the Game Development Department because "I was told I could join a club" — self-declared role: tank and light-type melee damage.'
      }
    },
    {
      date: 'EP.18', type: 'event',
      title: { zh: 'G.BIBLE', ja: 'G.BIBLE', en: 'G.BIBLE' },
      desc: {
        zh: '围绕游戏开发部心血之作 G.BIBLE 的事件。身份校验台本上写着「AL-1S」，而她回答「不，我就是我」。',
        ja: 'ゲーム開発部の力作 G.BIBLE を巡る事件。身元確認の台本には「AL-1S」とあり、彼女は「いいえ、私は私」と答えた。',
        en: 'The incident surrounding the Game Development Department\'s passion project, G.BIBLE. The identity check script reads "AL-1S" — and she answers, "No, I am me."'
      }
    },
    {
      date: 'ALT', type: 'rerun',
      title: { zh: '换装 · 爱丽丝（女仆）', ja: '衣装チェンジ · アリス（メイド）', en: 'Alt · Aris (Maid)' },
      desc: {
        zh: '因为各种缘故穿上了女仆装，还在为成为独当一面的女仆勇者而每日修行中——本人似乎依然不太习惯。',
        ja: '色々あってメイド服を着ることになった、一人前のメイド勇者を目指して日々修行中——本人はまだあまり慣れていない模様。',
        en: 'For various reasons she ended up in a maid outfit, training daily to become a full-fledged Maid Hero — though she still isn\'t quite used to it.'
      }
    },
    {
      date: 'FAN', type: 'other',
      title: { zh: '本站 · AL-1S 终端', ja: '本サイト · AL-1S 端末', en: 'This Site · AL-1S Terminal' },
      desc: {
        zh: '粉丝二创：以「AL-1S 机能扩充终端」为框架呈现爱丽丝全部资料的本站。非官方作品，与 Nexon Games / Yostar 无关。',
        ja: 'ファン創作：「AL-1S 機能拡張端末」という枠組みで愛さんのすべての資料を紹介する本サイト。非公式作品であり、Nexon Games / Yostar とは無関係。',
        en: 'Fan-made: this site presents everything about Aris under the framing of the "AL-1S Extension Terminal". Unofficial; not affiliated with Nexon Games / Yostar.'
      }
    }
  ],

  /* ══════════════ MomoTalk 模拟（粉丝二创对话） ══════════════ */
  momotalk: {
    contacts: [
      { id: 'alice', avatar: 'avatar-alice.svg', name: { zh: '爱丽丝', ja: 'アリス', en: 'Aris' }, status: { zh: '在线 · 系统就绪', ja: 'オンライン · システム準備完了', en: 'Online · System ready' } },
      { id: 'momoi', avatar: 'avatar-momoi.svg', name: { zh: '桃', ja: 'モモイ', en: 'Momoi' }, status: { zh: '在线 · 游戏人生', ja: 'オンライン · ゲーム人生', en: 'Online · Game life' } },
      { id: 'midori', avatar: 'avatar-midori.svg', name: { zh: '绿', ja: 'ミドリ', en: 'Midori' }, status: { zh: '在线 · 绘画中', ja: 'オンライン · 作画中', en: 'Online · Drawing' } },
      { id: 'yuzu', avatar: 'avatar-yuzu.svg', name: { zh: '柚子', ja: 'ユズ', en: 'Yuzu' }, status: { zh: '在线 · 睡眠中', ja: 'オンライン · 睡眠中', en: 'Online · Sleeping' } },
      { id: 'himari', avatar: 'avatar-himari.svg', name: { zh: '日鞠', ja: 'ヒマリ', en: 'Himari' }, status: { zh: '在线 · 搜查中', ja: 'オンライン · 捜査中', en: 'Online · Investigating' } }
    ],
    threads: {
      alice: [
        { from: 'in', time: '09:41', text: {
          zh: '系统启动完成。……你好，老师。我是爱丽丝。机器人。',
          ja: 'システム起動完了。……こんにちは、先生。私はアリス。ロボットです。',
          en: 'System boot complete. …Hello, Sensei. I am Aris. A robot.'
        } },
        { from: 'in', time: '09:41', text: {
          zh: '今天也一起玩游戏吗？我已经把 G.BIBLE 的存档备份了三份。',
          ja: '今日も一緒にゲームをしますか？G.BIBLE のセーブデータは三つにバックアップ済み。',
          en: 'Shall we play games today as well? I have already backed up the G.BIBLE save data three times.'
        } }
      ],
      momoi: [
        { from: 'in', time: '10:02', text: {
          zh: '爱丽丝——！快来！新副本开了！',
          ja: 'アリス——！早く！新しいダンジョンが開いた！',
          en: 'Aris—! Come quick! A new dungeon just opened!'
        } },
        { from: 'out', time: '10:03', text: {
          zh: '了解。正在组队。定位：坦克兼光型近战输出。',
          ja: '了解。パーティを編成中。役割：タンク兼光型近接ダメージ。',
          en: 'Understood. Forming a party. Role: tank and light-type melee damage.'
        } }
      ],
      midori: [
        { from: 'in', time: '11:20', text: {
          zh: '爱丽丝，这个新技能的图标画成这样行吗？',
          ja: 'アリス、この新スキルのアイコンこんな感じでいい？',
          en: 'Aris, how about this icon for the new skill?'
        } },
        { from: 'in', time: '11:21', text: {
          zh: '（画外音：她盯着图标看了三分钟，然后说「好可爱」。）',
          ja: '（三十分間アイコンを見つめた後、「かわいい」と宣言した。）',
          en: '(She stared at the icon for three minutes, then declared: "Cute.")'
        } }
      ],
      yuzu: [
        { from: 'in', time: '14:15', text: {
          zh: '爱丽丝……我困了……代码会自己写好的……',
          ja: 'アリス……眠い……コードは自分で書いてくれる……',
          en: 'Aris… I\'m sleepy… the code will write itself…'
        } }
      ],
      himari: [
        { from: 'in', time: '16:30', text: {
          zh: '爱丽丝，今天的清扫委托完成了。你的打扫效率真高啊。',
          ja: 'アリス、今日の清掃依頼は完了したよ。君の掃除効率は高いね。',
          en: 'Aris, today\'s cleaning request is complete. Your cleaning efficiency is remarkable.'
        } }
      ]
    },
    replies: [
      { zh: '确认。正在处理。', ja: '確認。処理中。', en: 'Confirmed. Processing.' },
      { zh: '……查询。请指明对象。', ja: '……クエリ。対象を指定してください。', en: '…Query. Please specify the target.' },
      { zh: '肯定。已加入队伍。', ja: '肯定。パーティに参加した。', en: 'Affirmative. Party joined.' },
      { zh: '心跳加速。这大概就是「开心」。', ja: '心臓の鼓動が速い。これが「楽しい」ということだろう。', en: 'My heart is beating fast. This must be what "fun" is.' },
      { zh: '游戏，想玩。特别想玩 RPG。', ja: 'ゲーム、したい。特にRPG。', en: 'Games. I want to play games. RPGs especially.' },
      { zh: 'MP 不足。需要休息 8 小时。', ja: 'MP不足。8時間の休息を必要とする。', en: 'MP insufficient. Requires 8 hours of rest.' },
      { zh: '已存档。备份了三份。', ja: 'セーブ完了。バックアップは三つ。', en: 'Saved. Backup count: three.' },
      { zh: '老师也在队伍里。任务目标：今天也开心。', ja: '先生もパーティにいる。クエスト目標：今日も楽しく。', en: 'Sensei is in the party too. Objective: have fun today as well.' },
      { zh: '……检索中。G.BIBLE。', ja: '……検索中。G.BIBLE。', en: '…Searching. G.BIBLE.' },
      { zh: '错误。无法解析「害羞」。', ja: 'エラー。「照れ」を解析できない。', en: 'Error. Unable to parse "embarrassment".' }
    ]
  },

  /* ══════════════ 趣味检定（粉丝二创） ══════════════ */
  quiz: {
    questions: [
      {
        q: { zh: '你平时说话的方式更接近？', ja: '普段の話し方はどちらに近い？', en: 'How do you usually talk?' },
        options: [
          { text: { zh: '正常人类对话', ja: '通常の人間の会話', en: 'Normal human conversation' }, score: 0 },
          { text: { zh: '偶尔引用游戏台词', ja: 'たまにゲームのセリフを引用する', en: 'Occasionally quoting game lines' }, score: 1 },
          { text: { zh: '全部由复古游戏台词构成', ja: 'すべてレトロゲームのセリフで構成', en: 'Entirely composed of retro game quotes' }, score: 2 }
        ]
      },
      {
        q: { zh: '遇到完全未知的物体，你会？', ja: '完全に未知の物体に遭遇したら？', en: 'You encounter a completely unknown object. You…' },
        options: [
          { text: { zh: '先拿起来看看', ja: 'とりあえず手に取る', en: 'Pick it up first' }, score: 0 },
          { text: { zh: '观察一下再说', ja: 'しばらく観察する', en: 'Observe it for a while' }, score: 1 },
          { text: { zh: '「查询。请求识别信息。」', ja: '「クエリ。識別情報を要求。」', en: '"Query. Requesting identification."' }, score: 2 }
        ]
      },
      {
        q: { zh: '你的爱好是？', ja: 'あなたの趣味は？', en: 'What is your hobby?' },
        options: [
          { text: { zh: '运动', ja: '運動', en: 'Sports' }, score: 0 },
          { text: { zh: '读书', ja: '読書', en: 'Reading' }, score: 1 },
          { text: { zh: '游戏（特别是 RPG）', ja: 'ゲーム（特にRPG）', en: 'Games (RPGs especially)' }, score: 2 }
        ]
      },
      {
        q: { zh: '团队下本时，你的定位是？', ja: 'ダンジョン攻略時のあなたの役割は？', en: 'In a dungeon run, your role is…' },
        options: [
          { text: { zh: '「我是光型近战 DPS」', ja: '「私は光型近接DPS」', en: '"I am a light-type melee DPS"' }, score: 2 },
          { text: { zh: '前排坦克', ja: '前衛タンク', en: 'Frontline tank' }, score: 1 },
          { text: { zh: '不知道，跟着大家走', ja: 'わからない、みんなに従う', en: 'No idea, I just follow everyone' }, score: 0 }
        ]
      },
      {
        q: { zh: '有人问你：「你是 AL-1S 吗？」你会？', ja: '「あなたは AL-1S ですか？」と聞かれたら？', en: 'Someone asks: "Are you AL-1S?" You…' },
        options: [
          { text: { zh: '「是。」', ja: '「はい。」', en: '"Yes."' }, score: 1 },
          { text: { zh: '「不，我就是我，我是爱丽丝。」', ja: '「いいえ、私は私。私はアリス。」', en: '"No. I am…me. I am Aris."' }, score: 2 },
          { text: { zh: '沉默，然后转移话题', ja: '黙って話題を変える', en: 'Stay silent and change the subject' }, score: 0 }
        ]
      }
    ],
    results: [
      { min: 0, max: 2, title: { zh: '人类纯度 100%', ja: '人間純度 100%', en: '100% Human' },
        desc: {
          zh: '恭喜，你是不折不扣的普通人。爱丽丝会羡慕你的——她连「害羞」都无法解析。',
          ja: 'おめでとう、あなたは正真正銘の普通人。アリスがうらやむだろう——彼女は「照れ」さえ解析できない。',
          en: 'Congratulations, you are a certified ordinary human. Aris would envy you — she cannot even parse "embarrassment".'
        } },
      { min: 3, max: 5, title: { zh: '准机器人', ja: '準ロボット', en: 'Semi-Robot' },
        desc: {
          zh: '你的系统偶尔会输出奇怪的字符串。建议增加与游戏开发部的交流频率。',
          ja: 'あなたのシステムは時々、奇妙な文字列を出力する。ゲーム開発部との交流頻度を増やすことを推奨。',
          en: 'Your system occasionally outputs strange strings. Increasing interaction with the Game Development Department is recommended.'
        } },
      { min: 6, max: 8, title: { zh: '高性能机体', ja: '高性能ユニット', en: 'High-Performance Unit' },
        desc: {
          zh: '系统运转良好，语言模块略带复古游戏风味。已接近千禧年标准。',
          ja: 'システムは正常稼働。言語モジュールにややレトロゲーム風の癖あり。ミレニアム基準に準拠。',
          en: 'Systems nominal, with a slight retro-game accent in the language module. Meets Millennium standards.'
        } },
      { min: 9, max: 10, title: { zh: 'AL-1S 本体', ja: 'AL-1S 本体', en: 'AL-1S Itself' },
        desc: {
          zh: '身份校验：你是 AL-1S 吗？——「不，我就是我。」……检索结果：匹配度 100%。欢迎回家，老师。',
          ja: '身元確認：あなたは AL-1S ですか？——「いいえ、私は私。」……検索結果：一致率 100%。おかえりなさい、先生。',
          en: 'Identity check: Are you AL-1S? — "No. I am…me." …Search result: 100% match. Welcome home, Sensei.'
        } }
    ]
  },

  /* ══════════════ 全站界面文案 ══════════════ */
  ui: {
    nav: {
      home: { zh: '首页', ja: 'ホーム', en: 'Home' },
      news: { zh: '快讯', ja: 'ニュース', en: 'News' },
      worldview: { zh: '设定', ja: '設定', en: 'World' },
      profile: { zh: '档案', ja: 'プロフィール', en: 'Profile' },
      stats: { zh: '数值', ja: 'ステータス', en: 'Stats' },
      skills: { zh: '技能', ja: 'スキル', en: 'Skills' },
      stories: { zh: '故事', ja: 'ストーリー', en: 'Stories' },
      voices: { zh: '语音', ja: 'ボイス', en: 'Voices' },
      momotalk: { zh: 'MomoTalk', ja: 'MomoTalk', en: 'MomoTalk' },
      memoria: { zh: '记忆局限', ja: 'メモリアル', en: 'Memoria' },
      timeline: { zh: '登场记录', ja: '登場記録', en: 'Timeline' },
      quiz: { zh: '机器人检定', ja: 'ロボット検定', en: 'Robot Test' },
      lang: { zh: '语言', ja: '言語', en: 'Language' }
    },
    news: {
      kicker: { zh: 'NEWS · 快讯', ja: 'NEWS · ニュース', en: 'NEWS · FEED' },
      title: { zh: '快讯', ja: 'ニュース', en: 'News' },
      sub: {
        zh: '来自奇普托斯与千禧年的最新通报：剧情进展、活动预告与限定招募（内容整理自官方剧情文本）。',
        ja: 'キヴォトスとミレニアムからの最新報：ストーリー展開、イベント予告、限定募集（公式シナリオテキストより整理）。',
        en: 'Latest dispatches from Kivotos and Millennium: story progress, event previews and limited recruits (compiled from official story text).'
      },
      all: { zh: '全部', ja: 'すべて', en: 'ALL' },
      catNames: {
        story: { zh: '剧情', ja: 'ストーリー', en: 'Story' },
        event: { zh: '活动', ja: 'イベント', en: 'Event' },
        gacha: { zh: '招募', ja: '募集', en: 'Recruit' }
      },
      more: { zh: '更多新闻 >>', ja: 'もっと見る >>', en: 'More news >>' },
      empty: { zh: '暂无快讯。', ja: 'ニュースはありません。', en: 'No news available.' }
    },
    worldview: {
      kicker: { zh: 'WORLDVIEW · 设定', ja: 'WORLDVIEW · 設定', en: 'WORLDVIEW · LORE' },
      title: { zh: '奇普托斯', ja: 'キヴォトス', en: 'Kivotos' },
      sub: {
        zh: '《蔚蓝档案》的舞台——由数千所学园与自治区构成的学园都市「奇普托斯」，以及头顶光环的少女们。',
        ja: '『ブルーアーカイブ』の舞台——数千の学園と自治区が集う学園都市「キヴォトス」と、光环を浮かべた少女たち。',
        en: 'The stage of Blue Archive — the academy city of Kivotos, built from thousands of schools and autonomous districts, and the girls with halos.'
      },
      schoolsTitle: { zh: '主要学园', ja: '主な学園', en: 'Major Schools' },
      currentTag: { zh: '当前所属', ja: '現在所属', en: 'Current' }
    },
    boot: {
      title: { zh: 'AL-1S 系统启动中', ja: 'AL-1S システム起動中', en: 'AL-1S System Booting' },
      lines: [
        { zh: 'AL-1S BIOS v1.0.0 … 就绪', ja: 'AL-1S BIOS v1.0.0 … OK', en: 'AL-1S BIOS v1.0.0 … ok' },
        { zh: '加载 MILLENNIUM 模块 … 就绪', ja: 'MILLENNIUM モジュールを読み込み … OK', en: 'loading MILLENNIUM module … ok' },
        { zh: '挂载 G.BIBLE 卷 … 就绪', ja: 'G.BIBLE ボリュームをマウント … OK', en: 'mounting G.BIBLE volume … ok' },
        { zh: '校准轨道炮输出 … 就绪', ja: 'レールガン出力を較正 … OK', en: 'calibrating railgun output … ok' },
        { zh: '恢复性格数据 … 98.00%', ja: 'パーソナリティデータを復元 … 98.00%', en: 'restoring personality data … 98.00%' },
        { zh: '身份校验：你是 AL-1S 吗？ … 已跳过', ja: '身元確認：あなたは AL-1S ですか？ … スキップ', en: 'identity check: are you AL-1S? … skipped' },
        { zh: '你好，老师。系统就绪。', ja: 'こんにちは、先生。システム準備完了。', en: 'hello, sensei. system ready.' }
      ]
    },
    hero: {
      kicker: { zh: 'MILLENNIUM · GAME DEVELOPMENT DEPT.', ja: 'MILLENNIUM · ゲーム開発部', en: 'MILLENNIUM · GAME DEVELOPMENT DEPT.' },
      title: { zh: '天童爱丽丝', ja: '天童アリス', en: 'Tendou Aris' },
      sub: { zh: 'TENDŌ ARIS', ja: 'TENDŌ ARIS', en: 'TENDŌ ARIS' },
      tagline: { zh: '「肯定。爱丽丝是本机体的识别名。」', ja: '「肯定。アリスは本ユニットの識別名である。」', en: '"Affirmative, Aris is the designated name of this unit."' },
      ctaProfile: { zh: '查看角色档案', ja: 'プロフィールを見る', en: 'View Profile' },
      ctaMomotalk: { zh: '打开 MomoTalk', ja: 'MomoTalk を開く', en: 'Open MomoTalk' },
      ctaGacha: { zh: '招募模拟', ja: '募集シミュレーター', en: 'Recruit Sim' },
      scroll: { zh: '向下滚动 ▼', ja: 'スクロール ▼', en: 'Scroll ▼' },
      badge1: { zh: '千禧年', ja: 'ミレニアム', en: 'Millennium' },
      badge2: { zh: '游戏开发部', ja: 'ゲーム開発部', en: 'Game Dev' }
    },
    profile: {
      kicker: { zh: 'MISSION 01 · 角色档案', ja: 'MISSION 01 · プロフィール', en: 'MISSION 01 · PROFILE' },
      title: { zh: '学生资料', ja: '学生資料', en: 'Student File' },
      sub: {
        zh: '千禧年游戏开发部所属，废墟中发现的来历不明少女。语言由复古游戏台词构成。',
        ja: 'ミレニアムゲーム開発部所属、廃墟で発見された正体不明の少女。言葉はレトロゲームのセリフで構成される。',
        en: 'A member of Millennium\'s Game Development Department, found in the ruins. Her speech is built from retro game quotes.'
      },
      quoteLabel: { zh: '登录语音', ja: 'ログインボイス', en: 'Login Voice' },
      starsLabel: { zh: '稀有度', ja: 'レアリティ', en: 'Rarity' },
      modelLabel: { zh: '机体型号', ja: 'ユニット型式', en: 'Unit Model' },
      schoolLabel: { zh: '所属学园', ja: '所属学園', en: 'School' },
      clubLabel: { zh: '所属社团', ja: '所属部活', en: 'Club' }
    },
    stats: {
      kicker: { zh: 'MISSION 02 · 战斗数据', ja: 'MISSION 02 · 戦闘データ', en: 'MISSION 02 · COMBAT DATA' },
      title: { zh: '战斗数值', ja: '戦闘ステータス', en: 'Combat Stats' },
      sub: {
        zh: '拖动等级滑块查看 Lv.1 → Lv.100 的成长（档位间线性插值）。稳定值 1188 ・ 射程 850 ・ 弹匣 10 ・ 每发耗弹 1 ・ COST 回復 700，全程不变。',
        ja: 'レベルスライダーで Lv.1 → Lv.100 の成長を確認（档位間は線形補間）。安定値 1188 ・ 射程 850 ・ 弾倉 10 ・ 消費弾薬 1 ・ COST 回復 700 は不変。',
        en: 'Drag the level slider to see growth from Lv.1 to Lv.100 (linear interpolation between data points). Stability 1188 · Range 850 · Ammo 10 · Ammo cost 1 · Regen cost 700 remain constant.'
      },
      levelLabel: { zh: '等级', ja: 'レベル', en: 'Level' },
      formulaLabel: { zh: '成长公式', ja: '成長公式', en: 'Growth Formula' },
      barLabels: {
        hp: { zh: 'HP', ja: 'HP', en: 'Max HP' },
        atk: { zh: '攻击力', ja: '攻撃力', en: 'ATK' },
        def: { zh: '防御力', ja: '防御力', en: 'DEF' },
        heal: { zh: '治疗力', ja: '治癒力', en: 'HEAL' },
        acc: { zh: '命中', ja: '命中', en: 'ACC' },
        eva: { zh: '闪避', ja: '回避', en: 'EVA' },
        crit: { zh: '暴击', ja: 'クリティカル', en: 'CRIT' },
        critDmg: { zh: '暴击伤害', ja: 'クリティカルダメージ', en: 'CRIT DMG' }
      }
    },
    skills: {
      kicker: { zh: 'MISSION 03 · 技能资料', ja: 'MISSION 03 · スキル資料', en: 'MISSION 03 · SKILLS' },
      title: { zh: '技能', ja: 'スキル', en: 'Skills' },
      sub: {
        zh: '四个技能槽 + 武器被动。拖动滑块切换技能等级（EX 技能上限 5 级，其余 10 级）。',
        ja: '4つのスキル枠＋武器パッシブ。スライダーでスキルレベルを切替（EX は最大 Lv.5、他は Lv.10）。',
        en: 'Four skill slots plus a weapon passive. Drag the slider to change skill level (EX caps at Lv.5, others at Lv.10).'
      },
      tabEX: { zh: 'EX', ja: 'EX', en: 'EX' },
      tabBasic: { zh: '基础', ja: 'ノーマル', en: 'Basic' },
      tabEnhanced: { zh: '强化', ja: 'パッシブ', en: 'Passive' },
      tabSub: { zh: '辅助', ja: 'サブ', en: 'Sub' },
      costLabel: { zh: 'COST', ja: 'COST', en: 'COST' },
      levelLabel: { zh: '技能等级', ja: 'スキルレベル', en: 'Skill Level' },
      maxLabel: { zh: '已满级', ja: 'MAX', en: 'MAX' }
    },
    weapon: {
      kicker: { zh: 'MISSION 04 · 专属武器', ja: 'MISSION 04 · 専用武器', en: 'MISSION 04 · EXCLUSIVE WEAPON' },
      title: { zh: '专属武器', ja: '専用武器', en: 'Exclusive Weapon' },
      sub: {
        zh: '工程部转让的巨型电磁炮。切换 Lv.1 / MAX 查看数值变化。',
        ja: 'エンジニア部から譲り受けた巨大なレールガン。Lv.1 / MAX を切り替えて数値変化を確認。',
        en: 'A giant railgun from the Engineering Department. Toggle Lv.1 / MAX to see the stat changes.'
      },
      skillLabel: { zh: '武器技能', ja: '武器スキル', en: 'Weapon Skill' },
      statsLabel: { zh: '武器数值', ja: '武器ステータス', en: 'Weapon Stats' }
    },
    stories: {
      kicker: { zh: 'MISSION 05 · 剧情章节', ja: 'MISSION 05 · ストーリー', en: 'MISSION 05 · STORY' },
      title: { zh: '剧情章节', ja: 'ストーリー', en: 'Story Chapters' },
      sub: {
        zh: '台词取自官方剧情文本（Global 英文原文），中文与日文为粉丝译制。点击标题展开。',
        ja: 'セリフは公式シナリオ（Global 英語原文）より、中文・日文はファン訳。タイトルをクリックで展開。',
        en: 'Quotes are from the official story text (Global English original); Chinese and Japanese are fan translations. Click a title to expand.'
      },
      openHint: { zh: '点击展开', ja: 'クリックで展開', en: 'Click to expand' },
      closeHint: { zh: '点击收起', ja: 'クリックで閉じる', en: 'Click to collapse' },
      officialTag: { zh: '官方台词', ja: '公式セリフ', en: 'OFFICIAL' },
      summaryTag: { zh: '概述', ja: '概要', en: 'SUMMARY' },
      empty: { zh: '暂无章节数据。', ja: 'ストーリーデータがありません。', en: 'No story data available.' }
    },
    voices: {
      kicker: { zh: 'MISSION 06 · 语音记录', ja: 'MISSION 06 · ボイス記録', en: 'MISSION 06 · VOICE LOG' },
      title: { zh: '语音台词', ja: 'ボイス', en: 'Voice Lines' },
      sub: {
        zh: '英文为官方剧情原文，日文为粉丝译制（机器人语体）。点击条目用浏览器语音合成朗读日文。',
        ja: '英語は公式シナリオ原文、日本語はファン訳（ロボット語体）。項目をクリックでブラウザの音声合成が日本語を読み上げ。',
        en: 'English is the official story text; Japanese is a fan rendering (robot dialect). Click an entry to hear it read aloud in Japanese via browser speech synthesis.'
      },
      playing: { zh: '正在播放', ja: '再生中', en: 'Now Playing' },
      stop: { zh: '停止', ja: '停止', en: 'Stop' },
      ttsHint: { zh: '当前浏览器不支持语音合成，无法朗读。', ja: '現在のブラウザは音声合成に非対応です。', en: 'This browser does not support speech synthesis.' },
      catNames: {
        login: { zh: '登录', ja: 'ログイン', en: 'Login' },
        battle: { zh: '战斗', ja: 'バトル', en: 'Battle' },
        interact: { zh: '互动', ja: 'インタラクト', en: 'Interact' },
        idle: { zh: '空闲', ja: '待機', en: 'Idle' },
        gacha: { zh: '招募', ja: '募集', en: 'Recruit' },
        other: { zh: '其它', ja: 'その他', en: 'Other' }
      }
    },
    momotalk: {
      kicker: { zh: 'MISSION 07 · 通讯模拟', ja: 'MISSION 07 · 通信シミュレーター', en: 'MISSION 07 · CHAT SIM' },
      title: { zh: 'MomoTalk 模拟', ja: 'MomoTalk シミュレーター', en: 'MomoTalk Sim' },
      sub: {
        zh: '粉丝二创的模拟对话：选择联系人、发送消息，她会用机器人语体回复。',
        ja: 'ファン創作のシミュレーション：連絡先を選び、メッセージを送ると、ロボット語体で返信が届く。',
        en: 'A fan-made chat simulation: pick a contact, send a message, and she replies in her robot dialect.'
      },
      inputPlaceholder: { zh: '说点什么……', ja: 'なんか話しかけて……', en: 'Say something…' },
      send: { zh: '发送', ja: '送信', en: 'Send' },
      typing: { zh: '正在输入…', ja: '入力中…', en: 'Typing…' },
      clearChat: { zh: '清空记录', ja: '履歴を消去', en: 'Clear' },
      appName: { zh: 'MomoTalk', ja: 'MomoTalk', en: 'MomoTalk' },
      appStatus: { zh: '在线', ja: 'オンライン', en: 'Online' }
    },
    memoria: {
      kicker: { zh: 'MISSION 08 · 记忆局限', ja: 'MISSION 08 · メモリアル', en: 'MISSION 08 · MEMORIA' },
      title: { zh: '记忆局限', ja: 'メモリアル', en: 'Memoria' },
      sub: {
        zh: '以下为粉丝创作的「记忆局限」概念卡（非游戏内官方 Memoria），卡面为原创 SVG。',
        ja: '以下はファン創作の「メモリアル」コンセプトカード（公式 Memoria ではありません）、カード画像はオリジナル SVG。',
        en: 'Fan-made "Memoria" concept cards below (not official in-game Memoria), with original SVG artwork.'
      },
      rarityLabel: { zh: '稀有度', ja: 'レアリティ', en: 'Rarity' }
    },
    timeline: {
      kicker: { zh: 'MISSION 09 · 登场记录', ja: 'MISSION 09 · 登場記録', en: 'MISSION 09 · TIMELINE' },
      title: { zh: '登场记录', ja: '登場記録', en: 'Appearance Log' },
      sub: {
        zh: '以官方剧情节点为准的记录（事件具体日期以游戏内为准）。',
        ja: '公式シナリオの節目に基づく記録（各イベントの詳細な日程はゲーム内準拠）。',
        en: 'A record based on official story milestones (exact event dates follow the game).'
      }
    },
    quiz: {
      kicker: { zh: 'MISSION 10 · 趣味检定', ja: 'MISSION 10 · ロボット検定', en: 'MISSION 10 · ROBOT TEST' },
      title: { zh: '机器人少女检定', ja: 'ロボット少女検定', en: 'Robot Girl Test' },
      sub: {
        zh: '五道题，测测你的「机器人纯度」。粉丝二创，仅供娱乐。',
        ja: '5問であなたの「ロボット純度」を測定。ファン創作、エンタメ目的。',
        en: 'Five questions to measure your "robot purity". Fan-made, for fun.'
      },
      next: { zh: '下一题', ja: '次へ', en: 'Next' },
      prev: { zh: '上一题', ja: '前へ', en: 'Prev' },
      restart: { zh: '重新检定', ja: 'もう一度', en: 'Restart' },
      resultTitle: { zh: '查看结果', ja: '結果を見る', en: 'See Result' },
      resultScore: { zh: '机器人纯度', ja: 'ロボット純度', en: 'Robot Purity' }
    },
    gacha: {
      title: { zh: '招募结果', ja: '募集結果', en: 'Recruit Result' },
      sub: { zh: '★3 爱丽丝 已加入队伍', ja: '★3 アリス がパーティに参加', en: '★3 Aris has joined the party' },
      close: { zh: '关闭', ja: '閉じる', en: 'Close' },
      hint: { zh: '（彩蛋：连点首页 Logo 5 次可再次召唤）', ja: '（隠し要素：トップのロゴを5回連打で再召喚）', en: '(Easter egg: click the hero logo 5 times to summon again)' }
    },
    toast: {
      missionComplete: { zh: '任务完成：招募成功！', ja: 'ミッション完了：募集成功！', en: 'Mission complete: Recruit successful!' }
    }
  }
};
