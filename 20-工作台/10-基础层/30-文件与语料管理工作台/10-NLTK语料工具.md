---
type: concept-note
topic: nltk-corpus-tools
parent: 文件与语料管理工作台
---

# NLTK语料工具

## 这页讲什么

这页专门讲 NLTK 的语料工具。  
目标是让零基础学生理解：
- 什么是语料
- 为什么 NLP 要依赖语料
- 如何安装和下载 NLTK 语料
- 如何读取原始文本、单词、句子和分类

## 一、什么是语料、语料库和 NLTK 语料工具

### 1. 什么是语料

语料就是语言材料。  
例如：
- 小说
- 新闻
- 演讲稿
- 对话
- 评论

### 2. 什么是语料库

语料库就是把大量语料有组织地收集起来，形成一个可查询、可分析的文本集合。

### 3. 什么是 NLTK 语料工具

可以把 NLTK 语料工具理解成“图书管理员”。

如果：
- 语料是一页页书稿
- 语料库是一座图书馆

那么：
- NLTK 语料工具就是帮你查目录、取书、翻页、抽句子的管理员

## 二、为什么自然语言处理必须依赖语料

因为计算机不会凭空理解语言。

它要通过大量文本来学习：
- 哪些词经常一起出现
- 什么样的句子更常见
- 什么词可能表达情感
- 什么文本可能属于某一类

所以语料就是 NLP 的教材和原材料。

## 三、如何安装 NLTK

在终端中运行：

```bash
pip install nltk
```

测试是否安装成功：

```python
import nltk
print("nltk 安装成功")
```

## 四、如何下载 NLTK 数据

### 方法1：图形方式

```python
import nltk
nltk.download()
```

这通常会弹出 NLTK Downloader 窗口。  
适合初学者用鼠标选择资源。

### 方法2：按名称下载

```python
import nltk
nltk.download("gutenberg")
nltk.download("brown")
nltk.download("inaugural")
nltk.download("names")
```

适合明确知道要下载哪些语料时使用。

## 五、适合初学者的经典语料

### 1. gutenberg

文学作品语料库。  
适合做：
- 文学文本阅读
- 词汇观察
- 文体分析

### 2. brown

经典英语语料库，带分类。  
适合做：
- 比较不同文本类型
- 新闻和小说差异观察

### 3. inaugural

总统就职演说语料。  
适合做：
- 演讲文本分析
- 历史语言观察

### 4. names

英文名字语料。  
适合做：
- 名字分类
- 简单统计

## 六、五个核心方法

### 1. `categories()`

作用：查看语料库有哪些分类。  
返回类型：列表。

```python
from nltk.corpus import brown
print(brown.categories())
```

### 2. `fileids()`

作用：查看语料库里包含哪些文件。  
返回类型：列表。

```python
from nltk.corpus import gutenberg
print(gutenberg.fileids())
```

### 3. `raw()`

作用：读取原始文本。  
返回类型：字符串。

```python
from nltk.corpus import gutenberg

text = gutenberg.raw("carroll-alice.txt")
print(text[:200])
```

### 4. `words()`

作用：按单词读取。  
返回类型：单词列表。

```python
from nltk.corpus import brown

words = brown.words()
print(words[:20])
```

### 5. `sents()`

作用：按句子读取。  
返回类型：句子列表，其中每个句子又是一个单词列表。

```python
from nltk.corpus import brown

sents = brown.sents()
print(sents[:2])
```

## 七、适合课堂演示的例子

### 例子1：查看古登堡语料里有哪些书

```python
from nltk.corpus import gutenberg
print(gutenberg.fileids())
```

### 例子2：查看 Brown 语料有哪些类别

```python
from nltk.corpus import brown
print(brown.categories())
```

### 例子3：读取《爱丽丝梦游仙境》的原始文本

```python
from nltk.corpus import gutenberg

alice_raw = gutenberg.raw("carroll-alice.txt")
print(alice_raw[:100])
```

### 例子4：读取单词列表

```python
from nltk.corpus import gutenberg

alice_words = gutenberg.words("carroll-alice.txt")
print(alice_words[:20])
```

### 例子5：读取句子列表

```python
from nltk.corpus import brown

for sent in brown.sents()[:2]:
    print(sent)
```

### 例子6：只看悬疑类语料

```python
from nltk.corpus import brown

words = brown.words(categories="mystery")
print(words[:30])
```

### 例子7：查看 names 语料有哪些文件

```python
from nltk.corpus import names

print(names.fileids())
```

### 例子8：读取女性名字

```python
from nltk.corpus import names

female_names = names.words("female.txt")
print(female_names[:20])
```

### 例子9：比较 raw 和 words 的类型

```python
from nltk.corpus import gutenberg

raw_text = gutenberg.raw("carroll-alice.txt")
word_list = gutenberg.words("carroll-alice.txt")

print(type(raw_text))
print(type(word_list))
```

### 例子10：统计某个词出现次数

```python
from nltk.corpus import brown

romance_words = brown.words(categories="romance")
print(romance_words.count("love"))
```

## 八、学生练习

### 练习1：安装并导入 nltk

```python
import nltk
print("nltk 可用")
```

### 练习2：下载 brown 语料

```python
import nltk
nltk.download("brown")
```

### 练习3：查看 Brown 的类别

```python
from nltk.corpus import brown
print(brown.categories())
```

### 练习4：读取前 20 个单词

```python
from nltk.corpus import brown
print(brown.words()[:20])
```

### 练习5：读取前 2 个句子

```python
from nltk.corpus import brown

for sent in brown.sents()[:2]:
    print(sent)
```

### 练习6：读取一本文学作品前 300 个字符

```python
from nltk.corpus import gutenberg

text = gutenberg.raw("carroll-alice.txt")
print(text[:300])
```

### 练习7：比较 `raw()` 和 `words()`

```python
from nltk.corpus import gutenberg

raw_text = gutenberg.raw("carroll-alice.txt")
word_list = gutenberg.words("carroll-alice.txt")

print(type(raw_text))
print(type(word_list))
print(raw_text[:80])
print(word_list[:15])
```

### 练习8：查看 names 文件

```python
from nltk.corpus import names
print(names.fileids())
```

## 九、初学者最容易犯的错误

- 安装了 `nltk`，但没有下载语料数据
- 只会 `import nltk`，不会导入具体语料
- 文件名拼错
- 把 `raw()` 和 `words()` 的结果类型混淆
- 不知道 `categories()` 返回的是分类列表
- 把语料库和语料工具混为一谈

## 十、这一页学完后你应会什么

- 知道什么是语料和语料库
- 知道为什么 NLP 需要语料
- 会安装 `nltk`
- 会下载基础语料
- 会用 `categories()`、`fileids()`、`raw()`、`words()`、`sents()`
- 能用现成语料做最基础的观察和练习

