import js from '@eslint/js'
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
	js.configs.recommended,
	{
		plugins: {
			prettier,
			react,
			'react-hooks': reactHooks,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				window: 'readonly',
				document: 'readonly',
				navigator: 'readonly',
				console: 'readonly',
				fetch: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
				setInterval: 'readonly',
				clearInterval: 'readonly',
				requestAnimationFrame: 'readonly',
				cancelAnimationFrame: 'readonly',
				Audio: 'readonly',
				HTMLElement: 'readonly',
				HTMLDivElement: 'readonly',
				HTMLSpanElement: 'readonly',
				HTMLParagraphElement: 'readonly',
				HTMLAnchorElement: 'readonly',
				HTMLAudioElement: 'readonly',
				Element: 'readonly',
				Event: 'readonly',
				MouseEvent: 'readonly',
				TouchEvent: 'readonly',
				WheelEvent: 'readonly',
				KeyboardEvent: 'readonly',
				PointerEvent: 'readonly',
				CustomEvent: 'readonly',
				IntersectionObserver: 'readonly',
				React: 'readonly',
				process: 'readonly',
				NodeJS: 'readonly',
				URL: 'readonly',
				VoidFunction: 'readonly',
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'prettier/prettier': 'error',
			camelcase: 'off',
			'import/prefer-default-export': 'off',
			'react/jsx-filename-extension': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/no-unused-prop-types': 'off',
			'react/require-default-props': 'off',
			'react/no-unescaped-entities': 'off',
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'no-extra-boolean-cast': 'error',
		},
	},
	{
		files: ['**/*.+(ts|tsx)'],
		plugins: {
			'@typescript-eslint': typescriptEslintEslintPlugin,
			'jsx-a11y': jsxA11y,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			...typescriptEslintEslintPlugin.configs.recommended.rules,
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'no-use-before-define': [0],
			'@typescript-eslint/no-use-before-define': [1],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'jsx-a11y/alt-text': [
				'warn',
				{
					elements: ['img'],
					img: ['Image'],
				},
			],
			'jsx-a11y/aria-props': 'warn',
			'jsx-a11y/aria-proptypes': 'warn',
			'jsx-a11y/aria-unsupported-elements': 'warn',
			'jsx-a11y/role-has-required-aria-props': 'warn',
			'jsx-a11y/role-supports-aria-props': 'warn',
		},
	},
	{
		ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
	},
]
