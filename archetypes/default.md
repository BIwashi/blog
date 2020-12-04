---
title: "{{ replace .Name "-" " " | title }}"
description : "This is meta description"
date: {{ .Date }}
draft: true # 反映させる時はfalseに変えるかコメントアウト

# Twitter card gen用設定
author: ["いわし"]
categories: ["Test"]
tags: ["motivation", "inspiration"] # tag

# Blog用---------------------------------------------------
type: post
image: images/blog/yourImages.jpg # ブログバナーの画像
# author: Jamica Jock # 表示されない？


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

