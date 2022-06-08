import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import path from 'path';
// 如果需要打包发布到 vercel 打开注释即可
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			scss: {
				prependData: '@use "src/app.scss" as *;'
			}
		})
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: vercel(),
		package: {
			files(filepath) {
				const isFlag = filepath.indexOf('/src/lib/assets/scss/node_modules') !== -1;
				const isRoute = filepath.indexOf('/src/routes') !== -1;
				return !filepath.endsWith('.stories.svelte') || isFlag || isRoute;
			},
		},
		vite: {
			resolve: {
				alias: {
					$utils: path.resolve('./src/utils'),
					$assets: path.resolve('./src/assets'),
					$template: path.resolve('./src/template'),
					'@brewer/repl': path.resolve('./src/lib/demo/repl')
				}
			}
		}
	},
};

export default config;
