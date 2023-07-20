## Використання міксінів:

```bash
.container {
  @include @mq(desktop) {
    width: 1440px
  }
}

.title {
  @include @font(16px, 300, 1.5);
  @include @font(16px, _, 1.5); // означає - примінити тільки введені значення
  @include @font(16px, _, _); // означає - примінити тільки введене значення
  @include @font(); // примінить шрифт від батьківського елемента

  @include transitioned(color); // додасть перехід для кольорів
  @include transitioned(transform); // додасть перехід для transform
}
```

## Використання плейсхолдерів:

```bash
.label {
  @extend %text-label; // примінить текст із плейсхолдера %text-label
}

.title {
  @extend %title; // примінить текст із плейсхолдера %title
}
```
