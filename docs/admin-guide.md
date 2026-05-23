# 管理ダッシュボード ガイド

設備プロ ウェブサイトのコンテンツ管理システム（CMS）の使い方ガイドです。

---

## コンテンツ管理ワークフロー

```
コンテンツマネージャー
        │
        ▼
┌─────────────────────┐
│  /admin にアクセス   │
│  GitHub でログイン   │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Sveltia CMS で     │
│  コンテンツを編集    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  「公開」をクリック  │
│  → GitHub に自動     │
│    コミット          │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Cloudflare Pages   │
│  が自動ビルド       │
│  （約2分で公開）     │
└─────────────────────┘
```

---

## 1. 管理画面へのアクセス

- **管理画面URL:** [https://star-light15.net/admin/](https://star-light15.net/admin/)
- **CMS:** Sveltia CMS（GitHub ベースのヘッドレス CMS）
- **アナリティクス:** [https://star-light15.net/admin/analytics](https://star-light15.net/admin/analytics)

---

## 2. ログイン手順

1. ブラウザで `https://star-light15.net/admin/` にアクセスします
2. 「Login with GitHub」ボタンをクリックします
3. GitHub の認証画面が表示されます — GitHub アカウントでログインしてください
4. GitHub App の権限を確認し、「Authorize」をクリックします
5. 認証が完了すると、CMS ダッシュボードにリダイレクトされます

> **注意:** GitHub リポジトリ `HaiLammm/star-light-project` への書き込み権限が必要です。アクセス権がない場合は、リポジトリ管理者にコラボレーター招待を依頼してください。

---

## 3. コンテンツ編集ガイド

CMS ダッシュボードの左サイドバーから編集したいコンテンツタイプを選択します。

### 3.1 サービス（Services）

家電・水道の修理サービス情報を管理します。

| フィールド | 説明 |
|-----------|------|
| Service Name | サービス名（例：トイレ修理） |
| Service Name Short | 短縮名 |
| Category | カテゴリ選択：`electricity`（電気）または `water`（水道） |
| Slug | URL用スラッグ（半角英数字とハイフン） |
| Description | サービスの説明文 |
| Starting Price | 最低料金（円、数値のみ） |
| Original Price | 通常料金（円） |
| Web Discount Amount | Web割引額（円） |
| Service Area | 対応エリアリスト |
| Is Emergency | 緊急対応サービスかどうか |
| Pricing Tiers | 料金プラン一覧（名前、価格、画像URL、画像Alt） |
| FAQ Entries | よくある質問一覧（質問、回答） |

### 3.2 施工事例（Cases）

実際の施工事例を写真付きで管理します。

| フィールド | 説明 |
|-----------|------|
| Title | 事例タイトル |
| Service Category | カテゴリ選択：`electricity` または `water` |
| Service Slug | 関連サービスのスラッグ |
| Location | 施工場所（例：東京都渋谷区） |
| Duration | 作業時間（例：約2時間） |
| Cost | 費用（円、数値のみ） |
| Image Alt | 写真の代替テキスト |
| Published Date | 公開日（YYYY-MM-DD形式） |
| Body | 詳細説明（Markdown エディタ） |

### 3.3 お客様の声（Testimonials）

お客様からの評価・感想を管理します。

| フィールド | 説明 |
|-----------|------|
| Service Type | サービス種類（テキスト） |
| Service Category | カテゴリ選択 |
| Title | タイトル（任意） |
| Duration | 作業時間（任意） |
| Cost | 費用（円） |
| Message | お客様のメッセージ |
| Author Initial | お客様のイニシャル（例：T.S.） |
| Location | 地域（任意） |
| Rating | 評価（1〜5の数値、任意） |

### 3.4 よくある質問（FAQ）

FAQ エントリーを管理します。

| フィールド | 説明 |
|-----------|------|
| Question | 質問文 |
| Answer | 回答文 |
| Category | カテゴリ（テキスト） |
| Sort Order | 表示順序（数値、小さい数字が先に表示） |

### 3.5 ブログ・コラム（Blog）

ブログ記事・コラムを管理します。

| フィールド | 説明 |
|-----------|------|
| Title | 記事タイトル |
| Description | 記事の説明（SEO用） |
| Excerpt | 抜粋テキスト（一覧ページ用） |
| Published Date | 公開日（YYYY-MM-DD形式） |
| Category | カテゴリ選択：`electricity` または `water` |
| Subcategory | サブカテゴリ（任意） |
| Image / Image Alt | アイキャッチ画像と代替テキスト（任意） |
| Body | 本文（Markdown エディタ） |

### 3.6 会社情報（Company）

会社の拠点情報と企業理念を管理します。

**事業所情報（Offices）:**

| フィールド | 説明 |
|-----------|------|
| Office Name | 事業所名 |
| Address | 住所 |
| Region | 地域（例：関東） |
| Area Served | 対応エリアリスト |

**企業理念（Philosophy）:**

| フィールド | 説明 |
|-----------|------|
| Hero Subheading | ページサブタイトル |
| Section Title | セクションタイトル |
| Section Body | 本文（段落リスト） |
| Promises | 約束事リスト（番号とテキスト） |

---

## 4. 画像アップロード ガイドライン

- **アップロード先:** `public/images/` ディレクトリに保存されます
- **対応形式:** JPEG、PNG、WebP、AVIF
- **推奨サイズ:**
  - サービスKV画像：デスクトップ 1200×600px / モバイル 800×400px
  - 施工事例写真：800×600px 推奨
  - ブログ アイキャッチ：1200×630px（OGP対応）
- **ファイルサイズ上限:** 1枚あたり **2MB以下** を推奨
  - 大きな画像はビルド時間とページ読み込み速度に影響します
- **画像Alt テキスト:** 必ず日本語で記入してください（SEOとアクセシビリティのため）

> **ヒント:** WebP形式を使用すると、JPEG/PNGと比較してファイルサイズを30〜50%削減できます。

---

## 5. 公開ワークフロー（Editorial Workflow）

CMSではエディトリアルワークフローが有効になっています：

1. **下書き（Draft）:** 新しいコンテンツを作成または既存コンテンツを編集
2. **レビュー（In Review）:** レビュー待ち状態に移動
3. **公開準備完了（Ready）:** 公開可能な状態
4. **公開（Publish）:** 「Publish」ボタンで公開

公開すると：
- Sveltia CMS が GitHub リポジトリに自動コミットします
- Cloudflare Pages が変更を検知して自動ビルドを開始します
- **約2分後** にウェブサイトに反映されます

---

## 6. アナリティクス

### Google Analytics 4（GA4）

管理画面の「アナリティクス」リンクまたは `/admin/analytics` にアクセスすると、以下のデータを確認できます：

- ページビュー数の推移
- アクティブユーザー数
- トップページ一覧
- トラフィックソース（流入元）

**GA4 セットアップ方法:**

**オプション A: GA Embed API（インタラクティブなグラフ）**

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. 「Google Analytics Data API」を有効化
3. OAuth 2.0 クライアントIDを作成
   - JavaScript オリジン：`https://star-light15.net`
   - リダイレクト URI：`https://star-light15.net/admin/analytics`
4. `src/pages/admin/analytics.astro` の `GA_CLIENT_ID` と `GA_PROPERTY_ID` を更新

**オプション B: Looker Studio 埋め込み（簡単セットアップ）**

1. [Looker Studio](https://lookerstudio.google.com/) でGA4レポートを作成
2. ファイル → レポートを埋め込み → 埋め込みURLをコピー
3. `analytics.astro` の `USE_LOOKER_STUDIO = true` に設定し、`LOOKER_STUDIO_URL` にURLを貼り付け

### Google Search Console（GSC）

アナリティクスページから Google Search Console へのリンクがあります。クリックするとGSCダッシュボードが新しいタブで開きます。

- **GSC URL:** `https://search.google.com/search-console?resource_id=sc-domain:star-light15.net`

---

## 7. トラブルシューティング

### ログインできない

| 問題 | 解決方法 |
|------|---------|
| 「Login with GitHub」ボタンが表示されない | ブラウザのキャッシュをクリアして再読み込みしてください |
| GitHub 認証後に画面が白くなる | ブラウザの開発者ツール（F12）でコンソールエラーを確認。ポップアップブロッカーが原因の場合があります |
| 「Permission denied」エラー | GitHub リポジトリ `HaiLammm/star-light-project` への書き込み権限があるか確認してください |
| 認証が繰り返しループする | ブラウザのCookieをクリアしてから再度ログインしてください |

### 公開後にビルドエラーが発生する

ビルドエラーはコンテンツがZodスキーマ検証に失敗した場合に発生します。

1. [Cloudflare Pages ダッシュボード](https://dash.cloudflare.com/) にログイン
2. 該当プロジェクトの「デプロイメント」タブを確認
3. 失敗したビルドのログを確認

**よくあるビルドエラー:**

| エラー | 原因と対策 |
|--------|-----------|
| `ZodError: Required` | 必須フィールドが空白。CMS で該当コンテンツを開いて必須項目を入力してください |
| `ZodError: Invalid type` | データ型の不一致。数値フィールドに文字列が入力されていないか確認 |
| `ZodError: Invalid enum value` | カテゴリ値が不正。`electricity` または `water` のみ使用可能 |
| 画像パスエラー | 画像ファイルが `public/images/` に存在するか確認 |

### 画像サイズの問題

| 問題 | 解決方法 |
|------|---------|
| アップロードが遅い | 2MB以下にリサイズしてからアップロードしてください |
| ページ表示が遅い | WebP形式に変換することを推奨します。[Squoosh](https://squoosh.app/) で無料変換できます |
| 画像が表示されない | ファイル名に日本語や特殊文字を使用していないか確認。半角英数字とハイフンのみ推奨 |

---

## 8. 環境変数とデプロイ設定

### CMS バックエンド設定

CMSの認証設定は `public/admin/config.yml` で管理されています：

```yaml
backend:
  name: github
  repo: HaiLammm/star-light-project
  branch: main
  base_url: https://cms-auth.luonghaimal.workers.dev
```

- **repo:** GitHub リポジトリ（Organization/リポジトリ名）
- **branch:** コンテンツが保存されるブランチ
- **base_url:** GitHub OAuth 認証プロキシ（Cloudflare Worker）

### GitHub App（PKCE認証）

Sveltia CMS はネイティブ PKCE 認証フローを使用しています。外部OAuth プロキシ不要で、GitHub App が直接認証を処理します。

### Cloudflare Pages 環境変数

Cloudflare Pages ダッシュボードで設定する環境変数：

| 変数名 | 説明 | 設定場所 |
|--------|------|---------|
| `NODE_VERSION` | Node.js バージョン（例：`18`） | Settings > Environment Variables |

> **注意:** CMS自体は静的ファイルとしてデプロイされるため、Cloudflare Pagesの環境変数は主にビルドプロセスに関連します。CMS認証設定は `config.yml` ファイル内で管理されます。

### デプロイフロー

1. CMS でコンテンツを編集・公開 → GitHub に自動コミット
2. Cloudflare Pages が `main` ブランチの変更を検知
3. 自動的にビルドが開始（`npm run build`）
4. ビルド成功後、新しいバージョンが自動デプロイ
5. 約2分でウェブサイトに反映

---

## お問い合わせ

技術的な問題やアクセス権の申請については、プロジェクト管理者にお問い合わせください。
