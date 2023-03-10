---
title: 커스텀 폰트 사용하기
date: "2019-02-20"
emoji: "🎭"
tags: ["Android"]
---

앱을 만들다 보면 기본 적용된 폰트가 아닌 원하는 폰트를 적용하고 싶을 때가 있다. 요즘은 세상이 좋아져서(?) 폰트를 바꾸기 위해 Java 파일을 건들이지 않아도 된다!

# 폰트 파일

`*.ttf` 나 `*.otf`로 된 폰트 파일을 `res/` 폴더 아래에 `font/`라는 디렉토리를 만들어 넣어준다. 소문자로만 된 이름을 써야한다.

# XML

## font.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:app="http://schemas.android.com/apk/res-auto">
    <font
        app:fontStyle="normal"
        app:fontWeight="400"
        app:font="@font/레귤러 폰트의 파일 이름" />
    <font
        app:fontStyle="normal"
        app:fontWeight="700"
        app:font="@font/볼드 폰트의 파일 이름" />
</font-family>
```

처럼 폰트들을 정의한 xml을 만들어 `res/font/`에 넣어준다.

## styles.xml

이제 스타일만 고쳐주면 적용된다.

```xml
<style name="TextAppearance" parent="android:Widget.TextView">
    <item name="fontFamily">@font/font_barun</item>
</style>
```

폰트를 적용한 텍스트 스타일을 하나 만들어 준 후

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>

    <item name="android:textViewStyle">@style/TextAppearance</item>
</style>
```

앱 테마 중간에 텍스트뷰 스타일을 지정해주면 된다.

![Custom Font가 적용된 TextView](https://github.com/sterdsterd/sterd-blog/blob/master/_img/posts/centred.png?raw=true)

그러면 이렇게 커스텀 폰트가 적용 된 예쁜 화면을 볼 수 있을것이다.
