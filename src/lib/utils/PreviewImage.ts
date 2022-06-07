import { svgList } from './svgList';
import { on, off } from './beerui';
import { throttle } from './throttle';
const browser = typeof window !== 'undefined';
/**
 * 图片预览
 * @param {string} src 当前图片链接
 * @param {string[]} list 图片数组
 * @param {function} cb 图片切换后 监听的回调
 */
let previewImages = null;
export default previewImages = (src: string, list?: string[], cb?: () => void): PreviewImage => new PreviewImage(src, list, cb);
export const isFirefox = function() {
	return browser && !!window.navigator.userAgent.match(/firefox/i);
};
const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';
class PreviewImage {
	private readonly body: HTMLElement = document.body;
	public src: string; // 传入图片的 URL
	public list?: string[]; // 图片列表
	private container: HTMLElement; // 生成的元素
	private _index = 0; // 当前展示的图片索引
	private node: HTMLImageElement; // 图片元素节点
	private static instance: PreviewImage; // 当前实例
	private cb: (current: { current: string; index: number; list: string[] }) => void; // 图片切换后 监听的回调
	private style: string; // body样式恢复
	private readonly len: number;
	private scale: number = 1;
	private rotate: number = 0;
	private _keyDownHandler: (e) => void;
	private _mouseWheelHandler: any;
	private maskDom: Element;
	private closeDom: Element;
	private prevDom: Element;
	private nextDom: Element;
	private btnDom: Element;
	private transform: any = {
		offsetX: 0,
		offsetY: 0
	};
	private _dragHandler: any;

	constructor(src: string, list: string[] = [], cb?: () => void) {
		if (!PreviewImage.instance) {
			this.src = src;
			this.list = list;
			this.len = list.length;
			if (cb) this.cb = cb;
			this.init();
			PreviewImage.instance = this;
		}
		return PreviewImage.instance;
	}

	get current() {
		return {
			list: this.list,
			current: this.src,
			index: this._index
		};
	}

	get index() {
		return this._index;
	}

	// 图片切换时触发
	watchHandle(cb?: () => void) {
		if (cb) this.cb = cb;
		this.cb && this.cb(this.current);
	}

	init() {
		if (document.querySelector('.be-preview')) {
			this.container = document.querySelector('.be-preview');
		} else {
			this.container = document.createElement('div');
			this.container.classList.add('be-preview');
			if (this.len <= 1) {
				this.container.classList.add('be-preview__hide-btn');
			}
			this.container.innerHTML = `
				<div class='be-preview__mask'></div>
				<div class='be-preview__btn be-preview__close'>
					<div class='be-icon' style='width: 24px;height: 24px;'>
						<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							${svgList['close']}
						</svg>
					</div>
				</div>
				<div class='be-preview__btn be-preview__prev'>
					<div class='be-icon' style='width: 24px;height: 24px;'>
						<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							${svgList['chevron-left']}
						</svg>
					</div>
				</div>
				<div class='be-preview__btn be-preview__next'>
					<div class='be-icon' style='width: 24px;height: 24px;'>
						<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							${svgList['chevron-right']}
						</svg>
					</div>
				</div>
				${ this.renderBtn() }
				<div class='be-preview__container'>
					<img class='be-preview__img' draggable='true' alt='image preview' src='' />
				</div>
			`;
		}
		this.disableScroll();
		this.renderImage();
		this.body.appendChild(this.container);
	}

	renderBtn() {
	  return `
		<div class='be-preview__actions'>
			<div class='be-preview__actions__inner'>
				<div class='be-icon' data-type='zoomOut' style='width: 28px;height: 28px;'>
					<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						${svgList['zoom-out']}
					</svg>
				</div>
				<div class='be-icon' data-type='zoomIn' style='width: 28px;height: 28px;'>
					<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						${svgList['zoom-in']}
					</svg>
				</div>
				<div class='be-icon' data-type='chevronLeft' style='width: 28px;height: 28px;'>
					<svg class="be-svg" width="100%" height="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
						${svgList['refresh-left']}
					</svg>
				</div>
				<div class='be-icon' data-type='chevronRight' style='width: 28px;height: 28px;'>
					<svg class="be-svg" width="100%" height="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
						${svgList['refresh-right']}
					</svg>
				</div>
			</div>
		</div>`
	}

