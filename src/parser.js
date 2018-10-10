const wrap = (content, labelName) => `<${labelName}>${content}</${labelName}>`;

export default {
	"^\\#(?!#)": (e) => {
		return wrap(e, 'h1');
	},
	"^\\#{2}(?!#)": (e) => {
		return wrap(e, 'h2');
	},
	"^\\#{3}(?!#)": (e) => {
		return wrap(e, 'h3');
	},
	"^\\#{4}(?!#)": (e) => {
		return wrap(e, 'h4');
	},
	"^\\#{5}(?!#)": (e) => {
		return wrap(e, 'h5');
	}
}
