import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	manifest: true,
	sourcemap: true,
	emptyOutDir: true,
	target: "es2018",
	overlay: false,
	resolve: {
		alias: {
			$utils: path.resolve('./src/utils'),
			$assets: path.resolve('./src/assets'),
			$template: path.resolve('./src/template'),
		}
	},

	server: {
		cors: true,
		fs: {
			strict: false
		}
	},
	build: {
		rollupOptions: {
			onwarn: (warning, handler) => {
				const { code, frame } = warning;
				console.log('-------------------', code);
				if (code === "css-unused-selector")
					return;

				handler(warning);
			}
		}
	}
};

export default config;
