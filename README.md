# データ分析ダッシュボード

Streamlitを使った日本語対応のデータ分析ダッシュボードです。
売上データと顧客データの可視化分析を行います。

## 機能

- 売上 KPI表示と時系列分析
- カテゴリ別・地域別売上分析
- 顧客年齢分布と購入履歴分析
- 売上予測モデルとトレンド分析
- インタラクティブなグラフとフィルタリング
- 売上データとカスタマーデータの分析
- 複数のダッシュボードタブ機能

## セットアップ

### 必要要件
- Python 3.8+
- uvパッケージマネージャー
- ruffコードフォーマッター

### インストール

```bash
# uvのインストール（未インストールの場合）
pip install uv

# 依存関係のインストール
uv sync
```

## 使用方法

### Docker起動（推奨）

```bash
# Docker Composeで起動
docker-compose up -d

# または、Dockerで直接起動
docker build -t data-analysis-dashboard .
docker run -p 8501:8501 data-analysis-dashboard
```

### 基本起動

```bash
# 通常起動
uv run streamlit run app.py

# オフライン起動（テレメトリ無効）
uv run python start_offline.py
```

### WSL2での起動

WSL2でWindows Chromeからアクセスする場合：

```bash
# ホストアドレスを指定して起動
STREAMLIT_BROWSER_GATHER_USAGE_STATS=false STREAMLIT_TELEMETRY_DISABLED=true uv run streamlit run app.py --server.address 0.0.0.0 --server.port 8501 --server.headless true
```

### アクセス方法

1. **Dockerアクセス**: http://localhost:8501
2. **ローカルアクセス**: http://localhost:8501
3. **WSL2からWindows**: http://172.28.224.170:8501

### WSL2でのポートフォワーディング

Windows PowerShellで実行：

```powershell
# ポートフォワーディング設定
netsh interface portproxy add v4tov4 listenport=8501 listenaddress=0.0.0.0 connectport=8501 connectaddress=172.28.224.170

# 設定確認
netsh interface portproxy show all

# Windowsファイアウォール設定
New-NetFireWallRule -DisplayName "Allow Streamlit" -Direction Inbound -Protocol TCP -LocalPort 8501
```

## 開発

### コードフォーマット

```bash
# ruffでフォーマット
uv run ruff format app.py

# ruffで検査
uv run ruff check app.py
```

### ファイル構成

```
.
├── app.py                 # メインアプリケーション
├── start_offline.py       # オフライン起動スクリプト
├── .streamlit/
│   └── config.toml       # Streamlit設定
├── pyproject.toml        # プロジェクト設定
├── ruff.toml            # ruff設定
└── README.md            # このファイル
```

## 分析機能

このダッシュボードでは以下の分析が可能です：

- 売上 **KPI表示**: 売上合計と平均
- 時系列 **売上分析**: 日別売上推移とトレンド可視化
- 売上 **予測分析**: 将来売上予測とトレンド可視化
- 売上 **分解分析**: カテゴリと地域での分解分析
- インタラクティブ **グラフ操作**: フィルタリングとドリルダウン分析

## 技術仕様

このプロジェクトには以下の主要ライブラリが含まれています：

- PlotlyによるインタラクティブなChart作成
- StreamlitによるWebアプリケーション
- PandasとNumpyによるデータ処理
- 日本語対応とUTF-8エンコーディング

## 注意

- 日本語フォントは自動で読み込まれます
- WSL2での起動時はIPアドレスに注意してください
- ポートフォワーディングが必要な場合は上記コマンドを実行してください