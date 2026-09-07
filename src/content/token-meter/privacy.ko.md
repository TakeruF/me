# Token Meter 개인정보 처리방침

최종 업데이트: 2026년 7월 16일

Token Meter는 Claude Code, Codex, Copilot CLI의 사용 현황을 사용자 본인의 Mac 또는 Windows PC에서 확인하기 위한 앱입니다.

## 다루는 데이터

- macOS의 `~/.claude/projects`, `~/.codex/sessions`, 또는 Windows의 `%USERPROFILE%\.claude\projects`, `%USERPROFILE%\.codex\sessions`, `%USERPROFILE%\.copilot\session-state` 안에 있는 사용량 관련 필드
- Claude Code가 macOS 키체인 또는 Windows의 `.credentials.json`에 저장한 OAuth 액세스 토큰(Claude 연동을 명시적으로 활성화한 경우에만)
- 토큰 수, 날짜와 시각, 모델명, 사용률, 재설정 시각

프롬프트 본문과 응답 본문은 저장하지 않습니다. OAuth 액세스 토큰과 키체인의 원본 데이터를 로그,
UserDefaults, Windows 앱 설정, SQLite, 애널리틱스, 크래시 리포트, 평문 파일에 저장하지 않습니다.

## 외부 전송

Claude 연동을 활성화한 경우, OAuth 액세스 토큰은 Anthropic의 사용량 조회 엔드포인트에 대한
인증에만 사용합니다. Token Meter 자체 서버, 광고 사업자, 애널리틱스 사업자에게 데이터를 전송하지 않습니다.

macOS 버전에서 업데이트 확인을 활성화한 경우 GitHub의 업데이트 피드에 연결하고, 업데이트를 내려받을 때는 GitHub Releases에 연결합니다. 프롬프트, 응답, 토큰 사용량, OAuth 액세스 토큰은 업데이트 확인에 포함하지 않습니다. 자동 업데이트 확인은 Settings > Updates에서 끌 수 있습니다. Windows의 스토어 배포판은 Microsoft Store가 업데이트를 제공합니다. 직접 배포하는 `TokenMeterSetup.exe`는 네트워크 통신이나 자체 자동 업데이트를 하지 않으며, 업데이트하려면 새 설치 프로그램을 다시 실행해야 합니다.

## 로컬 저장

macOS 버전의 집계 데이터는 Application Support 영역과 위젯 표시용 App Group 컨테이너에 저장합니다. Windows 버전은 MSIX의 LocalState 영역에 있는 SQLite에 저장합니다.
저장 대상에 OAuth 액세스 토큰은 포함되지 않습니다.

## 이용자의 제어

Claude 연동은 언제든지 설정 화면에서 끌 수 있습니다. 설정에는 로컬 기록을 삭제하는 기능도 있습니다. 앱을 삭제한 뒤 macOS의 관련 데이터도 지우려면 Token Meter의 Application Support 디렉터리와 App Group 컨테이너를 삭제하면 됩니다. Windows의 MSIX LocalState는 일반적인 제거 과정에서 Windows가 삭제합니다.

Windows의 `TokenMeterSetup.exe`는 설치 전에 시스템 변경 사항, Claude 연동이 기본적으로 꺼져 있다는 점, 이 방침의 링크, 제거 방법을 표시합니다. 설치 프로그램 자체는 네트워크 통신을 하지 않습니다. Windows 버전의 변경 내용과 제거 절차는 [Windows installation and uninstallation](https://github.com/TakeruF/token_meter/blob/main/docs/windows-uninstall.md)을 참조해 주세요.

## 문의

버그나 개인정보에 관한 문의는
[GitHub Issues](https://github.com/TakeruF/token_meter/issues)를 통해 연락해 주세요.
