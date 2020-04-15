import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import MagicString from 'magic-string'

const isBrowser = String(process.env.NODE_ENV).includes('browser')
const isMinified = String(process.env.NODE_ENV).includes('minified')

const name = 'ReactDOMFragment'
const input = 'src/index.js'

const output = isBrowser
	? {
			file: `${name}${isMinified ? '.min' : ''}.js`,
			format: 'iife',
			name,
			globals: {
				'react': 'React'
			},
			interop: false,
			sourcemap: !isMinified,
			strict: false
	}
: [
	{
		file: 'index.js',
		format: 'cjs',
		sourcemap: !isMinified,
		strict: false
	},
	{
		file: 'index.mjs',
		format: 'esm',
		sourcemap: !isMinified,
		strict: false
	}
]

const targets = isBrowser ? 'ie >= 11' : { node: 10 }

const plugins = [
	babel({
		presets: [
			['@babel/env', {
				useBuiltIns: false,
				loose: true,
				targets
			}]
		]
	}),
	{
		renderChunk(code, chunk, options) {
			const isSourceMapping = options.sourceMap !== false && options.sourcemap !== false
			const isIIFE = options.format === 'iife'

			if (isIIFE) {
				const magicString = new MagicString(code)

				magicString.remove(4948)
				magicString.remove(0, 154)

				const result = {code: magicString.toString() }

				if (isSourceMapping) {
					result.map = magicString.generateMap({ hires: true })
				}

				return result
			}

			return null
		}
	}
].concat(isMinified ? terser({ mangle: true }) : [])

export default {
	input,
	output,
	plugins,
	external: ['react'],
	onwarn(warning, warn) {
		if (warning.code !== 'UNRESOLVED_IMPORT') warn(warning)
	}
}
