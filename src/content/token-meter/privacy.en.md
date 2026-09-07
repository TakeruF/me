# Token Meter Privacy Policy

Last updated: July 16, 2026

Token Meter is an app for reviewing your Claude Code, Codex and Copilot CLI usage on your own Mac or Windows PC.

## Data handled

- Usage-related fields inside `~/.claude/projects` and `~/.codex/sessions` on macOS, or `%USERPROFILE%\.claude\projects`, `%USERPROFILE%\.codex\sessions` and `%USERPROFILE%\.copilot\session-state` on Windows
- The OAuth access token Claude Code stores in the macOS Keychain or in `.credentials.json` on Windows (only when you explicitly enable the Claude integration)
- Token counts, timestamps, model names, usage rates and reset times

Prompt text and response text are not stored. The OAuth access token and raw Keychain data are never written to logs,
UserDefaults, Windows app settings, SQLite, analytics, crash reports or plain-text files.

## What leaves your device

When the Claude integration is enabled, the OAuth access token is used solely to authenticate against Anthropic's
usage endpoint. No data is sent to a Token Meter server, an advertising provider or an analytics provider.

When update checks are enabled on macOS, the app connects to an update feed on GitHub, and to GitHub Releases when downloading an update. Prompts, responses, token usage and OAuth access tokens are not included in update checks. Automatic update checks can be turned off in Settings > Updates. The Windows Store distribution receives updates through the Microsoft Store. The directly distributed `TokenMeterSetup.exe` performs no network communication and has no updater of its own; updating means running a newer setup again.

## Local storage

On macOS, aggregated data is stored in the Application Support area and in the App Group container used by the widgets. On Windows it is stored in SQLite inside the MSIX LocalState area.
The OAuth access token is not among the stored data.

## Your control

The Claude integration can be disabled in Settings at any time. Settings also includes an action for deleting local history. To remove the related macOS data after uninstalling the app, delete Token Meter's Application Support directory and App Group container. Windows removes the MSIX LocalState during a normal uninstall.

Before installing, the Windows `TokenMeterSetup.exe` shows the system changes it makes, that the Claude integration is disabled by default, a link to this policy, and how to uninstall. Setup itself performs no network communication. For what the Windows version changes and how to remove it, see [Windows installation and uninstallation](https://github.com/TakeruF/token_meter/blob/main/docs/windows-uninstall.md).

## Contact

For bugs or privacy questions, get in touch through
[GitHub Issues](https://github.com/TakeruF/token_meter/issues).
