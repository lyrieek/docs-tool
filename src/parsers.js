import parser_basic from './parsers/parser-basic'

class Parsers {

	constructor(size = 0) {
		this.parserArray = new Array(size)
		this.index = 0;
	}

	push(...items) {
		return this.parserArray.push(items)
	}

	put(index = 0, data) {
		return this.parserArray[index] = data
	}

	clear() {
		return this.parserArray = new Array(0)
	}

	print() {
		return console.log('"' + this.parserArray.join('", "') + '"')
	}

	next() {
		return this.parserArray[this.index++]
	}

	has() {
		return !!this.parserArray[this.index];
	}

}

class MarkDownParsers {

	constructor() {
		const p = this.items = new Parsers();
		p.push(1, 2);
		p.print();
		p.clear();
		p.push(parser_basic);
	}

	next() {
		return this.items.next()
	}

	has() {
		return !!this.items.has()
	}

}

export {
	Parsers,
	MarkDownParsers
}
