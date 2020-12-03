---
title: "Hugoでブログをさくっと作ってみる※執筆途中"
description : "This is meta description"
date: 2020-12-02T13:32:09+09:00
description : "This is meta description"
# draft: true # 反映させる時はfalseに変えるかコメントアウト

# Blog用---------------------------------------------------
type: post
# image: images/blog/yourImages.jpg # ブログバナーの画像
# author: Jamica Jock # 表示されない？
# tags: ["motivation", "inspiration"] # tag

# Portfolio用----------------------------------------------
# caption: Product Mockup
# image: images/portfolio/item-2.jpg
# liveLink: link # ??
# # 右側の情報説明
# client: Julia Robertson
# submitDate: November 20, 2017
# category: ["mockup","design"] # tag
# location: 1201 park street, Avenue, Dhaka

---



# 参考にしたサイト等

[Hugoでさくっと自作ブログを作った](https://sanposhiho.com/posts/make-blog-by-hugo/)

[静的サイトジェネレータ「Hugo」と技術文書公開向けテーマ「Docsy」でOSSサイトを作る | さくらのナレッジ](https://knowledge.sakura.ad.jp/22908/)

[Netlifyで静的サイトのホスティングをする - Qiita](https://qiita.com/sugo/items/2ee64887d682b0dae635)

[OGPとは？OGPの基本からOGP画像のサイズや設定方法を分かりやすく解説](https://www.itra.co.jp/webmedia/what-is-ogp.html)

[Hello My New Blog](https://komi.dev/post/2020-09-05-make-blog/)

[さよならQiita、こんにちはhugo × github pages - Qiita](https://qiita.com/katamotokosuke/items/1a650678dc4f0ad43468)

[HugoでWebサイトを立ち上げる+テーマを適用してみる - Qiita](https://qiita.com/bake0937/items/e0914efbd9434be474a4)

[Hugo で作ったブログに Disqus を使ってコメント機能を追加する - michimani.net](https://michimani.net/post/blog-install-disqus-to-hugo/)

[静的サイトジェネレータ「Hugo」と技術文書公開向けテーマ「Docsy」でOSSサイトを作る | さくらのナレッジ](https://knowledge.sakura.ad.jp/22908/)

<br>

---

# テンプレから雛形作成

まずはテンプレディレクトリを作成

```go
$ hugo new site {BlogName}
```

以下のようなディレクティブと設定ファイルが作成される

```go
.
├── archetypes
│   └── default.md
├── config.toml
├── content
├── data
├── layouts
├── static
└── themes
```

ここでテーマを選ぶ

[Complete List](https://themes.gohugo.io/)

例として、 `hugo-classic`を選択する

先ほど作成された `themas`にgit moduleの形としていれる

```bash
$ git init && git submodule add https://github.com/goodroot/hugo-classic.git themes/hugo-classic;
```

`themas`にいくらでもThemaを入れられるが、明示的にどのテーマを使うかわかるように、config.tomlに宣言しておく

```bash
baseURL = "http://example.org/"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "hugo-classic" #######################ここが追加した行
```

ここのconfig.tomlの記入の仕方は、各テーマにより異なる(のかもしれない)
テーマ作成者が、これを全部コピペしろ、と書いてる場合もあるので注意（途中でテーマ変えようと思ったらいろいろコンフリクト起こした）

[Hugo + GitHub Pages（独自ドメイン適応）でサイトを作成・公開する - Qiita](https://qiita.com/ysdyt/items/a581277dd1312a0e83c3)

↑ submodules配下の`theme.toml`をコピーする必要？

>> `themes/hugo-classic/exampleSite/config.toml` っぽい

サーバを立ち上げてみる

```bash
hugo server
```

`localhost:1313` アクセス

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a41ae8a2-e260-4fa9-9a86-a64ebe737ae0/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a41ae8a2-e260-4fa9-9a86-a64ebe737ae0/Untitled.png) -->

記事を書く

新しい記事のテンプレ作成コマンド

```go
hugo new post post/starting-demo.md
```

`content/post` 配下の指定ファイルが作成（ `post`の場合もあれば `posts` の場合もあるぽい、テーマ依存なのか作る人依存）

```bash
$ tree
.
├── archetypes
│   └── default.md
├── config.toml
├── content
│   └── post
│       └── starting-demo.md ######################################ここ
├── data
├── layouts
├── resources
│   └── _gen
│       ├── assets
│       └── images
├── static
└── themes
    └── hugo-classic
        ├── LICENSE.md
        ├── README.md
        ├── archetypes
        │   └── default.md
        ├── exampleSite
        │   ├── config.toml
        │   ├── content
        │   │   ├── _index.md
        │   │   └── post
        │   │       ├── 2012-01-23-juicy-code.md
        │   │       ├── 2012-04-23-hacker-with-horn.md
        │   │       ├── 2015-07-23-command-line-awesomeness.md
        │   │       └── 2018-08-30-markdown-guide.md
        │   └── static
        │       └── css
        │           └── theme-override.css
        ├── images
        │   ├── partywizard.gif
        │   ├── screenshot.png
        │   └── tn.png
        ├── layouts
        │   ├── 404.html
        │   ├── _default
        │   │   ├── list.html
        │   │   ├── single.html
        │   │   └── terms.html
        │   └── partials
        │       ├── foot_custom.html
        │       ├── footer.html
        │       ├── head_custom.html
        │       └── header.html
        ├── static
        │   └── css
        │       ├── fonts.css
        │       └── style.css
        └── theme.toml

24 directories, 27 files
```

これで次のような下書きができる

```bash
---
title: "Starting Demo"
date: 生成した日時
draft: true
---
```

これで `draft: false`に変えると適用される

次のコマンドで記事を反映させる

```bash
hugo
```

これで新たに `public` ディレクトリ が作成される

```bash
$ tree
.
├── archetypes
│   └── default.md
├── config.toml
├── content
│   └── post
│       └── starting-demo.md
├── data
├── layouts
├── public
│   ├── 404.html
│   ├── categories
│   │   ├── index.html
│   │   └── index.xml
│   ├── css
│   │   ├── fonts.css
│   │   └── style.css
│   ├── index.html
│   ├── index.xml
│   ├── sitemap.xml
│   └── tags
│       ├── index.html
│       └── index.xml
├── resources
│   └── _gen
│       ├── assets
│       └── images
├── static
└── themes
    └── hugo-classic
        ├── LICENSE.md
        ├── README.md
        ├── archetypes
        │   └── default.md
        ├── exampleSite
        │   ├── config.toml
        │   ├── content
        │   │   ├── _index.md
        │   │   └── post
        │   │       ├── 2012-01-23-juicy-code.md
        │   │       ├── 2012-04-23-hacker-with-horn.md
        │   │       ├── 2015-07-23-command-line-awesomeness.md
        │   │       └── 2018-08-30-markdown-guide.md
        │   └── static
        │       └── css
        │           └── theme-override.css
        ├── images
        │   ├── partywizard.gif
        │   ├── screenshot.png
        │   └── tn.png
        ├── layouts
        │   ├── 404.html
        │   ├── _default
        │   │   ├── list.html
        │   │   ├── single.html
        │   │   └── terms.html
        │   └── partials
        │       ├── foot_custom.html
        │       ├── footer.html
        │       ├── head_custom.html
        │       └── header.html
        ├── static
        │   └── css
        │       ├── fonts.css
        │       └── style.css
        └── theme.toml

28 directories, 37 files
```
<br>

---

<br>

# github pagesで公開する

github pagesで公開するには、公開するディレクトリ名を `public`ではなく `docs`にしないといけない(これはgithub pagesの仕様)

この宣言をに `config.toml`に書く

```bash
baseURL = "https://katamotokosuke.github.io/site-demo/" ####### 追加: {user_name}.github.io/{repository_name}/ を指定する
languageCode = "en-us"
title = "My New Hugo Site"
theme = "hugo-classic"
publishDir = "docs"  ######################### 追加
canonifyurls = true  ######################## 追加(相対URLを絶対URLに変換できるようにします。)
```

baseURLは、よくあるクローンするときのhttpリンクじゃないので注意
実際にgithub pagesで公開するときのリンク（これのせいで詰まった）
よく考えたら当たり前

ここでもう一度 `hugo`コマンドを実行

```bash
$ tree
.
├── archetypes
│   └── default.md
├── config.toml
├── content
│   └── post
│       └── starting-demo.md
├── data
├── docs
│   ├── 404.html
│   ├── categories
│   │   ├── index.html
│   │   └── index.xml
│   ├── css
│   │   ├── fonts.css
│   │   └── style.css
│   ├── index.html
│   ├── index.xml
│   ├── post
│   │   ├── index.html
│   │   ├── index.xml
│   │   └── starting-demo
│   │       └── index.html
│   ├── sitemap.xml
│   └── tags
│       ├── index.html
│       └── index.xml
├── layouts
├── public
│   ├── 404.html
│   ├── categories
│   │   ├── index.html
│   │   └── index.xml
│   ├── css
│   │   ├── fonts.css
│   │   └── style.css
│   ├── index.html
│   ├── index.xml
│   ├── post
│   │   ├── index.html
│   │   ├── index.xml
│   │   └── starting-demo
│   │       └── index.html
│   ├── sitemap.xml
│   └── tags
│       ├── index.html
│       └── index.xml
├── resources
│   └── _gen
│       ├── assets
│       └── images
├── static
└── themes
    └── hugo-classic
        ├── LICENSE.md
        ├── README.md
        ├── archetypes
        │   └── default.md
        ├── exampleSite
        │   ├── config.toml
        │   ├── content
        │   │   ├── _index.md
        │   │   └── post
        │   │       ├── 2012-01-23-juicy-code.md
        │   │       ├── 2012-04-23-hacker-with-horn.md
        │   │       ├── 2015-07-23-command-line-awesomeness.md
        │   │       └── 2018-08-30-markdown-guide.md
        │   └── static
        │       └── css
        │           └── theme-override.css
        ├── images
        │   ├── partywizard.gif
        │   ├── screenshot.png
        │   └── tn.png
        ├── layouts
        │   ├── 404.html
        │   ├── _default
        │   │   ├── list.html
        │   │   ├── single.html
        │   │   └── terms.html
        │   └── partials
        │       ├── foot_custom.html
        │       ├── footer.html
        │       ├── head_custom.html
        │       └── header.html
        ├── static
        │   └── css
        │       ├── fonts.css
        │       └── style.css
        └── theme.toml

36 directories, 53 files
```

これで `docs`ディレクトリが生成された

さっきの `public`と生成される内容が同じで、ディレクトリ名が変わっただけなので、 `public`ディレクトリは削除してもいい

<br>

# githubにpushして反映させる

- 以上の内容をpushする
- githubの公開ディレクトリを `/root`から `/docs`に変える

以上でアクセスできるようになるはず

 `https://katamotokosuke.github.io/site-demo/`  


<br>

---

<br>

# 自分の実装

このテーマを使った `Timer Hugo`

[Timer Hugo](https://themes.gohugo.io/timer-hugo/#main-features)

レスポンシブだしなんか良さそうだったから

以下、手順

1.  `themes/timer-hugo`配下の `data`, `contact`, `static`をコピーしてホームディレクトリにあるやつに上書きする
2.  `config.toml`も持ってきて上書きする
3.  `config.toml`に以下の項目を追加する また、baseURLも変える

    ```bash
    baseURL = "https://biwashi.github.io/blog/"

    ##################################################

    publishDir = "docs"
    canonifyurls = true # 相対URLを絶対URLに変換できるようにする
    ```

4.  `archetypes/default.md`を書き換える
これは、Blog, Portfolioのサンプルに書かれていたものをそれぞれもってきた

    新しくコンテンツを追加する時はこのmdが生成されるため、ブログでもポートフォリオでもコメントアウトで対応できるように作っておいた

    ```markdown
    ---
    title: "{{ replace .Name "-" " " | title }}"
    description : "This is meta description"
    date: {{ .Date }}
    description : "This is meta description"
    draft: true # 反映させる時はfalseに変えるかコメントアウト

    # Blog用
    type: post
    image: images/blog/yourImages.jpg # ブログバナーの画像
    # author: Jamica Jock # 表示されない？
    tags: ["motivation", "inspiration"] # tag

    # Portfolio用
    caption: Product Mockup
    image: images/portfolio/item-2.jpg
    liveLink: link # ??
    # 右側の情報説明
    client: Julia Robertson
    submitDate: November 20, 2017
    category: ["mockup","design"] # tag
    location: 1201 park street, Avenue, Dhaka

    ---
    ```

ここまできたら基本的には完了

各ページの細い文章の設定は、 `data`配下の `yml`ファイルをいじって変えていく

<br>

---

<br>

# 詰まったとこと

<br>

## CONTACTのGoogle Mapsの位置情報を変えたい

最初は、 `docs/contact/index.html`の該当部分を書き換えていたが、 `hugo`コマンドで上書きされていた

なんでや！と思っていたが、どうやら `layouts/contact/list.html`の情報をもとに書き換えているっぽい（jQueryかな？）

なのでこのファイルの該当箇所を書き換えたらうまくいった

なんか任意の場所が上手くいかない時は、 `layouts`を疑うべし（ `docs`配下は `hugo`コマンドで生成されるものだから、**何か**をもとに生成してるのでそこを変えても意味ない）

カスタムするときに見る優先順位としては

1.  `config.toml`
2.  `data/xxx.yaml`
3.  `layouts/pagesName/xxx.index`

あとはやりながら慣れていく感じ

<br>

## 下のコピーライトを変えたい

 `layouts/partials/footer.html`に該当箇所ある

けどこれライセンスがCC BY 3.0なので、変えたらあかん、表示しとかないとあかんやつ

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/234be07e-aae4-4ce4-901b-a27ab03825a0/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/234be07e-aae4-4ce4-901b-a27ab03825a0/Untitled.png) -->

[クリエイティブ・コモンズとは〜著作権違反にならないための徹底解説！](https://ferret-plus.com/2161)

<br>

# 感想

yamlからどうやってHTML作成してるんや、って部分がいわゆるHugoがやってる部分なんんですかね、あまり深入りしてないですが…

<br>

---

<br>

# カスタム実装

## Featureの文字をHTMLで書きたい（ `<br>`や `h○タグ`を適用させたい）

 `about.xml`

現状、上のAboutの部分は<br>等が適用されるが、下ののFeatureの部分では反映されずそのまあ表示されてしまう。これを変えたい。

変更したのは `layouts/about/list.html`

```html
{{ "<!--  Company Feature Section Start -->" | safeHTML }}
<section class="about-feature clearfix">
	<div class="container-fluid">
		<div class="row">
			{{ range $index, $element := .Site.Data.about.aboutItem }}
			<div class="col-lg-4 px-0">
				{{ $class := add $index 1 }}
				<div class="block about-feature-{{ $class }} wow fadeInDown" data-wow-duration="500ms" data-wow-delay=".3s">
					{{ with .title }}<h2>{{ . }}</h2>{{ end }}
					<!-- {{ with .description }}<p>{{ . }}</p>{{ end }} --> <!-- ↓これを変更します↓ -->
					{{ with .description }}<p>{{ . | safeHTML }}</p>{{ end }} <!-- FeatureもHTMLで書けるようにする -->
				</div>
			</div>
			{{ end }}
		</div>
	</div>
</section>
```

該当箇所の部分が、xmlのdiscription部分をそのまま入れてpタグで囲む設定になっていた（ `<p>{{ . }}</p>`）

ここを、上の部分と同じように `<p>{{ . | safeHTML }}</p>`に変更する

これで無事変更できるようになった。（最初から全部これにしといた方がいいのでは？）

<br>


## それぞれのページ名を変えたい（SERVICE→SKILL）

ページのヘッドバナーを変えたい

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3dd5198a-db5f-4acb-9e51-6e35b4c22e79/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3dd5198a-db5f-4acb-9e51-6e35b4c22e79/Untitled.png) -->

上のナビゲーション部分は、 `config.toml`を変更し、下の青バナー部分は `content/service/_index.md`の `title`を変更した

ルーティングも変更するには、 `content/skill/_index.md`と変更すればできた

<br>

## data/xxx.yamlのファイル名を変えたい

※解決していない、今のところフロント側では影響はないので放置してる放置してる

service → skillに変えたら、YAMLファイルの名前もskillに変えたくなるところだが、変えると壊れる（というか読み込まれなくなる）

どっかこのYMALを読み込んでいる

<br>

## いろいろなところのアイコンを変えたい


 `config.toml`には次のリンクを踏めと書いてある

[Ionicons: The premium icon pack for Ionic Framework](https://ionicons.com/)

しかし、アイコンを押したら出てくる下の部分をどう入れればいかわからない。（ `name = "xxxxx"`を入れても反映されない）

そこで、 `themes/timer-hugo/static/plugins/ionicons/ionicons.min.css`を見る

icon系は、このテーマの部分からdocs配下に `docs/plugins/ionicons/ionicons.min.css`という形で生成される

中を見ればわかるが、 `ion-ios-paper-outline`など、 `icon: xxxx`でYAMLに書かれているワードが並んでいる

このファイル内検索で、該当iconを探す

どんなアイコンなのかは、踏めといわれているリンク内のものと同じ

<br>

## Ioniconsのレベルを上げたい

Skillとして言語のIconを使いたいが、今このテンプレ使われているIoniconsは `ver2.0.0`でかなり古い。これをUpdateしたい。

かつこの頃は `ionicons.min.css`をダウンロードして読み込む形で使われている。

全部を変更したいところだが、 `list.html`を全部書き換えるのはちとめんどくさいので、両方使えるようにする。

まずは、本家のドキュメント通り、スクリプトタグをbodyに書けとあるので従う。

```html
<script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></script>
```

※バージョンは任意に変更する。

これを `layouts/partials/head.html`に記入する

これはそれぞれのページで読み込まれるもの。ドキュメントではbodyにかけとあるが、今回はこのheadで読み込む

```html
	~
	~
	~
	{{ "<!-- Twitter Bootstrs CSS -->" | safeHTML }}
  <link rel="stylesheet" href="{{ `plugins/bootstrap/bootstrap.min.css` | absURL }}">
  {{ "<!-- Ionicons Fonts Css -->" | safeHTML }}
  <link rel="stylesheet" href="{{ `plugins/ionicons/ionicons.min.css` | absURL }}">

  <!-- ------------------------------------------------------------------------------ -->
  {{ "<!-- Ionicons Fonts Css Version Up -->" | safeHTML }}
  <script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></script>
  <!-- ------------------------------------------------------------------------------ -->

  {{ "<!-- animate css -->" | safeHTML }}
  <link rel="stylesheet" href="{{ `plugins/animate-css/animate.css` | absURL }}">
  {{ "<!-- Hero area slider css-->" | safeHTML }}
  <link rel="stylesheet" href="{{ `plugins/slider/slider.css` | absURL }}">
	~
	~
	~
```

これで全ページで使えるようになった。

使う場合は、次のように `ion-icon`タグで囲む

```html
<ion-icon name="heart"></ion-icon>
```

これでIconが表示される。

使いたいIocnはここで検索

[Ionicons: The premium icon pack for Ionic Framework](https://ionicons.com/)

<br>

### Serviceページのアイコンを変えていく

次にいよいよ、serviceページ（今はskillページに変えた）のIconを変えていく。

ここの記述をしている `layouts/skill/list.html`を見ると、iタグのclass名をservice.ymlで設定したものに書き換えてるということがわかる。

ここを、ドキュメントにあるように `<ion-icon name = "xxx"></ion-con>`という形で設定できるようにする

```html
<div class="col-md-6">
	<div class="block wow fadeInUp animated" data-wow-duration="400ms" data-wow-delay="600ms">
								<!-- New IconのTest Start -->

								<!-- {{ with .icon }}<i class="{{ . }}"></i>{{ end }} -->
								{{ with .icon }}<ion-icon name="{{ . }}"></ion-icon>{{ end }}　　<!-- ここ -->

								<!-- New IconのTest End -->

								{{ with .title }}<h4>{{ . }}</h4>{{ end }}
								{{ with .description }}<p>{{ . }}</p>{{ end }}
	</div>
</div>
```

これでYAMLに新しいバージョンのアイコン名（検索したやつ）を書くと設定できるようになった。

<br>

### アイコンの色とサイズを合わせる

今のままだと、何もcssがかかっていないので、黒の小ちゃいアイコンしか表示されない。

これを青でいい感じのサイズのcssをかけられるよにする。

旧バージョンのcssは`themes/timer-hugo/assets/css/style.css`のところに書かれている。

 `.service-page .service-parts .block i` がこのiタグ（ `<i class="{{ . }}"></i>`のところ）のcss情報のようだ

```css
.service-page .service-parts .block i {
  font-size: 35px;
  color: #02bdd5;
}
```

ここに `ion-icon {...}`という形で追記する。

僕は `themes/timer-hugo/static/plugins/ionicons/ionicons.min.css`の方に追記した。

```css
/*  */
ion-icon {
  font-weight: normal;
  font-style: normal;
  font-size: 35px;
  color: #02bdd5;
}
```

これで晴れて新しいiconが使えるようになった。

他の箇所で使いたい場合、該当箇所の `html`ファイルを変更を同じように変更すればできるはず。

<br>

## カスタムIconを設定したい

公式ドキュメントのように設定した。

```html
<ion-icon  src = "/path/to/external/file.svg" > </ion-icon>
```

これをYAMLから変えられるようにしたい。（ちなみにhttpsとかで指定するのはなんかダメぽいので、ローカルに落としてきてPathを指定する）

さらに、外部から取り込んだsvgはサイズが揃っていないことがあるので調整もしたい。ということで以下のようにした。

 `layouts/skill/list.html`

```html
<!-- New IconのTest Start -->

<!-- {{ with .icon }}<i class="{{ . }}"></i>{{ end }} -->

{{ with .icon }}<ion-icon name="{{ . }}"></ion-icon>{{ end }}
{{ with .iconsrc }}<ion-icon src="{{ . }}"></ion-icon>{{ end }}
{{ with .iconsrc45 }}<ion-icon class="size45" src="{{ . }}"></ion-icon>{{ end }}
{{ with .iconsrc50 }}<ion-icon class="size50" src="{{ . }}"></ion-icon>{{ end }}
{{ with .iconsrc55 }}<ion-icon class="size55" src="{{ . }}"></ion-icon>{{ end }}
{{ with .iconsrc60 }}<ion-icon class="size60" src="{{ . }}"></ion-icon>{{ end }}

<!-- New IconのTest End -->
```

ここでは新しく `iconsrc`を追加した。これをYAMLにも追加。

サイズを調整できるように、 `iconsrcXX`という形にした。

```yaml
- icon: 
  iconsrc60: /images/customIcons/Go-Logo_Blue.svg # カスタムIconを設定する. PathかURLを書く(svg)
  title: Go
```

iconは空欄のままにしておく。これでGoのアイコンが表示される。

先ほどhtmlで指定した書くclassにかかるcssを設定する

 `themes/timer-hugo/static/plugins/ionicons/ionicons.min.css`

```css
.size45{
  font-size: 45px;
}

.size50{
  font-size: 50px;
}

.size55{
  font-size: 55px;
}

.size60{
  font-size: 60px;
}
```

デフォルトが `40px`で、それで合わない時は確認しながらサイズを調整していく。

仕様したIcon8というサイトのものを無料で使用するにはクレジット表示しないといけないので、 `layouts/partials/footer.html`に以下を追加する。

```css
<a href="https://icons8.com/icon/U5JRqX4RSgfj/home">Home icon by Icons8</a>
```

それでこんな感じ

```html
</span> Design and Developed by
          <a href="http://www.Themefisher.com" target="_blank">Themefisher</a>.
          <br> Get More Bootstrap Template From Our
          <a href="https://themefisher.com/free-bootstrap-templates/" target="_blank">Store</a>.
          <br>Home icon by
          <a href="https://icons8.com/icon/U5JRqX4RSgfj/home">Icons8</a>.
```

<br>

---

<br>

# 今後やりたいこと


<br>

## コメント機能をつける

[Hugo で作ったブログに Disqus を使ってコメント機能を追加する - michimani.net](https://michimani.net/post/blog-install-disqus-to-hugo/)

<br>

## Googleサーチに登録する方法(済)

[HUGO + GitHub Pages で作ったブログをGoogle Search Consoleに登録する方法](https://zetton86.github.io/blog/20200114/)


---

<br>

## なんかテーマを1から作っている人

[Hugoで1からテーマを作ってGitHub Pagesにデプロイする | メンバーズエッジカンパニーブログ](https://www.membersedge.co.jp/blog/create-hugo-theme-and-deploy-to-github-pages/)

<br>