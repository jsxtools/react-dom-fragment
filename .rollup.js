import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const isBrowser = String(process.env.NODE_ENV).includes('browser');
const isMinified = String(process.env.NODE_ENV).includes('minified');

const name = 'ReactDOMFragment';
const input = 'src/react-dom-fragment.js';

const output = isBrowser
	? { file: `${name}${isMinified ? '.min' : ''}.js`, format: 'iife', name, sourcemap: !isMinified }
: [
	{ file: 'index.js', format: 'cjs', sourcemap: !isMinified },
	{ file: 'index.mjs', format: 'es', sourcemap: !isMinified }
];

const targets = isBrowser ? 'ie >= 9' : { node: 6 };

const plugins = [
	babel({
		presets: [ ['@babel/env', { targets }] ]
	})
].concat(
	isBrowser ? [
		nodeResolve({
			only: ['domdiff']
		})
	] : []
).concat(
	isMinified ? terser({ mangle: true }) : []
);

export default { input, output, plugins };
