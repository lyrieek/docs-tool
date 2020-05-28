# docs-tool
Document tools

将具有[拓展性](#我们拓展了哪些内容)的Markdown转换成HTML,结合了一些标记语言与排版语言

- 启动环境 (监听文件并编译)
```
npm run dev
```
访问 http://127.0.0.1:393/demo.html

## 拓展了哪些内容？
1. 引入了KaTex的一些规则 (未实现)
    - delimiters 部分
    - operators 部分
    - arrows 部分
    - layout 部分
    - symbols and punctuation 部分
2. 引入了LaTex的一些规则 (均未实现)
    - \newline换行
    - \newpage换页 | \clearpage 换页(page-break-after|before)
    - \Huge 一号字
    - \huge 二号字
    - \LARGE 三号字
    - \Large 四号字
    - \large 小四号字
    - \normalsize 五号字
    - \small 小五号字
    - \footnotesize 六号字
    - \scriptsize 小六号字
    - \tiny 七号字
    - \begin \hline & \\ 表格
3. 引入了postscript的画图功能 (未实现)
    - newpath 0 0 moveto 50 50 lineto closepath 基础画图命令
    - setrgbcolor fill 颜色内容
4. 支持svg
