---
title: "Hugoで自作ブログサイトを作ってみる"
description: "This is meta description"
date: 2020-12-06T22:54:14+09:00
# draft: true # 反映させる時はfalseに変えるかコメントアウト
comments: true
adsense: false
archives: ["2020", "2020-12"]

# Twitter card gen用設定"]
author: ["いわし"]
categories: ["Tech"]
tags: ["Go", "Hugo"] # tag
ogimage: "images/og/make-blog-by-hugo.png" # tcardgenで生成した画像をOGP画像に設定する
url: "/blog/make-blog-by-hugo/" # tcardgenでの自動生成スクリプト用のパスを設定 ルーティング固定の意味もある

# Blog用---------------------------------------------------
type: post
# image: "images/og/make-blog-by-hugo.png" # ブログバナーの画像
image: images/blog/hugo.jpeg

# # Portfolio用----------------------------------------------
# caption: Product Mockup
# image: images/portfolio/item-2.jpg
# liveLink: link # ??
# # 右側の情報説明
# client: Julia Robertson
# submitDate: November 20, 2017
# category: ["mockup","design"] # tag
# location: 1201 park street, Avenue, Dhaka
---

# はじめに

最近、Twitter の有名なすごい人たちがみんな Hugo を使って自作ブログを作っていて、ほげーーやってみたいーー、ってなったので試してみた。
また、Go 製のツールということで、勉強したかった Go を使えるかも！という思いもあった。（結果、Go は 1 ミリも使わずに終わった）

`さんぽしさん`

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://sanposhiho.com/posts/make-blog-by-hugo/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fsanposhiho.com%2Fposts%2Fmake-blog-by-hugo%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

`コミさん`

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://komi.dev/post/2020-09-05-make-blog/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fkomi.dev%2Fpost%2F2020-09-05-make-blog%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

# Hugo とは？

Hugo は Golang 製の静的サイトジェネレーター。HTML とか CSS みたいなものを自動生成してくれるやつ。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://gohugo.io/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fgohugo.io%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<br>

そういえば昔、reveal.js っていう HTML/CSS で Web スライドが書けるやつを拡張した reveal-ck っていう Ruby 製のツールを使ったことがあった。
これも`Markdown`でスライドを作れるっていうお手軽でいい感じだった。（途中からデザインを凝り始めて朝日が昇ってしまったが…）

↓ こんな感じ 今まではこれを自己紹介的な感じで Twitter とかに貼っていた。

<iframe src="https://biwashi.github.io/Portfolio/" width="100%" height="600" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"></iframe>

ちなみにスライドの貼り付け方はこちらの記事を参考にさせてもらいました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://taipapamotohus.com/post/how-to-create-presentation-slides-by-reveal-dot-js-and-org-mode-org-reveal-part3/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Ftaipapamotohus.com%2Fpost%2Fhow-to-create-presentation-slides-by-reveal-dot-js-and-org-mode-org-reveal-part3%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<br>

話は戻って Hugo だが、めちゃくちゃ早いらしい。（他と比べたことがないからわからん）

何はともあれ構築していく。

# 雛形作成まで

Hugo にはたくさんの Thema があって、自由に選び放題。（ライセンスとかの確認は注意）
ここから好きに選べる。ブログサイト以外でも使えそうなものがたくさんだから、ちょっとしたハッカソンでのテンプレ作りに良さそう。（Hugo じゃなくてもいいけど）

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://themes.gohugo.io/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fthemes.gohugo.io%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

## テンプレ作成

というわけで、まずは Hugo をインストールしていく。

```zsh
$ brew install hugo
```

他の OS は本家を参照してください。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://gohugo.io/getting-started/installing/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fgohugo.io%2Fgetting-started%2Finstalling&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

入ったら、次のコマンドで雛形が生成される

```zsh
$ hugo new site blog && cd blog
```

`$ hugo new site {好きな名前}`で作られる

そうすると次のようなものたちが生成される

