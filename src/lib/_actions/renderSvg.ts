
export default function RenderSvg(ctx: HTMLFrameElement | any = null, options ) {
	const _options = Object.assign({cursor: 'pointer'}, options)
	const init = () => {
		for (let key in _options) {
			if (key && key!== 'name') {
				ctx.contentDocument.querySelector('.be-svg')?.setAttribute(key, _options[key])
			}
		}
	}
	init()
	return {
		update() {
			init()
		},
		destroy: () => {
		}
	}
}

export const svgList = {
	'file': '<path d="M3.49534 1C3.02005 1 2.5 1.33727 2.5 1.92191V14.0781C2.5 14.6627 3.02005 15 3.49534 15L12.5047 15.0001C12.9799 15.0001 13.5 14.6628 13.5 14.0782V5.70718C13.5 5.44196 13.3946 5.18761 13.2071 5.00007L9.5 1.29296C9.31246 1.10543 9.05812 1.00007 8.7929 1.00007L3.49534 1ZM8.50005 2.00007V6.01283H12.5V14.0001L3.5 14V2L8.50005 2.00007ZM9.50005 2.70722L11.8056 5.01283H9.50005V2.70722Z" fill="" fill-opacity="0.9"/>',
	'backtop': '<path d="M1.99902 2.9989H13.999V1.9989H1.99902V2.9989Z" fill="" fill-opacity="0.9"/><path d="M3.37689 10.2293L7.48663 6.19544L7.48666 14.8438L8.49751 14.8437L8.49748 6.1901L12.6779 10.2672L13.3915 9.56668L8.34115 4.64112C8.14651 4.45129 7.83584 4.45178 7.64181 4.64224L2.661 9.53108L3.37689 10.2293Z" fill="" fill-opacity="0.9"/>',
	'add': '<path d="M7.34998 8.64998V12.5H8.64998V8.64998H12.5V7.34998H8.64998V3.5H7.34998V7.34998H3.5V8.64998H7.34998Z" fill="" fill-opacity="0.9"/>',
	'books': '<path d="M7.99902 9.27825L3.99902 12.0782V2.9989H11.999V12.0782L7.99902 9.27825ZM7.99902 10.4989L12.2123 13.4482C12.5437 13.6802 12.999 13.4431 12.999 13.0386V2.9989C12.999 2.44662 12.5513 1.9989 11.999 1.9989H3.99902C3.44674 1.9989 2.99902 2.44662 2.99902 2.9989V13.0386C2.99902 13.4431 3.45437 13.6802 3.78576 13.4482L7.99902 10.4989Z" fill="" fill-opacity="0.9"/>'
}

export function RenderSvgPath(ctx: HTMLFrameElement | any = null, options ) {
	const _options = Object.assign({cursor: 'pointer'}, options)
	const init = () => {
		for (let key in _options) {
			if (key && key!== 'name') {
				ctx.contentDocument.querySelector('.be-svg')?.setAttribute(key, _options[key])
			}
		}
	}
	init()
	return {
		update() {
			init()
		},
		destroy: () => {
		}
	}
}
