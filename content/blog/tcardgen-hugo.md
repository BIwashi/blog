---
title: "tcardgenでHugoで作ったブログのOGPを自動生成してみた"
description : "This is meta description"
date: 2021-01-11T14:27:39+09:00
# draft: true # 反映させる時はfalseに変えるかコメントアウト
comments: true
adsense: false
archives: ["2021", "2021-01"]

# Twitter card gen用設定"]
author: ["いわし"]
categories: ["Tech"]
tags: ["tcardgen", "Hugo", "OGP"] # tag
ogimage: "images/og/tcardgen-hugo.png" # tcardgenで生成した画像をOGP画像に設定する
url: "/blog/tcardgen-hugo/" # tcardgenでの自動生成スクリプト用のパスを設定 ルーティング固定の意味もある
carduse: true # TwitterCardを使用するかどうか falseの場合はデフォルトの画像が適用される

# Blog用---------------------------------------------------
type: post
image: "images/og/tcardgen-hugo.png" # ブログバナーの画像

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

ブログを作成しても読んでもらわないとあまり意味がないわけで、そういう意味でもTwitter CardなどのSNS共有時の目を引く画像は重要なわけです。

と、いうわけで、今回はGo製の`tcardgen`というライブラリを使用して、OGP作成を行ってみました。

<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 52.3333%; padding-top: 120px;"><a href="https://github.com/Ladicle/tcardgen" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fgithub.com%2FLadicle%2Ftcardgen&amp;key=f35ef3e07c3f9ce01b389a206da306f5"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

↑こんな感じのTwittterCardを作ってくれるやつですね。

# 準備
## install

`go get`でインストールする

```go
$ go get github.com/Ladicle/tcardgen
```

`README.md`が`kinto`とうフォントを使うように言っているのでダウンロードする

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/ookamiinc/kinto" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fgithub.com%2Fookamiinc%2Fkinto&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

今回はこの画像作成に使用できればいいので、`static/fonts/Kinto_Sans`といった感じのディレクトリに保存しておく

## テンプレート
元となる背景画像的なテンプレートを作成します。
`tcardgen`リポジトリの`example`にいろいろサンプル画像が入ってます。
サイズは 
**1200 x 628 (px)**
で作成します。

その後、自分はiPadの`Affinity Designer`で、サンプル画像を透過させながら、いい感じのデザインを作成しました。

<img src="/images/blog/template.png" style="width:100%; text-align:center;">

## 下準備

### markdown設定
tcardgenは、その使用上`category`と`tags`の項目をなにかしら設定する必要があります。
よって、作成したい記事にはこれらの項目を追加します。
また、作成したimagesのパスを描けるようにしておきます。（詳細は後述します。）

```yaml
# Twitter card gen用設定
author: ["いわし"]
categories: ["Tech"]
tags: ["tcardgen", "Hugo", "OGP"] # tag
ogimage: "images/og/tcardgen-hugo.png" # tcardgenで生成した画像をOGP画像に設定する
url: "/blog/tcardgen-hugo/" # tcardgenでの自動生成スクリプト用のパスを設定 ルーティング固定の意味もある
carduse: true # TwitterCardを使用するかどうか falseの場合はデフォルトの画像が適用される
```

最初、記事作成時に
```
$ hugo new ./content/blog/{日本語}.md
```
にしていたのですが、このままだとパスが日本語になってしまい、URLが汚くなるので、作成時は適当にアルファベットで`.md`を作成し、後からタイトルをに日本語に変える作業をすることにしました。

この際、パスは（本来）この設定し直したタイトルを元に決定されるので、日本語に変えるとパスも日本語になってしまうのですが、以下のように指定するとこちらを優先してくれます。
また、このurlは記事作成時の`{}.md`から自動生成しています。

```json
url: "/blog/tcardgen-hugo/"
```

### yaml設定
作成する画像のスタイルは、`tcardge.yaml`で設定できます。これは`tcardgen`にサンプルがあるので使用できます。

僕の場合は、サンプル画像を元に配置を決めたのでそのまま使用しました。

```yaml
template: static/ogp/template.png
title:
  start:
    px: 113
    pY: 252
  fgHexColor: "#FFFFFF"
  fontSize: 68
  fontStyle: Bold
  maxWidth: 1000
  lineSpacing: 10
category:
  start:
    px: 113
    py: 211
  fgHexColor: "#E5B52A"
  fontSize: 42
  fontStyle: Regular
info:
  start:
    px: 223
    py: 120
  fgHexColor: "#A0A0A0"
  fontSize: 38
  fontStyle: Regular
tags:
  start:
    px: 120
    py: 500
  fgHexColor: "#FFFFFF"
  bgHexColor: "#7F7776"
  fontSize: 22
  fontStyle: Medium
  boxAlign: Left
  boxSpacing: 6
  boxPadding:
    top: 6
    right: 10
    bottom: 6
    left: 8
```

