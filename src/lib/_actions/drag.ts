import { off, on } from '$lib/utils/beerui';
interface DragElement {
	isLimit?: boolean,
	isDrag?: boolean
}

interface DragLimit {
	left: number,
	top: number
}

/**
 * 边界判定
 * @param w
 * @param h
 * @param l
 * @param t
 */
const isInWindow = (w:number, h:number, l:number, t:number): DragLimit  => {
	const halfWidth = w/2
	const halfHeight = h/2
	const clientWidth = document.body.clientWidth
	const clientHeight = document.body.clientHeight
	let left = l
	let top = t
	if (halfHeight >= top) top = halfHeight // 上
	if (halfHeight + top >= clientHeight) top = clientHeight - halfHeight // 下
	if (halfWidth >= left) left = halfWidth // 左
	if (halfWidth + left >= clientWidth) left = clientWidth - halfWidth // 右
	return { left, top }
}
/**
 * 注册元素的拖拽事件
 * @param dragBox
 * @param options { isLimit：false 限制在可视范围内, isDrag: true 可拖拽 }
 * @constructor
 */
export default function DragEvent(dragBox: HTMLElement, options: DragElement = { isDrag: false, isLimit: false }) {
	if (!options.isDrag) return
	const target = dragBox;
	const dragArea = dragBox.querySelector('.dragArea');
	const dragHandler = (targetEvent: MouseEvent) => {
		targetEvent.stopImmediatePropagation()
		console.log('dragHandler');
		// 算出鼠标相对元素的位置
		const disX = targetEvent.clientX - target.offsetLeft;
		const disY = targetEvent.clientY - target.offsetTop;
		function mouseMoverHandler(documentEvent: MouseEvent) {
			console.log('mouseMoverHandler');
			// 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
			let left = documentEvent.clientX - disX;
			let top = documentEvent.clientY - disY;
			// 限定范围
			if (options.isLimit) {
				const { width, height } = target.getBoundingClientRect()
				const result = isInWindow(width, height, left, top)
				left = result.left
				top = result.top
			}
			// 移动当前元素
			target.style.left = `${left}px`;
			target.style.top = `${top}px`;
		}
		function mouseUpHandler(evt) {
			evt.stopImmediatePropagation()
			// 鼠标弹起来的时候不再移动
			off(document, 'mousemove', mouseMoverHandler)
			// 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
			off(document, 'mouseup', mouseUpHandler)
		}
		// 元素按下时注册document鼠标监听事件
		on(document, 'mousemove', mouseMoverHandler)
		// 鼠标弹起来移除document鼠标监听事件
		on(document, 'mouseup', mouseUpHandler)
		// 拖拽结束移除鼠标监听事件，解决文字拖拽结束事件未解绑问题
		on(document, 'dragend', mouseUpHandler)
	}
	on(dragArea, 'mousedown', dragHandler, { capture: true, passive: true })
	return {
		destroy: () => {
			off(document, 'click', dragHandler)
		}
	}
}
