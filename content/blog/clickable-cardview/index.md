---
title: 터치 피드백이 있는 CardView 만들기
date: "2019-02-21"
emoji: "🃏"
tags: ["Android"]
---

CardView를 사용해서 디자인을 하다보면 CardView를 터치해 다른 Activity로 넘어간다던가 하는 식의 상호작용이 있기 마련인데, CardView는 아무리 터치해도 터치했다는 피드백이 오지 않아 보기 어색한 감이 있다.

이를 해결하는 방법은 간단하다.

# XML

```xml
<androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        app:cardCornerRadius="12dp"
        app:cardElevation="4dp">

				...

</androidx.cardview.widget.CardView>
```

보통의 카드뷰다. 이렇게만 짜면 터치 피드백이 없다.

```xml
android:foreground="?attr/selectableItemBackground"
android:clickable="true"
```

위 소스에 이 두 줄을 추가 해 준다면 카드뷰에 터치 피드백(물결 효과)가 나타날 것이다.

물론 다른 곳에서도 사용이 가능하다. 예를 들어 `ImageButton`의 Background 색상을 `#00000000`(투명)으로 설정하면 터치 피드백이 없지만, `?attr/selectableItemBackground`으로 설정한다면 터치 피드백이 있으면서 투명한 배경을 가진 버튼이 될 것이다.
