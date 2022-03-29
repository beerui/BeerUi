/**
 * MessageBox 弹框
 * @description 模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。
 */
let _messageBox = null;
export default _messageBox = (src: string, list?: string[], cb?: () => void): MessageBox => new MessageBox(src, list, cb);

class MessageBox {
	private readonly body: HTMLElement = document.body;
	private container: HTMLElement; // 生成的元素
	private style: string; // body样式恢复
	private node: HTMLImageElement; // 图片元素节点
	private cb: (current: { current: string; index: number; list: string[] }) => void; // 图片切换后 监听的回调

	constructor(src: string, list: string[] = [], cb?: () => void) {
		if (!_messageBox.instance) {
			if (cb) this.cb = cb;
			this.init();
			_messageBox.instance = this;
		}
		return _messageBox.instance;
	}

	init() {
		if (document.querySelector('.be-preview')) {
			this.container = document.querySelector('.be-preview');
		} else {
			this.container = document.createElement('div');
			this.container.classList.add('be-preview');
			this.container.innerHTML = `
				<div class='be-preview__mask'></div>
				<div class='be-preview__btn be-preview__close'>×</div>
				<div class='be-preview__btn be-preview__prev'> ‹ </div>
				<div class='be-preview__btn be-preview__next'> › </div>
				<div class='be-preview__container'>
					<img class='be-preview__img' alt='image preview' src='' />
				</div>
			`;
		}
		this.disableScroll();
		this.renderImage();
		this.body.appendChild(this.container);
	}

	renderImage() {
		// 获取节点
		this.node = this.container.querySelector('.be-preview__img');
		const maskDom = this.container.querySelector('.be-preview__mask'); // 底部遮照层
		const closeDom = this.container.querySelector('.be-preview__close'); // 关闭
		const prevDom = this.container.querySelector('.be-preview__prev'); // 上一张
		const nextDom = this.container.querySelector('.be-preview__next'); // 下一张
		// 绑定事件
		maskDom.addEventListener('click', () => this.close());
		closeDom.addEventListener('click', () => this.close());
	}


	close() {
		this.recoveryScroll();
		this.body.removeChild(this.container);
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