# 作成
<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://michimani.net/post/development-generate-ogp-image-by-tcardgen-in-hugo/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fmichimani.net%2Fpost%2Fdevelopment-generate-ogp-image-by-tcardgen-in-hugo%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>


この記事をを参考にスクリプトを作成して実行します。

```bash
if [ $# != 1 ] || [ $1 = "" ]; then
    echo "One parameters are required"
    echo ""
    echo "string: path to markdown file of target post"
    echo ""
    echo "example command"
    echo "\t$ sh ./makeogp.sh ./content/post/test/test.md"
    exit
fi

TARGET_POST_PATH=$1

tcardgen \
    --fontDir ./static/fonts/Kinto_Sans \
    --output static/images/og \
    --template static/ogp/template.png \
    --config tcardgen.yaml \
    $TARGET_POST_PATH
```

使用例コマンドは、
```s
$ ./makeogp.sh ./content/blog/tcardgen-hugo.md    
```

引数で作成したい記事を指定します。

作成されたものは、shellで指定されている```--output static/images/og```に出力されます。

作成できました！

# まだ終わりではない
## ogpとして登録する

さて、画像はできましたがこれだけで終わりではありません。そうです。headタグで指定しなければなりません。

というわけで、```layouts/partials/head.html```に次の記述を加えます。


```html
  {{"<!-- blog用にTwitterCardを設定 -->" |safeHTML}}

  <meta name="twitter:image:src" content="https://biwashi.github.io/blog/images/iwashilong_w.jpg">

  <meta property="og:image" content="https://biwashi.github.io/blog/images/iwashilong_w.jpg" />
  
  {{ if eq true .Params.carduse }}
  {{"<!-- Blogなのでカスタムされたものを表示 -->" |safeHTML}}
  <meta property="og:image" content="{{ .Site.BaseURL }}{{ .Params.ogimage }}"> 
  <meta name="twitter:image:src" content="{{ .Site.BaseURL }}{{ .Params.ogimage }}">
  {{ else }}
  {{"<!-- Homeなのでデフォのやつを表示 -->" |safeHTML}}
  {{ end }}
```

ここで、さっきmarkdownに設置したいろいろなパラメータを使用します。

順に説明します。

```html
  <meta name="twitter:image:src" content="https://biwashi.github.io/blog/images/iwashilong_w.jpg">

  <meta property="og:image" content="https://biwashi.github.io/blog/images/iwashilong_w.jpg" />
```

まずこれはデフォルトのogp画像です。ブログ以外のサイト用を普通に指定します。


```html
  {{ if eq true .Params.carduse }}
  {{"<!-- Blogなのでカスタムされたものを表示 -->" |safeHTML}}
  <meta property="og:image" content="{{ .Site.BaseURL }}{{ .Params.ogimage }}"> 
  <meta name="twitter:image:src" content="{{ .Site.BaseURL }}{{ .Params.ogimage }}">
  {{ else }}
  {{"<!-- Homeなのでデフォのやつを表示 -->" |safeHTML}}
  {{ end }}
```

さて、ここでifです。

先ほどの`markdon`で`carduse: xxx`というのを指定しました。あれはここで条件分岐するためです。

`carduse`が`true`の場合はブログだと判断して、先ほど作成したogpを指定してます。この際のパスも、先ほど指定した`ogimage`です。再度先ほどmarkdownを見ておきます。

```yaml
# Twitter card gen用設定"]
author: ["いわし"]
categories: ["Tech"]
tags: ["tcardgen", "Hugo", "OGP"] # tag
ogimage: "images/og/tcardgen-hugo.png" # tcardgenで生成した画像をOGP画像に設定する
url: "/blog/tcardgen-hugo/" # tcardgenでの自動生成スクリプト用のパスを設定 ルーティング固定の意味もある
carduse: true # TwitterCardを使用するかどうか falseの場合はデフォルトの画像が適用される
```

というわけで、`carduse: false`の場合は、ブログ以外として再度指定しません。

これで、ブログにogpを設定し、かつブログ以外と分けることができました。


# 終わりに
ブログ作成と同時にこの作業はしていましたが、なかなか記事を書かずにいました。

少しでも参考になれば幸いです。

# 参考
<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://michimani.net/post/development-generate-ogp-image-by-tcardgen-in-hugo/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fmichimani.net%2Fpost%2Fdevelopment-generate-ogp-image-by-tcardgen-in-hugo%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fkakakakakku.hatenablog.com%2Fentry%2F2020%2F07%2F03%2F095053" style="border: 0; width: 100%; height: 190px;" allowfullscreen scrolling="no"></iframe>

今回も、はじまりはさんぽしさんでした。
<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://sanposhiho.com/posts/make-blog-by-hugo/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fsanposhiho.com%2Fposts%2Fmake-blog-by-hugo%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>
