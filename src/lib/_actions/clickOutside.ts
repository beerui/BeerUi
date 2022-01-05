import { off, on } from '$lib/utils/beerui';
interface Outside {
	cb?: Function,
	isInDrag?: boolean
}
/**
 * 点击外部
 * @param {Element} els
 * @param {Function} options {cb 回调 callback, isInDrag}
 *     - 默认返回 自定义方法 outside
 */
export default function clickOutside (els: Element, options:Outside = { cb: Function, isInDrag: false }) {
	if (options.cb && typeof options.cb !== 'function') throw new Error('回调需是一个函数 callback must be Function.')
	if (options.isInDrag) return
	console.log('isInDrag', options.isInDrag);
	function clickHandler(event) {
		if (!els.contains(event.target)) {
			console.log('clickHandler');
			els.dispatchEvent(new CustomEvent('outside'))
			options.cb && options.cb()
		}
	}
	on(document, 'click', clickHandler)
	return {
		destroy: () => {
			off(document, 'click', clickHandler)
		}
	}
}
