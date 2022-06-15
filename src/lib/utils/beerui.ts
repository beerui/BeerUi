export const is_browser = typeof window !== 'undefined';
if (is_browser) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.__beerui__ = {
    clickOutSide: { init: false }
  };
}
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;


const trim = (str: string): string => (str || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");

export class FormatTime {
  private readonly reg: RegExp = /(yyyy)|(MM)|(M)|(dd)|(d)|(HH)|(H)|(mm)|(m)|(ss)|(s)/g;
  private formatTime?: string = "yyyy-MM-dd HH:mm:ss"; // 格式
  private _date?: Date = new Date(); // 传入时间 默认当前
  constructor(formatTime?: string, date?: Date) {
    if (formatTime) this.formatTime = formatTime;
    if (date) this._date = date;
  }

  // 获取当前时间
  get getTime() {
    this._date = new Date();
    return this.replaceTime();
  }

  // 设置时间 默认当前
  setTime(now?: Date) {
    now ? this._date = now : this._date = new Date();
    return this.replaceTime();
  }

  // 格式化时间
  replaceTime(): string {
    return this.formatTime.replace(this.reg, v => this.getNowTime(v));
  }

  // 替换日期
  getNowTime(v: string) {
    const _year = String(this._date.getFullYear());
    const _month = String(this._date.getMonth() + 1);
    const _day = String(this._date.getDate());
    const _hours = String(this._date.getHours());
    const _minutes = String(this._date.getMinutes());
    const _seconds = String(this._date.getSeconds());
    const t = {
      yyyy: _year,
      M: _month,
      MM: this.concatZero(_month),
      d: _day,
      dd: this.concatZero(_day),
      H: _hours,
      HH: this.concatZero(_hours),
      m: _minutes,
      mm: this.concatZero(_minutes),
      s: _seconds,
      ss: this.concatZero(_seconds)
    };
    return t[v];
  }

  // 补零
  concatZero(v: string) {
    return v.padStart(2, "0");
  }
}

export const on = ((): any => {
  if (is_browser && document.addEventListener) {
    return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
        return () => off(element, event, handler);
      }
    };
  }
  return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
    if (element && event && handler) {
      (element as any).attachEvent(`on${ event }`, handler);
      return () => off(element, event, handler);
    }
  };
})();

export const off = ((): any => {
  if (is_browser && document.removeEventListener) {
    return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
    if (element && event) {
      (element as any).detachEvent(`on${ event }`, handler);
    }
  };
})();

export function once(element: Node, event: string, handler: EventListenerOrEventListenerObject) {
  const handlerFn = typeof handler === "function" ? handler : handler.handleEvent;
  const callback = (evt: any) => {
    handlerFn(evt);
    off(element, event, callback);
  };

  on(element, event, callback);
}

export function hasClass(el: Element, cls: string): any {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1) throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return ` ${ el.className } `.indexOf(` ${ cls } `) > -1;
}

