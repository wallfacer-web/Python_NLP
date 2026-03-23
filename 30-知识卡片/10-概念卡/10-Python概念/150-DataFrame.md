---
type: concept-card
domain: python
serves: Pandas文本数据处理工作台
output_action: 处理表格文本
---

# DataFrame

## 一句话定义
DataFrame 是 Pandas 中带行列标签的表格数据结构。

## 通俗理解
如果列表像一列收纳盒，那么 DataFrame 更像一个 Excel 表。

它特别适合处理：
- 一列是文本
- 一列是标签
- 一列是时间
- 一列是作者

这种“表格式文本数据”。

## 最小例子

```python
import pandas as pd

df = pd.DataFrame({
    "text": ["I love Python", "This class is hard"],
    "label": ["positive", "negative"]
})

print(df.head())
```

## 常见误区
- 以为 NLP 里的文本都只能存在 txt 文件里
- 分不清 DataFrame 和字典、列表
- 不知道一列文本其实就是后面分类任务的核心输入

## 服务工作台
- [[../../../20-工作台/10-基础层/40-Pandas文本数据处理工作台|Pandas文本数据处理工作台]]

## 对应输出动作
- 读取 csv 并对文本列、标签列做清洗和统计
