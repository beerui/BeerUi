import { off, on } from '$lib/utils/beerui';
interface Outside {
	cb?: Function,
	isInDrag?: boolean
}
/**
 * 点击外部
 * @param {Element} els
 * @param {Function} options {cb 回调 callback}
 *     - 默认返回 自定义方法 outside
 */
export default function clickOutside (els: Element, options:Outside = { cb: Function }) {
	console.log('clickOutside');
	if (options.cb && typeof options.cb !== 'function') throw new Error('回调需是一个函数 callback must be Function.')
	function clickHandler(event) {
		if (!els.contains(event.target)) {
			els.dispatchEvent(new CustomEvent('outside'))
			options.cb && options.cb()
		}
	}
	on(document, 'mousedown', clickHandler)
	return {
		destroy: () => {
			off(document, 'mousedown', clickHandler)
		}
	}
}
