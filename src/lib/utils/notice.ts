
/**
 * 
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
  verticalOffset:number,
}
const instances:Array<instanceType> = [];
export default class Notice{
  title: string|HTMLElement; // 标题
  content: string|HTMLElement; // 内容
  duration:number;
  // htmlContainer: Array<HTMLCollection>; // 元素
  private _body:HTMLElement = document.body // 私有属性 获取body
  position:string;
  // private instance:instanceType = <instanceType>{} ;
  seed:number = 1;

  constructor(){

  }
  /**
   * 
   */
   setNotice(options:options):void{
    this.title = options.title;
    this.content = options.message;
    this.position = options.position || 'top-right'; 
    this.duration = options.duration || 0
    const instance=<instanceType>{};

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
    instance.duration = this.duration
    instance.id = this.seed ++
    instance.position = this.position;
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
    instance.verticalOffset = verticalOffset;
    container.style[this.setProperty(this.position)] = verticalOffset + 'px';
    instance.dom.addEventListener('animationend',(e)=>{
      container.classList.remove('be-notify-fade');
    })
    this.close()
  }

  close(){
    for (let i = 0; i < instances.length; i++) {
      const element = instances[i];
      setTimeout(() => {
        // element.dom.style.display = 'none';
        if(element.dom.parentNode){
          element.dom.parentNode.removeChild(element.dom);
        console.log( element.dom);

        if(instances[i+1]){
          instances[i+1].dom.style.top = element.verticalOffset + 'px'
        }
        instances.splice(i,1)
      }
      }, element.duration*1);
    }
  }

  destroyElement(){
    console.log('销毁了');
    // instance.dom.removeEventListener('animationend',this.destroyElement.bind(this))
    // instance.dom.parentNode.removeChild(instance.dom)
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