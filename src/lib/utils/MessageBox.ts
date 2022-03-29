/**
 * MessageBox 弹框
 * @description 模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。
 */
let messageBox = null;
let zIndex: number = 2000;
export default messageBox = (options): MessageBox => new MessageBox(options);

class MessageBox {
	private readonly body: HTMLElement = document.body;
	private container: HTMLElement; // 生成的元素
	private style: string; // body样式恢复
	private readonly confirm: Function;
	private readonly cancel: Function;
	private type: string = ''; // 消息类型，用于显示图标 success / info / warning / error
	private title: string = '提示'; // MessageBox 标题
	private message: string = ''; // MessageBox 消息正文内容
	private readonly customClass: string = ''; // MessageBox 的自定义类名
	private readonly confirmButtonText: string = '确定';
	private readonly cancelButtonText: string = '取消';
	private showClose: boolean = true; // MessageBox 是否显示右上角关闭按钮
	private showCancelButton: boolean = true; // 是否显示取消按钮
	private showConfirmButton: boolean = true; // 是否显示确定按钮
	private closeOnClickModal: boolean = true; // 是否可通过点击遮罩关闭 MessageBox
	private lockScroll: boolean = true; // 是否在 MessageBox 出现时将 body 滚动锁定
	private beforeClose: Function = null; // MessageBox 关闭前的回调，会暂停实例的关闭
	private complete: Function = null; // 渲染完成的回调
	private closed: Function = null; // 关闭后的回调

	constructor(options) {
		for (let option in options) {
			if (options.hasOwnProperty(option)) {
				this[option] = options[option];
			}
		}
		console.log(this);
		this.init();
	}

	init() {
		this.container = document.createElement('div');
		this.container.classList.add('be-message-box__wrapper');
		if (this.customClass) this.container.classList.add(this.customClass);
		this.container.style.zIndex = String(zIndex)
		this.container.setAttribute('tabindex', '-1')
		this.container.setAttribute('role', 'dialog')
		this.container.setAttribute('aria-modal', 'true')
		this.container.setAttribute('aria-label', this.title)

		this.container.innerHTML = `
				<div class='be-message-box__mask'></div>
				<div class='be-message-box'>
					<div class='be-message-box__header'>
						<div class='be-message-box__title'><span>${this.title}</span></div>
						${this.renderCloseBtn()}
					</div>
					<div class='be-message-box__content'>
						<div class='be-message-box__container'>
							${this.renderType()}
							<div class='be-message-box__message'><p>${this.message}</p></div>
						</div>
					</div>
					<div class='be-message-box__btns'>
						${this.renderCancelBtn()}
						${this.renderConfirmBtn()}
					</div>
				</div>
			`;
		this.disableScroll();
		this.renderDom();
		this.body.appendChild(this.container);
		this.complete && this.complete()
	}

	renderDom() {
		// 获取节点
		const maskDom = this.container.querySelector('.be-message-box__mask'); // 底部遮照层
		const closeDom = this.container.querySelector(".be-message-box__headerbtn"); // 关闭
		const cancelDom = this.container.querySelector(".be-button-cancel"); // 取消按钮
		const confirmDom = this.container.querySelector(".be-button-confirm"); // 确定按钮
		// 绑定事件
		maskDom && maskDom.addEventListener('click', () => this.closeOnClickModal && this._beforeClose());
		closeDom && closeDom.addEventListener("click", () => this._beforeClose());
		cancelDom && cancelDom.addEventListener("click", () => this.cancelHandle());
		confirmDom && confirmDom.addEventListener("click", () => this.confirmHandle());
		zIndex++
	}
	renderCancelBtn() {
		return this.showCancelButton ? `<button class="be-button-confirm be-button be-button--normal be-button--default" type="submit"><span>${this.cancelButtonText}</span></button>` : ''
	}
	renderConfirmBtn() {
		return this.showConfirmButton ? `<button class="be-button-cancel be-button be-button--normal be-button--primary" type="submit"><span>${this.confirmButtonText}</span></button>` : ''
	}
	renderCloseBtn() {
		return this.showClose ? `
			<button type='button' aria-label='Close' class='be-message-box__headerbtn'>
				<div class="be-icon " style="width: 16px; height: 16px;"><svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8.00005 8.91923L11.076 11.9951L11.9952 11.0759L8.91929 7.99999L11.9952 4.92409L11.076 4.00485L8.00005 7.08075L4.92412 4.00482L4.00488 4.92406L7.08081 7.99999L4.00488 11.0759L4.92412 11.9952L8.00005 8.91923Z" fill="currentColor" fill-opacity="0.9"></path></svg></div>
			</button>` : ''
	}
	renderType() {
		if (this.type) {
			const types = {
				success: '<path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM4.5 8.2065L5.2065 7.5L7 9.293L10.7925 5.5L11.5 6.2075L7 10.707L4.5 8.2065Z" fill="#67c23a" fill-opacity="0.9"/>',
				warning: '<path d="M15 8C15 4.13401 11.866 1 8 1C4.13401 0.999998 1 4.134 1 8C0.999998 11.866 4.134 15 8 15C11.866 15 15 11.866 15 8ZM8.5 4.0003V9.49999H7.5V4.0003H8.5ZM7.39429 11H8.59429V12.2H7.39429V11Z" fill="#e6a23c" fill-opacity="0.9"/>',
				info: '<path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.3999 4H8.59985V5.19995H7.3999V4ZM7.50562 6.5H8.50562V11.9998H7.50562V6.5Z" fill="#909399" fill-opacity="0.9"/>',
				error: '<path d="M15 8C15 4.13401 11.866 1 8 1C4.13401 0.999998 1 4.134 1 8C0.999998 11.866 4.134 15 8 15C11.866 15 15 11.866 15 8ZM5.67091 4.94754L8.00001 7.29075L10.3291 4.94754L11.0384 5.65251L8.70499 8L11.0383 10.3475L10.3291 11.0525L8.00001 8.70925L5.67092 11.0525L4.96168 10.3475L7.29503 8L4.96167 5.65251L5.67091 4.94754Z" fill="#f56c6c" fill-opacity="0.9"/>'
			}
			return `
			<div class="be-message-box__status">
				<div class='be-icon' style='width: 24px;height: 24px;'>
					<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						${types[this.type]}
					</svg>
				</div>
			</div>
			`
		}
		return ''
	}
	cancelHandle() {
		this.cancel()
		this._beforeClose()
	}
	confirmHandle() {
		this.confirm()
		this._beforeClose()
	}

	// 判断关闭前 是否需要关闭
	_beforeClose() {
		if (this.beforeClose) {
			if (this.beforeClose()) this.close()
		} else {
			this.close()
		}
	}
	close() {
		this.recoveryScroll();
		this.body.removeChild(this.container);
		zIndex = 2000
		this.closed()
	}

	// 禁用 / 释放滚动条
	private disableScroll() {
		if (!this.lockScroll) return
		this.style = this.body.style.overflow;
		this.body.style.overflow = 'hidden';
	}

	private recoveryScroll() {
		if (!this.lockScroll) return
		this.body.style.overflow = this.style;
	}
}
