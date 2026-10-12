#!/usr/bin/env python3
"""G4: CSS 门禁 —— 花括号平衡 / url() 引用存在 / var() 有定义 / 链接无下划线 / HTML 静态类有定义。"""
import os, re, sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_DIR = os.path.join(ROOT, 'assets', 'css')
CSS_FILES = ['tokens.css', 'base.css', 'layout.css', 'components.css', 'sections.css']

def strip_comments(css):
    return re.sub(r'/\*.*?\*/', '', css, flags=re.S)

def main():
    errs, warns = [], []
    all_css, defined_vars, used_classes = '', set(), set()

    for f in CSS_FILES:
        p = os.path.join(CSS_DIR, f)
        if not os.path.exists(p):
            warns.append(f'CSS 文件缺失: {f}'); continue
        css = open(p, encoding='utf-8').read()
        all_css += css + '\n'
        s = strip_comments(css)
        if s.count('{') != s.count('}'):
            errs.append(f'{f}: 花括号不平衡 {{={s.count("{")} }}={s.count("}")}')
        defined_vars |= set(re.findall(r'(--[a-zA-Z0-9-]+)\s*:', s))
        for m in re.finditer(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', s): used_classes.add(m.group(1))
        for m in re.finditer(r"url\((['\"]?)([^)'\"]+)\1\)", s):
            u = m.group(2)
            if u.startswith(('data:', 'http://', 'https://', '#')): continue
            fp = os.path.normpath(os.path.join(CSS_DIR, u))
            if not os.path.exists(fp): errs.append(f'{f}: url 指向不存在文件: {u}')

    used_vars = set(re.findall(r'var\((--[a-zA-Z0-9-]+)', strip_comments(all_css)))
    for v in sorted(used_vars - defined_vars):
        errs.append(f'var({v}) 未在 tokens/css 中定义')

    # 链接下划线（用户站点偏好：一律不带下划线）
    for f in CSS_FILES:
        p = os.path.join(CSS_DIR, f)
        if not os.path.exists(p): continue
        css = strip_comments(open(p, encoding='utf-8').read())
        for m in re.finditer(r'([^{}]+)\{([^{}]*)\}', css):
            sel, body = m.group(1), m.group(2)
            if re.search(r'\btext-decoration\s*:\s*[^;]*underline', body) and re.search(r'\ba\b|href', sel):
                errs.append(f'{f}: 链接选择器设置了下划线: {sel.strip()[:60]}')

    # HTML 静态类在 CSS 中有定义（warning：JS 动态类无法静态核对）
    class HtmlAttrs(HTMLParser):
        def __init__(self): super().__init__(); self.classes = set()
        def handle_starttag(self, tag, attrs):
            a = dict(attrs)
            if 'class' in a: self.classes |= set(a['class'].split())
    h = HtmlAttrs(); h.feed(open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read())
    for c in sorted(h.classes - used_classes):
        if c.startswith(('is-', 'reveal')): continue
        warns.append(f'HTML 类未在 CSS 定义（可能由 JS 动态添加）: {c}')

    print(f'[G4] var 定义 {len(defined_vars)} / 使用 {len(used_vars)}；CSS 类 {len(used_classes)}')
    for w in warns: print('  WARN:', w)
    for e in errs: print('  FAIL:', e)
    if errs: print(f'[G4] ❌ {len(errs)} 个错误'); sys.exit(1)
    print('[G4] ✅ 通过')

if __name__ == '__main__':
    main()
