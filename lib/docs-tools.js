(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global['docs-tools'] = factory());
}(this, function () { 'use strict';

	var replaceMatch = function(fn) {
		return function(text) {
			return '<p>' + text.replace(new RegExp(this.match, 'g'), fn) + '</p>';
		}
	};
	var rmWrap = function(text, len) {
		if ( len === void 0 ) len = 1;

		return text.substring(len, text.length - len);
	};

	var parser = {
		"^\\# ": 'h1',
		"^\\#{2} ": 'h2',
		"^\\#{3} ": 'h3',
		"^\\#{4} ": 'h4',
		"^\\#{5} ": 'h5',
		"^``` ": {
			special: function (text) { return text === '```'; },
			method: function (text) { return ("<div style=\"border:1px solid black;margin: 2px;background:#eee;\">\n\t\t\t<code style=\"white-space: pre;\">" + text + "</code>\n\t\t</div>"); }
		},
		"`((?!`)[\\S|\\s])+`": replaceMatch(function (item) { return ("<b>" + (rmWrap(item)) + "</b>"); }),
		"(?<!\\\\|\\*)\\*((?!\\*)[\\S|\\s])+\\*": replaceMatch(function (item) { return ("<i>" + (rmWrap(item)) + "</i>"); }),
		"(?<!\\\\|\\*)\\*{2}((?!\\*)[\\S|\\s])+(\\*){2}": replaceMatch(function (item) { return ("<b>" + (rmWrap(item,2)) + "</b>"); }),
		"(?<!\\\\|\\*)\\*{3}((?!\\*)[\\S|\\s])+(\\*){3}": replaceMatch(function (item) { return ("<b><i>" + (rmWrap(item,3)) + "</i></b>"); }),
		"\\\\(\\*|\\[)": replaceMatch(function (item) { return ("<span>" + ((item.substring(1))) + "</span>"); }),
		"^// ": function (text) { return ("<!-- [" + text + "] -->"); },
		"\\[[a-zA-Z0-9-_]+\\]": replaceMatch(function (item) { return ("<a href=\"#\">" + item + "</a>"); }),
		"^> ": function (text) { return ("<p style=\"text-indent:2em;background:silver;padding:5px 2px;\">" + text + "</p>"); },
		"--": function () { return "<hr />"; }
	};

	var DocsTool = function DocsTool(param) {
		this.content = '';
		if (param instanceof HTMLElement) {
			this.elem = param;
		} else {
			this.content = param || '';
		}
		this.result = '';
		this.analysisEnd = false;
	};

	DocsTool.prototype.wrap = function wrap (content, labelName) {
		return ("<" + labelName + ">" + content + "</" + labelName + ">");
	};

	//解析
	DocsTool.prototype.analysis = function analysis () {
			var this$1 = this;

		if (this.analysisEnd) {
			return;
		}
		var specialItem = null; //special function
		this.result = '';
		var $parser = this.splitParser();
		this.content.split('\n').map(function (text) {
			var notAnalysis = true;
			for (var i in $parser) {
				var item = $parser[i];
				if (specialItem) {
					if (specialItem.special(text)) {
						return (this$1.result += specialItem.method(specialItem.content))
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
			this$1.result += notAnalysis ? ("<p>" + text + "</p>") : text;
			// notAnalysis && (this.result += `<p>${text}</p>`);
		});
		this.analysisEnd = true;
	};

	//拆分解析式
	DocsTool.prototype.splitParser = function splitParser () {
			var this$1 = this;

		var parserList = [];
		var loop = function ( item ) {
			var parserItem = {
				//param
				matchResult: item.matchResult, //匹配结果
				//output
				match: item, //表达式
				method: parser[item], //解析方法
				special: null, //需要特别处理的函数
				mode: 'standard' //[!不可配置,会被覆盖]{standard:一个函数完事,simple:套标签,full:重写parserItem}
			};
			if (typeof parser[item] === 'object') {
				parserItem = parser[item];
				parserItem.match = parserItem.match || item;
				parserItem.mode = 'full';
			} else if (typeof parser[item] === 'string') {
				parserItem.method = function (text) { return this$1.wrap(text.substring(parserItem.matchResult[0].length), parser[item]); };
				parserItem.mode = 'simple';
			}
			parserList.push(parserItem);
		};

			for (var item in parser) loop( item );
		return parserList;
	};

	//将内容渲染到元素上
	DocsTool.prototype.preview = function preview (elem) {
		if (elem) {
			this.elem = elem;
		}
		elem = this.elem;
		elem.innerHTML = "Loading...";
		this.analysis();
		elem.innerHTML = this.result;
	};

	//刷新内容
	DocsTool.prototype.refresh = function refresh (newContent) {
		this.content = newContent;
		this.analysisEnd = false;
		this.preview();
	};

	return DocsTool;

}));
