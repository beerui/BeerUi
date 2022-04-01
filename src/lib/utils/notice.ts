/**
 * this is notice component
 */
interface options {
	toast: boolean;
	type: string;
	title: string,
	message: string,
	onClose?: () => void,
	onClick?: () => void,
	duration?: number,
	position?: string
	titleColor?: string
	messageColor?: string
}

interface instanceType extends options {
	id: number,
	dom: HTMLElement,
	timer: NodeJS.Timeout | null,
	verticalOffset: number,
	verticalProperty: string,
	close?: () => void
}
let NoticeInstance = null
// 显示消息提示
export const showNotice = (options) => {
	if (!NoticeInstance) {
		NoticeInstance = new Notice(options);
		return NoticeInstance.id
	} else {
		NoticeInstance.setNotice(options)
		return NoticeInstance.id
	}
}
// 关闭所有弹框
export const closeALlNotice = () => NoticeInstance && NoticeInstance.closeAll()
// 关闭单个弹框
export const closeNotice = (id, cb = () => {}) => NoticeInstance && NoticeInstance.close(id, cb)

class Notice {
	title: string; // 标题
	message: string; // 内容
	duration: number; // 间隔
	position: string; // 位置
	private _body: HTMLElement = document.body; // 私有属性 获取body
	instances: Array<instanceType> = [];  // 储存弹窗信息
	seed = 0;
	id: number;
	titleColor: string;
	messageColor: string;
	constructor(options?){
		if (options) this.setNotice(options)
	}

