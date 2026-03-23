---
type: concept-note
topic: docx-pdf-extraction
parent: 文件与语料管理工作台
---

# docx与pdf文本提取

## 这页讲什么

这页讲：
- 为什么 NLP 常常要把 Word 和 PDF 转成纯文本
- `docx` 和 `pdf` 在提取上的区别
- 如何用 Python 提取 Word 文本
- 如何用 Python 提取 PDF 文本
- 提取后常见的清洗问题

## 一、为什么 NLP 常常要把 Word 和 PDF 转成纯文本

可以把 Word 和 PDF 想成“包装精美的礼盒”。

它们里面除了文字，还带着很多信息：
- 字体
- 字号
- 粗体斜体
- 页边距
- 页码
- 版式

人看文档时这些信息很有用，但 NLP 算法通常只关心：
- 这里写了什么字
- 词和句子是什么

所以做 NLP 时，常见第一步就是：

1. 从 Word / PDF 中提取文字
2. 把文字转成纯文本
3. 再进入清洗、统计和分析

## 二、docx 和 pdf 的区别

### 1. docx

`docx` 更像“结构清楚的记事本”。

它知道：
- 哪一段是一个段落
- 哪些文字属于同一段

所以从 Word 提取文本通常比较干净、稳定。

### 2. pdf

`pdf` 更像“排版固定的页面照片”。

它主要强调：
- 页面长什么样
- 字放在页面哪个位置

它并不总是关心“这一整段话的逻辑结构”。  
所以 PDF 提取文本时更容易出现：
- 丢空格
- 多换行
- 页眉页脚混进正文
- 特殊字体导致乱码

一句话记：
- `docx` 提取通常更干净
- `pdf` 提取通常更麻烦

## 三、如何提取 docx 文本

常用库：

```bash
pip install python-docx
```

注意：
- 安装时叫 `python-docx`
- 代码导入时写 `import docx`

### 1. 读取 Word 文档

```python
import docx

doc = docx.Document("demo.docx")
print(len(doc.paragraphs))
```

### 2. 读取第一段

```python
import docx

doc = docx.Document("demo.docx")
first_para = doc.paragraphs[0].text
print(first_para)
```

### 3. 读取全部段落

```python
import docx

doc = docx.Document("demo.docx")
full_text = []

for para in doc.paragraphs:
    full_text.append(para.text)

print("\n".join(full_text))
```

## 四、如何提取 pdf 文本

常见库可以用：

```bash
pip install PyPDF2==1.26.0
```

### 1. 打开 PDF

PDF 必须用二进制模式打开：

```python
import PyPDF2

pdf_file = open("demo.pdf", "rb")
reader = PyPDF2.PdfFileReader(pdf_file)
print(reader.numPages)
```

### 2. 读取第一页

```python
import PyPDF2

pdf_file = open("demo.pdf", "rb")
reader = PyPDF2.PdfFileReader(pdf_file)
page_one = reader.getPage(0)
text = page_one.extractText()
print(text)
```

注意：
- `getPage(0)` 才是第一页
- Python 从 0 开始计数

### 3. 读取全部页面

```python
import PyPDF2

pdf_file = open("demo.pdf", "rb")
reader = PyPDF2.PdfFileReader(pdf_file)

all_text = []

for page_num in range(reader.numPages):
    page = reader.getPage(page_num)
    all_text.append(page.extractText())

print("\n".join(all_text))
```

## 五、提取后的常见问题

### 1. 多余换行

尤其是 PDF，经常把一行结束的地方变成换行。

```python
clean_text = raw_text.replace("\n", " ")
```

### 2. 丢失空格

有时 PDF 会把两个词黏在一起。

### 3. 页眉页脚混入正文

提取后会看到页码、章节标题、页眉反复出现在文本中。

### 4. 乱码

有些 PDF 用了特殊字体，提取效果会很差。  
这时候不一定是你代码错了，而可能是 PDF 本身结构复杂。

### 5. 空段落

Word 中有时会有很多空段落，需要过滤。

```python
if para.text.strip():
    full_text.append(para.text)
```

## 六、适合课堂演示的例子

### 例子1：统计 Word 段落数

```python
import docx

doc = docx.Document("demo.docx")
print("段落总数：", len(doc.paragraphs))
```

### 例子2：读取 Word 第一段

```python
import docx

doc = docx.Document("demo.docx")
print(doc.paragraphs[0].text)
```

### 例子3：读取全部 Word 文本

```python
import docx

doc = docx.Document("demo.docx")
full_text = []

for para in doc.paragraphs:
    full_text.append(para.text)

print("\n".join(full_text))
```

### 例子4：过滤空段落

```python
import docx

doc = docx.Document("demo.docx")
full_text = []

for para in doc.paragraphs:
    if para.text.strip():
        full_text.append(para.text)

print("\n".join(full_text))
```

### 例子5：查看 PDF 页数

```python
import PyPDF2

pdf_file = open("demo.pdf", "rb")
reader = PyPDF2.PdfFileReader(pdf_file)
print("PDF总页数：", reader.numPages)
```

### 例子6：提取 PDF 第一页

```python
import PyPDF2

pdf_file = open("demo.pdf", "rb")
reader = PyPDF2.PdfFileReader(pdf_file)
text = reader.getPage(0).extractText()
print(text)
```

### 例子7：提取全部页面

```python
import PyPDF2

pdf_file = open("demo.pdf", "rb")
reader = PyPDF2.PdfFileReader(pdf_file)

pages = []
for i in range(reader.numPages):
    pages.append(reader.getPage(i).extractText())

print("\n".join(pages))
```

### 例子8：清除 PDF 多余换行

```python
import PyPDF2

pdf_file = open("demo.pdf", "rb")
reader = PyPDF2.PdfFileReader(pdf_file)
raw_text = reader.getPage(0).extractText()
clean_text = raw_text.replace("\n", " ")

print(clean_text)
```

## 七、学生练习

### 练习1：统计一个 Word 文档有多少段

### 练习2：找出 Word 里最长的一段

### 练习3：过滤空段落并保存成 txt

### 练习4：提取 PDF 的第一页文本

### 练习5：提取 PDF 第 5 页到最后一页

### 练习6：把 PDF 提取结果中的换行替换为空格

## 八、常见错误

- 安装错包：安装成 `docx` 而不是 `python-docx`
- 打开 PDF 时忘记用 `"rb"`
- 以为 `getPage(1)` 是第一页
- 过度信任 PDF 提取结果，实际上 PDF 本身可能很脏
- 不过滤空段落

## 九、这一页学完后你应会什么

- 知道为什么 Word 和 PDF 常常要转成纯文本
- 知道 `docx` 和 `pdf` 提取上的差异
- 会提取 Word 文本
- 会提取 PDF 文本
- 知道提取后的文本还需要进一步清洗

