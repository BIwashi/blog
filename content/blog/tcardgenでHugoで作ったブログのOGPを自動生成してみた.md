---
title: "tcardgenでHugoで作ったブログのOGPを自動生成してみた"
description : "This is meta description"
date: 2020-12-06T17:57:10+09:00
# draft: true # 反映させる時はfalseに変えるかコメントアウト
comments: true
url: "/blog/tcardgenでHugoで作ったブログのOGPを自動生成してみた/" # tcardgenでの自動生成スクリプト用のパスを設定
adsense: false
archives: ["2020", "2020-12"]

# Twitter card gen用設定"]
author: ["いわし"]
categories: ["go","tcardgen"]
tags: ["motivation", "inspiration"] # tag
ogimage: "images/og/tcardgenでHugoで作ったブログのOGPを自動生成してみた.png" # tcardgenで生成した画像をOGP画像に設定する
url: "/blog/tcardgenでHugoで作ったブログのOGPを自動生成してみた/" # tcardgenでの自動生成スクリプト用のパスを設定

# Blog用---------------------------------------------------
type: post
image: "images/og/tcardgenでHugoで作ったブログのOGPを自動生成してみた.png" # ブログバナーの画像

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

# tcardgen で自動生成されるかどうかの test です

`script`

```bash

if [ $# != 1 ] || [ $1 = "" ]; then
    echo "One parameters are required"
    echo ""
    echo "string: path to markdown file of target post"
    echo ""
    echo "example command"
    echo "\t$ sh ./scripts/gen_ogp.sh ./content/post/test/test.md"
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
