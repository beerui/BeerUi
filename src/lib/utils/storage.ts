/**
 * 设置本地存储
 * @param key
 * @param value {object} // 不允许储存简单的 数字/字符串
 * @description { key: 'BEER_THEME', value: { k: 'theme', v: 1 } }
 */
export const setStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};
/**
 * 取出本地存储
 * @param key
 */
export const getStorage = (key) => {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (e) {
		console.error(e);
		return null;
	}
};
