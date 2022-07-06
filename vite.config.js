import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	resolve: {
		alias: {
			$utils: path.resolve('./src/utils'),
			$assets: path.resolve('./src/assets'),
			$template: path.resolve('./src/template'),
			'@brewer/repl': path.resolve('./src/lib/demo/repl')
		}
	},

	server: {
		fs: {
			strict: false
		}
	}
};

export default config;
