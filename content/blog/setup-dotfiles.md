---
title: "dotfilesで設定ファイルをバージョン管理"
description : "This is meta description"
date: 2020-12-11T17:17:09+09:00
# draft: true # 反映させる時はfalseに変えるかコメントアウト
comments: true
adsense: false
archives: ["2020", "2020-12"]

# Twitter card gen用設定"]
author: ["いわし"]
categories: ["Tech"]
tags: ["github", "zsh"] # tag
ogimage: "images/og/setup-dotfiles.png" # tcardgenで生成した画像をOGP画像に設定する
url: "/blog/setup-dotfiles/" # tcardgenでの自動生成スクリプト用のパスを設定 ルーティング固定の意味もある
carduse: true

# Blog用---------------------------------------------------
type: post
# image: "images/og/setup-dotfiles.png" # ブログバナーの画像
image: images/blog/dot.png

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

以前参加したハッカソンでEC2を使ったときに、メンバーがdotfilesを使用して環境構築を行っていたのをきっかけに、自分もやりたいなーと思っていたのをついにやりました。
もっと早くやっとけばよかった。

ネットで探せば無限にdotfiles関係の記事は出てくるけど、自分のメモとして残しておく。（特にPrezto関係）

# dotfilesって何よ？

ホームディレクトリに存在する`.`で始まる設定ファイルを管理しておくリポジトリのこと。

Gitでバージョン管理されていて、githubで公開されていることが多いみたい。

ちなみにdotfilesという名前に意味はないけど、大体みんなこの名前にしとるって感じです。

元々はdockerで立てたコンテナに入ったときのターミナルが見辛すぎて、いつものprezto使いて~から構築にいたりました。これでPCが変わったり別のサーバーがで作業する時もいつもの設定で作業できます。便利。

# どういう仕組み？

仕組みとしては単純で、`dotfiles`といディレクトリを作成して、管理したい`.`から始まる設定ファイルを移動させる。しかしそのままだと使えなくなるのでホームディレクトリにシンボリックリンクをはる。以上。って感じです。

- `.xxx`をdotfilesに移動させる
- ホームディレクトリにシンボリックリンクをはる

# 導入方法

## ファイルを選ぶ

まずは管理したい設定ファイルを選ぶ。ここで`.ssh`などのファイルは絶対に入れないように気をつける。

## とりあえず今あるものbackupをとっておく

ちょっと怖いので、ひとまずbackupをとっておく。自分は`BACKUP`ディレクトリを作成して避難させた。

例としてzshの設定ファイルを管理する場合

```zsh
$ cp .z* ~/BACKUP
```

## dotfilesに移動させる

バックアップしたので、移動させる

```zsh
$ mkdir ~/dotfiles
$ mv .z* ~/dotfiles
```

自分はzprezto系や○○env系のモノも入れた。

## シンボリックリンクをはる

今のままだとホームディレクトリから設定ファイルがなくなってしまって動かなくなる。なのでdotfilesからホームディレクトリにシンボリックリンクをはる。

```bash
$ ln -s .zshrc ~/.zshrc
```

ただこれを毎回やるのはめんどくさいのでスクリプトを用意しておく。

僕はこちらの記事のものを使用させていただきました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://qiita.com/ganariya/items/d9adffc6535dfca6784b" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fqiita.com%2Fganariya%2Fitems%2Fd9adffc6535dfca6784b&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

```bash
# #!/bin/zsh

# DOT_FILES=(.*)

# for file in ${DOT_FILES[@]}; do
#     ln -s $HOME/dotfiles/$file $HOME/$file
# done

# 未定義な変数があったら途中で終了する
set -u

# 今のディレクトリ
# dotfilesディレクトリに移動する
BASEDIR=$(dirname $0)
cd $BASEDIR

# dotfilesディレクトリにある、ドットから始まり2文字以上の名前のファイルに対して
for f in .??*; do
    [ "$f" = ".git" ] && continue
    [ "$f" = ".gitconfig.local.template" ] && continue
    [ "$f" = ".gitmodules" ] && continue

    # シンボリックリンクを貼る
    ln -snfv ${PWD}/"$f" ~/
done
```

