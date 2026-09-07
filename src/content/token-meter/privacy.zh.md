# Token Meter 隐私政策

最后更新：2026 年 7 月 16 日

Token Meter 是一款在你自己的 Mac 或 Windows PC 上查看 Claude Code、Codex 与 Copilot CLI 使用情况的应用。

## 处理的数据

- macOS 上 `~/.claude/projects`、`~/.codex/sessions`，或 Windows 上 `%USERPROFILE%\.claude\projects`、`%USERPROFILE%\.codex\sessions`、`%USERPROFILE%\.copilot\session-state` 中与用量相关的字段
- Claude Code 保存在 macOS 钥匙串或 Windows `.credentials.json` 中的 OAuth 访问令牌（仅在你明确启用 Claude 集成时）
- 令牌数量、日期时间、模型名称、使用率与重置时间

不保存提示词正文与回复正文。不会将 OAuth 访问令牌与钥匙串原始数据写入日志、
UserDefaults、Windows 应用设置、SQLite、分析服务、崩溃报告或明文文件。

## 对外发送

启用 Claude 集成时，OAuth 访问令牌仅用于向 Anthropic 的用量查询端点进行认证。
不会向 Token Meter 自有服务器、广告服务商或分析服务商发送数据。

在 macOS 版启用更新检查时，应用会连接 GitHub 上的更新源，下载更新时连接 GitHub Releases。更新检查不包含提示词、回复、令牌用量或 OAuth 访问令牌。自动更新检查可在 Settings > Updates 中关闭。Windows 的商店版由 Microsoft Store 提供更新。直接分发的 `TokenMeterSetup.exe` 不进行网络通信，也没有自带的自动更新；更新需要重新运行新的安装程序。

## 本地存储

macOS 版的汇总数据保存在 Application Support 区域以及供小组件显示使用的 App Group 容器中。Windows 版保存在 MSIX LocalState 区域的 SQLite 中。
保存的内容不包含 OAuth 访问令牌。

## 用户的控制权

可随时在设置中关闭 Claude 集成。设置中同样提供删除本地历史的操作。卸载应用后若希望一并删除 macOS 上的相关数据，可删除 Token Meter 的 Application Support 目录与 App Group 容器。Windows 的 MSIX LocalState 会在正常卸载时由系统删除。

Windows 的 `TokenMeterSetup.exe` 会在安装前说明所做的系统更改、Claude 集成默认关闭、本政策的链接以及卸载方法。安装程序本身不进行网络通信。Windows 版的更改内容与删除步骤请参阅 [Windows installation and uninstallation](https://github.com/TakeruF/token_meter/blob/main/docs/windows-uninstall.md)。

## 联系方式

如遇问题或有隐私方面的疑问，请通过
[GitHub Issues](https://github.com/TakeruF/token_meter/issues) 联系。
