import preprocess from 'svelte-preprocess';
import path from 'path';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		package: {
			files(filepath) {
				return !filepath.endsWith('.stories.svelte');
			},
		},
		vite: {
			resolve: {
				alias: {
					$utils: path.resolve('/src/utils'),
					$assets: path.resolve('/src/assets'),
					$template: path.resolve('/src/template')
				}
			}
		}
	},
};

export default config;
