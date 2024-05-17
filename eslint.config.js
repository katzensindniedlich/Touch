import builtins from 'globals'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'


const BdApi = 'readonly'

const globals = /** @type const */ ({
    BdApi,

    ...builtins.node,
    ...builtins.es2021,
    ...builtins.browser
})


export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,

    {
        languageOptions: {
            globals,
            parserOptions: { project: true }
        }
    }
)
