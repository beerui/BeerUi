
/**
 * 
 */

export default class Notice{
  title: string|HTMLElement; // 标题
  content: string|HTMLElement; // 内容
  // htmlContainer: Array<HTMLCollection>; // 元素
  private _body:HTMLElement = document.body // 私有属性 获取body
  position:string;

  constructor(title:string|HTMLElement, content:string|HTMLElement,position?:string){
    this.title = title;
    this.content = content;
    this.position = position || 'top-right'; 
    this.setHTML()
  }
  /**
   * 多次点击会出现多个 每个dom元素的高为78 间隔为16
   */
  setHTML():void{
  // if(this.htmlContainer.length>1){
  //   console.log(this.htmlContainer[0].offsetTop);
  // }
   const container:HTMLElement = document.createElement('div');
    container.classList.add('be-notify');
    const pos:string[] =  this.position.split('-');
    container.classList.add(pos[1]);
    container.innerHTML = `
    <div class="be-notify__group">
      <h2 class="be-notify__title">${this.title}</h2>
      <div class="be-notify__content">${this.content}</div>
    </div>
    `;
    this._body.appendChild(container);
    const length = this.htmlDoms.length
    if(this.htmlDoms&&length === 1){
      (this.htmlDoms[0] as HTMLElement).style[pos[0]] = '16px'
    }else{
      (this.htmlDoms[length - 1] as HTMLElement).style[pos[0]] = (this.htmlDoms[length-2] as HTMLElement)[`offset${pos[0].replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}`] + 110 + 'px'
    }
    // for (let i = 0; i < this.htmlDoms.length; i++) {
    //   const item = (this.htmlDoms[i] as HTMLElement);
    //   // this.htmlDoms[0]
    //   item.style['z-index'] = 2000 + i*1 
    //   const pos:string[] =  this.position.split('-');
    //   if(i === 0){
    //     item.classList.add(pos[1]);

    //     item.style[pos[0]] = '16px'
    //   }else{
    //     item.style[pos[0]] =(this.htmlDoms[i-1] as HTMLElement).offsetTop + 110 +'px'
    //     console.log((this.htmlDoms[i-1] as HTMLElement).offsetTop);
    //   }
    // }
  }

  get htmlDoms():NodeList{
    return document.querySelectorAll('.be-notify')
  }

  setPosition(position:string):string[]{
    return position.split('-')
  }
}