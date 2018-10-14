var DocsTool = (function () {
var replaceMatch = function(fn) {
	return function(text) {
		return text.replace(new RegExp(this.match), fn);
	}
};
var rmWrap = function(text) {
	return text.substring(1, text.length - 1);
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
	"`((?!`)[\\S|\\s])+`": function(text) {
		return text.replace(new RegExp(this.match), function (item) { return ("<b>" + (rmWrap(item)) + "</b>"); });
	},
	"\\*((?!\\*)[\\S|\\s])+\\*": function(text) {
		return text.replace(new RegExp(this.match), function (item) { return ("<i>" + (rmWrap(item)) + "</i>"); });
	},
	"^// ": function (text) { return '<!-- [' + text + '] -->'; },
	"\\[[a-zA-Z0-9-_]+\\]": replaceMatch(function (item) { return ("<a href=\"#\">" + item + "</a>"); }),
	// function(text) {
	// 	return text.replace(new RegExp(this.match), (item) => '<a href="#">' + item + '</a>');
	// },
	"^> ": function (text) { return '<p style="text-indent:2em;background:silver;padding:5px 2px;">' + text.substring(2) + '</p>'; },
	"foo": function (text) { return ("<h3 style='color:red;'>" + text + "</h3>"); }
}

var DocsTool = function DocsTool(content) {
	this.content = content || '';
	this.result = '';
	this.analysisEnd = false;
};

DocsTool.prototype.wrap = function wrap (content, labelName) {
	return ("<" + labelName + ">" + content + "</" + labelName + ">");
};

DocsTool.prototype.analysis = function analysis () {
		var this$1 = this;

	if (this.analysisEnd) {
		return;
	}
	var specialItem = null; //special function
	this.result = '';
	var $parser = this.splitParser();
	this.content.split('\n').map(function (text) {
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
			return this$1.result += item.method(text);
		}
		this$1.result += "<p>" + text + "</p>";
	});
	this.analysisEnd = true;
};

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

DocsTool.prototype.preview = function preview (elem) {
	elem.innerHTML = "Loading...";
	this.analysis();
	elem.innerHTML = this.result;
};

return DocsTool;

}());