export function addClass(el: Element, cls: string): any {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${ clsName }`;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: Element, cls: string): any {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = ` ${ el.className } `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${ clsName } `, " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/* istanbul ignore next */
export function setStyle(element: HTMLElement, styleName: string | object, value: string): void {
  if (!element || !styleName) return;

  if (typeof styleName === "object") {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    // if (styleName === 'opacity' && ieVersion < 9) {
    //   element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    // } else {
    element.style[styleName] = value;
    // }
  }
};
/* istanbul ignore next */
export const getStyle = function(element, styleName) {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

export const isScroll = (el, vertical) => {
  const determinedDirection = vertical !== null && vertical !== undefined;
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow');

  return overflow.match(/(scroll|auto|overlay)/);
};

export const getScrollContainer = (el, vertical) => {
  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
};

export function isString(obj: any): Boolean {
  return Object.prototype.toString.call(obj) === "[object String]";
}

/* istanbul ignore next */
export const camelCase = function(name: string): string {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, "Moz$1");
};


export const getAttach = (node: any): HTMLElement => {
  const attachNode = typeof node === "function" ? node() : node;
  if (!attachNode) {
    return document.body;
  }
  if (typeof attachNode == "string") {
    return document.querySelector(attachNode);
  }
  if (attachNode instanceof HTMLElement) {
    return attachNode;
  }
  return document.body;
};

/**
 * 计算class
 * @param props 组件传入值
 * @param prefix 类名前缀
 * @param preClass 类名前缀
 */
export const filterClass = (props: Object, prefix: string, preClass: string[]): string[] => {
  let r1 = [];
  let r2 = [];
  for (let key in props) {
    if (preClass.includes(key)) r1.push(`${ prefix }${ props[key] }`);
    if (key === "class") r2 = props[key].split(" ");
  }
  return [...r1, ...r2];
};

type IPropPrimitive = boolean | null | number | string | undefined;

/**
 * Represents props passable to HTML elements that can be stringified
 */
export type IProps = Record<string, IPropPrimitive | IPropPrimitive[]>;

/**
 * Returns the mapped the input [[props]] to output props, filtering out props with
 * falsy values or not matched against the input [[set]] of valid props. Also prefixes
 * attributes with the given [[prefix]] string if available
 *
 * @param props
 * @param set
 * @param prefix
 * @returns
 */
export function mapAttributes(props: IProps, set?: Set<string>, prefix: string = ""): IProps {
  let entries = Object.entries(props).filter((entry) => {
    let [attribute, value] = entry;

    if (set && !set.has(attribute)) return false;
    return Array.isArray(value) ? value.length > 0 : is_truthy(value);
  });

  entries = entries.map((entry) => {
    let [attribute, value] = entry;

    return [
      prefix ? prefix + attribute : attribute,
      Array.isArray(value) ? value.join(" ") : value
    ];
  });

  return Object.fromEntries(entries);
}

/**
 * Returns if the value is not undefined or empty string
 * @param value
 * @returns
 */
function is_truthy(value: any): boolean {
  return value !== undefined && value !== "" && value !== false;
}

type RenderIcon = {
	customClass?: string
	name?: string
}
type RenderBtn = {
	dom?: Element
	cb?: Function
	customClass?: string
	style?: string
	id?: string | number
	_id?: string | number
	name?: string
	type?: string
	text?: string
	prevIcon?: string
	nextIcon?: string
}
export class Message {
	protected readonly body: HTMLElement = document.body;
	protected container: HTMLElement; // 生成的元素
	protected id: string | number;
	protected title: string = '提示'; // MessageBox 标题
	protected message: string = ''; // MessageBox 消息正文内容
	protected readonly customClass: string = ''; // 自定义类名
	protected showClose: boolean = true; // 是否显示右上角关闭按钮
	protected type: string = ''; // 消息类型，用于显示图标 success / info / warning / error
	protected zIndex: number = 2000;
	protected beforeClose: Function = null; // 关闭前的回调，会暂停实例的关闭
	protected complete: Function = null; // 渲染完成的回调
	protected closed: Function = null; // 关闭后的回调
	constructor(options) {
		for (let option in options) {
			if (options.hasOwnProperty(option)) {
				this[option] = options[option];
			}
		}
	}
	renderType() {
		if (this.type) {
			const types = {
				success: { name: 'check-circle-filled', color: '#67c23a' },
				warning: { name: 'error-circle-filled', color: '#e6a23c' },
				info: { name: 'info-circle-filled', color: '#909399' },
				error: { name: 'close-circle-filled', color: '#f56c6c' }
			}
			return `
			<div class='be-icon' style='color: ${types[this.type].color};font-size: 24px;'>
				<i class='be-icon be-icon-${types[this.type].name}'></i>
			</div>
			`
		}
		return ''
	}
	renderBtn(ctx:RenderBtn) {
		ctx = Object.assign({ customClass: 'be-button--normal', type: 'button', text: '', style: '', id: '' }, ctx)
		return `<button class="${ctx.customClass}" type=${ctx.type} id=${ctx.id} style='${ctx.style}'>
			${this.renderIcon({ name: ctx.prevIcon })}
			<span>${ctx.text}</span>
			${this.renderIcon({ name: ctx.nextIcon })}
		</button>`
	}
	renderIcon(ctx:RenderIcon) {
		ctx = Object.assign({ customClass: '', name: '' }, ctx)
		return ctx.name ? `<i class='be-icon be-icon-${ctx.name} ${ctx.customClass}'></i>` : ''
	}

	getIdName(str: string | number) {
		return 'message_' + this.zIndex + '_' + str
	}
}

/**
 * MessageBox 弹框
 * @description 模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。
 */
export class MessageBox extends Message {
	private style: string; // body样式恢复
	private readonly buttons: [RenderBtn?] = [];
	private closeOnClickModal: boolean = true; // 是否可通过点击遮罩关闭 MessageBox
	private lockScroll: boolean = true; // 是否在 MessageBox 出现时将 body 滚动锁定
	private node: Element;

	constructor(options) {
		super(options)
		for (let option in options) {
			if (options.hasOwnProperty(option)) {
				this[option] = options[option];
			}
		}
		this.init();
	}

	init() {
		this.id = `MessageBoxWrapper_${this.zIndex}`
		this.container = document.createElement('div');
		this.container.classList.add('be-message-box__wrapper');
		if (this.customClass) this.container.classList.add(this.customClass);
		this.container.style.zIndex = String(this.zIndex)
		this.container.setAttribute('id', this.id)
		this.container.setAttribute('tabindex', '-1')
		this.container.setAttribute('role', 'dialog')
		this.container.setAttribute('aria-modal', 'true')
		this.container.setAttribute('aria-label', this.title)

		this.container.innerHTML = `
				<div class='be-message-box__mask'></div>
				<div class='be-message-box'>
					<div class='be-message-box__header'>
						<div class='be-message-box__title'><span>${this.title}</span></div>
						${this.showClose ? this.renderBtn({ customClass: 'be-message-box__headerbtn', nextIcon: 'close', text: '' }) : ''}
					</div>
					<div class='be-message-box__content'>
						<div class='be-message-box__container'>
							<div class='be-message-box__status'>${this.renderType()}</div>
							<div class='be-message-box__message'><p>${this.message}</p></div>
						</div>
					</div>
					<div class='be-message-box__btns'>
						${this.renderButtons()}
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
		this.node = this.container.querySelector('.be-message-box'); // 底部遮照层
		const maskDom = this.container.querySelector('.be-message-box__mask'); // 底部遮照层
		const closeDom = this.container.querySelector(".be-message-box__headerbtn"); // 关闭
		// 绑定事件
		maskDom && maskDom.addEventListener('click', () => this.closeOnClickModal && this._beforeClose());
		closeDom && closeDom.addEventListener("click", () => this._beforeClose());
		this.bindButtonsEvent()
		this.zIndex++
	}
	renderButtons() {
		if (this.buttons.length <= 0) return ''
		let str = ''
		const isLast = i => i < this.buttons.length
		this.buttons.map((el:RenderBtn, index) => {
			const _id = this.getIdName(index)
			str += this.renderBtn({ ...el, id: this.getIdName(index), style: isLast(index) ? 'margin-right: 10px;' : '' })
			if (el.cb) el['_id'] = _id
		});
		return str
	}
	bindButtonsEvent() {
		if (this.buttons.length > 0) {
			this.buttons.map((el:RenderBtn) => {
				if (el._id) {
					el.dom = this.container.querySelector(`#${el._id}`)
					el.dom.addEventListener("click", () => el.cb({ close: this._beforeClose.bind(this) }));
				}
			})
		}
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
		this.doAnimate()
		let timer = setTimeout(() => {
			this.recoveryScroll();
			this.body.removeChild(this.container);
			this.zIndex--
			if (this.closed) this.closed() // 回调
			clearTimeout(timer)
		}, 200)
	}

	doAnimate() {
		this.node.classList.add('be-message-box__out')
		const dom = document.querySelector(`#${this.id}`)
		dom.classList.add('message-slide-out')
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
