/**
 * this is notice component
 */
import { Message } from './beerui';
import { objectAssign } from './index';

interface options {
	type: string;
	title: string,
	message: string,
	onClose?: () => void,
	onClick?: () => void,

	toast: boolean;
	duration?: number,
	position?: string
	titleColor?: string
	messageColor?: string
}

interface instanceType extends options {
	id: string,
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

class Notice extends Message{
	instances: Array<instanceType> = [];  // 储存弹窗信息
	constructor(options?){
		super(options)
		if (options) this.setNotice(options)
	}
	// 生成弹窗
	setNotice(options: options): instanceType {
		const userOnClose = options.onClose;
		const userOnClick = options.onClick;
		const defaultOptions = {
			title: '提示',
			message: '',
			type: '',
			position: 'top-right',
			duration: 3000,
			titleColor: '',
			messageColor: '',
		}
		options = <options>objectAssign(defaultOptions, options);

		this.type = options.type
		this.zIndex++
		this.id = `NoticeWrapper_${this.zIndex}`
		const container: HTMLElement = document.createElement('div');
		container.classList.add('be-notify');
		if (options.toast) container.classList.add('be-notify-toast');
		else container.classList.add(this.setPositionClass(options.position));
		if (this.customClass) container.classList.add(this.customClass);
		container.innerHTML = `
		${this.renderType()}
		<div class='be-notify__group'>
		  <h2 class='be-notify__title' style='color:${ options.titleColor ? options.titleColor : '#000' }' >${ options.title }</h2>
		  ${this.showClose ? `<div class='be-notice__close'>` +  this.renderIcon({ name: 'close' }) + `</div>` : ''}
		  <div class='be-notify__content' style='color:${ options.messageColor ? options.messageColor : '#000' }' >${ options.message }</div>
		</div>
		`;
		this.body.appendChild(container);
		setTimeout(() => {
			container.style.transform = 'translateX(0%)';
		});

		const instance = <instanceType>{};
		instance.dom = container;
		instance.duration = options.duration;
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
		const closeBtn = container.querySelector('.be-notice__close');
		closeBtn && closeBtn.addEventListener('click', instance.close);
		if (typeof userOnClick === 'function') {
			instance.dom.addEventListener('click', userOnClick);
			instance.onClick = () => {
				userOnClick;
			};
		}

		instance.position = options.position;
		instance.verticalProperty = this.setProperty(options.position);
		this.instances.push(instance);
		let verticalOffset = 0;

		// 将同一位置的弹框过滤到一个数组中并设置偏移量
		this.instances.filter(item => item.position === options.position).forEach((item, index) => {
			item.dom.style['z-index'] = 2000 + index;
			if (index !== 0) {
				verticalOffset += item.dom.offsetHeight + 16;
			} else {
				verticalOffset = 0;
			}
		});
		verticalOffset += 16;
		instance.verticalOffset = verticalOffset;
		instance.dom.style[this.setProperty(options.position)] = verticalOffset + 'px';
		if (instance.duration > 0) {
			instance.timer = setTimeout(() => {
				this.close(instance.id, userOnClose);
			}, instance.duration);
		}

		return instance;
	}
	// 关闭
	close(id: string, userOnClose?): void {
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
