
export default function RenderSvg(ctx: HTMLFrameElement | any = null, options ) {
	const _options = Object.assign({cursor: 'pointer'}, options)
	for (let key in _options) {
		if (key && key!== 'name') {
			ctx.contentDocument.querySelector('.be-svg')?.setAttribute(key, _options[key])
		}
	}
	return {
		update(ctx) {
			console.log('update', ctx);
		},
		destroy: () => {
		}
	}
}
