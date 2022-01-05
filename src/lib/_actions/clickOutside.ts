import { off, on } from '$lib/utils/beerui';

/**
 * 点击外部
 * @param {Element} els
 * @param {Function} cb 回调 callback
 *     - 默认返回 自定义方法 outside
 */
export default function clickOutside (els: Element, cb?: Function) {
	if (cb && typeof cb !== 'function') throw new Error('回调需是一个函数 callback must be Function.');
	function clickHandler(event) {
		if (!els.contains(event.target)) {
			els.dispatchEvent(new CustomEvent('outside'));
			cb && cb()
		}
	}
	on(document, 'click', clickHandler, { capture: true, passive: true })
	return {
		destroy: () => {
			off(document, 'click', clickHandler)
		}
	};
}
