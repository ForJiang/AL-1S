#!/usr/bin/env python3
"""从全站文本（data.js + index.html + main.js）提取实际使用的字符，生成 M PLUS Rounded 1c
精确子集 woff2（kana+汉字按需保留），把字体体积从 3.5MB×3 压到百 KB 级。
用法: python3 tools/subset_fonts.py  （需要 /tmp/fontenv 的 fontTools）"""
import os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets', 'fonts', 'src')
OUT = os.path.join(ROOT, 'assets', 'fonts')
PY = '/tmp/fontenv/bin/python'

# 始终保留的基础集：ASCII + 拉丁补充 + 通用标点 + CJK 标点 + 假名 + 全角
BASE_RANGES = [
    (0x0020, 0x007E), (0x00A0, 0x00FF), (0x2000, 0x206F), (0x2190, 0x21FF),
    (0x3000, 0x303F), (0x3040, 0x30FF), (0x31F0, 0x31FF), (0xFF00, 0xFFEF),
    (0x4E00, 0x4E00),  # 一（兜底）
]

def collect_text():
    texts = []
    for rel in ['assets/js/data.js', 'assets/js/main.js', 'index.html']:
        p = os.path.join(ROOT, rel)
        if os.path.exists(p):
            texts.append(open(p, encoding='utf-8').read())
    return '\n'.join(texts)

def main():
    text = collect_text()
    chars = set(text)
    # 只对 CJK 扩展字符做精确收集；ASCII 等由 BASE_RANGES 覆盖
    cjk = sorted(c for c in chars if 0x1100 <= ord(c) <= 0xFFFF and not (0xFF00 <= ord(c) <= 0xFFEF and ord(c) < 0xFF01))
    ranges = list(BASE_RANGES)
    for c in cjk:
        cp = ord(c)
        if any(lo <= cp <= hi for lo, hi in ranges): continue
        ranges.append((cp, cp))
    # 合并相邻
    ranges.sort()
    merged = [list(r) for r in ranges]
    out = [merged[0]]
    for lo, hi in merged[1:]:
        if lo <= out[-1][1] + 1: out[-1][1] = max(out[-1][1], hi)
        else: out.append([lo, hi])
    text_arg = ','.join(f'U+{lo:04X}-{hi:04X}' if lo != hi else f'U+{lo:04X}' for lo, hi in out)
    print(f'字符集: {len(cjk)} 个 CJK 字符, {len(out)} 个区段')
    for w, name in [('Medium', '500'), ('Bold', '700'), ('ExtraBold', '800')]:
        src = os.path.join(SRC, f'MPLUSRounded1c-{w}.ttf')
        dst = os.path.join(OUT, f'mplus-rounded-1c-{name}.woff2')
        cmd = [PY, '-m', 'fontTools.subset', src,
               f'--unicodes={text_arg}', '--flavor=woff2',
               '--layout-features=*', '--no-hinting', '--desubroutinize',
               f'--output-file={dst}']
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            print(f'{w} 子集化失败:', r.stderr[-500:]); sys.exit(1)
        print(f'  {os.path.basename(dst)}: {os.path.getsize(dst)//1024} KB')
    # 重写 fonts.css：本地子集文件（只引用实际存在的文件）
    css = ['/* AL-1S self-hosted fonts — subsetted by tools/subset_fonts.py */']
    LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
    LATIN_EXT = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF'
    for w in [400, 500, 600, 700]:
        css.append(f"@font-face {{ font-family:'Fredoka'; font-style:normal; font-weight:{w}; font-display:swap; src:url('fredoka-{w}-latin.woff2') format('woff2'); unicode-range:{LATIN}; }}")
    css.append(f"@font-face {{ font-family:'Fredoka'; font-style:normal; font-weight:400 700; font-display:swap; src:url('fredoka-400-latin-ext.woff2') format('woff2'); unicode-range:{LATIN_EXT}; }}")
    for w in [500, 700, 800]:
        css.append(f"@font-face {{ font-family:'M PLUS Rounded 1c'; font-style:normal; font-weight:{w}; font-display:swap; src:url('mplus-rounded-1c-{w}.woff2') format('woff2'); }}")
    css.append("@font-face { font-family:'Share Tech Mono'; font-style:normal; font-weight:400; font-display:swap; src:url('share-tech-mono-400-latin.woff2') format('woff2'); }")
    open(os.path.join(OUT, 'fonts.css'), 'w').write('\n'.join(css) + '\n')
    print('fonts.css 已重写为子集版')

if __name__ == '__main__':
    main()
