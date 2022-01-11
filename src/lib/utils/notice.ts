
/**
 * 
 */
 interface options {
    title:string,
    message:string,
    position?:string
}

interface instanceType extends options {
  dom:HTMLElement
}
const instances:Array<instanceType> = [];
export default class Notice{
  title: string|HTMLElement; // 标题
  content: string|HTMLElement; // 内容
  // htmlContainer: Array<HTMLCollection>; // 元素
  private _body:HTMLElement = document.body // 私有属性 获取body
  position:string;
  
  constructor(options:options){
    this.title = options.title;
    this.content = options.message;
    this.position = options.position || 'top-right'; 
    this.setHTML()
  }
  /**
   * 
   */
  setHTML():void{
    const instance = <instanceType>{};
    const container:HTMLElement = document.createElement('div');
    container.classList.add('be-notify');
    container.classList.add(this.setPositionClass(this.position));

    container.innerHTML = `
    <div class="be-notify__group">
      <h2 class="be-notify__title">${this.title}</h2>
      <div class="be-notify__content">${this.content}</div>
    </div>
    `;
    this._body.appendChild(container);
    container.classList.add('be-notify-fade');

    instance.position = this.position
    instance.dom = container;
    instances.push(instance);
    let verticalOffset:number = 0;
    // 将同一位置的弹框过滤到一个数组中并设置偏移量
    instances.filter(item => item.position === this.position).forEach((item,index) =>{
      item.dom.style['z-index'] = 2000 + index
      if(index !==0 ){
        verticalOffset += item.dom.offsetHeight + 16
      }else{
        verticalOffset = 0
      }
    })

    verticalOffset += 16;
    container.style[this.setProperty(this.position)] = verticalOffset + 'px';
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