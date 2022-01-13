/**
 * this is notice component
 */

 interface options {
  title:string,
  message:string,
  onClose?:() => void,
  onClick?:() => void,
  duration?:number,
  position?:string
  titleColor?:string
  messageColor?:string
}

interface instanceType extends options {
  id:number,
  dom:HTMLElement,
  timer:NodeJS.Timeout|null,
  verticalOffset:number,
  verticalProperty:string,
  close?:() => void
}

export default class Notice{
  title: string; // 标题
  message: string; // 内容
  duration:number; // 间隔
  position:string; // 位置
  private _body:HTMLElement = document.body // 私有属性 获取body
  instances:Array<instanceType> = [];  // 储存弹窗信息
  // instance = <instanceType>{};
  seed = 0;
  id:number;
  titleColor:string
  messageColor:string
  // constructor(){
  // }

  setNotice(options:options):instanceType {
    this.title = options.title;
    this.message = options.message;
    this.position = options.position || 'top-right';
    this.duration = options.duration || 0
    this.titleColor = options.titleColor
    this.messageColor = options.messageColor
    const userOnClose = options.onClose
    
    const container:HTMLElement = document.createElement('div');
    container.classList.add('be-notify');
    container.classList.add(this.setPositionClass(this.position));
    container.innerHTML = `
    <div class="be-notify__group">
      <h2 class="be-notify__title" style="color:${this.titleColor?this.titleColor:'#000'}" >${this.title}</h2>
      <div class="be-notify__content" style="color:${this.messageColor?this.messageColor:'#000'}" >${this.message}</div>
    </div>
    `;
    this._body.appendChild(container);
    setTimeout(() => {
      container.style.transform = "translateX(0%)"
    });

    const instance=<instanceType>{};
    this.id = this.seed ++
    instance.dom = container
    instance.duration = this.duration
    instance.id = this.id
    instance.onClose = ()=> {
      this.close(instance.id,userOnClose)
    }
    instance.close = ()=> {
      this.close(instance.id,userOnClose)
    }
    instance.position = this.position
    instance.verticalProperty = this.setProperty(this.position)
    this.instances.push(instance);
    let verticalOffset = 0;
      // 将同一位置的弹框过滤到一个数组中并设置偏移量
      
    this.instances.filter(item => item.position === this.position).forEach((item,index) =>{
      item.dom.style['z-index'] = 2000 + index
      if(index !==0 ){
        verticalOffset += item.dom.offsetHeight + 16
      }else{
        verticalOffset = 0
      }
    })
    verticalOffset += 16;
    instance.verticalOffset = verticalOffset;
    instance.dom.style[this.setProperty(this.position)] = verticalOffset + 'px';
    if(instance.duration>0){
      instance.timer = setTimeout(() => {
        this.close(instance.id,userOnClose);
      }, instance.duration);
    }

    return instance
  }

  close(id:number,userOnClose):void {
    let index = -1
    const len = this.instances.length
    const instance = this.instances.filter((instance,i)=>{
      if (instance.id === id) {
        index = i;
        return true;
      }
      return false;
    })[0]
    if(!instance) return;

    if(typeof userOnClose === 'function'){
      userOnClose(instance)
    }
    const position = instance.position
    const removeHeight = instance.dom.offsetHeight
    instance.dom.parentNode.removeChild(instance.dom);
    this.instances.splice(index, 1);
    clearTimeout(instance.timer);
    instance.timer = null
    if(len <= 1) return;
    for (let i = index; i < len - 1; i++) {
      if(this.instances[i].position === position){
        this.instances[i].dom.style[instance.verticalProperty] = parseInt(this.instances[i].dom.style[instance.verticalProperty],10) - removeHeight - 16 + 'px';
      }
    }
  }
  closeAll(){
    for (let i = this.instances.length - 1; i >=0; i--) {
      this.instances[i].close()
    }
  }
    // 设置弹框类名
  setPositionClass(position:string):string{
    return position.includes('right') ? 'right':'left'
  }
  // 设置弹框样式属性
  setProperty(position:string):string {
    return /^top-/.test(position) ? 'top' : 'bottom'
  }
}