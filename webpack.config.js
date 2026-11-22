// eslint disable is necessary as glob is mistakenly marked as unpublished
import { glob } from 'glob'; // eslint-disable-line n/no-unpublished-import
import path from 'node:path';


// path to the routes directory
const routesDir = 'src/client/react/';


export default {
	// Build all pages in the routes folder
	entry: glob.sync(`../${routesDir}**.jsx`).reduce((obj, elem) => {
		obj[path.parse(elem).name] = elem;
		return obj;
	}, {}),
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
