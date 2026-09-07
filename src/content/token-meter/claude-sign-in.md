# Claude Code sign-in and Keychain access (manual steps)

[English](#english) | [日本語](#日本語) | [中文](#中文) | [한국어](#한국어)

---

## English

Token Meter's **Sign in to Claude Code**, **Allow Keychain access**, and **Get Claude Code** buttons only perform the steps described on this page, one click at a time. Follow these instructions if you prefer to do them yourself.

Token Meter never refreshes Claude's credentials itself because rotating the token would break Claude Code's own session. It reads the credential once only to ask Anthropic for your usage.

### 1. Check whether Claude Code is installed

```sh
command -v claude
```

If a path is displayed, Claude Code is installed. If nothing is displayed, install it from <https://claude.com/claude-code>.

Token Meter can count tokens even when the CLI is not on your `PATH`; it only needs to read the logs in `~/.claude/projects`. The `claude` command is required only when signing in again with these steps.

### 2. Sign in again

In Terminal, run:

```sh
claude
```

After it starts, enter this in the REPL:

```text
/login
```

Complete the sign-in in the browser that opens. `/login` is a slash command inside the interactive REPL, not a CLI flag, so Token Meter and other external tools cannot complete it unattended.

After signing in, click **Re-check** in Token Meter.

### 3. Grant Keychain access

To show your remaining Claude Pro / Max usage, Token Meter must read the `Claude Code-credentials` item that Claude Code saved in macOS Keychain.

The first time it reads the item, macOS displays a dialog similar to this:

> "Token Meter" wants to use your confidential information stored in "Claude Code-credentials" in your keychain.

- Choose **Always Allow** to prevent the dialog from appearing on future refreshes.
- Choose **Allow** to grant access once. macOS will ask again on the next refresh.
- Choose **Deny** to reject access. You will then need to follow the steps under “If you selected Deny.”

Token Meter's **Allow Keychain access** button performs this read once on demand so the dialog appears immediately after you click, rather than during a background refresh.

#### If you selected Deny

macOS remembers the denial for each Keychain item, so Token Meter cannot undo it. Change the permission in Keychain Access:

1. Open **Keychain Access**. Search for “Keychain Access” with Spotlight. Depending on your macOS version, the app is in `/System/Applications/Utilities/` or `/System/Library/CoreServices/Applications/`.
2. Search for and open `Claude Code-credentials`.
3. On the **Access Control** tab, allow Token Meter. Alternatively, remove Token Meter from the list so macOS asks again next time.
4. Return to Token Meter and click **Re-check**.

If you do not want Claude usage displayed, turn off **Claude Pro / Max usage** in Settings. Keychain reads and network access will stop, while token counts from local logs will continue to work.

### 4. Troubleshooting

| Symptom | What to check |
| --- | --- |
| “Your sign-in has expired” does not disappear | Start `claude`, run `/login` again, and click **Re-check** when finished. |
| `command not found: claude` | The install location is not on your `PATH`. Check `.zprofile` and `.zshrc`. |
| Access is denied without a dialog | Follow the steps under “If you selected Deny.” |
| You replaced the app with a newly signed build | macOS treats it as a different binary, so you must grant Keychain access again. |

---

## 日本語

Token Meter の「Claude Code にサインイン」「キーチェーンへのアクセスを許可」「Claude Code を入手」ボタンは、このページに書かれている操作をワンクリックで代行するだけのものです。アプリに任せず自分で操作したい場合は、ここの手順をそのまま実行してください。

Token Meter は Claude の資格情報を自分で更新（リフレッシュ）しません。トークンのローテーションによって Claude Code 側のログインが壊れるためです。読み取りは、Anthropic に使用量を問い合わせる 1 回だけです。

### 1. Claude Code が入っているか確認する

```sh
command -v claude
```

パスが表示されれば入っています。何も出なければ <https://claude.com/claude-code> からインストールしてください。

Token Meter はトークン数を数えるだけなら CLI が `PATH` になくても動きます（`~/.claude/projects` のログを読むだけです）。`claude` が必要になるのは、この手順でサインインし直すときだけです。

### 2. サインインし直す

ターミナルで実行します。

```sh
claude
```

起動したら、REPL の中で次のように入力します。

```text
/login
```

ブラウザが開くのでサインインを完了します。`/login` は対話型 REPL 内のスラッシュコマンドで、CLI のフラグではありません。そのため Token Meter を含め、外部から非対話で完了させることはできません。

サインインが終わったら Token Meter の「再確認」を押してください。

### 3. Keychain へのアクセスを許可する

Claude 使用量（Pro / Max の残量）を表示するには、Claude Code が macOS Keychain に保存した `Claude Code-credentials` を Token Meter が読み取る必要があります。

初回の読み取りで macOS 自身が次のようなダイアログを出します。

> "Token Meter" wants to use your confidential information stored in "Claude Code-credentials" in your keychain.

- **常に許可（Always Allow）**を選ぶと、以後の更新では聞かれません。
- **許可（Allow）**を選ぶと 1 回だけ許可され、次の更新でまた聞かれます。
- **拒否（Deny）**を選ぶと、以後は下の「拒否してしまったとき」の手順が必要になります。

Token Meter の「キーチェーンへのアクセスを許可」ボタンは、この読み取りをその場で 1 回だけ実行し、バックグラウンドの更新中ではなくクリックの直後にダイアログが出るようにするためのものです。

#### 拒否してしまったとき

macOS はアイテムごとの拒否を記憶するので、アプリ側からは元に戻せません。キーチェーンアクセスで直します。

1. **キーチェーンアクセス**を開きます。Spotlight で「キーチェーンアクセス」または「Keychain Access」を検索してください。macOS のバージョンによって、アプリは `/System/Applications/Utilities/` または `/System/Library/CoreServices/Applications/` にあります。
2. `Claude Code-credentials` を検索して開きます。
3. **アクセス制御**タブで Token Meter を許可します。または一覧から Token Meter を削除し、次回もう一度 macOS に確認させます。
4. Token Meter に戻って「再確認」を押します。

Claude の使用量表示自体をやめたい場合は、設定で「Claude Pro / Max利用状況」をオフにしてください。Keychain の読み取りとネットワークアクセスは停止し、ローカルログによるトークン数の表示だけが残ります。

### 4. うまくいかないとき

| 症状 | 見るところ |
| --- | --- |
| 「サインインが失効しています」が消えない | `claude` を起動し、`/login` をやり直します。完了後に「再確認」を押してください。 |
| `command not found: claude` | インストール先が `PATH` にありません。`.zprofile` と `.zshrc` を確認してください。 |
| ダイアログが出ずに拒否される | 上記「拒否してしまったとき」の手順を実行してください。 |
| 署名し直した版に入れ替えた | 別バイナリとして扱われるため、Keychain の許可をもう一度求められます。 |

---

## 中文

Token Meter 中的“登录 Claude Code”“允许访问钥匙串”和“获取 Claude Code”按钮，只是让你通过一次点击执行本页所述的操作。如果你希望自己手动完成，请直接按照以下步骤操作。

Token Meter 不会自行刷新 Claude 凭据，因为轮换令牌会破坏 Claude Code 自身的会话。它只会读取一次凭据，用于向 Anthropic 查询你的用量。

### 1. 检查是否已安装 Claude Code

```sh
command -v claude
```

如果显示路径，说明已安装 Claude Code。如果没有任何输出，请从 <https://claude.com/claude-code> 安装。

即使 CLI 不在 `PATH` 中，Token Meter 仍可统计令牌数；它只需读取 `~/.claude/projects` 中的日志。只有按照这些步骤重新登录时才需要使用 `claude` 命令。

### 2. 重新登录

在“终端”中运行：

```sh
claude
```

启动后，在 REPL 中输入：

```text
/login
```

在打开的浏览器中完成登录。`/login` 是交互式 REPL 内的斜杠命令，而不是 CLI 参数，因此 Token Meter 或其他外部工具无法在无人操作的情况下完成登录。

登录完成后，在 Token Meter 中点击“重新检查”。

### 3. 允许访问钥匙串

要显示 Claude Pro / Max 的剩余用量，Token Meter 必须读取 Claude Code 保存在 macOS 钥匙串中的 `Claude Code-credentials` 项目。

首次读取该项目时，macOS 会显示类似以下内容的对话框：

> "Token Meter" wants to use your confidential information stored in "Claude Code-credentials" in your keychain.

- 选择“**始终允许（Always Allow）**”，以后刷新时将不再显示此对话框。
- 选择“**允许（Allow）**”，只会授权一次，下次刷新时 macOS 会再次询问。
- 选择“**拒绝（Deny）**”，访问将被拒绝，之后需要按照“如果误选了拒绝”中的步骤操作。

Token Meter 的“允许访问钥匙串”按钮会按需执行一次读取，让对话框在你点击后立即出现，而不是在后台刷新期间突然出现。

#### 如果误选了拒绝

macOS 会记住每个钥匙串项目的拒绝设置，Token Meter 无法自行撤销。请在“钥匙串访问”中更改权限：

1. 打开“**钥匙串访问**”。可使用 Spotlight 搜索“钥匙串访问”或“Keychain Access”。根据 macOS 版本，该应用位于 `/System/Applications/Utilities/` 或 `/System/Library/CoreServices/Applications/`。
2. 搜索并打开 `Claude Code-credentials`。
3. 在“**访问控制**”标签页中允许 Token Meter。也可以从列表中移除 Token Meter，让 macOS 下次再次询问。
4. 返回 Token Meter，点击“重新检查”。

如果不想显示 Claude 用量，请在设置中关闭“Claude Pro / Max 用量”。钥匙串读取和网络访问将停止，而基于本地日志的令牌统计仍可继续使用。

### 4. 故障排除

| 症状 | 检查方法 |
| --- | --- |
| “登录已过期”提示一直不消失 | 启动 `claude`，再次运行 `/login`，完成后点击“重新检查”。 |
| `command not found: claude` | 安装位置不在 `PATH` 中。请检查 `.zprofile` 和 `.zshrc`。 |
| 没有显示对话框就被拒绝访问 | 按照上面的“如果误选了拒绝”步骤操作。 |
| 已将应用替换为重新签名的版本 | macOS 会将其视为不同的二进制文件，因此需要重新授予钥匙串访问权限。 |

---

## 한국어

Token Meter의 **Claude Code에 로그인**, **키체인 접근 허용**, **Claude Code 받기** 버튼은 이 페이지에 설명된 작업을 클릭 한 번으로 대신 수행할 뿐입니다. 직접 진행하려면 아래 단계를 따르세요.

Token Meter는 Claude 자격 증명을 자체적으로 새로 고치지 않습니다. 토큰을 교체하면 Claude Code의 기존 세션이 중단되기 때문입니다. Anthropic에 사용량을 조회할 때만 자격 증명을 한 번 읽습니다.

### 1. Claude Code 설치 확인

```sh
command -v claude
```

경로가 표시되면 Claude Code가 설치되어 있습니다. 아무것도 표시되지 않으면 <https://claude.com/claude-code>에서 설치하세요.

CLI가 `PATH`에 없어도 Token Meter는 토큰 수를 집계할 수 있습니다. `~/.claude/projects`의 로그만 읽기 때문입니다. `claude` 명령은 이 단계에 따라 다시 로그인할 때만 필요합니다.

### 2. 다시 로그인

터미널에서 다음 명령을 실행합니다.

```sh
claude
```

실행된 후 REPL 안에서 다음을 입력합니다.

```text
/login
```

열린 브라우저에서 로그인을 완료하세요. `/login`은 CLI 플래그가 아니라 대화형 REPL 안에서 사용하는 슬래시 명령이므로 Token Meter를 비롯한 외부 도구가 사용자 조작 없이 완료할 수 없습니다.

로그인이 끝나면 Token Meter에서 **다시 확인**을 클릭하세요.

### 3. 키체인 접근 허용

Claude Pro / Max의 남은 사용량을 표시하려면 Token Meter가 Claude Code가 macOS 키체인에 저장한 `Claude Code-credentials` 항목을 읽어야 합니다.

처음 읽을 때 macOS가 다음과 비슷한 대화상자를 표시합니다.

> "Token Meter" wants to use your confidential information stored in "Claude Code-credentials" in your keychain.

- **항상 허용(Always Allow)**을 선택하면 이후 새로 고침에서는 다시 묻지 않습니다.
- **허용(Allow)**을 선택하면 한 번만 허용되며 다음 새로 고침 때 다시 묻습니다.
- **거부(Deny)**를 선택하면 접근이 거부되며, 이후에는 아래의 “거부를 선택한 경우” 단계를 따라야 합니다.

Token Meter의 **키체인 접근 허용** 버튼은 필요할 때 이 읽기를 한 번 실행합니다. 따라서 백그라운드 새로 고침 중이 아니라 버튼을 클릭한 직후 대화상자가 표시됩니다.

#### 거부를 선택한 경우

macOS는 키체인 항목별로 거부 설정을 기억하므로 Token Meter에서 되돌릴 수 없습니다. 키체인 접근에서 권한을 변경하세요.

1. **키체인 접근**을 엽니다. Spotlight에서 “키체인 접근” 또는 “Keychain Access”를 검색하세요. macOS 버전에 따라 앱은 `/System/Applications/Utilities/` 또는 `/System/Library/CoreServices/Applications/`에 있습니다.
2. `Claude Code-credentials`를 검색해 엽니다.
3. **접근 제어** 탭에서 Token Meter를 허용합니다. 또는 목록에서 Token Meter를 제거하여 다음에 macOS가 다시 묻게 할 수 있습니다.
4. Token Meter로 돌아가 **다시 확인**을 클릭합니다.

Claude 사용량을 표시하지 않으려면 설정에서 **Claude Pro / Max 사용량**을 끄세요. 키체인 읽기와 네트워크 접근은 중지되며, 로컬 로그를 사용한 토큰 수 집계는 계속 작동합니다.

### 4. 문제 해결

| 증상 | 확인할 내용 |
| --- | --- |
| “로그인이 만료되었습니다”가 사라지지 않음 | `claude`를 실행하고 `/login`을 다시 진행한 다음 완료 후 **다시 확인**을 클릭하세요. |
| `command not found: claude` | 설치 경로가 `PATH`에 없습니다. `.zprofile`과 `.zshrc`를 확인하세요. |
| 대화상자 없이 접근이 거부됨 | 위의 “거부를 선택한 경우” 단계를 따르세요. |
| 다시 서명된 빌드로 앱을 교체함 | macOS가 다른 바이너리로 인식하므로 키체인 접근을 다시 허용해야 합니다. |
