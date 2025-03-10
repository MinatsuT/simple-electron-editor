# Simple Electron Text Editor

このプロジェクトは、ほぼほぼ全てGitHub Copilotとの対話の反復で生成した、シンプルなElectronベースのテキストエディタです。
主に、Electronの基本的な使い方を学ぶためのサンプルとして作成しました。

## プロジェクト構造

```
simple-electron-editor
├── src
│   ├── main.js        # メインプロセスのエントリーポイント
│   ├── preload.js     # プリロードスクリプト
│   ├── renderer.js    # レンダラープロセスのスクリプト
│   ├── index.html     # メインウィンドウのHTML構造
│   └── styles
│       └── main.css   # アプリケーションのスタイルシート
└── package.json       # npm設定ファイル
```

## 始め方

Simple Electron Text Editorを使い始めるには、次の手順に従ってください：

1. **リポジトリをクローンする:**
   ```
   git clone https://github.com/yourusername/simple-electron-editor.git
   cd simple-electron-editor
   ```

2. **依存関係をインストールする:**
   ```
   npm install
   ```

3. **アプリケーションを実行する:**
   ```
   npm start
   ```

## 機能

- テキストファイルの作成と編集
- シンプルで直感的なユーザーインターフェース
- ファイルの保存、上書き保存機能
- ファイルをドラッグ＆ドロップでオープン
- 未保存の変更がある場合の警告
- ステータスバーでのファイル名と変更状態の表示

## キーボードショートカット

- `Ctrl+N` / `Cmd+N` - 新規ファイル作成
- `Ctrl+O` / `Cmd+O` - ファイルを開く
- `Ctrl+S` / `Cmd+S` - ファイルを保存
- `Ctrl+Shift+S` / `Cmd+Shift+S` - 名前を付けて保存

## ビルド方法

各プラットフォーム向けにアプリケーションをビルドするには：

- **Windows向けビルド:**
  ```
  npm run build:windows
  ```

- **Mac向けビルド（未検証です）:**
  ```
  npm run build:mac
  ```

- **Linux向けビルド:**
  ```
  npm run build:linux
  ```

- **すべてのプラットフォーム向けビルド:**
  ```
  npm run build
  ```

ビルドされたアプリケーションは dist ディレクトリに出力されます。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。