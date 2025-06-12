# GitHub Issues Template for CLAUDE.md Improvement Tasks

以下のテンプレートを使用してGitHub issuesを作成してください：

## 🔗 Repository URL
https://github.com/a-tsu/data-analysys-by-claude

---

## Issue 1: テスト実装 - Backend (pytest + FastAPI test client)

**Title:** `テスト実装 - Backend: pytest + FastAPI test client`

**Labels:** `enhancement`, `testing`, `backend`, `short-term`

**Body:**
```markdown
## 📋 概要
BackendのAPIエンドポイントに対する包括的なテスト実装

## 🎯 目標
- pytest + FastAPI test clientを使用したユニットテスト実装
- 全APIエンドポイントのテストカバレッジ確保
- テストデータの準備とモック実装

## 📝 実装内容
### テスト対象
- [ ] `GET /api/filter-options` エンドポイント
- [ ] `POST /api/sales` エンドポイント
- [ ] `POST /api/customers` エンドポイント
- [ ] `POST /api/metrics` エンドポイント
- [ ] `POST /api/chart-data` エンドポイント

### テストケース
- [ ] 正常系のレスポンス検証
- [ ] 異常系のエラーハンドリング
- [ ] バリデーションエラーのテスト
- [ ] フィルタリング機能のテスト

## 🔧 技術要件
- pytest 8.0+
- FastAPI test client
- httpx for async testing
- pytest-asyncio for async test support

## 📚 参考資料
- [FastAPI Testing Documentation](https://fastapi.tiangolo.com/tutorial/testing/)
- [pytest Documentation](https://docs.pytest.org/)

## ⏰ 優先度
短期改善 (1-2週間)
```

---

## Issue 2: テスト実装 - Frontend (Jest + Angular Testing Utilities)

**Title:** `テスト実装 - Frontend: Jest + Angular Testing Utilities`

**Labels:** `enhancement`, `testing`, `frontend`, `angular`, `short-term`

**Body:**
```markdown
## 📋 概要
AngularフロントエンドコンポーネントとサービスのJestテスト実装

## 🎯 目標
- Jest + Angular Testing Utilitiesを使用したユニットテスト実装
- コンポーネントとサービスのテストカバレッジ確保
- E2Eテストの基盤構築

## 📝 実装内容
### テスト対象コンポーネント
- [ ] `ChartsComponent` - チャート表示ロジック
- [ ] `DashboardComponent` - ダッシュボード統合
- [ ] `DataTablesComponent` - データテーブル表示
- [ ] `FilterPanelComponent` - フィルタリングUI
- [ ] `MetricsCardsComponent` - KPIカード表示

### テスト対象サービス
- [ ] `DataService` - API通信ロジック
- [ ] HTTP interceptors
- [ ] RxJS Observable streams

### テストケース
- [ ] コンポーネントの初期化
- [ ] ユーザーインタラクション
- [ ] データバインディング
- [ ] API呼び出しのモック
- [ ] エラーハンドリング

## 🔧 技術要件
- Jest 29.0+
- @angular/testing utilities
- jasmine-marbles for Observable testing
- Testing Library Angular (optional)

## 📚 参考資料
- [Angular Testing Guide](https://angular.io/guide/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## ⏰ 優先度
短期改善 (1-2週間)
```

---

## Issue 3: エラーハンドリング強化

**Title:** `エラーハンドリング強化 - Global Error Handler & User-friendly Messages`

**Labels:** `enhancement`, `error-handling`, `backend`, `frontend`, `short-term`

