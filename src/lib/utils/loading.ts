import { addClass, removeClass, setStyle, isString } from '$lib/utils/beerui';
import { browser } from '$app/env';

if (browser) {
  const loadingNode:HTMLElement = document.createElement('div');
  addClass(loadingNode, 'be-loading-mask')
  loadingNode.innerHTML = `<div class="be-loading-spinner">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none"/>
    </svg>
    <p class="loading-text"></p>
  </div>
  `
}


type options = {
  target?: Element | String,
  // fullscreen?: Boolean,
  background?: string,
  customClass?:string
  text?:string
}

export class loadingSerive {
  target: Element
  // fullscreen: Boolean
  background: string
  // color:string
  text:string
  customClass:string
  node: Node
  constructor(option?: options) {
    // this.target = option.target || document.body
    // this.fullscreen = option?.fullscreen || true
    this.background = option?.background ||  ''
    this.text = option?.text ||  '拼命加载中'
    this.customClass = option?.customClass ||  ''
    // this.color = option?.color ||  ''
    if(isString(option?.target)) {
      this.target = document.querySelector(String(option?.target))
    } else {
      this.target = <HTMLElement>option?.target || document.body
    }
    this.node = loadingNode.cloneNode(true)
  }
  show() {
    addClass(this.target, 'be-loading-position')
    this.target.appendChild(this.node)
    const mask = this.target.querySelector('.be-loading-mask')
    if(this.customClass) addClass(mask, this.customClass)
    setStyle(<HTMLElement>mask, 'background', this.background)
    const textNode = <HTMLElement>(<HTMLElement>this.target.lastChild).querySelector('.loading-text')
    textNode.innerText = this.text
  }
  close() {
    removeClass(this.target, 'be-loading-position')
    this.target.removeChild(this.node)
  }
}

export function loading(node, loading) {
  // node已挂载在DOM中
  const nodeDom = loadingNode.cloneNode(true)
  const loadingText = node.getAttribute('loading-text')
  const backgroundColor = node.getAttribute('loading-background')
  const customClass = node.getAttribute('loading-class')
  function setNode() {
    addClass(node, 'be-loading-position')
    node.appendChild(nodeDom)
    const mask = node.querySelector('.be-loading-mask')
    if(customClass) addClass(mask, customClass)
    setStyle(mask, 'background', backgroundColor)
    const textNode = node.querySelector('.loading-text')
    textNode.innerText = loadingText
  }
  if(loading) {
    setNode()
  }
  return {
    update(loading) {
      // `bar` 已发生变更
      if(loading) {
        setNode()
      }
      if(!loading)  node.removeChild(nodeDom)

      console.log('已发生变更', node,loading)
    },
    destroy(loading) {
      // node已从DOM中移除
      console.log('node已从DOM中移除', loading)
    }
  };
}

