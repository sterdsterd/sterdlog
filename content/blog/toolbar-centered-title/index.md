---
title: Toolbar 타이틀 가운데 정렬 하기
date: "2019-02-19"
emoji: "🎯"
tags: ["Android"]
---

Toolbar를 사용하다 보면 제목을 가운데 정렬 한다던가, 텍스트 크기를 바꾸고 싶다던가 할 경우가 있다. 사실 Toolbar는 뷰그룹이기 때문에 무언가를 집어넣을 수 있다는것만 알아두면 된다

# XML

```xml
<com.google.android.material.appbar.AppBarLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:theme="@style/AppTheme.AppBarOverlay">
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="?attr/colorPrimary"
        app:popupTheme="@style/AppTheme.PopupOverlay">
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"/>
    </androidx.appcompat.widget.Toolbar>
</com.google.android.material.appbar.AppBarLayout>
```

하지만 이렇게 하면 원래 타이틀과 스타일이 다르다. 텍스트뷰에 `style="@style/TextAppearance.AppCompat.Widget.ActionBar.Title"`를 넣어 스타일을 맞춰준다.

# Java

하지만 이렇게만 한다면 원래 제목은 그대로 있으면서도 또 다른 제목 하나가 중간에 있는 우스꽝스러운 장면이 나온다.

```java
Toolbar toolbar = findViewById(R.id.toolbar);
setSupportActionBar(toolbar);
getSupportActionBar().setDisplayShowTitleEnabled(false);
```

이렇게 원래 제목을 숨겨주면 끝이다.

![Title이 가운데 정렬된 Toolbar](https://github.com/sterdsterd/sterd-blog/blob/master/_img/posts/centred.png?raw=true)

커스텀 폰트를 적용 하는 법은 나중에 다시 다루도록 하겠다
