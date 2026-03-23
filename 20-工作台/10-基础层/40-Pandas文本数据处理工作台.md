---
type: workbench
layer: foundation
output: 文本数据表
---

# Pandas文本数据处理工作台

## 工作台定位
基础层。负责处理“表格里的文本”。

前面的 `文件与语料管理工作台` 解决的是：
- 怎样读文件
- 怎样整理语料目录

这一页解决的是另一个非常常见的问题：

很多文本并不是孤零零的一篇 txt，而是放在表格里，比如：
- 一行是一条评论
- 一行是一条新闻
- 一行是一条问卷回答
- 一行是一条微博

这时候最常用的工具就是 `pandas`。

## 它属于哪个层级？
- 基础层

## 它服务哪个模板？
- [[../../40-模板/文本处理流程模板]]
- [[../../40-模板/文本分析报告模板]]

## 它对应什么输出动作？
- 读取 csv 形式的文本数据表
- 查看文本列和标签列
- 清理空值
- 对文本列做最基础处理
- 统计标签分布
- 为后续分类、情感分析、主题分析准备干净数据表

## 一、Pandas 是什么？
如果说 Python 是一门语言，那么 Pandas 可以理解成 Python 里的一个“数据处理工具箱”。

它特别擅长处理：
- 表格
- 行列数据
- 混合了文字和数字的数据

对 NLP 初学者来说，Pandas 很重要，因为真实任务里，文本往往会和很多附加信息一起出现：
- 评论文本
- 标签
- 作者
- 时间
- 星级
- 类别

这些内容放在一起，就像一个 Excel 表格。

## 二、为什么 NLP 初学者需要 Pandas？
因为很多自然语言处理任务，真正开始之前都要先做“表格清洗”。

比如你拿到一份电影评论数据，里面可能有：
- `review`：评论内容
- `label`：积极或消极
- `score`：评分
- `date`：时间

如果不会 Pandas，你就很难方便地做这些事：
- 看看数据有没有读歪
- 取出文本列
- 删除空评论
- 统计每类评论有多少条
- 算每条文本有多长

所以 Pandas 是很多 NLP 任务的前置工具。

## 三、DataFrame 和 Series 是什么？
### 1. DataFrame
可以把 `DataFrame` 直接理解成一个 Excel 工作表。

它有：
- 行
- 列
- 表头

每一行是一条记录，每一列是一种信息。

比如：

| id | text | label |
|---|---|---|
| 1 | I love Python. | positive |
| 2 | This is boring. | negative |

### 2. Series
`Series` 可以理解成 DataFrame 里被单独抽出来的一列。

比如：

```python
df["text"]
```

这就是一列文本。

在 NLP 里，我们经常操作的就是这个“文本列”。

## 四、如何安装和导入 Pandas

```bash
pip install pandas
```

导入时通常写成：

```python
import pandas as pd
```

这是约定俗成的写法，后面几乎所有资料都会这么写。

## 五、如何读取 csv 文件
这是 Pandas 最常见的起点。

```python
import pandas as pd

df = pd.read_csv("movie_reviews.csv", encoding="utf-8")
print(df.head())
```

### 代码解释
- `pd.read_csv(...)`：读取 csv 文件
- `encoding="utf-8"`：告诉 Python 用 utf-8 编码读取
- `df.head()`：查看前 5 行，确认数据有没有乱码、列名对不对

### 初学者最该养成的习惯
每次读完数据，都先做这三件事：

```python
print(df.head())
print(df.columns)
print(df.shape)
```

它们分别帮你看：
- 前几行长什么样
- 列名是什么
- 有多少行多少列

## 六、如何选择文本列
如果你的表格里有一列叫 `review`，想把它单独拿出来：

```python
text_column = df["review"]
print(text_column.head())
```

这时候 `text_column` 就是一个 `Series`。

如果想一次选出多列：

```python
small_df = df[["review", "label"]]
print(small_df.head())
```

## 七、如何清洗空值
很多表格里会有空白单元格。如果不处理，后面做字符串操作时很容易报错。

### 1. 查看哪些列有空值

```python
print(df.isna().sum())
```

### 2. 删除含空值的行

```python
df = df.dropna()
```

### 3. 只删除文本列为空的行

```python
df = df.dropna(subset=["review"])
```

这比“整行全删”更合理，因为有时别的列空了不一定影响当前任务。

## 八、如何统计行数和标签分布
### 1. 看总共有多少条数据

```python
print(len(df))
```

或者：

```python
print(df.shape[0])
```

### 2. 看标签分布

```python
print(df["label"].value_counts())
```

这个操作在文本分类和情感分析里特别重要，因为你需要知道：
- 每个类别有多少条
- 数据是否严重不平衡

