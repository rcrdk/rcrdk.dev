/* eslint-disable import/no-anonymous-default-export */
export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'wip'],
		],
		'subject-empty': [2, 'never'],
		// 'jira-ticket': [2, 'always'],
	},

	// plugins: [
	// 	{
	// 		rules: {
	// 			'jira-ticket': ({ body }) => {
	// 				const pwRegex = /\bPW-\d+\b/ //
	// 				if (body && pwRegex.test(body)) {
	// 					return [true]
	// 				}
	// 				return [false, 'missing jira task code. example: PW-XXXX']
	// 			},
	// 		},
	// 	},
	// ],
}