これで全部貼ってくれます。ﾔｯﾀﾈ。

僕はこのスクリプトに`setup.sh`という名前をつけて~/dotfiles/に保存している。
権限も忘れずに。


```zsh
$ sudo chmod +x setup.sh
```

あとはgithubにあげるだけ！簡単だね！


# 落とし穴（Prezto）

実はこれが本題。

ここまでの手順でできたーと思っていたが、こないだdockerコンテナで構築しようとしたら全然うまくいかなかった。
ちなみに僕のdotfilesの中身。

```zsh
.
├── .fzf.bash
├── .fzf.zsh
├── .git
├── .goenv
├── .p10k.zsh
├── .pyenv
├── .vscode
├── .zcompcache
├── .zcompdump
├── .zlogin
├── .zlogout
├── .zprezto
├── .zpreztorc
├── .zprofile
├── .zsh_history
├── .zshenv
├── .zshrc
├── install_brew.sh
├── install_zprezto.sh
├── README.md
└── setup.sh
```

ここで「なんでvscode入れとんねん！同期使えや！」の人。その通りです。

実は以前使っていたWindowsと同期していろいろ破壊されたことがあって怖くてやってないのです…

それはまあ置いておいて、ちゃんと入っているがうまくいってないない。というかzsh関係の中身が何もない。おかしいな…と思っていたが、ふとPreztoを入れたときのことを思い出した。

## Preztoなんやねん

zshを使っている人はみんな使っている（と思っている）ターミナルの見た目をいい感じにしてくれるやつです。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/sorin-ionescu/prezto" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fgithub.com%2Fsorin-ionescu%2Fprezto&amp;key=f35ef3e07c3f9ce01b389a206da306f5"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://dev.classmethod.jp/articles/zsh-prezto/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fdev.classmethod.jp%2Farticles%2Fzsh-prezto%2F&amp;key=f35ef3e07c3f9ce01b389a206da306f5"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<br>

これを入れるときに、何も考えず書かれている通りに次のコマンドを叩いていました。

```zsh
// 設定ファイルを作成
$ setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```

これ、cloneしてきた`.zprezto/runcom/`にあるzsh系の設定ファイルを本体にして、ホームディレクトリにシンボリックリンクを貼ってるっぽい、

<img src="https://i.gyazo.com/e721e7bc1384fbcddebfa2df9d897f17.png" width="100%">

つまり…今まで本体だと思っていたzsh系のファイルは、全部`.zprezto/runcom/`から貼られたシンボリックリンクだった。

それ故にgithubで追えてなかった。なんという…

本体である`.zprezto/runcom/`にあるやつらをdotfilesに移動して名前を`.~`に変更し、逆に.zprezto/runcom/に向けてシンボリックリンクを貼る。

これで無事動くようになった！


# 終わりに
これでどこでもPreztoのターミナルを使えるようになった。（zshは必要だけど）

ちなみにターミナルをカラフルにするためにexaを使ってます。

<img src="/images/blog/prezto.png" style="width:100%; text-align:center;">

## 僕のdotfiles

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/BIwashi/dotfiles" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fgithub.com%2FBIwashi%2Fdotfiles&amp;key=f35ef3e07c3f9ce01b389a206da306f5"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

# 参考

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://qiita.com/b4b4r07/items/b70178e021bef12cd4a2" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fqiita.com%2Fb4b4r07%2Fitems%2Fb70178e021bef12cd4a2&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://qiita.com/ganariya/items/d9adffc6535dfca6784b" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fqiita.com%2Fganariya%2Fitems%2Fd9adffc6535dfca6784b&amp;key=f35ef3e07c3f9ce01b389a206da306f5&amp;iframe=card-small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>