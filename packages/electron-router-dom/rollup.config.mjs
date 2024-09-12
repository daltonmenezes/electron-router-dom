import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import fastTypescript from 'rollup-plugin-fast-typescript'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import module from 'node:module'
import path from 'node:path'

const require = module.createRequire(import.meta.url)
const packageJson = require('./package.json')

const external = [
  'react',
  'electron',
  'react-router',
  'react-router-dom',
  'react/jsx-runtime',
]

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
      tsConfigPaths(),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      fastTypescript('swc', path.resolve('tsconfig.json')),
    ],
  },

  {
    external,
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts({ respectExternal: true })],
  },
]
