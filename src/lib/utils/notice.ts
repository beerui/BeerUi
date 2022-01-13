/**
 * this is notice component
 */

 interface options {
  title:string,
  message:string,
  duration?:number,
  position?:string
}

interface instanceType extends options {
  id:number,
  dom:HTMLElement,
  timer:NodeJS.Timeout|null,
  verticalOffset:number,
  verticalProperty:string,
}

export default class Notice{
  title: string; // 标题
  message: string; // 内容
  duration:number; // 间隔
  position:string; // 位置
  private _body:HTMLElement = document.body // 私有属性 获取body
  instances:Array<instanceType> = [];  // 储存弹窗信息
  instance = <instanceType>{};
  seed = 0;
  id:number;

  // constructor(){
  // }

  setNotice(options:options):void {
    this.title = options.title;
    this.message = options.message;
    this.position = options.position || 'top-right';
    this.duration = options.duration || 0
    this.setHtml()
  }

  setHtml():void {
    const container:HTMLElement = document.createElement('div');
    container.classList.add('be-notify');
    container.classList.add(this.setPositionClass(this.position));
    container.innerHTML = `
    <div class="be-notify__group">
      <h2 class="be-notify__title">${this.title}</h2>
      <div class="be-notify__content">${this.message}</div>
    </div>
    `;
    this._body.appendChild(container);
    // container.classList.add('be-notify-fade');
    setTimeout(() => {
      container.style.transform = "translateX(0%)"
    });

    const instance=<instanceType>{};
    this.id = this.seed ++
    instance.dom = container
    instance.duration = this.duration
    instance.id = this.id
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
    instance.timer = setTimeout(() => {
      this.close(instance.id)
    }, instance.duration);
  }

  close(id:number):void {
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
    const position = instance.position
    const removeHeight = instance.dom.offsetHeight
    instance.dom.parentNode.removeChild(instance.dom);
    this.instances.splice(index, 1);
    clearTimeout(instance.timer);
    if(len <= 1) return;
    for (let i = index; i < len - 1; i++) {
      if(this.instances[i].position === position){
        this.instances[i].dom.style[instance.verticalProperty] = parseInt(this.instances[i].dom.style[instance.verticalProperty],10) - removeHeight - 16 + 'px';
      }
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