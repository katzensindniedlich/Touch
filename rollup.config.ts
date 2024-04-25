import Terser from '@rollup/plugin-terser'
import Typescript from '@rollup/plugin-typescript'
import sanitize from 'sanitize-filename'

import Package from './package.json' with { type: 'json' }

import type { JsonObject } from './src/types/Json'
import type { RollupOptions } from 'rollup'


/**
 * The stem of the output plugin file,  
 * generated out of the sanitized fileStem or name propety of package.json.
 */
const stem = (() => {
    const { name, fileStem=name } = Package as JsonObject

    if (typeof fileStem === 'string') {
        return sanitize(fileStem) || 'Plugin'
    }

    return 'Plugin'
})()


const metaTags = [
    'name', 'version', 'description', 'author',
    'invite', 'authorId', 'authorLink', 'website', 'source', 'donate', 'patreon'
]


/**
 * BetterDiscords addon metadata comment,
 * generated out of package.json properties.
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


const config: RollupOptions = {
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
}

export default config