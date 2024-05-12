import builtins from 'globals'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'


const BdApi = 'readonly'

const globals = {
    BdApi,

    ...builtins.node,
    ...builtins.es2021,
    ...builtins.browser
}


const js = [
    '**.js?(x)', '**.[mc]js'
]


export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,

    {
        files: js,
        ...tseslint.configs.disableTypeChecked
    },
    {
        languageOptions: {
            globals,
            parserOptions: { project: true }
        }
    }
)
