const loadingNode:HTMLElement = document.createElement('div');
addClass(loadingNode, 'be-loading-mask')
loadingNode.innerHTML = `<div class="be-loading-spinner">
  <svg class="circular" viewBox="25 25 50 50">
    <circle class="path" cx="50" cy="50" r="20" fill="none"/>
  </svg>
</div>`


type options = {
  target?: Element | String,
  fullscreen?: Boolean,
  background?: string
}

export class loadingSerive {
  target: Element
  fullscreen: Boolean
  background: string
  node: Node
  constructor(option?: options) {
    // this.target = option.target || document.body
    this.fullscreen = option?.fullscreen || true
    this.background = option?.background ||  ''
    if(isString(option?.target)) {
      this.target = document.querySelector(<string>option?.target)
    } else {
      this.target = <Element>option?.target || document.body
    }
    this.node = loadingNode.cloneNode(true)
  }
  show() {
    addClass(this.target, 'be-loading-position')
    this.target.appendChild(this.node)
  }
  close() {
    removeClass(this.target, 'be-loading-position')
    this.target.removeChild(this.node)
  }
}

export function loading(node, loading) {
  // node已挂载在DOM中
  const nodeDom = loadingNode.cloneNode(true)
  if(loading) {
    addClass(node, 'be-loading-position')
    node.appendChild(nodeDom)
  }
  return {
    update(loading) {
      // `bar` 已发生变更
      if(loading) {
        addClass(node, 'be-loading-position')
        node.appendChild(nodeDom)
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
/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};
/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.setAttribute('class', curClass);
  }
};

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.setAttribute('class', trim(curClass));
  }
};
const trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}
function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}