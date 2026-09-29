#!/usr/bin/env python3
"""
Launcher for VIT-AP Mess Menu Dashboard.
Starts a lightweight local HTTP server and opens the application in the default web browser.
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Keep terminal output clean
        sys.stderr.write("%s - - [%s] %s\n" % (self.client_address[0], self.log_date_time_string(), format % args))

def find_available_port(start_port):
    import socket
    port = start_port
    while port < start_port + 50:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('localhost', port)) != 0:
                return port
            port += 1
    return start_port

def main():
    port = find_available_port(PORT)
    url = f"http://localhost:{port}/index.html"
    print("=" * 65)
    print("  🍛 VIT-AP Mess Menu Dashboard - Local Server")
    print(f"  🌐 Running at: {url}")
    print("  📁 Serving directory:", DIRECTORY)
    print("  ⌨️  Press Ctrl+C to stop the server")
    print("=" * 65)

    # Open browser automatically
    try:
        webbrowser.open(url)
    except Exception as e:
        print("Note: Could not open browser automatically:", e)

    with socketserver.TCPServer(("", port), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped. Have a great meal!")

if __name__ == "__main__":
    main()