**Body:**
```markdown
## 📋 概要
アプリケーション全体のエラーハンドリング機能を強化し、ユーザーフレンドリーなエラーメッセージを実装

## 🎯 目標
- グローバルエラーハンドラーの実装
- ユーザーにとって分かりやすいエラーメッセージの表示
- エラーログの集約と監視機能

## 📝 実装内容
### Backend (FastAPI)
- [ ] グローバル例外ハンドラーの実装
- [ ] カスタム例外クラスの定義
- [ ] API エラーレスポンスの標準化
- [ ] ログレベルの適切な設定

### Frontend (Angular)
- [ ] Angular ErrorHandler の実装
- [ ] HTTP Error Interceptor の強化
- [ ] Toast/Snackbar によるエラー通知
- [ ] ユーザーフレンドリーなエラーメッセージ

### エラーカテゴリー
- [ ] ネットワークエラー (接続失敗、タイムアウト)
- [ ] 認証・認可エラー (401, 403)
- [ ] バリデーションエラー (400)
- [ ] サーバーエラー (500系)
- [ ] データ不整合エラー

## 🔧 技術要件
### Backend
- FastAPI exception handlers
- Python logging module
- Pydantic validation errors

### Frontend
- Angular Material Snackbar
- HttpErrorResponse handling
- RxJS error operators

## 📚 参考資料
- [FastAPI Exception Handling](https://fastapi.tiangolo.com/tutorial/handling-errors/)
- [Angular Error Handling](https://angular.io/guide/errors)

## ⏰ 優先度
短期改善 (1-2週間)
```

---

## Issue 4: ローディング状態表示

**Title:** `ローディング状態表示 - API呼び出し中のスピナー & Progressive Loading`

**Labels:** `enhancement`, `ux`, `frontend`, `loading`, `short-term`

**Body:**
```markdown
## 📋 概要
API呼び出し中のローディング状態表示とプログレッシブローディングの実装

## 🎯 目標
- ユーザーエクスペリエンス向上のためのローディング状態表示
- API呼び出し中の視覚的フィードバック
- 段階的なコンテンツ読み込み機能

## 📝 実装内容
### ローディングUI
- [ ] グローバルローディングスピナー
- [ ] コンポーネント別ローディング状態
- [ ] スケルトンスクリーン (チャート・テーブル用)
- [ ] プログレスバー (データ読み込み進捗)

### 実装箇所
- [ ] ダッシュボード初期読み込み
- [ ] フィルター適用時
- [ ] チャートデータ更新時
- [ ] データテーブルページング
- [ ] API呼び出し全般

### UX改善
- [ ] 200ms 未満のAPIは即座に表示
- [ ] 200ms-1s のAPIはスピナー表示
- [ ] 1s以上のAPIはプログレスバー表示
- [ ] エラー時の適切なフォールバック

## 🔧 技術要件
### Frontend (Angular)
- Angular Material Progress components
- RxJS loading state management
- NgRx (optional) for state management
- CSS animations for smooth transitions

### ローディング状態管理
\`\`\`typescript
interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}
\`\`\`

## 📚 参考資料
- [Angular Material Progress](https://material.angular.io/components/progress-spinner)
- [RxJS Loading Patterns](https://blog.angular-university.io/angular-loading-indicator/)

## ⏰ 優先度
短期改善 (1-2週間)
```

---

## Issue 5: データベース導入

**Title:** `データベース導入 - PostgreSQL/MySQL integration`

**Labels:** `enhancement`, `database`, `backend`, `medium-term`

**Body:**
```markdown
## 📋 概要
現在のファイルベースデータストレージ（CSV/JSON）からリレーショナルデータベースへの移行

## 🎯 目標
- データの永続化と高速化
- 複雑なクエリとJOIN操作の実現
- データ整合性とトランザクション管理

## 📝 実装内容
### データベース設計
- [ ] ERDの作成とテーブル設計
- [ ] インデックス戦略の策定
- [ ] マイグレーションスクリプトの作成

### Backend実装
- [ ] SQLAlchemy ORM統合
- [ ] データベースマイグレーション機能
- [ ] Repository Patternの適用
- [ ] データアクセス層の実装

### データ移行
- [ ] 既存CSV/JSONデータのインポート
- [ ] データ検証とクリーニング
- [ ] バックアップとリストア機能

## 🔧 技術要件
- PostgreSQL 15+ または MySQL 8.0+
- SQLAlchemy 2.0+
- Alembic for migrations
- asyncpg/aiomysql for async database operations

## 📚 参考資料
- [FastAPI with SQLAlchemy](https://fastapi.tiangolo.com/tutorial/sql-databases/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

## ⏰ 優先度
中期改善 (1-2ヶ月)
```

---

## Issue 6: 認証・認可システム

**Title:** `認証・認可 - JWT Authentication & Role-based Access Control`

**Labels:** `enhancement`, `authentication`, `security`, `backend`, `frontend`, `medium-term`

