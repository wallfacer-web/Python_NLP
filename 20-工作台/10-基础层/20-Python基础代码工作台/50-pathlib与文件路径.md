---
type: concept-note
topic: pathlib
parent: Python基础代码工作台
---

# pathlib与文件路径

## 这页讲什么

这页讲文件路径的基本概念，以及 Python 里如何用 `pathlib` 模块处理路径和文件。

## 一、为什么文件路径很重要

很多初学者写代码时报错，不是代码逻辑错了，而是：
- 文件不在当前目录
- 文件名写错
- 路径写错
- 找不到文件

而自然语言处理大量依赖文件：
- txt
- csv
- json
- 语料目录
- 输出结果文件

所以，学会路径就是在给后面的文本处理打地基。

## 二、什么是路径

路径就是“文件或文件夹在电脑里的地址”。

例如：

```text
C:\Users\Name\Desktop\data.txt
```

这就是一个 Windows 路径。

## 三、为什么推荐 pathlib

因为 `pathlib` 比手写字符串路径更清楚，也更适合教学。

它的优点：
- 可读性好
- 操作直观
- 后续读取文件很方便

## 四、最基本的用法

先导入模块：

```python
from pathlib import Path
```

### 1. 创建一个路径对象

```python
from pathlib import Path

file_path = Path("story.txt")
print(file_path)
```

### 2. 判断文件是否存在

```python
from pathlib import Path

file_path = Path("story.txt")
print(file_path.exists())
```

### 3. 读取文本

```python
from pathlib import Path

file_path = Path("story.txt")
content = file_path.read_text(encoding="utf-8")
print(content)
```

### 4. 写入文本

```python
from pathlib import Path

file_path = Path("result.txt")
file_path.write_text("这是新的文本内容。", encoding="utf-8")
```

## 五、路径对象为什么比字符串更好

如果你只用字符串，也能写：

```python
file_path = "story.txt"
```

但 `Path("story.txt")` 更像一个真正的“文件对象入口”。  
它不仅能表示路径，还能直接继续做很多操作。

例如：

```python
from pathlib import Path

file_path = Path("story.txt")
print(file_path.name)
print(file_path.suffix)
```

这里可以直接得到：
- 文件名
- 后缀名

## 六、和文本处理直接相关的例子

### 例子1：读取一篇文章

```python
from pathlib import Path

article_path = Path("article.txt")
content = article_path.read_text(encoding="utf-8")
print(content)
```

### 例子2：读取文章并转成小写

```python
from pathlib import Path

article_path = Path("english.txt")
content = article_path.read_text(encoding="utf-8")
print(content.lower())
```

### 例子3：保存处理后的文本

```python
from pathlib import Path

output_path = Path("clean_text.txt")
output_path.write_text("这是处理后的内容。", encoding="utf-8")
```

### 例子4：查看文件后缀

```python
from pathlib import Path

file_path = Path("data.csv")
print(file_path.suffix)
```

### 例子5：拼接路径

```python
from pathlib import Path

folder = Path("data")
file_path = folder / "sample.txt"
print(file_path)
```

这里的 `/` 不是除法，而是 `pathlib` 里拼接路径的写法。

## 七、初学者练习

### 练习1：创建一个路径对象

```python
from pathlib import Path

file_path = Path("notes.txt")
print(file_path)
```

### 练习2：判断文件是否存在

```python
from pathlib import Path

file_path = Path("notes.txt")
print(file_path.exists())
```

### 练习3：读取文本文件

```python
from pathlib import Path

file_path = Path("notes.txt")
content = file_path.read_text(encoding="utf-8")
print(content)
```

### 练习4：保存一段新文本

```python
from pathlib import Path

file_path = Path("output.txt")
file_path.write_text("Python 很适合做文本处理。", encoding="utf-8")
```

### 练习5：把路径和文件名拼起来

```python
from pathlib import Path

folder = Path("corpus")
file_path = folder / "article1.txt"
print(file_path)
```

## 八、常见错误

- 文件不在当前目录
- 文件名写错
- 路径大小写或后缀写错
- 忘记写 `encoding="utf-8"`
- 把 `Path` 写成普通字符串后，又想直接调用 `.read_text()`

## 九、这一页学完后你应会什么

- 知道什么是文件路径
- 知道为什么 `pathlib` 适合初学者
- 会创建 `Path` 对象
- 会判断文件是否存在
- 会读取和写入文本文件
- 会做最简单的路径拼接
