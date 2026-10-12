#!/usr/bin/env python3
"""合并期工具：提取 main.js 生成的类名，与 CSS 定义做差集。"""
import re, glob, os
ROOT = '/Users/jianghaoda/.zcode/workspace/default/AL-1S'
js = open(os.path.join(ROOT, 'assets/js/main.js'), encoding='utf-8').read()

classes = set()
# ce('tag', 'class-list', ...) 第二参数
for m in re.finditer(r"ce\(\s*['\"][a-zA-Z0-9]+['\"]\s*,\s*['\"]([^'\"]+)['\"]", js):
    classes.update(m.group(1).split())
# classList 增删
for m in re.finditer(r"classList\.(?:add|remove|toggle|contains)\(\s*['\"]([^'\"]+)['\"]", js):
    classes.update(m.group(1).split())
# 形如 class-name 的裸字符串（含连字符，排除路径/键名/变量）
for m in re.finditer(r"['\"]([a-z][a-z0-9]*(?:-[a-z0-9]+)+)['\"]", js):
    s = m.group(1)
    if '/' in s or s.startswith(('ui.', '--', 'data-', 'mt-')) is False and False: continue
    if '/' in s or s.startswith('--'): continue
    if len(s) < 32: classes.add(s)

css = ''
for f in glob.glob(os.path.join(ROOT, 'assets/css/*.css')):
    css += open(f, encoding='utf-8').read()
css_classes = set(re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', css))
missing = sorted(c for c in classes if c not in css_classes)
print('main.js 类名候选:', len(classes))
print('CSS 中缺失:', len(missing))
for c in missing: print('  -', c)
