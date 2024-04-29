import builtins from 'globals'

import eslint from '@eslint/js'
import { config, configs as tsconfigs } from 'typescript-eslint'


const BdApi = 'readonly'

const globals = {
    BdApi,

    ...builtins.node,
    ...builtins.es2021,
    ...builtins.browser
}


const js = [
    '**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'
]


export default config(
    eslint.configs.recommended,
    ...tsconfigs.strictTypeChecked,
    
    {
        files: js,
        ...tsconfigs.disableTypeChecked
    },
    {
        languageOptions: {
            globals,
            parserOptions: { project: true }
        }
    }
)