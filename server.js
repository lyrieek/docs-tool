const liveServer = require('live-server')
const rollup = require('rollup')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')
const replace = require('rollup-plugin-replace')

const opts = {
	input: 'src/index.js',
	output: 'docs-tool.js',
	version: '1.1.0'
}

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

		console.log(dest)
		bundle.write({
			format: 'iife',
			file: dest,
			strict: false
		})
	})
	.catch(function(err) {
		console.error(err)
	})

// liveServer.start({
// 	port: 393,
// 	watch: ['lib', 'docs', 'themes']
// });
