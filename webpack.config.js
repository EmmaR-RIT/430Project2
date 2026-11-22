import path from 'node:path';


export default {
	entry: {
		login: path.resolve(import.meta.dirname, 'src/client/react/pages/login.jsx'),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/u,
				exclude: /node_modules/u,
				use: { loader: 'babel-loader' },
			},
		],
	},
	mode: 'production',
	output: {
		path: path.resolve(import.meta.dirname, 'public/scripts'),
		filename: '[name].js',
	},
};
