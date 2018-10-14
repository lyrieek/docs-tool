import parser from './parser'

export default class DocsTool {

	constructor(param) {
		this.content = '';
		if (param instanceof HTMLElement) {
			this.elem = param;
		} else {
			this.content = param || '';
		}
		this.result = '';
		this.analysisEnd = false;
	}

	wrap(content, labelName) {
		return `<${labelName}>${content}</${labelName}>`;
	}

	//解析
	analysis() {
		if (this.analysisEnd) {
			return;
		}
		let specialItem = null; //special function
		this.result = '';
		const $parser = this.splitParser();
		this.content.split('\n').map((text) => {
			let notAnalysis = true;
			for (let i in $parser) {
				const item = $parser[i];
				if (specialItem) {
					if (specialItem.special(text)) {
						return (this.result += specialItem.method(specialItem.content))
							&& (specialItem = null);
					}
					return specialItem.content += text + '\n';
				}
				if (!(item.matchResult = text.match(item.match))) {
					continue;
				}
				if (item.special) {
					item.content = '';
					return specialItem = item;
				}
				notAnalysis = false;
				text = item.method(text);
			}
			this.result += notAnalysis ? `<p>${text}</p>` : text;
			// notAnalysis && (this.result += `<p>${text}</p>`);
		});
		this.analysisEnd = true;
	}

	//拆分解析式
	splitParser() {
		const parserList = [];
		for (let item in parser) {
			let parserItem = {
				//param
				matchResult: item.matchResult, //匹配结果
				//output
				match: item, //表达式
				method: parser[item], //解析方法
				special: null, //需要特别处理的函数
				mode: 'standard' //[!不可配置,会被覆盖]{standard:一个函数完事,simple:套标签,full:重写parserItem}
			}
			if (typeof parser[item] === 'object') {
				parserItem = parser[item];
				parserItem.match = parserItem.match || item;
				parserItem.mode = 'full';
			} else if (typeof parser[item] === 'string') {
				parserItem.method = (text) => this.wrap(text.substring(parserItem.matchResult[0].length), parser[item]);
				parserItem.mode = 'simple';
			}
			parserList.push(parserItem)
		}
		return parserList;
	}

	//将内容渲染到元素上
	preview(elem) {
		if (elem) {
			this.elem = elem;
		}
		elem = this.elem;
		elem.innerHTML = "Loading...";
		this.analysis();
		elem.innerHTML = this.result;
	}

	//刷新内容
	refresh(newContent) {
		this.content = newContent;
		this.analysisEnd = false;
		this.preview();
	}

}
