import  '$assets/scss/index.scss'
import fs from 'fs';
import path from 'path';
import { browser } from '$app/env';

console.log(this);
if (!browser) {
	// console.log(require.context('./modules', true, /\.scss$/))
	// const _path = path.resolve('./modules/*')
	// const modules = fs.readFileSync(_path)
	// console.log(modules)
}
