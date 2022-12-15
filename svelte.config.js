import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import vercel from '@sveltejs/adapter-vercel';
// 如果需要打包发布到 vercel 打开注释即可
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	onwarn: (warning, handler) => {
		const { code, frame } = warning;
		// console.log('-----------------------------', code, '-----------------------------')
		const _warning = [
			'a11y-invalid-attribute',
			'css-unused-selector',
			'a11y-label-has-associated-control',
			'unused-export-let',
			'a11y-missing-attribute',
			'a11y-missing-content',
			'a11y-mouse-events-have-key-events'
		]
		if (_warning.includes(code))
			return;

		handler(warning);
	},
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
		adapter: process.env.mode === 'vercel' ? vercel() : adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true
		})
	},
};

export default config;
