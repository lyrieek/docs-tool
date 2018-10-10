import parser from './parser'

export default class DocsTool {

	constructor(content) {
		this.content = content || '';
		this.result = '';
		this.analysisEnd = false;
	}

	analysis() {
		if (this.analysisEnd) {
			return;
		}
		this.result = '';
		this.content.split('\n').map((e) => {
			for(let parserItem in parser){
				if (e.match(parserItem)) {
					return this.result += parser[parserItem](e);
				}
			}
			this.result += '<p>';
			this.result += e;
			this.result += '</p>';
		});
		this.analysisEnd = true;
	}

	preview(elem) {
		elem.innerHTML = "Loading...";
		this.analysis();
		elem.innerHTML = this.result;
	}

}
