# Data Analysis Dashboard - CLAUDE.md

## 📊 プロジェクト概要

データ分析ダッシュボードは、売上データと顧客データを可視化・分析するためのフルスタックWebアプリケーションです。リアルタイムフィルタリング、インタラクティブなチャート、包括的なメトリクス表示を提供します。

### 主要機能
- 📈 **リアルタイム売上推移チャート** - 日次売上データの時系列表示
- 🥧 **カテゴリ別売上構成** - 商品カテゴリごとの売上シェア表示
- 🗺️ **地域別売上分析** - 地域ごとの売上比較
- 👥 **顧客年齢分布** - フィルタリング適用後の顧客年齢ヒストグラム
- 🔍 **高度なフィルタリング** - 期間、カテゴリ、地域、売上範囲、年齢、性別、満足度による絞り込み
- 📊 **包括的メトリクス** - 総売上、平均日次売上、顧客数、平均満足度
- 📋 **データテーブル** - フィルタリング適用後の詳細データ表示

## 🏗️ システムアーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Angular 17)                    │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   Dashboard   │  │    Charts    │  │  Filter Panel   │  │
│  │  Component    │  │  Component   │  │   Component     │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ Metrics Cards │  │ Data Tables  │  │  Data Service   │  │
│  │  Component    │  │  Component   │  │   (HTTP Client) │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
│                           │                                │
└───────────────────────────┼────────────────────────────────┘
                            │ HTTP/REST API
┌───────────────────────────┼────────────────────────────────┐
│                    Backend (FastAPI)                       │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   API Routes  │  │  API Models  │  │  CORS Config    │  │
│  │   (REST)      │  │  (Pydantic)  │  │                 │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
│                           │                                │
└───────────────────────────┼────────────────────────────────┘
                            │ Dependency Injection
┌───────────────────────────┼────────────────────────────────┐
│              Application Layer (Clean Architecture)        │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Use Cases    │  │  DI Container│  │  Data Analysis  │  │
│  │               │  │              │  │   Business      │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
│                           │                                │
└───────────────────────────┼────────────────────────────────┘
                            │
┌───────────────────────────┼────────────────────────────────┐
│               Domain Layer (Business Logic)                │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ Domain Models │  │ Filter Logic │  │ Chart Data Gen  │  │
│  │               │  │              │  │                 │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
│                           │                                │
└───────────────────────────┼────────────────────────────────┘
                            │
┌───────────────────────────┼────────────────────────────────┐
│            Infrastructure Layer (Data Access)              │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ File Sales    │  │ File Customer│  │   Data Storage  │  │
│  │ Repository    │  │ Repository   │  │   (CSV/JSON)    │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ 技術スタック

### フロントエンド
- **Framework**: Angular 17.3.12
- **UI Library**: Angular Material 17.3.10
- **Charts**: Chart.js 4.4.0 + ng2-charts 5.0.3
- **State Management**: RxJS 7.8.1 (Observable Pattern)
- **Language**: TypeScript 5.4.5
- **Build Tool**: Angular CLI 17.3.10
- **Web Server**: Nginx (Production)

### バックエンド
- **Framework**: FastAPI 0.115.12
- **Language**: Python 3.11+
- **ASGI Server**: Uvicorn 0.34.3
- **Data Validation**: Pydantic 2.11.5
- **Data Processing**: Pandas 2.3.0, NumPy 2.2.6
- **Charts Backend**: Plotly 6.1.2
- **Package Manager**: UV (Ultra-fast Python package manager)

### インフラストラクチャ
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Data Storage**: CSV (Sales), JSON (Customers)
- **Architecture**: Clean Architecture / Hexagonal Architecture

### 開発ツール
- **Code Formatting**: Ruff 0.11.12
- **Type Checking**: TypeScript (Frontend), Pydantic (Backend)
- **Linting**: Angular ESLint, Ruff

## 📁 プロジェクト構造

