# Token Meter プライバシーポリシー

最終更新日: 2026年7月16日

Token Meterは、Claude Code、CodexおよびCopilot CLIの利用状況をユーザー自身のMacまたはWindows PC上で確認するためのアプリです。

## 取り扱うデータ

- macOSの`~/.claude/projects`、`~/.codex/sessions`、またはWindowsの`%USERPROFILE%\.claude\projects`、`%USERPROFILE%\.codex\sessions`、`%USERPROFILE%\.copilot\session-state`内の利用量関連フィールド
- Claude CodeがmacOS KeychainまたはWindowsの`.credentials.json`に保存したOAuthアクセストークン（Claude連携を明示的に有効化した場合のみ）
- トークン数、日時、モデル名、使用率、リセット時刻

プロンプト本文と応答本文は保存しません。OAuthアクセストークンとKeychainの生データを、ログ、
UserDefaults、Windowsアプリ設定、SQLite、Analytics、クラッシュレポート、平文ファイルへ保存しません。

## 外部送信

Claude連携を有効にした場合、OAuthアクセストークンをAnthropicの使用量照会エンドポイントへの
認証にのみ使用します。Token Meter独自のサーバー、広告事業者、Analytics事業者へデータを送信しません。

macOS版でアプリの更新確認を有効にしている場合、GitHub上の更新フィードへ接続し、更新のダウンロード時は
GitHub Releasesへ接続します。プロンプト、応答、トークン使用量、OAuthアクセストークンは更新確認に
含めません。自動更新確認はSettings > Updatesから無効化できます。Windows版のStore配布はMicrosoft Storeが更新を提供します。直接配布の`TokenMeterSetup.exe`はネットワーク通信や独自の自動更新を行わず、更新には新しいSetupの再実行が必要です。

## ローカル保存

macOS版の集計データはApplication Support領域とWidget表示用のApp Groupコンテナへ保存します。Windows版はMSIXのLocalState領域にあるSQLiteへ保存します。
保存対象にOAuthアクセストークンは含まれません。

## ユーザーによる制御

Claude連携はいつでも設定画面から無効化できます。設定にはローカル履歴を削除する操作もあります。アプリを削除した後にmacOS側の関連データも削除したい場合は、Token MeterのApplication SupportディレクトリとApp Groupコンテナを削除できます。WindowsのMSIX LocalStateは通常のアンインストール時にWindowsが削除します。

Windowsの`TokenMeterSetup.exe`は、インストール前にシステム変更、Claude連携が既定で無効であること、このポリシーへのリンク、アンインストール方法を表示します。セットアップ自体はネットワーク通信を行いません。Windows版の変更内容と削除手順は[Windows installation and uninstallation](https://github.com/TakeruF/token_meter/blob/main/docs/windows-uninstall.md)を参照してください。

## 問い合わせ

不具合やプライバシーに関する問い合わせは、
[GitHub Issues](https://github.com/TakeruF/token_meter/issues)から連絡してください。