	renderImage() {
		// 获取节点
		this.node = this.container.querySelector('.be-preview__img'); // 图片DOM
		this.maskDom = this.container.querySelector('.be-preview__mask'); // 底部遮照层
		this.closeDom = this.container.querySelector('.be-preview__close'); // 关闭
		this.prevDom = this.container.querySelector('.be-preview__prev'); // 上一张
		this.nextDom = this.container.querySelector('.be-preview__next'); // 下一张
		this.btnDom = this.container.querySelector('.be-preview__actions__inner') // 功能按钮

		// 监听键盘事件
		this.deviceSupportInstall()
		// 图片数组不为零 计算当前图片的索引值
		if (this.list.length > 0) {
			let _index = 0;
			for (let i = 0; i < this.list.length; i++) {
				if (this.src === this.list[i]) {
					_index = i;
					break;
				}
			}
			this._index = _index;
		} else {
			this.list = [this.src];
		}
		this.node.src = this.list[this._index];
		this.watchHandle();
	}
	// 解除监听
	deviceSupportUninstall() {
		off(document, 'keydown', this._keyDownHandler);
		off(document, mousewheelEventName, this._mouseWheelHandler);
		off(this.maskDom, 'click', () => this.close)
		off(this.closeDom, 'click', () => this.close)
		off(this.prevDom, 'click', () => this.changeImage)
		off(this.nextDom, 'click', () => this.changeImage)
		off(this.btnDom, 'click', () => this.clickBtnHandler)
		off(this.node, 'mousedown', () => this.handleMouseDown)
		this._keyDownHandler = null;
		this._mouseWheelHandler = null;
	}
	deviceSupportInstall() {
		this._keyDownHandler = e => {
			e.stopPropagation();
			const keyCode = e.keyCode;
			switch (keyCode) {
				// ESC
				case 27:
					this.close();
					break;
				// LEFT_ARROW
				case 37:
					this.changeImage('prev');
					break;
				// UP_ARROW
				case 38:
					this.clickBtnHandler('zoomIn');
					break;
				// RIGHT_ARROW
				case 39:
					this.changeImage('next');
					break;
				// DOWN_ARROW
				case 40:
					this.clickBtnHandler('zoomOut');
					break;
			}
		};
		this._mouseWheelHandler = throttle(e => {
			const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
			if (delta > 0) {
				this.clickBtnHandler('zoomIn');
			} else {
				this.clickBtnHandler('zoomOut');
			}
		}, 30);

		// 绑定事件
		on(this.maskDom, 'click', () => this.close())
		on(this.node, 'mousedown', e => this.handleMouseDown(e))
		on(this.closeDom, 'click', () => this.close())
		on(this.prevDom, 'click', () => this.changeImage('prev'))
		on(this.nextDom, 'click', () => this.changeImage('next'))
		on(this.btnDom, 'click', e => this.clickBtnHandler(e.target['dataset']['type']))
		on(document, 'keydown', this._keyDownHandler);
		on(document, mousewheelEventName, this._mouseWheelHandler);
	}
	clickBtnHandler(type) {
		if (type === 'zoomIn') this.scale = (this.scale * 100 + 20) / 100
		if (type === 'zoomOut') this.scale = (this.scale * 100 - 20) / 100
		if (type === 'chevronLeft') this.rotate = this.rotate + 90
		if (type === 'chevronRight') this.rotate = this.rotate - 90
		if (this.scale < 0.2) this.scale = 0.2
		this.node.style.transform = `scale(${this.scale}) rotate(${this.rotate}deg)`
	}
	changeImage(type: string) {
		if (type === 'prev') this._index--;
		if (type === 'next') this._index++;
		if (this._index < 0) this._index = this.list.length - 1;
		if (this._index >= this.list.length) this._index = 0;
		this.scale = 1
		this.rotate = 0
		this.node.style.marginLeft = '0px';
		this.node.style.marginTop = '0px';
		this.node.style.transform = `scale(${this.scale}) rotate(${this.rotate}deg)`
		this.node.src = this.list[this._index];
		this.watchHandle();
	}
	handleMouseDown(e) {
		if (e.button !== 0) return;
		const startX = e.pageX;
		const startY = e.pageY;
		let transX = this.transform.offsetX;
		let transY = this.transform.offsetY;
		this._dragHandler = throttle(ev => {
			this.transform.offsetX = transX + ev.pageX - startX;
			this.transform.offsetY = transY+ ev.pageY - startY;
			this.node.style.marginLeft = this.transform.offsetX + 'px';
			this.node.style.marginTop = this.transform.offsetY + 'px';
		}, 30);
		on(document, 'mousemove', this._dragHandler);
		on(document, 'mouseup', () => {
			off(document, 'mousemove', this._dragHandler);
		});
		e.preventDefault();
	}
	close() {
		this.recoveryScroll();
		this.deviceSupportUninstall();
		this.body.removeChild(this.container);
		PreviewImage.instance = null;
		this._index = 0;
		this.node = null;
		this.cb = null;
		this.list = [];
	}

	// 禁用 / 释放滚动条
	private disableScroll() {
		this.style = this.body.style.overflow;
		this.body.style.overflow = 'hidden';
	}

	private recoveryScroll() {
		this.body.style.overflow = this.style;
	}
}
