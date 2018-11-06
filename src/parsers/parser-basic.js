const replaceMatch = function(fn) {
	return function(text) {
		return '<p>' + text.replace(new RegExp(this.match, 'g'), fn) + '</p>';
	}
}
const rmWrap = function(text, len = 1) {
	return text.substring(len, text.length - len);
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
	"`((?!`)[\\S|\\s])+`": replaceMatch((item) => `<b>${rmWrap(item)}</b>`),
	"(?<!\\\\|\\*)\\*((?!\\*)[\\S|\\s])+\\*": replaceMatch((item) => `<i>${rmWrap(item)}</i>`),
	"(?<!\\\\|\\*)\\*{2}((?!\\*)[\\S|\\s])+(\\*){2}": replaceMatch((item) => `<b>${rmWrap(item,2)}</b>`),
	"(?<!\\\\|\\*)\\*{3}((?!\\*)[\\S|\\s])+(\\*){3}": replaceMatch((item) => `<b><i>${rmWrap(item,3)}</i></b>`),
	"\\\\(\\*|\\[)": replaceMatch((item) => `<span>${(item.substring(1))}</span>`),
	"^// ": (text) => `<!-- [${text}] -->`,
	"\\[[a-zA-Z0-9-_]+\\]": replaceMatch((item) => `<a href="#">${item}</a>`),
	"^> ": (text) => `<p style="text-indent:2em;background:silver;padding:5px 2px;">${text}</p>`,
	"--": () => `<hr />`
}