	// 生成弹窗
	private type: string;
	setNotice(options: options): instanceType {
		this.title = options.title;
		this.message = options.message;
		this.type = options.type;
		this.position = options.position || 'top-right';
		this.duration = options.duration || 0;
		this.titleColor = options.titleColor;
		this.messageColor = options.messageColor;
		const userOnClose = options.onClose;
		const userOnClick = options.onClick;


		const container: HTMLElement = document.createElement('div');
		container.classList.add('be-notify');
		if (options.toast) container.classList.add('be-notify-toast');
		else container.classList.add(this.setPositionClass(this.position));
		container.innerHTML = `
		${this.computedType()}
		<div class='be-notify__group'>
		  <h2 class='be-notify__title' style='color:${ this.titleColor ? this.titleColor : '#000' }' >${ this.title }</h2>
		  <div class='be-notice__close' id='notice-close' style='width: 16px;height: 16px;'>
			<svg class='be-svg' width='100%' height='100%' viewBox='0 0 16 16' style='color:#909399' xmlns='http://www.w3.org/2000/svg'>
				<path d='M8.00005 8.91923L11.076 11.9951L11.9952 11.0759L8.91929 7.99999L11.9952 4.92409L11.076 4.00485L8.00005 7.08075L4.92412 4.00482L4.00488 4.92406L7.08081 7.99999L4.00488 11.0759L4.92412 11.9952L8.00005 8.91923Z' fill='currentColor' fill-opacity='0.9'/>
			</svg>
		  </div>
		  <div class='be-notify__content' style='color:${ this.messageColor ? this.messageColor : '#000' }' >${ this.message }</div>
		</div>
		`;
		this._body.appendChild(container);
		setTimeout(() => {
			container.style.transform = 'translateX(0%)';
		});

		const instance = <instanceType>{};
		this.id = this.seed++;
		instance.dom = container;
		instance.duration = this.duration;
		instance.id = this.id;
		// 关闭回调
		instance.onClose = () => {
			this.close(instance.id, userOnClose);
		};
		// 关闭事件
		instance.close = () => {
			this.close(instance.id, userOnClose);
		};
		// 点击关闭按钮
		const closeBtn = document.getElementById('notice-close');
		closeBtn.addEventListener('click', instance.close);
		if (typeof userOnClick === 'function') {
			instance.dom.addEventListener('click', userOnClick);
			instance.onClick = () => {
				userOnClick;
			};
		}

		instance.position = this.position;
		instance.verticalProperty = this.setProperty(this.position);
		this.instances.push(instance);
		let verticalOffset = 0;

		// 将同一位置的弹框过滤到一个数组中并设置偏移量
		this.instances.filter(item => item.position === this.position).forEach((item, index) => {
			item.dom.style['z-index'] = 2000 + index;
			if (index !== 0) {
				verticalOffset += item.dom.offsetHeight + 16;
			} else {
				verticalOffset = 0;
			}
		});
		verticalOffset += 16;
		instance.verticalOffset = verticalOffset;
		instance.dom.style[this.setProperty(this.position)] = verticalOffset + 'px';
		if (instance.duration > 0) {
			instance.timer = setTimeout(() => {
				this.close(instance.id, userOnClose);
			}, instance.duration);
		}

		return instance;
	}
	computedType() {
		if (this.type) {
			const types = {
				success: '<path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM4.5 8.2065L5.2065 7.5L7 9.293L10.7925 5.5L11.5 6.2075L7 10.707L4.5 8.2065Z" fill="#67c23a" fill-opacity="0.9"/>',
				warning: '<path d="M15 8C15 4.13401 11.866 1 8 1C4.13401 0.999998 1 4.134 1 8C0.999998 11.866 4.134 15 8 15C11.866 15 15 11.866 15 8ZM8.5 4.0003V9.49999H7.5V4.0003H8.5ZM7.39429 11H8.59429V12.2H7.39429V11Z" fill="#e6a23c" fill-opacity="0.9"/>',
				info: '<path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.3999 4H8.59985V5.19995H7.3999V4ZM7.50562 6.5H8.50562V11.9998H7.50562V6.5Z" fill="#909399" fill-opacity="0.9"/>',
				error: '<path d="M15 8C15 4.13401 11.866 1 8 1C4.13401 0.999998 1 4.134 1 8C0.999998 11.866 4.134 15 8 15C11.866 15 15 11.866 15 8ZM5.67091 4.94754L8.00001 7.29075L10.3291 4.94754L11.0384 5.65251L8.70499 8L11.0383 10.3475L10.3291 11.0525L8.00001 8.70925L5.67092 11.0525L4.96168 10.3475L7.29503 8L4.96167 5.65251L5.67091 4.94754Z" fill="#f56c6c" fill-opacity="0.9"/>'
			}
			return `
			<div class='be-icon' style='width: 24px;height: 24px;'>
				<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					${types[this.type]}
				</svg>
			</div>
			`
		}
		return ''
	}
	// 关闭
	close(id: number, userOnClose?): void {
		let index = -1;
		const len = this.instances.length;
		const instance = this.instances.filter((instance, i) => {
			if (instance.id === id) {
				index = i;
				return true;
			}
			return false;
		})[0];
		if (!instance) return;

		if (typeof userOnClose === 'function') {
			userOnClose(instance);
		}
		const position = instance.position;
		const removeHeight = instance.dom.offsetHeight;
		instance.dom.parentNode.removeChild(instance.dom);
		this.instances.splice(index, 1);
		clearTimeout(instance.timer);
		instance.timer = null;
		if (len <= 1) return;
		for (let i = index; i < len - 1; i++) {
			if (this.instances[i].position === position) {
				this.instances[i].dom.style[instance.verticalProperty] = parseInt(this.instances[i].dom.style[instance.verticalProperty], 10) - removeHeight - 16 + 'px';
			}
		}
	}

	closeAll() {
		for (let i = this.instances.length - 1; i >= 0; i--) {
			this.instances[i].close();
		}
	}

	// 设置弹框类名
	setPositionClass(position: string): string {
		return position.includes('right') ? 'right' : 'left';
	}

	// 设置弹框样式属性
	setProperty(position: string): string {
		return /^top-/.test(position) ? 'top' : 'bottom';
	}
}
