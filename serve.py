#!/usr/bin/env python3
"""AL-1S 本地预览服务器（ThreadingHTTPServer，避免单线程 http.server 在并发 JS 请求下 RESET）。
用法: python3 serve.py [port]   默认 8017"""
import sys, os, functools
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8017

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()
    def log_message(self, fmt, *args):
        sys.stderr.write("[serve] %s\n" % (fmt % args))

def main():
    handler = functools.partial(Handler, directory=ROOT)
    httpd = ThreadingHTTPServer(('127.0.0.1', PORT), handler)
    print(f"AL-1S preview: http://127.0.0.1:{PORT}/  (root: {ROOT})")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

if __name__ == '__main__':
    main()
