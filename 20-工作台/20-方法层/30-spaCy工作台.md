---
type: workbench
layer: method
output: 标注结果
---

# spaCy工作台

## 工作台定位
方法层。负责使用 `spaCy` 对文本做分词、词性标注、词形还原、命名实体识别和依存句法分析。

如果说前面的 `文本清洗工作台` 和 `规则抽取工作台` 解决的是：
- 文本先整理干净
- 用规则抓稳定信息

那么这一页解决的是：

如何让一个成熟的 NLP 工具，帮我们快速得到更丰富的语言学标注结果。

## 它属于哪个层级？
- 方法层

## 它服务哪个模板？
- [[../../40-模板/文本处理流程模板]]
- [[../../40-模板/文本分析报告模板]]

## 它对应什么输出动作？
- 输出 token 列表
- 输出词性标注结果
- 输出词形还原结果
- 输出命名实体识别结果
- 输出依存关系观察结果

## 一、spaCy 是什么？
`spaCy` 是 Python 里一个非常常用的自然语言处理工具库。

对初学者来说，可以把它理解成：

一个已经训练好很多基础语言能力的“文本分析流水线”。

你把一段文本交给它，它就能自动帮你完成很多动作：
- 切分单词
- 判断词性
- 找词语原型
- 找出人名、地名、机构名、日期等实体
- 分析句子里词和词之间的关系

## 二、为什么很多 NLP 初学者会用 spaCy？
### 1. 开箱即用
不需要自己从零实现分词器、词性标注器、实体识别器。

### 2. 一条流水线完成多个任务
你只要把文本送进去，就能同时拿到很多层结果。

### 3. 很适合教学和应用衔接
它不像纯理论工具那样停在概念层，也不像大型深度学习框架那样一上来就很重。

对这门课来说，spaCy 很适合放在中间位置：
- 前面接文本清洗和规则抽取
- 后面接信息抽取、文本分类、应用开发

## 三、如何安装 spaCy？
先安装库：

```bash
pip install spacy
```

安装好库后，还要下载英文模型：

```bash
python -m spacy download en_core_web_sm
```

这里的 `en_core_web_sm` 可以理解成：
- 一个英文语言模型
- 一个“会处理英文文本的大脑”

如果只安装了 `spacy`，但没有下载模型，后面加载时会报错。

## 四、如何加载模型？

```python
import spacy

nlp = spacy.load("en_core_web_sm")
```

这一行的意思是：
- 把英文模型加载到变量 `nlp` 里

后面你会反复看到：

```python
doc = nlp(text)
```

这表示：
- 把一段文本送进 spaCy 流水线
- 得到一个带标注结果的对象

## 五、四个最核心的对象：nlp、Doc、Token、Span
### 1. `nlp`
可以把 `nlp` 理解成一条“文本加工流水线”。

它负责：
- 接收原始文本
- 自动做分词、词性、实体等分析

### 2. `Doc`
`Doc` 是文本进入流水线之后得到的“加工结果总对象”。

可以把它理解成：
- 一整份被做过语言分析的文本

例如：

```python
doc = nlp("Apple is looking at buying a startup.")
```

这里 `doc` 就不是普通字符串了，而是带有很多分析信息的对象。

### 3. `Token`
`Token` 可以理解成文本里的一个基本单位。

通常是：
- 一个词
- 一个标点
- 一个数字

例如遍历：

```python
for token in doc:
    print(token.text)
```

这里每个 `token` 就是一个小单位。

### 4. `Span`
`Span` 是由连续多个 token 组成的一段片段。

比如：
- 一个短语
- 一个命名实体
- 一个句子片段

## 六、spaCy 最常见的几个功能
### 1. 分词
作用：
- 把句子切成 token

```python
import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Apple is buying a startup.")

for token in doc:
    print(token.text)
```

### 2. 词性标注
作用：
- 判断一个词是名词、动词、形容词等

```python
for token in doc:
    print(token.text, token.pos_)
```

常见词性：
- `NOUN`
- `VERB`
- `ADJ`
- `PROPN`

### 3. 词形还原
作用：
- 找到词的基础形态

例如：
- `buying` -> `buy`
- `running` -> `run`
- `mice` -> `mouse`

代码：

```python
for token in doc:
    print(token.text, token.lemma_)
```

### 4. 命名实体识别
作用：
- 找出文本中的人名、地名、组织名、日期、金钱等

代码：

```python
for ent in doc.ents:
    print(ent.text, ent.label_)
```

常见实体标签：
- `PERSON`
- `ORG`
- `GPE`
- `DATE`
- `MONEY`

### 5. 依存句法分析
作用：
- 分析词和词之间的关系
- 看谁修饰谁、谁是主语、谁是宾语

代码：

```python
for token in doc:
    print(token.text, token.dep_, token.head.text)
```

