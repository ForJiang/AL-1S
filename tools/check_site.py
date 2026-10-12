#!/usr/bin/env python3
"""G2: HTML 结构 / 契约 id / 资源引用 / data-i18n 键存在性 门禁"""
import os, re, sys, json, subprocess
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NODE = '/tmp/node-v20.18.1-darwin-arm64/bin/node'
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

REQUIRED_IDS = """boot boot-log boot-bar boot-pct boot-title site-nav nav-burger nav-progress
mobile-menu hero hero-logo hero-title hero-sub hero-tagline hero-cta-profile hero-cta-momotalk
hero-cta-gacha hero-art hero-badges profile profile-card profile-stars profile-rows profile-quote
profile-school profile-club stats stat-level stat-level-val stat-bars stat-grid stat-formula
skills skill-tabs skill-detail skill-icon skill-name skill-cost skill-desc skill-level
skill-level-val skill-values weapon weapon-icon weapon-name weapon-desc weapon-stats
weapon-skill weapon-skill-name weapon-skill-desc stories story-list story-empty voices
voice-tabs voice-list voice-now voice-now-text momotalk mt-app mt-sidebar mt-contacts
mt-chat mt-name mt-status mt-input mt-send mt-typing memoria memoria-grid timeline
timeline-list quiz quiz-box quiz-progress quiz-result footer gacha-overlay gacha-burst
gacha-card gacha-close toast-root confetti-canvas""".split()

REQUIRED_SECTIONS = ['hero','profile','stats','skills','weapon','stories','voices','momotalk','memoria','timeline','quiz','footer']

class Checker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.i18n, self.refs, self.stack, self.errors = [], [], [], [], []
        self.sections = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag in ('section', 'footer') and 'id' in a: self.sections.append(a['id'])
        if 'data-i18n' in a: self.i18n.append(a['data-i18n'])
        if 'data-i18n-ph' in a: self.i18n.append(a['data-i18n-ph'])
        for k in ('src', 'href'):
            if k in a: self.refs.append((k, a[k]))
        if tag not in VOID: self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag in VOID: return
        if not self.stack: self.errors.append(f'多余的结束标签 </{tag}>'); return
        if self.stack[-1] == tag: self.stack.pop()
        elif tag in self.stack:
            while self.stack and self.stack[-1] != tag:
                self.errors.append(f'标签未闭合: <{self.stack.pop()}> (遇到 </{tag}>)')
            self.stack and self.stack.pop()
        else: self.errors.append(f'结束标签无对应开始: </{tag}>')

def main():
    html = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    c = Checker(); c.feed(html); c.close()
    errs, warns = list(c.errors), []

    for i in c.stack: errs.append(f'文件结束仍未闭合: <{i}>')

    missing_ids = [i for i in REQUIRED_IDS if i not in c.ids]
    if missing_ids: errs.append(f'缺少契约 id: {missing_ids}')
    missing_secs = [s for s in REQUIRED_SECTIONS if s not in c.sections]
    if missing_secs: errs.append(f'缺少 section: {missing_secs}')

    dup = [i for i in set(c.ids) if c.ids.count(i) > 1]
    if dup: errs.append(f'重复 id: {sorted(dup)}')

    # 资源引用
    for k, v in c.refs:
        if v.startswith(('http://', 'https://', 'mailto:', '#', 'data:', 'tel:')): continue
        p = os.path.normpath(os.path.join(ROOT, v.split('#')[0].split('?')[0]))
        if not os.path.exists(p): errs.append(f'{k} 指向不存在的文件: {v}')

    # data-i18n 键存在性（需要 data.js）
    dump = os.path.join(ROOT, 'tools', 'data-dump.json')
    if os.path.exists(os.path.join(ROOT, 'assets', 'js', 'data.js')):
        r = subprocess.run([NODE, os.path.join(ROOT, 'tools', 'dump_data.js'), dump], capture_output=True, text=True)
        if r.returncode != 0: errs.append(f'data.js 无法加载: {r.stderr.strip()[:300]}')
        else:
            data = json.load(open(dump, encoding='utf-8'))
            def get(d, path):
                cur = d
                for part in path.split('.'):
                    if not isinstance(cur, dict) or part not in cur: return None
                    cur = cur[part]
                return cur
            for key in c.i18n:
                if get(data, key) is None: errs.append(f'data-i18n 键缺失: {key}')
            # 反向：ui 下未使用的键（warning）
            used = set(c.i18n)
            mainjs = ''
            mj = os.path.join(ROOT, 'assets', 'js', 'main.js')
            if os.path.exists(mj): mainjs = open(mj, encoding='utf-8').read()
            ui = data.get('ui', {})
            def walk(d, prefix=''):
                for k, v in d.items():
                    p = f'{prefix}{k}'
                    if isinstance(v, dict):
                        # 语言叶子（zh/ja/en）不单独计引用，去掉末段再比对
                        if set(v.keys()) == {'zh', 'ja', 'en'}:
                            if p not in used and p not in mainjs: warns.append(f'ui 键未被引用: {p}')
                        else:
                            walk(v, p + '.')
            walk(ui, 'ui.')
    else:
        warns.append('data.js 尚不存在，跳过 i18n 键检查')

    # 移动端 meta / title / lang
    if 'name="viewport"' not in html: errs.append('缺少 viewport meta')
    if '<title>' not in html: errs.append('缺少 title')

    print(f'[G2] ids={len(c.ids)} i18n={len(c.i18n)} refs={len(c.refs)} sections={len(c.sections)}')
    for w in warns: print('  WARN:', w)
    for e in errs: print('  FAIL:', e)
    if errs: print(f'[G2] ❌ {len(errs)} 个错误'); sys.exit(1)
    print('[G2] ✅ 通过')

if __name__ == '__main__':
    main()
