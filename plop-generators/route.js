module.exports = {
	description : 'route',
	prompts : [
		{
			type : 'input',
			name : 'name',
			message : 'name: ',
			validate : function (value) {
					if ((/.+/).test(value)) { return true; }
					return 'name is required';
			}
		}
	],
	actions : [
		{
			type: 'add',
			path : './server/api/{{ dashCase name }}.js',
			templateFile : './plop-templates/route.txt'
		},
		// modify to import container into app.js
		{
			type: 'modify',
			path: './server/api/index.js',
			pattern: /(\/\*include\*\/)/gi,
			templateFile: './plop-templates/route-include.txt'
		},
	]
}
