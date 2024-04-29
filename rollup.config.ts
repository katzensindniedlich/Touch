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
    let content
    const { name, fileStem=name } = Package as JsonObject

    if (typeof fileStem === 'string') {
        content = sanitize(fileStem)
    }

    return content || 'Plugin'
})()


const metaTags = [
    'name', 'version', 'description', 'author',
    'invite', 'authorId', 'authorLink', 'website', 'source', 'donate', 'patreon'
]


/**
 * The metadata comment of the addon,
 * generated out of package.json properties.
 *
 * @see https://docs.betterdiscord.app/developers/addons#meta
 */
const banner = (() => {
    let body = '/**'
    const meta = Package as JsonObject

    if (typeof meta.name !== 'string' || !meta.name.length) {
        meta.name = stem
    }

    for (const [key, value] of Object.entries(meta)) {
        if (
            metaTags.includes(key)
            && typeof value === 'string'
            && value.length
        ) {
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