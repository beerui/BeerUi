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

export function objectAssign(target) {
	for (let i = 1, j = arguments.length; i < j; i++) {
		let source = arguments[i] || {};
		for (let prop in source) {
			if (source.hasOwnProperty(prop)) {
				let value = source[prop];
				if (value !== undefined) {
					target[prop] = value;
				}
			}
		}
	}

	return target;
}

export function getPropByPath(obj, path, strict = undefined) {
	let tempObj = obj;
	path = path.replace(/\[(\w+)\]/g, '.$1');
	path = path.replace(/^\./, '');

	let keyArr = path.split('.');
	let i = 0;
	for (let len = keyArr.length; i < len - 1; ++i) {
		if (!tempObj && !strict) break;
		let key = keyArr[i];
		if (key in tempObj) {
			tempObj = tempObj[key];
		} else {
			if (strict) {
				throw new Error('please transfer a valid prop path to form item!');
			}
			break;
		}
	}
	return {
		o: tempObj,
		k: keyArr[i],
		v: tempObj ? tempObj[keyArr[i]] : null
	};
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
 * 过滤数组
 * 1、固定数目
 * 2、当前位置在中间
 * 3、返回过滤后的数组 不能超出或小于 list
 * @param list 需要过滤的数组
 * @param current 当前所在位置
 * @param count 需要返回的位数
 * @return { Array }
 */
export const filterMidArray = (list, current, count) => {
	let result = [] // 存储结果
	const preResult = [] // 对比前的数组
	const total = list.length // 总页数
	current = Number(current)
	const mid = Math.floor(count/2) // 中位数
	for (let i = current-mid;i < current-mid + count; i++) {
		preResult.push(i)
	}
	// 同传入的数组对比 取相同项
	result = preResult.filter(el => list.includes(el))
	let len = result.length
	const isInHead = preResult[preResult.length-1] > total // 是否需要倒过来补位
	// 补位
	while (len < count) {

		if (isInHead) {
			const num = result[0] - (count - len)
			result.unshift(num)
			len++
		} else {
			len++
			result.push(len)
		}
	}
	return result
}
