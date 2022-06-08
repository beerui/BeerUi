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

type BeerPublishSubscribe = {
  id: number,
  callbacks: {},
  subscribe?: Function,
  publish?: Function,
  unsubscribe?: Function,
}

// 生成唯一KEY
export const genKey = (length: number = 3): string => Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);

export const BeerPS: BeerPublishSubscribe = {
  id: 1,
  callbacks: {}
};
// 订阅
BeerPS.subscribe = function(channel, callback) {
  let token = "token_" + this.id++;

  if (this.callbacks[channel]) {
    this.callbacks[channel][token] = callback;
  } else {
    this.callbacks[channel] = {
      [token]: callback
    };
  }
  return token;
};
// 发布
BeerPS.publish = function(channel, data) {
  if (this.callbacks[channel]) {
    Object.values(this.callbacks[channel]).forEach(cb => publishCallback(cb, data));
    // Object.values(this.callbacks[channel]).forEach(callback => callback(data))
  }
};
const publishCallback = (callback, data) => callback(data);
// 清空
BeerPS.unsubscribe = function(flag) {
  if (flag === undefined) {
    this.callbacks = {};
  } else if (typeof flag === "string") {
    if (flag.indexOf("token_") === 0) {
      let callbackObj = Object.values(this.callbacks).find(obj => Object.prototype.hasOwnProperty.call(obj, flag));
      if (callbackObj) delete callbackObj[flag];
    } else {
      this.callbacks && delete this.callbacks[flag];
    }

  }
};

export const publish = (name, data) => {
	const key = `${name}_${ genKey() }`
	BeerPS.publish(key, data);
	return key
}


export const subscribe = (key) => {
	return BeerPS.subscribe(key, items => {
		return items
	})
}