**Body:**
```markdown
## 📋 概要
JWTベースの認証システムとロールベースアクセス制御の実装

## 🎯 目標
- セキュアなユーザー認証機能
- 役割ベースのアクセス制御
- セッション管理とトークンリフレッシュ

## 📝 実装内容
### 認証機能
- [ ] ユーザー登録・ログイン機能
- [ ] JWT トークンの生成と検証
- [ ] パスワードハッシュ化 (bcrypt)
- [ ] トークンリフレッシュ機能

### 認可機能
- [ ] ロールベースアクセス制御 (RBAC)
- [ ] APIエンドポイントの権限設定
- [ ] フロントエンドのルートガード
- [ ] 権限チェックミドルウェア

### セキュリティ
- [ ] CSRF保護
- [ ] Rate limiting
- [ ] セキュリティヘッダーの設定
- [ ] パスワードポリシー

## 🔧 技術要件
### Backend
- FastAPI security utilities
- python-jose for JWT handling
- passlib for password hashing
- SQLAlchemy User models

### Frontend
- Angular JWT interceptor
- Route guards
- Auth service
- Token storage (HttpOnly cookies推奨)

## 📚 参考資料
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [Angular Authentication Guide](https://angular.io/guide/security)

## ⏰ 優先度
中期改善 (1-2ヶ月)
```

---

## Issue 7: リアルタイム更新機能

**Title:** `リアルタイム更新 - WebSocket Integration & Live Data Streaming`

**Labels:** `enhancement`, `websocket`, `realtime`, `backend`, `frontend`, `medium-term`

**Body:**
```markdown
## 📋 概要
WebSocketを使用したリアルタイムデータ更新とライブストリーミング機能の実装

## 🎯 目標
- リアルタイムでのデータ更新
- 複数ユーザー間でのデータ同期
- ライブチャートとメトリクス表示

## 📝 実装内容
### WebSocket実装
- [ ] FastAPI WebSocketエンドポイント
- [ ] 接続管理とルーム機能
- [ ] メッセージブロードキャスト
- [ ] 接続状態の監視

### リアルタイム機能
- [ ] ライブデータストリーミング
- [ ] リアルタイムチャート更新
- [ ] KPIメトリクスのライブ表示
- [ ] データ変更通知

### フロントエンド統合
- [ ] Angular WebSocket service
- [ ] RxJS WebSocket operators
- [ ] リアルタイムチャート更新
- [ ] 接続状態インジケーター

## 🔧 技術要件
### Backend
- FastAPI WebSocket support
- Redis for message queuing (optional)
- asyncio for concurrent connections

### Frontend
- RxJS WebSocketSubject
- Chart.js real-time plugins
- Angular change detection optimization

## 📚 参考資料
- [FastAPI WebSockets](https://fastapi.tiangolo.com/advanced/websockets/)
- [RxJS WebSocket](https://rxjs.dev/api/webSocket/webSocket)

## ⏰ 優先度
中期改善 (1-2ヶ月)
```

---

## Issue 8: Machine Learning統合

**Title:** `高度な分析機能 - Machine Learning Integration & 予測分析`

**Labels:** `enhancement`, `machine-learning`, `analytics`, `backend`, `long-term`

**Body:**
```markdown
## 📋 概要
機械学習アルゴリズムを統合した高度な分析機能と予測分析の実装

## 🎯 目標
- 売上予測と顧客行動分析
- 異常検知とトレンド分析
- レコメンデーション機能

## 📝 実装内容
### 予測分析
- [ ] 売上予測モデル (時系列分析)
- [ ] 顧客LTV予測
- [ ] 需要予測と在庫最適化
- [ ] 季節性とトレンド分析

### 機械学習パイプライン
- [ ] データ前処理とクリーニング
- [ ] 特徴量エンジニアリング
- [ ] モデル訓練と評価
- [ ] バッチ予測とリアルタイム推論

### 分析機能
- [ ] 異常検知 (外れ値、不正取引)
- [ ] 顧客セグメンテーション
- [ ] 購買パターン分析
- [ ] A/Bテスト分析フレームワーク

## 🔧 技術要件
- scikit-learn for ML algorithms
- pandas for data manipulation
- numpy for numerical operations
- mlflow for model management (optional)
- celery for background ML tasks

## 📚 参考資料
- [scikit-learn Documentation](https://scikit-learn.org/)
- [MLflow Documentation](https://mlflow.org/)

## ⏰ 優先度
長期改善 (3-6ヶ月)
```