```zsh
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

現時点だと、全部空のディレクトリがあるだけ。

## テンプレートテーマを適用していく

先ほどのサイトからテーマを選ぶ。
今回は、`Timer Hugo`というものを選んだ。レスポンシブに対応してるし、結構いろいろカスタムできそうだったから。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://themes.gohugo.io/timer-hugo/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fthemes.gohugo.io%2Ftimer-hugo%2F%23main-features&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<br>

さっき生成した themas に submodule としてテーマを入れる

```zsh
$ git init && git submodule add https://github.com/themefisher/timer-hugo.git themes/timer-hugo
```

この`themas`には複数テンプレを入れてもいいが、そうなってくるとどれを適用するのかわからなくなるので、`config.toml`で明示的に宣言しておく。

```toml
baseURL = "http://example.org/"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "timer-hugo"
```

と、書いたが、実はこの config.toml も各テーマごとに固有の書き方がある。（カスタムされている）

ゆえに`themes/timer-hugo/exampleSite/config.toml`の内容をコピーした方がいい。

```toml
baseURL = "http://example.org/"
languageCode = "en-us"
title = "Timer | Responsive Multipurpose Bootstrap Hugo Template"
theme = "timer-hugo"

# We Used Ionicons Icon font for Icon, for more details check this link - https://ionicons.com/

# Navbar Menus
[[menu.main]]
name    = "About"
url     = "about"
weight  = 2
[[menu.main]]
name    = "Service"
url     = "service"
weight  = 3
[[menu.main]]
name    = "Gallery"
url     = "gallery"
weight  = 4
[[menu.main]]
name    = "Blog"
url     = "blog"
weight  = 5
[[menu.main]]
name    = "Contact"
url     = "contact"
weight  = 6

# Site Params
[params]
home = "Home"
logo = "images/logo.png"
dateFormat = "6 January 2006"
# Meta data
description = "Airspace Hugo theme"
author = "Themefisher"
# Google Analitycs
googleAnalitycsID = "Your ID"
# contact form action
contactFormAction = "#" # contact form works with https://formspree.io

# Banner Section
[params.banner]
enable  = true
bgImage = "images/slider.jpg"
heading = "HI, MY NAME IS JONATHON & I AM A"
description = "WITH 10 YEARS EXPERIENCE, I'VE OCCUPIED MANY ROLES INCLUDING DIGITAL DESIGN DIRECTOR, WEB DESIGNER AND DEVELOPER. THIS SITE SHOWCASES SOME OF MY WORK."
# button
btn     = true
btnText = "Download More"
btnURL  = "https://themefisher.com/"

# flip text
[[params.banner.flipText]]
title   = "DESIGNER"
[[params.banner.flipText]]
title   = "DEVELOPER"
[[params.banner.flipText]]
title   = "FATHER"

# Homepage About Section
[params.about]
enable  = true
title   = "ABOUT ME"
content = "Hello, I’m a UI/UX Designer & Front End Developer from Victoria, Australia. I hold a master degree of Web Design from the World University.And scrambled it to make a type specimen book. It has survived not only five centuries. <br> <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, adipisci voluptatum repudiandae, natus impedit repellat aut officia illum at assumenda iusto reiciendis placeat. Temporibus, vero."
image   = "images/about/about.jpg"

# Call to Action
[params.cta]
enable  = true
title   = "SO WHAT YOU THINK ?"
content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis,<br>possimus commodi, fugiat magnam temporibus vero magni recusandae? Dolore, maxime praesentium."
btnText = "Contact with me"
btnURL  = "/contact"

# Portfolio Section On Homepage
[params.portfolio]
enable  = true
title   = "Latest Works"
subtitle= "Aliquam lobortis. Maecenas vestibulum mollis diam. Pellentesque auctor neque nec urna. Nulla sit amet est. Aenean posuere tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus."

# social icon
[[params.socialIcon]]
icon = "ion-social-facebook"
url = "#"

[[params.socialIcon]]
icon = "ion-social-instagram"
url = "#"

[[params.socialIcon]]
icon = "ion-social-linkedin"
url = "#"