这部分对初学者来说不需要一下学太深，但至少要知道：
- 它可以帮助理解句子结构
- 后面做更复杂的信息抽取时会很有用

## 七、一个适合课堂的完整演示例子

```python
import spacy

nlp = spacy.load("en_core_web_sm")

text = "Apple is looking at buying a U.K. startup for $1 billion today."
doc = nlp(text)

print("=== Token / Lemma / POS ===")
for token in doc:
    print(token.text, token.lemma_, token.pos_)

print("\n=== Named Entities ===")
for ent in doc.ents:
    print(ent.text, ent.label_)
```

这一段代码会同时展示：
- token 原文
- lemma 词形
- pos 词性
- entities 命名实体

很适合课堂第一次演示 spaCy。

## 八、一步一步解释上面的代码
### 第一步：导入并加载模型

```python
import spacy
nlp = spacy.load("en_core_web_sm")
```

### 第二步：把文本送进流水线

```python
doc = nlp(text)
```

### 第三步：遍历 token

```python
for token in doc:
```

### 第四步：看每个 token 的不同属性
- `token.text`：词本身
- `token.lemma_`：词形原型
- `token.pos_`：词性

### 第五步：遍历实体

```python
for ent in doc.ents:
```

看：
- `ent.text`
- `ent.label_`

## 九、适合初学者的短小例子
### 例子1：只看 token

```python
import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Natural language processing is fun.")

for token in doc:
    print(token.text)
```

### 例子2：看词性

```python
for token in doc:
    print(token.text, token.pos_)
```

### 例子3：看词形还原

```python
doc = nlp("Students are reading books.")

for token in doc:
    print(token.text, token.lemma_)
```

### 例子4：看命名实体

```python
doc = nlp("Barack Obama visited Beijing in 2014.")

for ent in doc.ents:
    print(ent.text, ent.label_)
```

### 例子5：看依存关系

```python
doc = nlp("The teacher explains Python clearly.")

for token in doc:
    print(token.text, token.dep_, token.head.text)
```

## 十、适合学生的练习
### 练习1：分词
用 spaCy 把下面句子切成 token：

```python
"Python is useful for NLP."
```

### 练习2：词性标注
输出每个 token 的 `text` 和 `pos_`。

### 练习3：词形还原
观察下面句子中哪些词会被还原：

```python
"The students were running and reading."
```

### 练习4：命名实体识别
对下面句子做实体识别：

```python
"Microsoft opened a new office in Shanghai in 2025."
```

### 练习5：思考题
下面这些任务，spaCy 哪些能直接帮你做，哪些不能直接完成？
- 找人名
- 找日期
- 判断评论是不是正面
- 看一个词是动词还是名词

## 十一、初学者最常见错误
### 1. 只安装了 spaCy，没有下载模型
常见报错是：
- 找不到 `en_core_web_sm`

解决方法：

```bash
python -m spacy download en_core_web_sm
```

### 2. 把 `Token` 当成普通字符串
错误理解：
- 以为 `token` 就只是一个字符串

实际上：
- `token` 是一个对象
- 文字内容要用 `token.text`

### 3. 在 token 上找实体标签
命名实体通常是 span 级别，不是每个 token 单独处理出来的。

所以应该遍历：

```python
doc.ents
```

而不是只盯着单个 token。

### 4. 没先清洗文本就直接喂给 spaCy
如果文本里有大量乱码、HTML、空白噪声，spaCy 的效果会变差。

### 5. 以为 spaCy 能直接做所有 NLP 任务
spaCy 很强，但它不是“什么都自动完成”的魔法工具。

它更像是：
- 一个基础语言分析器
- 一个中间层工具

## 十二、spaCy 和前后工作台是什么关系？
### 和前面的关系
前面的 `文本清洗工作台` 负责：
- 去噪
- 统一格式

前面的 `规则抽取工作台` 负责：
- 用规则抓稳定模式

而 spaCy 负责：
- 给文本加上更丰富的语言学标注

所以顺序通常是：
1. 先清洗文本
2. 再交给 spaCy 做分析
3. 再根据结果做抽取、统计、分类

### 和后面的关系
spaCy 的结果能支持：
- 信息抽取
- 文本分类特征理解
- 句法观察
- 更复杂的规则匹配

它是课程里一个很重要的“桥梁工具”。

## 十三、这页学完后你应该会什么？
- 知道 spaCy 是什么
- 会安装 spaCy 和英文模型
- 理解 `nlp`、`Doc`、`Token`、`Span`
- 会运行最基础的分词、词性标注、词形还原、实体识别代码
- 知道 spaCy 和前后工作台之间的关系

## 关联工作台
- [[10-文本清洗工作台|文本清洗工作台]]
- [[20-规则抽取工作台|规则抽取工作台]]
- [[../30-应用层/10-文本分类工作台|文本分类工作台]]
- [[../30-应用层/30-主题分析与摘要工作台|主题分析与摘要工作台]]
