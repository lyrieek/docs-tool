const liveServer = require('live-server')
const rollup = require('rollup')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')
const replace = require('rollup-plugin-replace')
const chokidar = require('chokidar')

const opts = {
	name: 'DocsTool',
	input: 'src/index.js',
	output: 'docs-tool.js',
	version: '1.1.0'
}

const build = () => {
	rollup.rollup({
			input: opts.input,
			plugins: (opts.plugins || []).concat([
				buble(),
				commonjs(),
				nodeResolve(),
				replace({
					__VERSION__: opts.version,
					'process.env.SSR': false
				})
			])
		})
		.then(function(bundle) {
			var dest = 'lib/' + (opts.output || opts.input)

			bundle.write({
				format: 'iife',
				file: dest,
				name: opts.name,
				strict: false
			})
		})
		.catch(function(err) {
			console.error(err)
		});
}

build();

chokidar.watch([opts.input], {
	atomic: true,
	awaitWriteFinish: {
		stabilityThreshold: 1000,
		pollInterval: 100
	}
}).on('change', event => {
	console.log(event);
	build();
});

// liveServer.start({
// 	port: 393,
// 	watch: ['lib', 'docs', 'themes']
// });