```

そのほかも、このテーマのいろいろなテンプレに従った方がいいので、`themes/timer-hugo/exampleSite`にあるものを、雛形ホームのディレクトリに上書きコピーする。

加えて、`themes/timer-hugo`の

- archetypes
- layouts
- static

もコピーする。（自分はやらなかったが、assetes もコピーした方がいいかも）

これでサーバーを立ててみる。次のコマンドでできる。

```zsh
$ hugo server
```

[http://localhost:1313/blog](http://localhost:1313/blog) にアクセスする。

demo と同じものが表示されているはず！万歳！
blog のところも見ると、テンプレで用意されている記事が見れる。

# 記事を書いてみる

次のコマンドで記事を作成する

```zsh
$ hugo new blog/{記事のタイトルとか}.md
```

これで`content/blog/{記事のタイトルとか}.md`に markdown が作られる。

この時作られるものは、`archetypes/default.md`に設定されているものが自動生成される。ちなみに自分の`default.md`はこのように設定している。

```yaml
---
title: "{{ replace .Name "-" " " | title }}"
description : "This is meta description"
date: {{ .Date }}
draft: true # 反映させる時はfalseに変えるかコメントアウト
comments: true
adsense: false
archives: ["{{ dateFormat "2006" .Date }}", "{{ dateFormat "2006-01" .Date }}"]

# Twitter card gen用設定"]
author: ["いわし"]
categories: ["Test"]
tags: ["motivation", "inspiration"] # tag
ogimage: "images/og/{{ .Name }}.png" # tcardgenで生成した画像をOGP画像に設定する
url: "/{{ .Type }}/{{ .Name }}/" # tcardgenでの自動生成スクリプト用のパスを設定

# Blog用---------------------------------------------------
type: post
image: "images/og/{{ .Name }}.png" # ブログバナーの画像

# Portfolio用----------------------------------------------
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

細かい設定等は次の記事とかで書いていきたいので今回は省く。
demo で入れられている markdown ファイルを参考にカスタマイズしていく。

基本はこんな感じ

```yaml
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
---
```

気にするのは`draft: true`の部分。これを`false`に変えるかコメントアウトすると記事として適用される。このままだと表示されない。

変えたら次のコマンドを実行。

```zsh
$ hugo
```

これで`public`ディレクトリが作成されるはず。ヤッタネ。

# github pages 公開する

これで markdown で記事を書いてから静的ファイルを生成するまでの流れはできた。

さて、ここからは今ローカルホストで表示しているものを github pages で公開したい。そのための準備をしていく。

## ディレクトリ名を変更する

github pages はその仕様として、ホームディレクトリか`docs`ディレクトリを公開ディレクトリとして設定できる。

今のデフォルトだと、生成されるのは`public`なので、これを`docs`に変える。

見るのは`config.toml`

```toml
baseURL = "https://biwashi.github.io/blog/" ####### 追加: {user_name}.github.io/{repository_name}/ を指定する
languageCode = "ja"
title = "MY NEW GEAR | IWASHI BLOG" # Homeのタイトル
theme = "timer-hugo"
publishDir = "docs"  ######################### 追加
canonifyurls = true  ######################## 追加(相対URLを絶対URLに変換できるようにする)
```

またこの時、baseURL を公開する github pages のリンクに設定する。

`https://{githubのアカウント名}.github.io/{リポジトリ名}/`

- baseURL は、よくあるクローンするときの https のリンクじゃないので注意
- 実際に github pages で公開するときのリンク（これのせいで詰まった）
- よく考えたら当たり前

また `canonifyurls = true` は相対パスに変更するために設定。

これで準備は完了。あとは push して公開ディレクトリを`docs`に設定する。

> master branch docs/ folder

しばらくすると公開される。やったね！

# まとめ

これでサクッと雛形が作れました。テーマもお洒落なのがたくさんあるので見てるだけで楽しい！

次回はブログをカスタマイズしていくところを書きたい。（これが地獄の始まりだった…）

# 参考

参考させていただいた素晴らしい記事たちです

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://knowledge.sakura.ad.jp/22908/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fknowledge.sakura.ad.jp%2F22908%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fanyblog.hatenablog.jp%2Fentry%2F2020%2F06%2F21%2F153128" title="さよならQiita、こんにちはhugo × github pages - motty&#39;s blog" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe>

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://ferret-plus.com//2161" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fferret-plus.com%2F2161&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://qiita.com/bake0937/items/e0914efbd9434be474a4" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fqiita.com%2Fbake0937%2Fitems%2Fe0914efbd9434be474a4&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://sanposhiho.com/posts/make-blog-by-hugo/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fsanposhiho.com%2Fposts%2Fmake-blog-by-hugo%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://komi.dev/post/2020-09-05-make-blog/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fkomi.dev%2Fpost%2F2020-09-05-make-blog%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

