const replaceMatch = function(fn) {
	return function(text) {
		return text.replace(new RegExp(this.match), fn);
	}
}
const rmWrap = function(text) {
	return text.substring(1, text.length - 1);
}

export default {
	"^\\# ": 'h1',
	"^\\#{2} ": 'h2',
	"^\\#{3} ": 'h3',
	"^\\#{4} ": 'h4',
	"^\\#{5} ": 'h5',
	"^``` ": {
		special: (text) => text === '```',
		method: (text) => `<div style="border:1px solid black;margin: 2px;background:#eee;">
			<code style="white-space: pre;">${text}</code>
		</div>`
	},
	"`((?!`)[\\S|\\s])+`": function(text) {
		return text.replace(new RegExp(this.match), (item) => `<b>${rmWrap(item)}</b>`);
	},
	"\\*((?!\\*)[\\S|\\s])+\\*": function(text) {
		return text.replace(new RegExp(this.match), (item) => `<i>${rmWrap(item)}</i>`);
	},
	"^// ": (text) => '<!-- [' + text + '] -->',
	"\\[[a-zA-Z0-9-_]+\\]": replaceMatch((item) => `<a href="#">${item}</a>`),
	// function(text) {
	// 	return text.replace(new RegExp(this.match), (item) => '<a href="#">' + item + '</a>');
	// },
	"^> ": (text) =>
		'<p style="text-indent:2em;background:silver;padding:5px 2px;">' + text.substring(2) + '</p>',
	"foo": (text) => `<h3 style='color:red;'>${text}</h3>`
}
