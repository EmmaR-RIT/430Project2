import css from '@eslint/css';
import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import node from 'eslint-plugin-n';
import path from 'node:path';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, includeIgnoreFile } from 'eslint/config';


const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');


export default defineConfig([
	includeIgnoreFile(gitignorePath),
	{ ignores: ['**/eslint.config.js', '**/*.test.js'] }, // add files here to ignore them
	js.configs.recommended,
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	{ files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
	{ files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'], rules: { 'css/relative-font-units': 'warn' } },
	{
		rules: {
			// Base ESLint rules
			'array-callback-return': ['error', { 'allowImplicit': true }],
			'no-await-in-loop': 'error',
			'no-constructor-return': 'error',
			'no-duplicate-imports': 'error',
			'no-inner-declarations': 'error',
			'no-promise-executor-return': 'error',
			'no-self-compare': 'error',
			'no-template-curly-in-string': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unreachable-loop': 'error',
			'no-use-before-define': 'error',
			'require-atomic-updates': 'error',
			'accessor-pairs': 'error',
			'arrow-body-style': ['error', 'as-needed', { 'requireReturnForObjectLiteral': true }],
			'block-scoped-var': 'error',
			'camelcase': ['warn', { 'ignoreImports': true }],
			'class-methods-use-this': 'error',
			'consistent-return': 'error',
			'curly': ['error', 'multi-line'],
			'default-case': 'error',
			'default-case-last': 'error',
			'dot-notation': 'error',
			'eqeqeq': 'error',
			'func-name-matching': 'error',
			'func-names': 'error',
			'grouped-accessor-pairs': 'error',
			'guard-for-in': 'error',
			'id-length': ['error', { 'min': 3, 'exceptions': ['id'] }],
			'max-classes-per-file': ['error', 1],
			'max-params': ['error', 5],
			'new-cap': 'error',
			'no-alert': 'error',
			'no-array-constructor': 'error',
			'no-caller': 'error',
			'no-console': 'error',
			'no-continue': 'error',
			'no-else-return': 'error',
			'no-empty-function': 'error',
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-label': 'error',
			'no-implicit-coercion': ['error', { 'allow': ['!!'] }],
			'no-implicit-globals': 'error',
			'no-implied-eval': 'error',
			'no-invalid-this': 'error',
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-lone-blocks': 'error',
			'no-lonely-if': 'error',
			'no-loop-func': 'error',
			'no-multi-assign': 'error',
			'no-nested-ternary': 'off',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-new-wrappers': 'error',
			'no-object-constructor': 'error',
			'no-octal-escape': 'error',
			'no-param-reassign': 'error',
			'no-proto': 'error',
			'no-return-assign': ['error', 'always'],
			'no-script-url': 'error',
			'no-sequences': ['error', { 'allowInParentheses': false }],
			'no-shadow': 'error',
			'no-throw-literal': 'error',
			'no-undef-init': 'error',
			'no-unneeded-ternary': 'error',
			'no-unused-expressions': 'error',
			'no-useless-call': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-constructor': 'error',
			'no-useless-rename': 'error',
			'no-useless-return': 'error',
			'no-var': 'error',
			'no-void': 'error',
			'no-warning-comments': 'error',
			'object-shorthand': 'warn', // not strictly enforcing shorthand, but want to encourage it
			'operator-assignment': ['warn', 'always'], // not strictly enforcing shorthand, but want to encourage it
			'prefer-arrow-callback': 'error',
			'prefer-const': 'error',
			'prefer-destructuring': ['warn', { 'array': false, 'object': true }], // not strictly enforcing shorthand, but want to encourage it
			'prefer-exponentiation-operator': 'error',
			'prefer-numeric-literals': 'error',
			'prefer-object-has-own': 'error',
			'prefer-object-spread': 'error',
			'prefer-promise-reject-errors': 'error',
			'prefer-regex-literals': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			'radix': 'error',
			'require-await': 'error',
			'require-unicode-regexp': 'error',
			'sort-imports': ['error', { 'allowSeparatedGroups': true }],
			'symbol-description': 'error',
			'yoda': 'error',


			// Restricted Names rules
			'id-denylist': ['error', ''], // Variable and function names
			'no-restricted-exports': ['error', { 'restrictedNamedExports': [''] }], // Exported var/func names
			'no-restricted-globals': ['error', ''], // Global variable names
			'no-restricted-imports': ['error', ''], // Import names (restricts what can be imported)
			'no-restricted-properties': ['error', { 'object': '', 'property': '' }], // Object property names
		}
	},
	{
		plugins: { 'n': node, },
		extends: ['n/recommended-module'],
		rules: {
			// ESLint Node rules
			'n/file-extension-in-import': ['error', 'always'],
			'n/handle-callback-err': ['error', '^.*(e|Err)$'],
			'n/no-callback-literal': 'error',
			'n/no-path-concat': 'error',
			'n/no-restricted-import': ['error', ['']], // Disallows imports
			'n/no-top-level-await': 'error',
			'n/prefer-global/buffer': 'error',
			'n/prefer-global/console': 'error',
			'n/prefer-global/crypto': 'error',
			'n/prefer-global/process': 'error',
			'n/prefer-global/text-decoder': 'error',
			'n/prefer-global/text-encoder': 'error',
			'n/prefer-global/timers': 'error',
			'n/prefer-global/url': 'error',
			'n/prefer-global/url-search-params': 'error',
			'n/prefer-import/assert-strict': 'error',
			'n/prefer-node-protocol': 'error',
			'n/prefer-promises/dns': 'error',
			'n/prefer-promises/fs': 'error'
		}
	},
	{
		plugins: { '@stylistic': stylistic },
		rules: {
			'@stylistic/array-bracket-newline': ['warn', { 'multiline': true }],
			'@stylistic/array-bracket-spacing': ['warn', 'never'],
			'@stylistic/array-element-newline': ['warn', { 'multiline': true }],
			'@stylistic/arrow-parens': ['warn', 'always'],
			'@stylistic/arrow-spacing': 'warn',
			'@stylistic/block-spacing': 'warn',
			'@stylistic/brace-style': ['warn', 'stroustrup', { 'allowSingleLine': true }],
			'@stylistic/comma-dangle': ['warn', 'always-multiline'],
			'@stylistic/comma-spacing': 'warn',
			'@stylistic/comma-style': ['warn', 'last'],
			'@stylistic/computed-property-spacing': ['warn', 'never'],
			'@stylistic/curly-newline': ['warn', { 'multiline': true, 'minElements': 2 }],
			'@stylistic/dot-location': ['warn', 'property'],
			'@stylistic/eol-last': ['warn', 'always'],
			'@stylistic/function-call-spacing': ['warn', 'never'],
			'@stylistic/function-paren-newline': ['warn', 'multiline'],
			'@stylistic/generator-star-spacing': ['warn', 'after'],
			'@stylistic/implicit-arrow-linebreak': 'warn',
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/key-spacing': 'warn',
			'@stylistic/keyword-spacing': 'warn',
			'@stylistic/linebreak-style': ['warn', 'windows'],
			'@stylistic/lines-between-class-members': ['warn', 'always'],
			'@stylistic/max-len': ['warn', {
				'code': 90,
				'tabWidth': 4,
				'ignoreComments': true,
				'ignoreUrls': true,
				'ignoreStrings': true,
				'ignoreTemplateLiterals': true,
				'ignoreRegExpLiterals': true
			}],
			'@stylistic/max-statements-per-line': ['warn', { 'max': 4 }],
			'@stylistic/member-delimiter-style': 'warn',
			'@stylistic/multiline-ternary': ['warn', 'never'],
			'@stylistic/new-parens': 'warn',
			'@stylistic/newline-per-chained-call': ['warn', { 'ignoreChainWithDepth': 3 }],
			'@stylistic/no-confusing-arrow': 'warn',
			'@stylistic/no-extra-parens': ['warn', 'all', { 'nestedBinaryExpressions': false }],
			'@stylistic/no-extra-semi': 'warn',
			'@stylistic/no-floating-decimal': 'warn',
			'@stylistic/no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
			'@stylistic/no-multi-spaces': 'warn',
			'@stylistic/no-multiple-empty-lines': ['warn', {
				'max': 2,
				'maxEOF': 1,
				'maxBOF': 0
			}],
			'@stylistic/no-trailing-spaces': 'warn',
			'@stylistic/no-whitespace-before-property': 'warn',
			'@stylistic/nonblock-statement-body-position': ['warn', 'beside'],
			'@stylistic/object-curly-newline': ['warn', { 'multiline': true }],
			'@stylistic/object-curly-spacing': ['warn', 'always'],
			'@stylistic/object-property-newline': ['warn', { 'allowAllPropertiesOnSameLine': true }],
			'@stylistic/padded-blocks': ['warn', 'never'],
			'@stylistic/quote-props': ['warn', 'as-needed'],
			'@stylistic/quotes': ['warn', 'single', { 'allowTemplateLiterals': 'always' }],
			'@stylistic/rest-spread-spacing': ['warn', 'never'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/semi-spacing': 'warn',
			'@stylistic/semi-style': ['warn', 'last'],
			'@stylistic/space-before-blocks': ['warn', 'always'],
			'@stylistic/space-before-function-paren': ['warn', {
				'anonymous': 'never',
				'named': 'never',
				'asyncArrow': 'always',
				'catch': 'always'
			}],
			'@stylistic/space-in-parens': ['warn', 'never'],
			'@stylistic/space-infix-ops': 'warn',
			'@stylistic/space-unary-ops': 'warn',
			'@stylistic/spaced-comment': ['warn', 'always', { 'exceptions': ['*', '-', '='] }],
			'@stylistic/switch-colon-spacing': 'warn',
			'@stylistic/template-curly-spacing': ['warn', 'never'],
			'@stylistic/template-tag-spacing': ['warn', 'always'],
			'@stylistic/wrap-iife': ['warn', 'outside'],
			'@stylistic/wrap-regex': 'warn',
			'@stylistic/yield-star-spacing': ['warn', 'after']
		}
	}
]);