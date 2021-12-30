/**
 * 图片预览
 * @param {string} src 当前图片链接
 * @param {string[]} list 图片数组
 * @param {function} cb 图片切换后 监听的回调
 */
export const previewImages = (src: string, list?: string[], cb?: Function):PreviewImage => new PreviewImage(src, list, cb)

export class PreviewImage {
	private readonly body: HTMLElement = document.body
	public src: string // 传入图片的 URL
	public list?: string[] // 图片列表
	private container: HTMLElement // 生成的元素
	private _index: number = 0 // 当前展示的图片索引
	private node: HTMLImageElement // 图片元素节点
	private static instance: PreviewImage // 当前实例
	private cb: Function // 图片切换后 监听的回调
	private style: string // body样式恢复
	constructor(src: string, list: string[] = [], cb?: Function) {
		if (!PreviewImage.instance) {
			this.src = src
			this.list = list
			if (cb) this.cb = cb
			this.init()
			PreviewImage.instance = this
		}
		return PreviewImage.instance
	}
	get current() {
		return {
			list: this.list,
			current: this.src,
			index: this._index
		}
	}
	get index() {
		return this._index
	}
	// 图片切换时触发
	watchHandle(cb?: Function) {
		if (cb) this.cb = cb
		this.cb && this.cb(this.current)
	}
	init() {
		if (document.querySelector('.be-preview')) {
			this.container = document.querySelector('.be-preview')
		} else {
			this.container = document.createElement('div')
			this.container.classList.add('be-preview')
			this.container.innerHTML = `
				<div class="be-preview__mask"></div>
				<div class="be-preview__btn be-preview__close">×</div>
				<div class="be-preview__btn be-preview__prev"> ‹ </div>
				<div class="be-preview__btn be-preview__next"> › </div>
				<div class="be-preview__container">
					<img class="be-preview__img" alt="image preview" src="" />
				</div>
			`
		}
		this.disableScroll()
		this.renderImage()
		this.body.appendChild(this.container)
	}
	renderImage() {
		// 获取节点
		this.node = this.container.querySelector('.be-preview__img')
		const maskDom = this.container.querySelector('.be-preview__mask') // 底部遮照层
		const closeDom = this.container.querySelector('.be-preview__close') // 关闭
		const prevDom = this.container.querySelector('.be-preview__prev') // 上一张
		const nextDom = this.container.querySelector('.be-preview__next') // 下一张
		// 绑定事件
		maskDom.addEventListener("click", () => this.close())
		closeDom.addEventListener("click", () => this.close())
		prevDom.addEventListener("click", () => this.changeImage('prev'))
		nextDom.addEventListener("click", () => this.changeImage('next'))

		// 图片数组不为零 计算当前图片的索引值
		if (this.list.length > 0) {
			let _index = 0
			for (let i = 0; i < this.list.length; i++) {
				if (this.src === this.list[i]) {
					_index = i
					break
				}
			}
			this._index = _index
		} else {
			this.list = [this.src]
		}
		this.node.src = this.list[this._index]
		this.watchHandle()
	}
	changeImage(type:string) {
		if (type === 'prev') this._index--
		if (type === 'next') this._index++
		if (this._index < 0) this._index = this.list.length - 1
		if (this._index >= this.list.length) this._index = 0
		this.node.src = this.list[this._index]
		this.watchHandle()
	}
	close() {
		this.recoveryScroll()
		this.body.removeChild(this.container)
		PreviewImage.instance = null
		this._index = 0
		this.node = null
		this.cb = null
		this.list = []
	}

	// 禁用 / 释放滚动条
	private disableScroll() {
		this.style = this.body.style.overflow
		this.body.style.overflow = 'hidden'
	}
	private recoveryScroll() {
		this.body.style.overflow = this.style
	}
}