## 九、如何对文本列做最基础处理
### 1. 全部转小写

```python
df["review"] = df["review"].str.lower()
```

### 2. 去掉首尾空白

```python
df["review"] = df["review"].str.strip()
```

### 3. 统计字符长度

```python
df["char_count"] = df["review"].str.len()
```

### 4. 统计单词数

```python
df["word_count"] = df["review"].str.split().str.len()
```

这里要特别注意 `.str`。

对于一整列文本，不能写：

```python
df["review"].lower()
```

正确写法是：

```python
df["review"].str.lower()
```

因为 `review` 这一列是一个 `Series`，不是单个字符串。

## 十、如何用 apply 处理文本列
如果你想做更灵活的处理，可以用 `apply()`。

可以把 `apply()` 想成：
把同一个函数，依次作用到这一列的每一行上。

### 例子1：统计每条评论有多少个词

```python
def count_words(text):
    words = text.split()
    return len(words)

df["word_count"] = df["review"].apply(count_words)
```

### 例子2：自己写一个最基础的清洗函数

```python
def clean_text(text):
    text = text.strip()
    text = text.lower()
    text = " ".join(text.split())
    return text

df["clean_review"] = df["review"].apply(clean_text)
```

这个例子非常重要，因为它已经开始连接后面的“文本清洗工作台”。

## 十一、如何按标签分组统计
### 1. 最简单：统计每类有多少条

```python
print(df["label"].value_counts())
```

### 2. 分组后计算平均长度

```python
print(df.groupby("label")["char_count"].mean())
```

### 3. 分组后看每类平均词数

```python
print(df.groupby("label")["word_count"].mean())
```

这能帮助学生形成一个很重要的意识：
文本任务不只是“跑模型”，还要先观察数据。

## 十二、课堂综合示例
下面这段代码适合直接课堂演示：

```python
import pandas as pd

df = pd.read_csv("reviews.csv", encoding="utf-8")

print("前5行：")
print(df.head())

df = df.dropna(subset=["review", "label"])

df["review"] = df["review"].str.lower().str.strip()
df["char_count"] = df["review"].str.len()
df["word_count"] = df["review"].str.split().str.len()

print("标签分布：")
print(df["label"].value_counts())

print("各类平均词数：")
print(df.groupby("label")["word_count"].mean())
```

这段代码串起了：
- 读取数据
- 清理空值
- 文本列基础处理
- 长度统计
- 标签分布统计

## 十三、适合学生的练习
### 练习1：读文件
读取一个名为 `news.csv` 的文件，打印前 3 行。

### 练习2：选文本列
取出 `title` 这一列，并打印前 5 条。

### 练习3：清理空值
删除 `title` 列为空的行，并打印清理前后的行数。

### 练习4：统一大小写
把 `title` 这一列全部转成小写。

### 练习5：计算标题长度
新增一列 `title_len`，记录每个标题的字符数。

### 练习6：统计标签数量
如果有一列叫 `category`，统计每种类别各有多少条。

### 练习7：写一个 apply 函数
写一个函数，把文本的首尾空白去掉，再统计单词数。

## 十四、常见错误
### 1. 找不到文件
常见报错：
- `FileNotFoundError`

通常原因：
- 文件不在当前目录
- 文件名写错
- 路径写错

### 2. 乱码
常见报错：
- `UnicodeDecodeError`

可以先尝试：

```python
df = pd.read_csv("data.csv", encoding="utf-8")
```

如果不行，再检查原始文件实际编码。

### 3. 忘记重新赋值
错误写法：

```python
df.dropna()
```

正确写法：

```python
df = df.dropna()
```

### 4. 忘记 `.str`
错误写法：

```python
df["review"].lower()
```

正确写法：

```python
df["review"].str.lower()
```

### 5. 以为表格中的数字一定是数字
有时 `score` 这一列看起来是数字，其实被读成了字符串。

这时候要先检查：

```python
print(df.info())
```

## 十五、这页学完后你应该会什么？
- 知道 Pandas 为什么是 NLP 的常用前置工具
- 能区分 DataFrame 和 Series
- 会读取 csv 文本数据
- 会选择文本列和标签列
- 会做最基础的空值处理
- 会对文本列做 lower、strip、长度统计
- 会用 `apply()` 做简单文本处理
- 会做最基本的标签分布统计

## 关联工作台
- [[30-文件与语料管理工作台/00-文件与语料管理工作台|文件与语料管理工作台]]
- [[../20-方法层/10-文本清洗工作台|文本清洗工作台]]
- [[../20-方法层/40-词频统计与可视化工作台|词频统计与可视化工作台]]
- [[../30-应用层/10-文本分类工作台|文本分类工作台]]
