import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [{
	input: 'src/index.js',
	output: {
		name: pkg.name,
		file: 'lib/' + pkg.name + '.js',
		format: 'umd'
	},
	plugins: [
		resolve(), commonjs(), buble()
	]
}, {
	input: 'src/index.js',
	output: {
		name: pkg.name,
		file: 'lib/' + pkg.name + '.min.js',
		format: 'umd'
	},
	plugins: [
		resolve(), commonjs(), buble(), uglify()
	]
}];
