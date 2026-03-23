---
type: concept-note
topic: csv-json-corpus
parent: 文件与语料管理工作台
---

# csv与json语料

## 这页讲什么

这页讲：
- 什么是结构化语料
- `csv` 和 `json` 各适合保存什么
- 为什么文本任务常把标签和元数据放进去
- 如何用 Python 读取 `csv`
- 如何用 Python 读取 `json`

## 一、什么是结构化语料

如果说纯文本像一张写满字的纸，结构化语料就更像一张带表头的表格，或者一个分层清楚的档案袋。

结构化语料不只是“文本本身”，还会附带信息，例如：
- 作者
- 时间
- 标签
- 类别
- 情感分数

这些附加信息在 NLP 里很重要，因为它们常常决定了后续分析任务的方向。

## 二、csv 和 json 各适合存什么

### 1. CSV

`csv` 适合存“扁平的表格数据”。

例如一份评论数据：

| Text | Label |
|------|-------|
| 这本书很好 | 1 |
| 我不喜欢这个结局 | 0 |

适合：
- 文本 + 标签
- 文本 + 时间
- 文本 + 作者

### 2. JSON

`json` 更适合存“层级更复杂的数据”。

例如一条微博数据：
- 正文
- 作者信息
- 标签列表
- 时间
- 点赞数

这种“你中有我”的结构，用 `json` 更自然。

## 三、为什么文本任务要保存元数据

因为 NLP 不只是看一句话本身。

例如：
- 情感分析需要标签
- 新闻分类需要类别
- 作者研究需要作者信息
- 历时分析需要时间

如果这些信息不保存，后面很多分析做不起来。

## 四、如何用 Python 读取 CSV

不要用手工 `split(",")` 去硬拆 CSV。  
应该用 Python 自带的 `csv` 模块。

### 1. 最基础的读取方式

```python
import csv

with open("data.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
```

每一行读出来通常是一个列表。

### 2. 更适合初学者的方式：DictReader

```python
import csv

with open("reviews.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print("文本内容:", row["Text"])
        print("情感标签:", row["Label"])
```

这种方式更好理解，因为它按列名取值。

## 五、如何用 Python 读取 JSON

读取 JSON 最常用的是 `json` 模块。

### 1. 读取 JSON 字符串

```python
import json

json_string = '{"author": "苏轼", "text": "明月几时有"}'
data = json.loads(json_string)
print(data["author"])
```

### 2. 读取 JSON 文件

```python
from pathlib import Path
import json

path = Path("corpus.json")
contents = path.read_text(encoding="utf-8")
data = json.loads(contents)

print(data)
```

## 六、适合课堂演示的例子

### 例子1：读取 CSV 的每一行

```python
import csv

with open("data.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    for row in reader:
        print("这一行是：", row)
```

### 例子2：按列名读取评论和标签

```python
import csv

with open("reviews.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["Text"], row["Label"])
```

### 例子3：把字符串标签转成整数

```python
import csv

with open("scores.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        score = int(row["Score"])
        print(score * 2)
```

### 例子4：只收集积极语料

```python
import csv

positive_texts = []

with open("reviews.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["Label"] == "1":
            positive_texts.append(row["Text"])

print(positive_texts)
```

### 例子5：读取 JSON 字符串

```python
import json

json_string = '{"author": "苏轼", "dynasty": "宋"}'
data = json.loads(json_string)
print(data["author"])
```

### 例子6：读取嵌套 JSON

```python
import json

json_string = '{"tweet": {"user": "Alice", "content": "NLP太好玩了！", "tags": ["AI", "Python"]}}'
data = json.loads(json_string)

print(data["tweet"]["content"])
print(data["tweet"]["tags"][0])
```

### 例子7：读取 JSON 文件

```python
from pathlib import Path
import json

path = Path("corpus.json")
contents = path.read_text(encoding="utf-8")
data = json.loads(contents)
print(data)
```

### 例子8：处理缺失数据

```python
import csv

with open("data.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        try:
            score = int(row["Score"])
            print(score)
        except ValueError:
            print("跳过一条错误数据")
```

## 七、学生练习

### 练习1：读取一个新闻标题 CSV

要求：
- 打印所有标题

### 练习2：提取积极评论

要求：
- 从评论 CSV 中提取标签为 1 的文本

### 练习3：解析一个作家 JSON 字符串

要求：
- 输出作者姓名和作品标题

### 练习4：读取带嵌套结构的 JSON

要求：
- 找到正文内容

### 练习5：统计 CSV 中有效文本条数

要求：
- 跳过空白文本

### 练习6：思考 csv 和 json 的区别

要求：
- 用自己的话说出它们分别适合什么场景

## 八、常见错误

- 忘记写 `encoding="utf-8"`
- 把 CSV 里的数字当成真正数字，其实它们读出来常常是字符串
- 手工 `split(",")` 处理 CSV
- JSON 键名写错
- 路径不对，文件找不到
- 分不清“纯文本语料”和“结构化语料”

## 九、这一页学完后你应会什么

- 知道什么是结构化语料
- 知道 `csv` 和 `json` 的区别
- 知道为什么标签和元数据重要
- 会读取基础 CSV
- 会读取基础 JSON
- 能为后续文本分类、情感分析、语料整理做好准备

