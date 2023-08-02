import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { createRequire } from 'module'
import dts from 'rollup-plugin-dts'

const require = createRequire(import.meta.url)
const packageJson = require('./package.json')

const external = ['react', 'react-router-dom', 'electron', 'react-dom']

/** @type {import('rollup').RollupOptions} */
export default [
  {
    external,
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      esbuild({ tsconfig: './tsconfig.json', minify: true }),
    ],
  },
  {
    external,
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts({ respectExternal: true })],
  },
]