---

## Issue 9: PWA化とモバイル対応

**Title:** `モバイル対応 - Progressive Web App (PWA) & Responsive Design Improvements`

**Labels:** `enhancement`, `pwa`, `mobile`, `frontend`, `ux`, `long-term`

**Body:**
```markdown
## 📋 概要
Progressive Web App化とモバイル端末での最適なユーザーエクスペリエンス実現

## 🎯 目標
- PWA機能の実装
- モバイルファーストな設計
- オフライン機能とキャッシュ戦略

## 📝 実装内容
### PWA機能
- [ ] Service Worker実装
- [ ] Web App Manifest作成
- [ ] オフライン機能対応
- [ ] プッシュ通知機能

### レスポンシブデザイン
- [ ] モバイル最適化されたUI
- [ ] タッチフレンドリーなインタラクション
- [ ] 画面サイズ別レイアウト調整
- [ ] チャートのモバイル対応

### パフォーマンス最適化
- [ ] 画像の遅延読み込み
- [ ] コード分割とバンドル最適化
- [ ] キャッシュ戦略の実装
- [ ] 軽量化とロード時間短縮

## 🔧 技術要件
- Angular Service Worker
- Workbox for caching strategies
- Angular Flex Layout
- Angular Material responsive breakpoints

## 📚 参考資料
- [Angular PWA Guide](https://angular.io/guide/service-worker-intro)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## ⏰ 優先度
長期改善 (3-6ヶ月)
```

---

## Issue 10: パフォーマンス最適化

**Title:** `パフォーマンス最適化 - CDN Integration & Caching Strategies & Database Optimization`

**Labels:** `enhancement`, `performance`, `optimization`, `backend`, `frontend`, `long-term`

**Body:**
```markdown
## 📋 概要
アプリケーション全体のパフォーマンス最適化と スケーラビリティの向上

## 🎯 目標
- 応答時間の短縮
- スループットの向上
- リソース使用量の最適化

## 📝 実装内容
### フロントエンド最適化
- [ ] CDN統合と静的ファイル配信
- [ ] バンドルサイズの最適化
- [ ] 遅延読み込みとコード分割
- [ ] 画像最適化とWebP対応

### バックエンド最適化
- [ ] データベースクエリ最適化
- [ ] インデックス戦略の見直し
- [ ] APIレスポンスキャッシュ
- [ ] 非同期処理の活用

### キャッシュ戦略
- [ ] Redis導入と分散キャッシュ
- [ ] ブラウザキャッシュ設定
- [ ] APIレスポンスキャッシュ
- [ ] データベースクエリキャッシュ

### 監視とプロファイリング
- [ ] パフォーマンス監視ダッシュボード
- [ ] APM (Application Performance Monitoring)
- [ ] メトリクス収集と分析
- [ ] ボトルネック特定と改善

## 🔧 技術要件
- Redis for caching
- nginx for reverse proxy and static files
- CloudFront or similar CDN
- Prometheus + Grafana for monitoring

## 📚 参考資料
- [Web Performance Best Practices](https://web.dev/fast/)
- [FastAPI Performance](https://fastapi.tiangolo.com/deployment/server-workers/)

## ⏰ 優先度
長期改善 (3-6ヶ月)
```

---

## 📋 作成手順

1. 上記のRepository URLにアクセス
2. "Issues" タブをクリック
3. "New issue" ボタンをクリック
4. 各issueのタイトルとボディをコピー&ペーストして作成
5. 適切なLabelsを設定
6. 必要に応じてMilestoneやAssigneeを設定

## 🏷️ 推奨Labels

短期改善用:
- `enhancement`
- `short-term`
- `testing`
- `error-handling`
- `ux`
- `loading`

中期改善用:
- `enhancement`
- `medium-term`
- `database`
- `authentication`
- `security`
- `websocket`
- `realtime`

長期改善用:
- `enhancement`
- `long-term`
- `machine-learning`
- `analytics`
- `pwa`
- `mobile`
- `performance`
- `optimization`

技術領域別:
- `backend`
- `frontend`
- `angular`
- `fastapi`