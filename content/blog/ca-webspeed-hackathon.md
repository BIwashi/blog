---
title: "CyberAgent主催「Web Speed Hackathon Online Vol.2」体験記"
description : "This is meta description"
date: 2021-02-11T00:20:23+09:00
# draft: true # 反映させる時はfalseに変えるかコメントアウト
comments: true
adsense: true
archives: ["2021", "2021-02"]

# Twitter card gen用設定"]
author: ["いわし"]
categories: ["Tech"]
tags: ["motivation", "inspiration"] # tag
ogimage: "images/og/ca-webspeed-hackathon.png" # tcardgenで生成した画像をOGP画像に設定する
url: "/blog/ca-webspeed-hackathon/" # tcardgenでの自動生成スクリプト用のパスを設定 ルーティング固定の意味もある
carduse: true # TwitterCardを使用するかどうか falseの場合はデフォルトの画像が適用される

# Blog用---------------------------------------------------
type: post
image: "images/blog/web_speed_hackathon.jpg" # ブログバナーの画像

# Portfolio用----------------------------------------------
# caption: Product Mockup
# image: images/portfolio/item-2.jpg
# liveLink: link # 載せたいURL
# # 右側の情報説明
# client: Julia Robertson
# submitDate: November 20, 2017
# category: ["mockup","design"] # tag
# location: 1201 park street, Avenue, Dhaka

---

# はじめに

2021年2月6~7日の二日間、CyberAgent主催の「Web Speed Hackathon Online Vol.2」に参加してきました。

同週の平日には修論の公開期末発表会があったり、就業型インターンの仕事しまくったり、面接したりとめちゃんこ忙しかったんで死にそうになりながら参加したんですが、やっぱり僕は競争ごとが好きみたいで、とても楽しかったです。

元々フロントエンド何もわからんマンで、このサイトとかみたいななんちゃってフロントエンドの経験こそあるものの、ちゃんと学んだことも実践したこともなくて不安しかなかったんですが、たくさん学びを得られたイベントでした。

なお、本記事には技術的間違いもたくさんあると思います。本気で参考にはしないでください。ただの日記です。

本当に参考にする場合は、もっと強そうな人無限にいたので、その人たちのを参考にしてください…

（ちなみに始まる前、しにゃいさんのブログみてた）
<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://shinyaigeek.dev/log-ca-web-speed-hackathon" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fshinyaigeek.dev%2Fpost%2Flog-ca-web-speed-hackathon&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

# 概要
## そもそもどんなイベント？

運営側が用意した、架空のSNSサービスのパフォーマンスをどれだけ向上させられるかというものです。ちなみに、元のサービスはゲキ重で、最初に解禁されて立ち上げた時にめっちゃ笑いました。

これを決められたレギュレーションに違反しないようにチューニングしていきます。

- Google Chrome 最新版において、著しい機能落ちやデザイン差異を発生させてはいけない
- 採点はLighthouseをベースに計算される

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/GoogleChrome/lighthouse" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fgithub.com%2FGoogleChrome%2Flighthouse&amp;key=f35ef3e07c3f9ce01b389a206da306f5"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

## 使われていた主な技術

- React
- Tailwind CSS
- Express
- Webpack
- SQLite
- JSX
- Babel

このほかにも色々あったと思いますが、なんせフロントエンド初心者なので、完全に全体は把握しきれていない思います。

ちなみにデプロイは `Heroku`で行いました。

# やったこと

ここから、自分の記録と残っている `commit`メッセージを頼りに書いていきます。

---