```
data-analysys-by-claude/
├── 📦 Backend (FastAPI)
│   ├── backend/
│   │   ├── __init__.py
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── models.py          # Pydantic API models
│   │   │   └── routes.py          # FastAPI route definitions
│   │   └── main.py               # FastAPI application entry
│   └── src/                      # Clean Architecture layers
│       ├── application/
│       │   ├── __init__.py
│       │   └── use_cases.py      # Business use cases
│       ├── config.py             # DI container
│       ├── domain/
│       │   ├── __init__.py
│       │   └── models.py         # Domain entities
│       └── infrastructure/
│           ├── __init__.py
│           └── repositories.py   # Data access layer
│
├── 🌐 Frontend (Angular)
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/
│   │   │   │   │   ├── charts/           # Chart.js integration
│   │   │   │   │   ├── dashboard/        # Main dashboard layout
│   │   │   │   │   ├── data-tables/      # Data grid tables
│   │   │   │   │   ├── filter-panel/     # Advanced filtering UI
│   │   │   │   │   └── metrics-cards/    # KPI cards
│   │   │   │   ├── models/
│   │   │   │   │   └── data.models.ts   # TypeScript interfaces
│   │   │   │   ├── services/
│   │   │   │   │   └── data.service.ts  # HTTP API service
│   │   │   │   ├── app.component.ts
│   │   │   │   ├── app.config.ts        # Angular configuration
│   │   │   │   └── app.routes.ts        # Routing configuration
│   │   │   ├── assets/                  # Static assets
│   │   │   ├── styles.scss             # Global styles
│   │   │   └── main.ts                 # Angular bootstrap
│   │   ├── angular.json                # Angular project config
│   │   ├── package.json                # Node.js dependencies
│   │   └── tsconfig.json               # TypeScript configuration
│   └── nginx.conf                      # Nginx configuration
│
├── 📊 Data Storage
│   ├── data/
│   │   ├── sales_data.csv             # Sales transaction data
│   │   └── customer_data.json         # Customer information
│
├── 🐳 Docker Configuration
│   ├── docker-compose.yml            # Multi-service orchestration
│   ├── Dockerfile.backend            # Backend container definition
│   └── Dockerfile.frontend           # Frontend container definition
│
├── ⚙️ Configuration Files
│   ├── pyproject.toml                # Python project configuration
│   ├── uv.lock                       # Python dependency lock file
│   ├── ruff.toml                     # Python linting configuration
│   └── .python-version               # Python version specification
│
└── 📚 Documentation
    ├── README.md                     # Project overview
    └── CLAUDE.md                     # Comprehensive documentation
```

## 🚀 セットアップ・起動方法

### 前提条件
- Docker & Docker Compose
- Git

### 1. リポジトリクローン
```bash
git clone <repository-url>
cd data-analysys-by-claude
```

### 2. Docker Composeで起動
```bash
# 全サービスをビルド・起動
docker compose up --build -d

# ログ確認
docker compose logs -f

# サービス状態確認
docker compose ps
```

### 3. アクセス
- **フロントエンド**: http://localhost:4200
- **バックエンドAPI**: http://localhost:8000
- **API仕様**: http://localhost:8000/docs (FastAPI Swagger UI)

### 4. 停止
```bash
docker compose down
```

## 🔌 API仕様

### エンドポイント一覧

#### `GET /api/filter-options`
フィルタリングに使用可能なオプションを取得

**Response:**
```json
{
  "categories": ["電子機器", "衣類", "食品", "本"],
  "regions": ["東京", "名古屋", "福岡", "大阪"],
  "sales_range": [56789.01, 156789.01],
  "age_range": [26, 55],
  "genders": ["男性", "女性"]
}
```

#### `POST /api/sales`
売上データを取得（フィルタリング適用）

**Request Body:**
```json
{
  "date_range": ["2024-01-01", "2024-12-31"],
  "categories": ["電子機器", "衣類"],
  "regions": ["東京", "大阪"],
  "sales_range": [50000, 150000],
  "age_range": [25, 65],
  "genders": ["男性", "女性"],
  "satisfaction_filter": "高満足度 (4-5)"
}
```

#### `POST /api/customers`
顧客データを取得（フィルタリング適用）

#### `POST /api/metrics`
メトリクス（KPI）データを取得

**Response:**
```json
{
  "total_sales": 1604306.35,
  "avg_daily_sales": 100269.15,
  "total_customers": 10,
  "avg_satisfaction": 4.0
}
```

#### `POST /api/chart-data`
チャート用データを取得

**Response:**
```json
{
  "line_chart": [{"x": "2024-01-01", "y": 387999.98}],
  "pie_chart": [{"x": "電子機器", "y": 621702.46}],
  "bar_chart": [{"x": "東京", "y": 434912.45}],
  "histogram": [28, 35, 42, 29, 55, 31, 38, 26, 47, 33]
}
```

## 🏛️ アーキテクチャ設計

### Clean Architecture採用
バックエンドでは Clean Architecture（クリーンアーキテクチャ）を採用し、関心の分離と保守性を向上させています。

