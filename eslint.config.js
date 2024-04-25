import builtins from 'globals'
import parser from '@typescript-eslint/parser'
import Javascript from '@eslint/js'
import Typescript from '@typescript-eslint/eslint-plugin'


const tsFiles = [
    '**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'
]

const files = [
    ...tsFiles,
    '**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'
]

const globals = {
    ...builtins.node,
    ...builtins.es2021,
    ...builtins.browser,

    BdApi: 'readonly'
}


export default [
    {
        files,
        rules: {
            ...Javascript.configs.recommended.rules,

            'array-callback-return': 'warn',
            'no-await-in-loop': 'warn',
            'no-constant-binary-expression': 'warn',
            'no-new-native-nonconstructor': 'error',
            'no-promise-executor-return': 'warn',
            'no-self-compare': 'warn',
            'no-template-curly-in-string': 'warn',
            'no-unmodified-loop-condition': 'error',
            'no-unreachable-loop': 'warn',
            'require-atomic-updates': 'warn',
            'accessor-pairs': 'error',
            'camelcase': 'warn',
            'capitalized-comments': 'warn',
            'default-case-last': 'warn',
            'default-param-last': 'warn',
            'dot-notation': 'warn',
            'grouped-accessor-pairs': 'warn',
            'guard-for-in': 'warn',
            'logical-assignment-operators': 'warn',
            'new-cap': ['warn', { 'capIsNew': false }],
            'no-alert': 'warn',
            'no-caller': 'warn',
            'no-else-return': 'warn',
            'no-eq-null': 'warn',
            'no-extend-native': 'warn',
            'no-extra-bind': 'warn',
            'no-extra-label': 'warn',
            'no-implicit-coercion': 'warn',
            'no-implicit-globals': 'warn',
            'no-implied-eval': 'warn',
            'no-invalid-this': 'warn',
            'no-label-var': 'warn',
            'no-lone-blocks': 'warn',
            'no-lonely-if': 'warn',
            'no-loop-func': 'warn',
            'no-nested-ternary': 'warn',
            'no-new': 'warn',
            'no-new-func': 'warn',
            'no-plusplus': 'warn',
            'no-proto': 'warn',
            'no-sequences': 'warn',
            'no-shadow': 'warn',
            'no-throw-literal': 'warn',
            'no-undef-init': 'warn',
            'no-undefined': 'warn',
            'no-unneeded-ternary': 'warn',
            'no-unused-expressions': 'warn',
            'no-useless-call': 'warn',
            'no-useless-computed-key': 'warn',
            'no-useless-concat': 'warn',
            'no-useless-constructor': 'warn',
            'no-useless-rename': 'warn',
            'no-useless-return': 'warn',
            'no-var': 'warn',
            'object-shorthand': 'warn',
            'operator-assignment': 'warn',
            'prefer-exponentiation-operator': 'warn',
            'prefer-named-capture-group': 'warn',
            'prefer-object-has-own': 'warn',
            'prefer-object-spread': 'warn',
            'prefer-rest-params': 'warn',
            'prefer-spread': 'warn',
        },
        languageOptions: { globals }
    },
    {
        files: tsFiles,
        plugins: {
            '@typescript-eslint': Typescript
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/adjacent-overload-signatures': 'warn',
            '@typescript-eslint/array-type': 'warn',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/ban-tslint-comment': 'warn',
            '@typescript-eslint/ban-types': 'warn',
            '@typescript-eslint/consistent-type-assertions': 'warn',
            '@typescript-eslint/consistent-type-exports': 'warn',
            '@typescript-eslint/consistent-type-imports': 'warn',
            'default-param-last': 'off',
            '@typescript-eslint/default-param-last': 'warn',
            'dot-notation': 'off',
            '@typescript-eslint/dot-notation': 'warn',
            '@typescript-eslint/no-array-delete': 'warn',
            '@typescript-eslint/no-confusing-void-expression': ['warn', { 'ignoreArrowShorthand': true }],
            '@typescript-eslint/no-dynamic-delete': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-for-in-array': 'warn',
            'no-implied-eval': 'off',
            '@typescript-eslint/no-implied-eval': 'error',
            '@typescript-eslint/no-import-type-side-effects': 'error',
            'no-loop-func': 'off',
            '@typescript-eslint/no-loop-func': 'error',
            'no-loss-of-precision': 'off',
            '@typescript-eslint/no-loss-of-precision': 'error',
            '@typescript-eslint/no-meaningless-void-operator': 'warn',
            '@typescript-eslint/no-misused-new': 'warn',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-mixed-enums': 'warn',
            '@typescript-eslint/no-namespace': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': 'warn',
            '@typescript-eslint/no-this-alias': 'warn',
            'no-throw-literal': 'off',
            '@typescript-eslint/no-throw-literal': 'error',
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
            '@typescript-eslint/no-unnecessary-condition': 'warn',
            '@typescript-eslint/no-unnecessary-qualifier': 'warn',
            '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
            '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
            '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-declaration-merging': 'error',
            '@typescript-eslint/no-unsafe-enum-comparison': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-unsafe-unary-minus': 'warn',
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': 'warn',
            '@typescript-eslint/prefer-for-of': 'warn',
            '@typescript-eslint/prefer-includes': 'warn',
            '@typescript-eslint/prefer-optional-chain': 'warn',
            '@typescript-eslint/prefer-readonly': 'warn',
            '@typescript-eslint/prefer-return-this-type': 'warn',
            '@typescript-eslint/promise-function-async': 'warn',
            '@typescript-eslint/restrict-plus-operands': 'error',
            '@typescript-eslint/unbound-method': 'warn',
        },
        languageOptions: {
            parser,
            globals,
            parserOptions: {
                project: 'tsconfig.json',
                ecmaVersion: 'latest'
            }
        }
    }
]