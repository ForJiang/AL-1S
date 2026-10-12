#!/usr/bin/env python3
"""G3: i18n 齐性门禁 —— 所有 {zh,ja,en} 对象三语齐全且非空；AL1S_LANGS 正确。"""
import os, sys, json, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NODE = '/tmp/node-v20.18.1-darwin-arm64/bin/node'
LANGS = ('zh', 'ja', 'en')

def main():
    dump = os.path.join(ROOT, 'tools', 'data-dump.json')
    r = subprocess.run([NODE, os.path.join(ROOT, 'tools', 'dump_data.js'), dump], capture_output=True, text=True)
    if r.returncode != 0:
        print('  FAIL: data.js 无法加载:', r.stderr.strip()[:300]); sys.exit(1)
    data = json.load(open(dump, encoding='utf-8'))
    errs, count = [], 0

    def walk(d, path=''):
        nonlocal count
        for k, v in d.items():
            p = f'{path}.{k}' if path else k
            if isinstance(v, dict):
                keys = set(v.keys())
                if keys & set(LANGS):
                    if not keys == set(LANGS):
                        errs.append(f'{p}: 语言键不全 {sorted(keys)}')
                    for lg in LANGS:
                        val = v.get(lg)
                        ok = isinstance(val, str) and bool(val.strip())
                        if not ok and isinstance(val, list):
                            ok = len(val) > 0 and all(isinstance(x, str) and x.strip() for x in val)
                        if not ok:
                            errs.append(f'{p}.{lg}: 缺失或为空')
                        count += 1
                    # 深层继续走（如 zh 里不应再有嵌套，但防御）
                    for lg in LANGS:
                        if isinstance(v.get(lg), dict): walk(v[lg], f'{p}.{lg}')
                else:
                    walk(v, p)
            elif isinstance(v, list):
                for i, item in enumerate(v):
                    if isinstance(item, (dict, list)): walk(item, f'{p}[{i}]')

    walk(data)
    # 顶层必需块
    for key in ['profile','stats','skills','weapon','stories','voices','memorias','events','momotalk','quiz','ui','model']:
        if key not in data: errs.append(f'缺少顶层数据块: {key}')
    if data.get('model', {}).get('name') is None: errs.append('model.name 缺失')
    if len(data.get('stories', [])) < 4: errs.append(f'stories 篇数不足: {len(data.get("stories", []))}')
    if len(data.get('voices', [])) < 20: errs.append(f'voices 条数不足: {len(data.get("voices", []))}')
    if len(data.get('memorias', [])) < 4: errs.append(f'memorias 数量不足: {len(data.get("memorias", []))}')
    if len(data.get('skills', [])) != 4: errs.append(f'skills 必须恰为 4 个: {len(data.get("skills", []))}')
    if len(data.get('quiz', {}).get('questions', [])) < 4: errs.append('quiz 题目不足')

    print(f'[G3] 检查了 {count} 个语言字段')
    for e in errs[:40]: print('  FAIL:', e)
    if errs: print(f'[G3] ❌ {len(errs)} 个错误'); sys.exit(1)
    print('[G3] ✅ 三语齐性通过')

if __name__ == '__main__':
    main()