#### レイヤー構成
1. **Presentation Layer** (`backend/api/`)
   - FastAPI routes
   - API models (Pydantic)
   - HTTP request/response handling

2. **Application Layer** (`src/application/`)
   - Use cases (business operations)
   - Application services
   - Dependency injection container

3. **Domain Layer** (`src/domain/`)
   - Business entities
   - Domain models
   - Business rules

4. **Infrastructure Layer** (`src/infrastructure/`)
   - Data repositories
   - External service integrations
   - File system access

### フロントエンド設計パターン
- **Component Architecture**: Angular の階層型コンポーネント設計
- **Reactive Programming**: RxJS を使った宣言的データフロー
- **Service Pattern**: HTTP通信とビジネスロジックの分離
- **Observable Pattern**: リアルタイムデータ更新

## 🧪 開発ガイドライン

### Python開発 (Backend)
```bash
# ローカル開発環境セットアップ
uv sync
source .venv/bin/activate

# 開発サーバー起動
uv run python backend/main.py

# コード品質チェック
uv run ruff check .
uv run ruff format .
```

### Angular開発 (Frontend)
```bash
cd frontend

# 依存関係インストール
npm install --legacy-peer-deps

# 開発サーバー起動
npm start
# または
ng serve --host 0.0.0.0 --port 4200

# ビルド
npm run build
```

### 開発時のベストプラクティス
1. **型安全性**: TypeScript (Frontend) + Pydantic (Backend)
2. **コード品質**: Ruff (Python) + ESLint (Angular)
3. **API設計**: RESTful + OpenAPI/Swagger
4. **エラーハンドリング**: 適切な HTTP ステータスコード
5. **セキュリティ**: CORS設定、入力値検証

## 📊 データモデル

### Sales Data (CSV)
```csv
date,sales,category,region
2024-01-01,89234.56,電子機器,東京
```

### Customer Data (JSON)
```json
{
  "customer_id": 1,
  "age": 28,
  "gender": "男性",
  "purchase_amount": 45000,
  "satisfaction": 4
}
```

## 🚢 デプロイメント

### Docker構成
- **Multi-stage build**: フロントエンドの最適化ビルド
- **Health checks**: サービス監視
- **Volume mounting**: データ永続化
- **Environment variables**: 設定管理

### プロダクション考慮事項
1. **パフォーマンス**
   - Nginx静的ファイル配信
   - Angular AOT コンパイル
   - Python UV高速パッケージ管理

2. **セキュリティ**
   - CORS適切設定
   - Input validation (Pydantic)
   - Docker security practices

3. **スケーラビリティ**
   - Stateless design
   - Horizontal scaling ready
   - Load balancer compatible

## 🔧 トラブルシューティング

### よくある問題と解決策

#### 1. Backend起動エラー
```bash
# Python バージョン確認
python --version  # 3.11+ required

# 依存関係再インストール
docker compose down
docker compose up --build --force-recreate
```

#### 2. Frontend ビルドエラー
```bash
# Node.js バージョン確認
node --version  # 18+ recommended

# キャッシュクリア
rm -rf frontend/node_modules frontend/package-lock.json
npm install --legacy-peer-deps
```

#### 3. API通信エラー
- Backend服务是否运行: http://localhost:8000
- CORS設定確認
- ネットワーク接続確認

#### 4. Chart表示問題
- Chart.js依存関係確認
- Angular変更検知確認
- Browser console error確認

### ログ確認方法
```bash
# 全サービスログ
docker compose logs -f

# 特定サービスログ
docker compose logs -f backend
docker compose logs -f frontend
```

### スケーリング計画
- [ ] **Microservices化**
  - Service decomposition
  - API Gateway
  - Event-driven architecture
- [ ] **クラウド対応**
  - Kubernetes deployment
  - Auto-scaling
  - Monitoring & observability

## 📚 参考資料

### ドキュメント
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Angular Documentation](https://angular.io/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

### アーキテクチャ
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Angular Architecture Best Practices](https://angular.io/guide/styleguide)

### API設計
- [RESTful API Design Guidelines](https://restfulapi.net/)
- [OpenAPI Specification](https://swagger.io/specification/)

---

📝 **このドキュメントは包括的な技術仕様書として作成されており、開発チームの onboarding、保守、および将来の拡張に活用できます。**

🔄 **定期的な更新**: プロジェクトの進化に合わせて本ドキュメントも更新することを推奨します。
