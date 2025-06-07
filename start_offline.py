#!/usr/bin/env python3
import os
import subprocess
import sys

# 完全オフライン設定
os.environ["STREAMLIT_BROWSER_GATHER_USAGE_STATS"] = "false"
os.environ["STREAMLIT_TELEMETRY_DISABLED"] = "true"
os.environ["PLOTLY_RENDERER"] = "json"
os.environ["NO_PROXY"] = "*"
os.environ["no_proxy"] = "*"

# DNS設定を無効化
os.environ["REQUESTS_CA_BUNDLE"] = ""
os.environ["CURL_CA_BUNDLE"] = ""

if __name__ == "__main__":
    cmd = [
        sys.executable, "-m", "streamlit", "run", "app.py",
        "--server.address", "0.0.0.0",
        "--server.port", "8501",
        "--browser.gatherUsageStats", "false",
        "--server.enableCORS", "false",
        "--server.enableXsrfProtection", "false",
        "--server.headless", "true"
    ]

    subprocess.run(cmd)
