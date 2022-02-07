import preprocess from 'svelte-preprocess';
// import vercel from '@sveltejs/adapter-vercel';
import path from 'path';

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
		// adapter: vercel(),
		package: {
			files(filepath) {
				const isFlag = filepath.indexOf('/assets/scss/node_modules') !== -1;
				const isRoute = filepath.indexOf('/src/routes') !== -1;
				return !filepath.endsWith('.stories.svelte') || isFlag || isRoute;
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
