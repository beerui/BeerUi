/**
 * 复制到剪贴板
 * @param text
 */
export default function Clipboard(text:string|number):Promise<void> {
	text = String(text)
	if (navigator.clipboard) {
		// clipboard api 复制
		return navigator.clipboard.writeText(text);
	} else {
		let textarea = document.createElement('textarea');
		document.body.appendChild(textarea);
		// 隐藏此输入框
		textarea.style.position = 'fixed';
		textarea.style.clip = 'rect(0 0 0 0)';
		textarea.style.top = '10px';
		// 赋值
		textarea.value = text;
		// 选中
		textarea.select();
		// 复制
		document.execCommand('copy', true);
		// 移除输入框
		document.body.removeChild(textarea);
		return Promise.resolve()
	}
}
