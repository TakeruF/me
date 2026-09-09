export type Product = {
  slug: string;
  name: string;
  category:
    | "Everyday tools"
    | "Learning & language"
    | "Developer tools"
    | "Open source & MCP";
  eyebrow: string;
  headline: string;
  description: string;
  platforms: string;
  primary: { label: string; href: string };
  links: { label: string; href: string; internal?: boolean }[];
  features: { title: string; text: string }[];
  notes: string[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    portrait?: boolean;
  };
  gallery?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
    portrait?: boolean;
  }[];
  motif: string;
  visualLabel: string;
  tone: string;
  workState?: "hidden" | "under-development";
};

export const categories = [
  "Everyday tools",
  "Learning & language",
  "Developer tools",
  "Open source & MCP",
] as const;
export const categoryIds = ["everyday", "learning", "developer", "open-source"];

export const products: Product[] = [
  {
    slug: "pdf-organizer",
    name: "PDF Organizer",
    category: "Everyday tools",
    eyebrow: "A LITTLE ORDER, A LOT LESS WORK",
    headline: "PDFを、ちょうどいい順番に。",
    description:
      "ページを並べ替える。必要なところだけ取り出す。2ページを見開きにする。ブラウザで開いて、その場で使えるPDF編集ツールです。",
    platforms: "Web · 日本語 / 中文",
    primary: {
      label: "PDF Organizer を開く",
      href: "https://pdfs-six.vercel.app",
    },
    links: [{ label: "GitHub", href: "https://github.com/TakeruF/pdfs" }],
    features: [
      {
        title: "ページ単位で、自在に。",
        text: "ドラッグで並べ替え、選択したページの削除や書き出し、先頭・末尾・ページ間への空白追加に対応。",
      },
      {
        title: "分割も、見開きも。",
        text: "ページ範囲を指定して複数のPDFをZIPで書き出し。左右の綴じ方向を選んで見開きPDFも作れます。",
      },
      {
        title: "ファイルは、その端末に。",
        text: "読み込みから書き出しまでブラウザ内で処理。PDF本体や入力したPDFパスワードをアプリのサーバーへ送信しません。",
      },
    ],
    notes: [
      "アカウントの作成は不要です。",
      "大きなPDFは端末のメモリを多く使います。動作が重い場合はサイト内プレビューをオフにできます。",
      "保護されたPDFの互換変換ではページを画像化するため、文字の検索・選択ができなくなる場合があります。",
    ],
    image: {
      src: "/projects/pdf-organizer.png",
      alt: "中国語表示のPDF OrganizerでPDFページを整理するデスクトップ画面",
      width: 2880,
      height: 1800,
    },
    gallery: [
      {
        src: "/projects/pdf-organizer.png",
        alt: "中国語表示のPDF OrganizerでPDFページを整理するデスクトップ画面",
        caption: "PDFを、ちょうどいい順番に。",
        width: 2880,
        height: 1800,
      },
    ],
    motif: "01 / 02 / 03",
    visualLabel: "LESS FRICTION. MORE ORDER.",
    tone: "blue",
  },
  {
    slug: "markdown-docs",
    name: "Markdown Docs",
    category: "Everyday tools",
    eyebrow: "THOUGHTS, WITH ROOM TO GROW",
    headline: "思いついたら、書きつづける。",
    description:
      "Markdownの編集とプレビューを並べた、シンプルな文書エディタ。通信が途切れても、書く時間を途切れさせないために。",
    platforms: "Web · Offline-first",
    primary: {
      label: "Markdown Docs を開く",
      href: "https://mddocs-five.vercel.app",
    },
    links: [],
    features: [
      {
        title: "書きながら、仕上がりを見る。",
        text: "Markdown入力とプレビューを分割表示。見出し、リンク、引用、コードなどの入力をツールバーが支えます。",
      },
      {
        title: "複数のメモを、ひとつの場所に。",
        text: "文書を作成し、タイトルと本文から検索。サイドバーで切り替えながら、考えを整理できます。",
      },
      {
        title: "オフラインでも、その続きから。",
        text: "入力内容は端末内に自動保存。初回読み込み後は、キャッシュが利用できる環境で通信なしでも編集を続けられます。",
      },
    ],
    notes: [
      "文書は利用中のブラウザ・端末に保存されます。端末間の自動同期はありません。",
      "ブラウザのサイトデータを削除すると保存内容も失われます。大切な文書は別の場所にも保管してください。",
    ],
    motif: "Aa / #",
    visualLabel: "WRITE. PREVIEW. KEEP GOING.",
    tone: "cream",
    workState: "under-development",
  },
  {
    slug: "flight-market",
    name: "Flight Market",
    category: "Everyday tools",
    eyebrow: "A BETTER VIEW OF AIRFARES",
    headline: "航空券の値動きを、見渡す。",
    description:
      "東京・大阪発の航空券を、価格の推移から見るダッシュボード。現在の価格だけでなく、過去の中央値や最安値と比べて、気になる路線を見つけます。",
    platforms: "Web",
    primary: {
      label: "Flight Market を開く",
      href: "https://flight-market.vercel.app",
    },
    links: [],
    features: [
      {
        title: "路線を、横並びで。",
        text: "出発地・地域・直行便・価格上限で絞り込み、気になる路線の価格を一覧できます。",
      },
      {
        title: "安さに、時間軸を。",
        text: "7日・30日・90日のチャートと、前回価格・中央値・最安値を使って変化を追います。",
      },
      {
        title: "条件に合う変化を知る。",
        text: "行き先や価格などの条件を設定できる通知機能。管理用リンクから変更・停止できます。",
      },
    ],
    notes: [
      "予約・決済は行いません。航空券の購入はリンク先のサービスで行います。",
      "表示価格は取得時点の参考情報です。購入前に販売元で最新の総額・条件を確認してください。",
      "Mock market と表示されている場合、価格はデモデータです。",
    ],
    motif: "↗",
    visualLabel: "A LITTLE CONTEXT FOR YOUR NEXT TRIP.",
    tone: "blue",
    workState: "under-development",
  },
  {
    slug: "magcup",
    name: "MAGcup",
    category: "Everyday tools",
    eyebrow: "MAKE ANDROID GREAT",
    headline: "Androidの、次のお気に入り。",
    description:
      "便利なアプリ、ちょっとした工夫、新しい使い方。Androidをもっと自分らしく使うためのアプリ・記事のキュレーションサイトです。",
    platforms: "Web · 日本語 / English / 中文",
    primary: { label: "MAGcup を開く", href: "https://magcup.vercel.app" },
    links: [],
    features: [
      {
        title: "用途から、アプリを探す。",
        text: "Apps Wikiの検索やフィルターで、目的に合ったアプリとその特徴を見つけられます。",
      },
      {
        title: "使い方まで、もう一歩。",
        text: "アプリの紹介に加えて、活用記事やTipsも掲載。気になったものを実際に使い始める手がかりに。",
      },
      {
        title: "日々の、小さな発見。",
        text: "おすすめやDaily Pickから、自分では探さなかったアプリに出会えます。",
      },
    ],
    notes: [
      "アプリのインストール先や対応条件は、それぞれの紹介ページで確認してください。",
      "ログインや投稿機能はMAGcup側で利用できます。",
    ],
    motif: "M / G",
    visualLabel: "SMALL DISCOVERIES. BETTER EVERYDAYS.",
    tone: "mint",
    workState: "hidden",
  },
  {
    slug: "f1-harmony",
    name: "F1 Harmony",
    category: "Everyday tools",
    eyebrow: "THE RACE WEEKEND, AT A GLANCE",
    headline: "レース週末を、ひと目で。",
    description:
      "次のセッション、レース結果、ランキング、ドライバーとチームの情報。F1ファンのために作った、HarmonyOSのネイティブアプリです。",
    platforms: "HarmonyOS · 中文 / English",
    primary: {
      label: "詳しい紹介・対応状況を見る",
      href: "https://takeruf.github.io/f1-harmony/",
    },
    links: [
      {
        label: "プライバシー・データ出典",
        href: "https://takeruf.github.io/f1-harmony/#privacy",
      },
    ],
    features: [
      {
        title: "次のセッションを、逃さない。",
        text: "通常の週末とスプリント週末に合わせた日程、ローカル時刻、開始までのカウントダウンをまとめて表示。",
      },
      {
        title: "結果から、物語へ。",
        text: "順位やポイントからドライバー・チームの詳しい情報へ。過去の成績やニュースまで辿れます。",
      },
      {
        title: "HarmonyOSらしい使い心地。",
        text: "デスクトップカードや実況ウィンドウ、任意のレース通知など、システムの機能を活かして設計しています。",
      },
    ],
    notes: [
      "非公式のファンアプリです。Formula 1、FIA、各チームとの提携・公認関係はありません。",
      "公開紹介ページには開発中ビルドのスクリーンショットが含まれます。配布状況はリンク先で確認してください。",
      "データの出典・利用条件と通知に関するプライバシー情報は、詳しい紹介ページに掲載しています。",
    ],
    image: {
      src: "/projects/f1-harmony.webp",
      alt: "F1 Harmonyの次のセッションとレース日程の画面",
      width: 332,
      height: 720,
      portrait: true,
    },
    motif: "F / 1",
    visualLabel: "BUILT FOR THE RACE WEEKEND.",
    tone: "cream",
  },
  {
    slug: "hanlu",
    name: "Hanlu",
    category: "Learning & language",
    eyebrow: "A LITTLE CHINESE, EVERY DAY",
    headline: "中国語を、毎日の習慣に。",
    description:
      "HSKの単語、クイズ、音声、学習の記録。ひとつずつ身につけながら、パソコンでもスマートフォンでも、いつもの続きから学べます。",
    platforms: "Web · iOS · Android",
    primary: { label: "Hanlu で学ぶ", href: "https://hanlu.app/learn" },
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/jp/app/hanlu/id6760371605",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.hanlu.app",
      },
      { label: "Hanlu 公式サイト", href: "https://hanlu.app/about" },
    ],
    features: [
      {
        title: "覚える言葉を、見つける。",
        text: "HSKの単語リストから、今のレベルに合った学習を。意味と発音を確認しながら進められます。",
      },
      {
        title: "覚えたつもりを、確かめる。",
        text: "クイズや音声で復習し、単語を読む・聞く体験を日々の学習に取り入れます。",
      },
      {
        title: "端末が変わっても、続きから。",
        text: "学習記録をデバイス間で同期。まとまった時間にも、ちょっとした隙間にも。",
      },
    ],
    notes: [
      "Web版と各ストア版は、Hanluの公式ページから利用できます。",
      "アカウントや学習データはHanlu側で管理されます。",
    ],
    image: {
      src: "/projects/hanlu.webp",
      alt: "Hanluの学習記録をパソコンとモバイルで表示",
      width: 2880,
      height: 1800,
    },
    motif: "学 / 习",
    visualLabel: "ONE MORE WORD. ONE MORE DAY.",
    tone: "mint",
  },
  {
    slug: "hanlu-dict",
    name: "Hanlu Dict",
    category: "Learning & language",
    eyebrow: "LOOK IT UP. KEEP IT.",
    headline: "調べた中国語を、そのまま覚える。",
    description:
      "日本語・簡体字・ピンインからすぐ引ける中国語辞書。意味、発音、例文、HSKレベルをひとつの画面で確かめ、気になった語はHanluで復習できます。",
    platforms: "Web · iOS",
    primary: { label: "Hanlu Dictを引く", href: "https://dict.hanlu.app" },
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/jp/app/hanlu-dict/id6776096856",
      },
      { label: "Hanluで復習する", href: "https://hanlu.app/learn" },
      { label: "Hanlu Dictについて", href: "https://dict.hanlu.app/about" },
    ],
    features: [
      {
        title: "ことばを、すぐ引く。",
        text: "日本語・簡体字・ピンインから検索。声調記号がなくても、知りたい一語にまっすぐ辿り着けます。",
      },
      {
        title: "使い方まで、確かめる。",
        text: "意味だけでなく、発音、例文、HSKレベルを並べて表示。単語が実際にどう使われるかまで読めます。",
      },
      {
        title: "調べた先を、覚える。",
        text: "気になった語はスターに保存。Hanluの学習画面で、クイズと音声を使って復習できます。",
      },
    ],
    notes: [
      "調べるだけならアカウント登録は不要です。",
      "スターの保存とHanluへの引き継ぎにはログインが必要です。",
      "対応する配布先・動作環境はリンク先で確認してください。",
    ],
    image: {
      src: "/projects/hanlu-dict.webp",
      alt: "Hanlu Dictを表示するパソコン、タブレット、スマートフォン",
      width: 2880,
      height: 1800,
    },
    motif: "词 / 典",
    visualLabel: "LOOK IT UP. KEEP IT.",
    tone: "cream",
  },
  {
    slug: "furigana-keyboard",
    name: "Furigana Keyboard",
    category: "Learning & language",
    eyebrow: "WRITE IT. READ IT. SAY IT.",
    headline: "書いて、読んで、日本語をつなぐ。",
    description:
      "手書きとローマ字で入力できる日本語キーボード。ふりがな付きの変換候補から、読みを確かめながら言葉を選べます。",
    platforms: "Android · iOS",
    primary: {
      label: "Android版をダウンロード",
      href: "https://downloads.takeruf.com/furigana-keyboard/1.0.0-rc.5.apk",
    },
    links: [
      { label: "プライバシーポリシー", href: "/projects/furigana-keyboard/privacy", internal: true },
      { label: "利用規約", href: "/projects/furigana-keyboard/terms", internal: true },
      { label: "GitHub", href: "https://github.com/TakeruF/furigana_keyboard" },
    ],
    features: [
      {
        title: "読めない漢字も、書いて探す。",
        text: "手書きした文字を端末内で認識。連続入力や並べて書く入力にも対応しています。",
      },
      {
        title: "候補に、読みの手がかりを。",
        text: "辞書に基づく読みを変換候補に表示。かな・ローマ字表示を選びながら、日本語入力を進められます。",
      },
      {
        title: "基本の入力は、オフライン。",
        text: "認識と辞書検索、ローマ字のかな漢字変換は端末内で処理。通信できない場所でも使えます。",
      },
    ],
    notes: [
      "Androidの追加認識モデルや辞書の更新にはダウンロードが必要な場合があります。",
      "手書き内容や入力した文章を認識のために外部へ送信しません。",
      "Android版はこのページからダウンロードできます。iOS版は一般配布前です。",
    ],
    image: {
      src: "/projects/furigana-pixel-10-pro-v2.png",
      alt: "Pixel 10 Proのモックアップに表示した手書き入力とふりがな付き変換候補",
      width: 512,
      height: 1080,
      portrait: true,
    },
    motif: "あ / 字",
    visualLabel: "A WAY INTO JAPANESE.",
    tone: "cream",
  },
  {
    slug: "per-app-language",
    name: "Per-App Language",
    category: "Learning & language",
    eyebrow: "YOUR APPS. YOUR LANGUAGES.",
    headline: "このアプリは、この言語で。",
    description:
      "端末全体の言語を変えずに、アプリごとの表示言語を設定するAndroidユーティリティ。標準の「アプリの言語」に出てこないアプリも選べます。",
    platforms: "Android 13+ · Shizuku",
    primary: {
      label: "ダウンロード",
      href: "https://github.com/TakeruF/android-perapp-language-selector/releases/latest",
    },
    links: [
      {
        label: "GitHub・使い方",
        href: "https://github.com/TakeruF/android-perapp-language-selector",
      },
      {
        label: "プライバシーポリシー",
        href: "/projects/per-app-language/privacy",
        internal: true,
      },
    ],
    features: [
      {
        title: "アプリを選んで、言語を選ぶ。",
        text: "インストール済みアプリの一覧から対象を探し、使いたい言語を指定できます。",
      },
      {
        title: "システム標準の一覧を、補う。",
        text: "Androidの標準設定で言語変更の対象にならないアプリにも、Shizukuを通じて設定を適用します。",
      },
      {
        title: "必要な処理は、端末の中で。",
        text: "アプリ一覧や設定の処理は端末内で完結。インターネット権限を持たず、広告・解析SDKも含みません。",
      },
    ],
    notes: [
      "Android 13以降と、セットアップ済みのShizukuが必要です。",
      "アプリ自体に存在しない翻訳を追加するものではありません。",
      "Shizukuの許可は利用者が管理し、いつでも取り消せます。",
    ],
    image: {
      src: "/projects/per-app-list.webp",
      alt: "アプリ一覧とそれぞれに設定された言語",
      width: 538,
      height: 1200,
      portrait: true,
    },
    motif: "Aa / あ",
    visualLabel: "A LANGUAGE FOR EVERY APP.",
    tone: "blue",
  },
  {
    slug: "english-words",
    name: "英単語マスター",
    category: "Learning & language",
    eyebrow: "ONE WORD AT A TIME",
    headline: "一語ずつ、わかるを増やす。",
    description:
      "英単語の意味だけでなく、語源や例文まで。カードをめくる感覚で学び、一覧で振り返る、シンプルな英単語学習ツールです。",
    platforms: "Web",
    primary: {
      label: "英単語マスターを開く",
      href: "https://eitango-chi.vercel.app",
    },
    links: [],
    features: [
      {
        title: "一枚のカードに、ひとつの言葉。",
        text: "単語・意味・語源・例文をまとめて表示。縦に送るカード表示と、見渡しやすい一覧表示を切り替えられます。",
      },
      {
        title: "覚えたい言葉に、絞り込む。",
        text: "カテゴリー・重要度・検索で対象を選択。意味を隠す機能やシャッフルで、復習のしかたを変えられます。",
      },
      {
        title: "習得済みを、記録する。",
        text: "覚えた単語に印をつけて、未習得の単語だけを表示。記録は利用中のブラウザに保存されます。",
      },
    ],
    notes: [
      "習得記録はブラウザ・端末ごとに保存されます。",
      "アプリのURLはそのままなので、同じブラウザで保存済みの記録を引き続き使えます。",
    ],
    motif: "word.",
    visualLabel: "A LITTLE MORE, EVERY DAY.",
    tone: "mint",
    workState: "hidden",
  },
  {
    slug: "ai-dict",
    name: "AI Dict",
    category: "Learning & language",
    eyebrow: "WORDS, WITH A LITTLE MORE CONTEXT",
    headline: "意味の、その先まで。",
    description:
      "中国語・日本語の言葉を、例文や使い方と一緒に調べるAI辞書。自分のAIプロバイダーを選び、学習リストやクイズにつなげられます。",
    platforms: "Web · Android / Beta",
    primary: { label: "AI Dict を開く", href: "https://aidict.me" },
    links: [
      {
        label: "Android APK",
        href: "https://github.com/TakeruF/ai_dict/releases/latest",
      },
      { label: "GitHub", href: "https://github.com/TakeruF/ai_dict" },
    ],
    features: [
      {
        title: "文脈と一緒に、言葉を知る。",
        text: "意味・ピンイン・品詞・用法・例文をまとめて生成。中国語から日本語・英語、日本語から中国語を調べられます。",
      },
      {
        title: "自分のプロバイダーを使う。",
        text: "対応するAIサービスを設定から選び、自分のAPIキーで利用する構成です。",
      },
      {
        title: "調べたら、復習へ。",
        text: "HSK単語、4択クイズ、間隔反復、フラッシュカードを、日々の学習に取り入れられます。",
      },
    ],
    notes: [
      "ベータ版です。AIによる回答には誤りが含まれる場合があります。",
      "検索語とAPIキーは、選択したAIプロバイダーに端末から直接送信されます。各社の利用条件・料金が適用されます。",
      "iOS版は開発中で、一般配布は行っていません。",
    ],
    image: {
      src: "/projects/ai-dict.png",
      alt: "中国語の単語を日本語で検索したAI Dictのデスクトップ画面",
      width: 2880,
      height: 1800,
    },
    motif: "词 / 言",
    visualLabel: "MEANING, IN CONTEXT.",
    tone: "cream",
  },
  {
    slug: "token-meter",
    name: "Token Meter",
    category: "Developer tools",
    eyebrow: "STAY IN YOUR FLOW",
    headline: "AIの使用量を、ひと目で。",
    description:
      "Claude Code、Codex、Copilot CLIの利用状況をメニューバーとウィジェットに。作業の流れを止めずに、使用量と残り枠を確認するmacOSアプリです。",
    platforms: "macOS 14+ · Apple Silicon / Intel",
    primary: {
      label: "最新版をダウンロード",
      href: "https://github.com/TakeruF/token_meter/releases/latest",
    },
    links: [
      { label: "更新履歴", href: "/projects/token-meter/releases", internal: true },
      { label: "プライバシーポリシー", href: "/projects/token-meter/privacy", internal: true },
      { label: "GitHub", href: "https://github.com/TakeruF/token_meter" },
    ],
    features: [
      {
        title: "視線のすぐ先に、使用状況。",
        text: "メニューバーの表示と複数サイズのウィジェットから、日々の利用状況をすばやく確認できます。",
      },
      {
        title: "気になったら、詳しく。",
        text: "日別・モデル別のトークン使用量や期間比較をダッシュボードに。どこで使ったかを振り返れます。",
      },
      {
        title: "それぞれのデータを、正確に。",
        text: "プロバイダーが報告する枠と、ローカルログから集計する履歴を区別。取得できない残量を推測で埋めません。",
      },
    ],
    notes: [
      "現在のサポート対象はmacOSです。Windows版の開発・配布は停止しています。",
      "履歴はローカルで集計します。Claudeの残量取得は、設定で有効にした場合に限り公式の使用量エンドポイントへアクセスします。",
      "日本語・English・中文・한국어に対応しています。",
    ],
    image: {
      src: "/projects/token-meter-detail.webp",
      alt: "Token Meterのメニューバーと3サイズのデスクトップウィジェット",
      width: 1600,
      height: 1000,
    },
    motif: "↗ / %",
    visualLabel: "MORE FOCUS. LESS GUESSWORK.",
    tone: "mint",
  },
  {
    slug: "china-rail-mcp",
    name: "China Rail MCP",
    category: "Open source & MCP",
    eyebrow: "RAILWAY DATA, IN YOUR AI WORKFLOW",
    headline: "中国の鉄道を、AIに聞ける。",
    description:
      "12306の公式情報をもとに、駅・時刻・参考運賃・停車駅・空席を読み取り専用で検索。いつものAIクライアントから、旅の情報にアクセスするためのMCPサーバーです。",
    platforms: "MCP · Node.js",
    primary: {
      label: "導入ガイドを見る",
      href: "https://github.com/TakeruF/china-rail-mcp#readme",
    },
    links: [
      {
        label: "はじめてのMCPガイド",
        href: "https://takeruf.github.io/silkroad-mcp/en/guides/china-rail/",
      },
    ],
    features: [
      {
        title: "駅名から、具体的な列車へ。",
        text: "駅候補を解決してから列車を検索。出発・到着時刻、所要時間、参考運賃や空席を取得します。",
      },
      {
        title: "会話から、根拠のある情報へ。",
        text: "対応するMCPクライアントに接続し、自然な質問を具体的な検索条件に変えて調べられます。",
      },
      {
        title: "読み取り専用の、小さな道具。",
        text: "12306へのログインやユーザーCookieを必要とせず、情報の検索に範囲を絞っています。",
      },
    ],
    notes: [
      "中国鉄路・12306とは無関係の非公式プロジェクトです。",
      "予約、決済、キャンセル待ち、アカウント操作は行いません。",
      "時刻・参考価格・空席は照会時点の情報で、販売状況や上流サービスの状態により変化します。",
    ],
    image: {
      src: "/projects/china-rail.webp",
      alt: "China Rail MCPを接続したChatGPTで列車情報を検索した公開デモ",
      width: 700,
      height: 1526,
      portrait: true,
    },
    motif: "站 → 站",
    visualLabel: "A CLEARER ROUTE TO RAILWAY DATA.",
    tone: "blue",
  },
  {
    slug: "japan-rail-mcp",
    name: "Japan Rail MCP",
    category: "Open source & MCP",
    eyebrow: "A SHINKANSEN-FIRST START",
    headline: "日本の鉄道を、つながるデータに。",
    description:
      "新幹線を中心に、日本の駅・時刻表・運賃・停車駅を扱う読み取り専用MCPサーバー。共通の形で鉄道情報を取り出すための、実験的な取り組みです。",
    platforms: "MCP · Node.js 22+",
    primary: {
      label: "GitHub・導入方法",
      href: "https://github.com/TakeruF/japan-rail-mcp",
    },
    links: [],
    features: [
      {
        title: "駅を、曖昧なままにしない。",
        text: "日本語・英語・ローマ字で駅を検索。APIキーなしでも、新幹線を中心とした同梱駅カタログを使えます。",
      },
      {
        title: "時刻と運賃を、構造化。",
        text: "駅すぱあとAPIのキーを設定すると、対応プランの範囲で直通列車の時刻、運賃、席種、停車駅を取得できます。",
      },
      {
        title: "何ができるかも、明示する。",
        text: "データの出典と対応範囲を返し、提供していない機能は未対応として扱います。",
      },
    ],
    notes: [
      "現在は実験的な新幹線中心の実装です。公式の鉄道・MCP標準ではありません。",
      "リアルタイムの照会には、導入者自身の駅すぱあとAPIキーと対応プランが必要です。",
      "空席照会・乗換経路検索・予約には対応していません。",
    ],
    motif: "駅 → 駅",
    visualLabel: "STRUCTURED DATA. CLEAR BOUNDARIES.",
    tone: "cream",
    workState: "under-development",
  },
  {
    slug: "waseda-portal-mcp",
    name: "Waseda Portal MCP",
    category: "Open source & MCP",
    eyebrow: "A CLEARER VIEW OF YOUR CLASSES",
    headline: "授業の情報を、見つけやすく。",
    description:
      "公開Webシラバスの検索と、本人の端末で使う授業・締切の読み取り専用ツール。早稲田大学の情報へアクセスするための非公式プロジェクトです。",
    platforms: "Web search · MCP",
    primary: {
      label: "公開シラバス検索を開く",
      href: "https://waseda-portal-mcp.vercel.app",
    },
    links: [
      {
        label: "GitHub・導入方法",
        href: "https://github.com/TakeruF/waseda-portal-mcp",
      },
    ],
    features: [
      {
        title: "シラバスを、探しやすく。",
        text: "科目名や担当者などから公開シラバスを検索。概要、授業計画、評価方法などの確認を支えます。",
      },
      {
        title: "授業と締切を、ひとつの流れに。",
        text: "ローカルのMCPでは、本人がログインしたMoodleやMyWasedaの情報を読み取り専用でまとめます。",
      },
      {
        title: "公開情報と、個人の情報を分ける。",
        text: "公開Webは認証セッションを持ちません。個人向け連携は本人の端末内で利用する設計です。",
      },
    ],
    notes: [
      "早稲田大学とは無関係で、大学による承認・保証・サポートはありません。",
      "公開Webに大学のパスワードや認証Cookieを入力・送信する必要はありません。",
      "ネイティブコンパニオンは初期実装です。一般配布された製品としては扱っていません。",
    ],
    motif: "学 / 知",
    visualLabel: "FIND THE INFORMATION YOU NEED.",
    tone: "mint",
  },
  {
    slug: "silkroad-mcp",
    name: "Silkroad MCP",
    category: "Open source & MCP",
    eyebrow: "BETTER, WHEN CONNECTED",
    headline: "AIと、ふだん使う世界をつなぐ。",
    description:
      "アジアのサービスやデバイス、標準プロトコルとAIをつなぐためのカタログ。MCPサーバー、再利用できる部品、実装の設計資料をまとめています。",
    platforms: "Documentation · English / 中文",
    primary: {
      label: "カタログを読む",
      href: "https://takeruf.github.io/silkroad-mcp/en/",
    },
    links: [
      { label: "简体中文", href: "https://takeruf.github.io/silkroad-mcp/zh/" },
      { label: "GitHub", href: "https://github.com/TakeruF/silkroad-mcp" },
    ],
    features: [
      {
        title: "つなぎたいものから、探す。",
        text: "鉄道、メール、サービス連携。各プロジェクトが扱う機能・対応状況・認証方法をまとめて確認できます。",
      },
      {
        title: "最初の接続まで、道案内。",
        text: "初めてMCPを使う人向けに、クライアントの選択からセットアップ、実際の呼び出しまでのガイドを用意しています。",
      },
      {
        title: "部品も、考え方も共有する。",
        text: "公開ソースに加え、再利用できる設計やテンプレート、機械可読のカタログを掲載しています。",
      },
    ],
    notes: [
      "個々のサービスの利用条件や認証要件は、各プロジェクトの案内を確認してください。",
      "公開ソース、非公開実装、公開設計資料の有無を区別して掲載しています。",
    ],
    motif: "＊",
    visualLabel: "TOOLS, IDEAS, AND CONNECTIONS.",
    tone: "blue",
  },
  {
    slug: "mcp-mail-core",
    name: "MCP Mail Core",
    category: "Open source & MCP",
    eyebrow: "MAIL, WITH CLEAR CONTEXT",
    headline: "複数のメールを、確かな文脈で。",
    description:
      "複数アカウントのメール連携を支えるMCP基盤。どのアカウントの情報か、どの操作を許可したかを明確にしながら、AIとメールをつなぎます。",
    platforms: "Developer library · MCP",
    primary: {
      label: "GitHub・導入方法",
      href: "https://github.com/TakeruF/mcp-mail-core",
    },
    links: [],
    features: [
      {
        title: "アカウントを、混同しない。",
        text: "安定したアカウントIDと出典付きの結果で、複数メールボックスの読み取りを扱います。",
      },
      {
        title: "操作には、明確な確認を。",
        text: "書き込みはアカウントを指定し、同じ呼び出しの中で明示的な確認を要求。永久削除の機能は持ちません。",
      },
      {
        title: "プロバイダーを、共通の基盤で。",
        text: "Gmailの実行可能なアダプターと、QQ Mail・iCloud Mailなどの独立した実装を支える契約・ライブラリを提供します。",
      },
    ],
    notes: [
      "メールをこの紹介サイトに接続するものではありません。導入先のMCP環境で設定します。",
      "利用者自身による各アカウントの認証・権限付与が必要です。",
      "機能・配布形態・導入手順はリポジトリの最新版を確認してください。",
    ],
    motif: "@ / →",
    visualLabel: "THE RIGHT ACCOUNT. THE RIGHT ACTION.",
    tone: "mint",
  },
];

export function productPath(slug: string) {
  return `/projects/${slug}`;
}
export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const workProducts = products.filter(
  (product) => product.workState !== "hidden",
);

export function hasDetailPage(product: Product) {
  return (
    product.slug !== "f1-harmony" &&
    product.slug !== "hanlu" &&
    product.slug !== "hanlu-dict" &&
    product.workState !== "under-development"
  );
}

export function productHref(slug: string) {
  if (slug === "hanlu") return "https://hanlu.app/about";
  if (slug === "hanlu-dict") return "https://dict.hanlu.app/about";
  if (slug === "f1-harmony") return "https://takeruf.github.io/f1-harmony/";
  return productPath(slug);
}