まず、最初は [**PageSpeed Insights**](https://developers.google.com/speed/pagespeed/insights/?hl=ja) にぶち込んでみました。

確かスコア0か1だったと思います。逆にめちゃすげえ…と思ってました。

そこからは、ここ修正しろよーーってでてくるやつを潰していきました。

### 画像を色々変える
まず、表示サイズに対してアホみたいに巨大な画像が使われていたので、表示されうる最大値を調べて、それ用にリサイズしました。

今回、よくwebサイトにあるような、画像をタップするとその画像を全画面表示して見れる、みたいな機能は実装されていなかったので、デフォの表示画面のみを考えれば大丈夫でした。

その後、画像フォーマットを `jpg`から`webp`に変換しました。今回はChrome最新版だけで動けばいので大丈夫です。（多分）

`webp`というパッケージの`cwebp`というコマンドを使いました。brew で入れましょう！みたいな記事はありますが、Macにはデフォで入ってるっぽいです。

ただこれ、コマンドが1ファイルごとしか変換できない（っぽい）ので、シェルスクリプトを作りました。

```bash
for file in *.jpg; 
do 
    filename="${file%.*}"
    cwebp -q 80 -metadata icc -sharp_yuv "$file" -o "$filename.webp"; 
done
```

これを`jpg`がたくさんあるディレクトリ上で実行しました。

また、jpgでワークスペース検索をかけると、このフォーマットについて記述されている場所がほとんどなかったので、そこらへんの表記をwebpに変えていきました。（ここで、サーバサイド部分後でちゃんと読まなきゃなーを放置していた事実を忘れていたことが、最後の結果に繋がったかもしれない…）

### クソデカCSSを倒す

cssが確か10万行とかのレベルのクソデカでした。何じゃこりゃと思いながら見ていくと、どうやら `Tailwind CSS`とやらが原因ぽいことがわかりました。

そもそも`Tailwind CSS`を知らなかったため調べ、なんかめっちゃスタイルが簡単に書けるけど、全部入りはクソデカだから、使わんやつは消せよーって感じでした。

で、この使わんやつ消せよーをやってなかったため、クソデカになっていたようです。

この`Tailwind CSS`には、デフォでこの使っていない部分を消してくれる機能があるようです。

というわけで、`tailwind.config.js`という設定ファイルに加筆

```javascript
module.exports = {
  purge: [
    './src/index.html',
    './src/**/**/*.jsx',
    './src/**/**/*.js',
    './src/**/**/**/*.jsx',
    './src/**/**/**/*.js',
    './src/**/*.js',
  ],
  ~~~
  ~~~
  ~~~
```

確か、この`purge`というのは、Tailwind CSSの何が使われているかを見にいく対象のファイルを指定するもので、ここで使われていないcssの記述を排除してくれる、みたいなものだった気がします。

これを設定したら、めちゃくちゃスッキリしました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://zenn.dev/ryo_kawamata/articles/purage-tailwind" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fzenn.dev%2Fryo_kawamata%2Farticles%2Fpurage-tailwind&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

### webpack最適化
まさに「webpack 最適化」みたいな感じでググってでてきたやつを色々試しました。

- source mapをなくす
- modeをproductionにする

### 使われてないJSのライブラリを剥がす

[**webpack-bundle-analyzer**](https://www.npmjs.com/package/webpack-bundle-analyzer)を使って、どのライブラリがデカイのか調べました。

まずは`jQuery`が目について、`$`関係でワークスペースを見た感じ、あんまり記述量なさそう（Ajax関係だけか？）って感じだったので、そこを `fetch`で書き直してjQueryを剥がしました。（この`$`検索でやらかしたかもしれない…）

次に気になったのは、`lodash`.

こいつは`_.`でimportして使ってたので調べてみたら、どうやらそんなに使われてない。というか、少ないなら生のJSでも書けそうか？。

ということで、`_.map`とかを自前で実装して剥がしました。

### gifをやめる
webpack-bundle-analyzerには`bluebird.js`なるものも存在して、かなりの領域を占めていました。

こいつ消せないかなーーっていうかどこで使ってるんだ？？ということで、`npm ls`で調べてみると、`gifler`ってやつに依存して入ってました。
これはgif画像を描画するのに使ってるっぽい感じでした。

ってことは、`gif`を普通の動画にして（昔、[自己紹介用のwebスライド](https://biwashi.github.io/Portfolio/)作ってる時に、モバイル向けに動画再生させるのに詰まった記憶が蘇りながらも）、かつ`webm`に変換すればいいのでは？

ということで、`gif`関係の記述を削除して、`gifler`及び`bluebird`を消しました。

（そしてこの時、新規投稿関係のサーバー部分を修正するのをすっかり忘れていた…死）


<br>
<br>


以上、他にも細々したことはやりましたが、ざっとこんな感じです。

# 結果

結果はレギュレーション違反でした。残念。

というか競技開始時に、「前回違反した人めちゃ多かったんで気をつけてくださいね！！」ってかなり言われたに、案の定違反してしまいました。というか自分以外にも違反者めちゃいました。

次もしイベントを参加する人がこれを読んでいるなら、まじで注意してください！というかめちゃハイスコアじゃなくても違反してなかったらワンチャンあります！多分！

とはいえ、参考順位はまさかの2位という、フロント初心者的には嬉しい感じだったんですが、ぶっちゃけ違反すればいくらでもスコア上げられるんでほんとに**参考**って感じですかね…。


![参考順位](/images/blog/iwashi-253.png)

そして、「あーーこれは違反してるなーー」と思いながら終わったんですが、FBKでの違反ポイントが自分が想像してたところと違ったんで、恐怖でした。

一体いつ私は破壊してしまったのか…（ライブラリ剥がして多分ぶっ壊した）

# おわりと感想

初心者すぎて不安しかなかったんですが、何とか調べてるうちに色々見えるようになってきたり、Reactってこんな感じなんだーwebpackってこんな感じなんだーが体験できたので、学びが非常に多かったです。

また、終了後にCAの作問者の方が解説してくれたんですが、これが初心者的には目から鱗な事ばかりで非常に参考になり、初心者は特にあれを聞けるだけでも参加する価値があると思います。

新たなジャンルを開拓できた気がして、とてもたのしかったです。ありがとうございました！！

そして、このブログサイト何も考えずに作ったので、スコアめちゃ低かった…改修します…
<br>
<br>


最後におすすめされた本、ポチろうかな。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.amazon.co.jp/dp/B07JJ344WK/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2FB07JJ344WK%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>


<br>
あと、まさかの5年ぶりぐらいに、高校の同級生の存在を観測しました。就活や開発系のイベントで高校同期に出会うのは初めてだったので少しテンション上がってました。（あっちが認知してたかどうかはわからない）

<br>
