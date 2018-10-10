var DocsTool = (function () {
var wrap = function (content, labelName) { return ("<" + labelName + ">" + content + "</" + labelName + ">"); };

var parser = {
	"^\\#(?!#)": function (e) {
		return wrap(e, 'h1');
	},
	"^\\#{2}(?!#)": function (e) {
		return wrap(e, 'h2');
	},
	"^\\#{3}(?!#)": function (e) {
		return wrap(e, 'h3');
	},
	"^\\#{4}(?!#)": function (e) {
		return wrap(e, 'h4');
	},
	"^\\#{5}(?!#)": function (e) {
		return wrap(e, 'h5');
	}
}

var DocsTool = function DocsTool(content) {
	this.content = content || '';
	this.result = '';
	this.analysisEnd = false;
};

DocsTool.prototype.analysis = function analysis () {
		var this$1 = this;

	if (this.analysisEnd) {
		return;
	}
	this.result = '';
	this.content.split('\n').map(function (e) {
		for(var parserItem in parser){
			if (e.match(parserItem)) {
				return this$1.result += parser[parserItem](e);
			}
		}
		this$1.result += '<p>';
		this$1.result += e;
		this$1.result += '</p>';
	});
	this.analysisEnd = true;
};

DocsTool.prototype.preview = function preview (elem) {
	elem.innerHTML = "Loading...";
	this.analysis();
	elem.innerHTML = this.result;
};

return DocsTool;

}());
