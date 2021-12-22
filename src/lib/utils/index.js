const consecutiveSpace = / {2,}/;

/**
 * 删除类字符串中的额外空白。
 * @param {string} classString 要修剪的字符串
 * @returns {string} Clean class string
 */
export function stripClassWhitespace(classString) {
	return classString.replace(consecutiveSpace, ' ').trimRight();
}

/**
 * Filters out falsy classes.
 * @param {...(string | false | null)} args The classes to be filtered
 * @return {string} The classes without the falsy values
 */
export function classes(...args) {
	return args.filter(cls => !!cls).join(' ');
}

/**
 * 深拷贝
 * @param { Object } target 原对象
 * @param { Map } map 已克隆的容器
 * @returns { Object }
 */
export function deepClone(target, map = new Map()) {
	// 检测数据类型
	if (typeof target === 'object' && target !== null) {
		let cache = map.get(target) // 判断数据是否克隆过 解决循环引用问题
		if (cache) return cache
		let isArray = Array.isArray(target) // 判断目标数据类型
		const result = isArray ? [] : {}
		map.set(target, result) // 存入容器
		if (isArray) {
			// 数组
			target.forEach((item, index) => {
				result[index] = deepClone(item, map)
			})
		} else {
			// 对象 获取所有的键名，遍历
			Object.keys(target).forEach(key => {
				result[key] = deepClone(target[key], map)
			})
		}
		return result
	} else {
		return target
	}
}

/**
 * 字符串截断
 * @param { String } str
 * @param { Number } size
 * @returns {String}
 */
export function truncate(str, size) {
	return str.slice(0, size) + '...'
}

/**
 * 展开多维数组
 * @param { Array } arr
 * @returns {Array}
 */
export function flatten(arr) {
	let result = [...arr]
	while (result.some(item => Array.isArray(item))) {
		result = [].concat(...result)
	}
	return result
}

/**
 * 数组分块
 * @param { Array } arr 原数组
 * @param { Number } size 分几块
 * @returns {Array}
 */
export function chunk(arr, size = 1) {
	let result = []
	let tmp = []

	arr.forEach(item => {
		if (tmp.length === 0) {
			result.push(tmp)
		}

		tmp.push(item)

		if (tmp.length === size) {
			tmp = []
		}
	})
	return result
}

/**
 * 数组差集
 * @param { Array } arr1
 * @param { Array } arr2
 * @returns { Array }
 */
export function difference(arr1, arr2 = []) {
	if (arr1.length === 0) return []
	if (arr2.length === 0) return arr1.slice()
	return arr1.filter(item => !arr2.includes(item))
}

/**
 * 合并两个对象
 * @param objs
 * @returns {{}}
 */
export function mergeObject(...objs) {
	const result = {}

	objs.forEach(obj => {
		Object.keys(obj).forEach(key => {
			if (Object.prototype.hasOwnProperty.call(result, key)) {
				result[key] = [].concat(result[key], obj[key])
			} else {
				result[key] = obj[key]
			}
		})
	})
	return result
}

/**
 * 事件委托
 * @param { any } el 元素标识
 * @param { String } type
 * @param { Function } fn
 * @param { String } selector tag标签
 */
export function addEventListener(el, type, fn, selector) {
	if (typeof el === 'string') {
		el = document.querySelector(el)
	}
	if (!selector) {
		el.addEventListener(type, fn)
	} else {
		el.addEventListener(type, function(e) {
			const target = e.target
			if (target.matches(selector)) {
				fn.call(target, e)
			}
		})
	}
}

export const eventBus = {
	callbacks: {}
}

eventBus.on = function(type, callback) {
	if (this.callbacks[type]) {
		this.callbacks[type].push(callback)
	} else {
		this.callbacks[type] = [callback]
	}
}

eventBus.emit = function(type, data) {
	if (this.callbacks[type] && this.callbacks[type].length > 0) {
		this.callbacks[type].forEach(callback => {
			callback(data)
		})
	}
}

eventBus.off = function(eventName) {
	if (eventName) {
		this.callbacks && delete this.callbacks[eventName]
	} else {
		this.callbacks = {}
	}
}

export const BeerPS = {
	id: 1,
	callbacks: {}
}
// 订阅
BeerPS.subscribe = function(channel, callback) {
	let token = 'token_' + this.id++

	if (this.callbacks[channel]) {
		this.callbacks[channel][token] = callback
	} else {
		this.callbacks[channel] = {
			[token]: callback
		}
	}
	return token
}
// 发布
BeerPS.publish = function(channel, data) {
	if (this.callbacks[channel]) {
		Object.values(this.callbacks[channel]).forEach(callback => {
			callback(data)
		})
	}
}
// 清空
BeerPS.unsubscribe = function(flag) {
	if (flag === undefined) {
		this.callbacks = {}
	} else if (typeof flag === 'string') {
		if (flag.indexOf('token_') === 0) {
			let callbackObj = Object.values(this.callbacks).find(obj => Object.prototype.hasOwnProperty.call(obj, flag))
			if (callbackObj) delete callbackObj[flag]
		} else {
			this.callbacks && delete this.callbacks[flag]
		}

	}
}
