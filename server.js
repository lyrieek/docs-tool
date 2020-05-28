
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
	srcPath: 'src',
	output: 'docs-tool.min.js',
	version: '1.1.0'
}

const build = () => rollup.rollup({
	input: opts.input,
	plugins: (opts.plugins || []).concat([
		buble(),
		commonjs(),
		nodeResolve(),
		uglify(),
		replace({
			__VERSION__: opts.version,
			'process.env.SSR': false
		})
	])
}).then(function(bundle) {
	var dest = 'lib/' + (opts.output || opts.input)
	bundle.write({
		format: 'iife',
		file: dest,
		name: opts.name,
		strict: false
	});
	console.info(`Build completion in ${new Date().toLocaleString()}!\n`);
}).catch(function(err) {
	console.error(err)
});

build();

chokidar.watch([opts.srcPath], {
	atomic: true,
	awaitWriteFinish: {
		stabilityThreshold: 1000,
		pollInterval: 100
	}
}).on('change', event => {
	console.log("Change: " + event);
	build();
});

liveServer.start({
	port: 393,
	file: 'demo.html',
	open: false
});