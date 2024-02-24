import Terser from '@rollup/plugin-terser'
import Typescript from '@rollup/plugin-typescript'
import sanitize from 'sanitize-filename'

import Package from './package.json' with { type: 'json' }

import type { RollupOptions } from 'rollup'
import type { JsonObject } from './src/types/Json'


/**
 * The stem of the output plugin file,  
 * generated out of the sanitized pluginStem or name propety of `package.json`.
 */
const stem = (() => {
    const { name, pluginStem=name } = Package as JsonObject

    if (typeof pluginStem === 'string' && pluginStem) {
        return sanitize(pluginStem)
    }

    return 'Plugin'
})()


const metaTags = [
    'name', 'version', 'description', 'author',
    'invite', 'authorId', 'authorLink', 'website', 'source', 'donate', 'patreon'
]


/**
 * BetterDiscords addon metadata comment,
 * generated out of `package.json` properties.
 * 
 * @see https://docs.betterdiscord.app/developers/addons#meta
 */
const banner = (() => {
    let body = '/**'
    const meta: JsonObject = { name: 'Plugin', ...Package as JsonObject }

    for (const [key, value] of Object.entries(meta)) {
        if (metaTags.includes(key)) {
            body += `\n * @${key} ${value}`
        }
    }

    return body.replaceAll('*/', '') + '\n */'
})()


export default {
    input: 'src/plugin.ts',
    output: {
        strict: false,
        file: `dist/${stem}.plugin.js`,
        format: 'cjs',
        exports: 'default',
        generatedCode: 'es2015'
    },
    plugins: [
        Typescript(), 
        Terser({
            ecma: 2020,
            mangle: false,
            compress: false,
            format: { beautify: true, preamble: banner }
        })
    ]
} as RollupOptions
