---
title: 'ArrayList and Resizable Arrays'
date: 2020-04-15
slug: 'arraylist-and-resizable-arrays'
tags:
  - array
  - java
category: articles
---

Arrays in javascript are automatically resizable but in other languages like java, arrays are fixed length. You define the size when you create the array.

```java
  int arr[] = new int[10];
```

Use ArrayList if you need an array that dynamically resizes. Usually, the way it works under the hood is the array is doubled every time it's full.

So, a new array that's twice the length is created and the items are copied over to it.

The time complexity for access is still O(1) because the doubling is amortized (the doubling happens so rarely that even though the time complexity of copying over the array is O(n), it's written off).

If you work backwards (final size is at n), then the array's previous size was n/2. So only n/2 items needed to be copied. Similarly, for the previous doubling, n/4 items needed to be copied and so on until 2 items and 1 item needed to be copied.

If we write this in series, it's: `n/2 + n/4 + n/8 + .. + 2 + 1 = 1`

Therefore, inserting N elements takes O(N) work total. Each insertion is O(1) on average, even though
some insertions take O(N) time in the worst case.

```java
ArrayList<String> merge(String[] words, String[] more) {
  ArrayList<String> sentence = new ArrayList<String>();
  for (String w : words) sentence.add(w);
  for (String w : more) sentence.add(w);
  return sentence;
}
```

## String Builder

String builder basically creates a resizable array of all the strings, copying them back to a string only when necessary. Use this when you have to mutate a string a lot. Don't loop and do `sentence = sentence + word`.

The time complexity for this would be O(n<sup>2</sup>). Example - if you're concatenating words(each of length x) to a sentence: `x + 2x + 3x + ... + nx = n(n+1)/2 ~= n^2`

So instead of doing this:

```java
String joinWords(String[] words) {
  String sentence = "";
  for (String w : words) {
    sentence = sentence + w;
  }
  return sentence
}
```

you should be using a `StringBuilder` which reduces the time complexity to O(n).

```java
String joinWords(String[] words) {
  StringBuilder sentence = new StringBuilder();
  for (String w : words) {
    sentence.append(w);
  }
  return sentence.toString();
}
```
