import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
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
				const isRoute = filepath.indexOf('/src/routes') !== -1;
				const isDemo = filepath.indexOf('demo/') !== -1;
				return !filepath.endsWith('.stories.svelte') || isRoute || isDemo;
			},
		}
	},
};

export default config;
