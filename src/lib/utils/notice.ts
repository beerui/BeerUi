
/**
 * 
 */

export default class Notice{
  title: string|HTMLElement; // 标题
  content: string|HTMLElement; // 内容
  htmlContainer: HTMLElement; // 元素
  private _body:HTMLElement = document.body // 私有属性 获取body
  position:string = 'top-right';

  constructor(title:string|HTMLElement, content:string|HTMLElement,position?:string){
    this.title = title;
    this.content = content;
    // this.position = position;
    this.setHTML()
  }
  /**
   * 多次点击会出现多个 每个dom元素的高为78 间隔为16
   */
  setHTML():void{
    this.htmlContainer = document.createElement('div');
    this.htmlContainer.classList.add('be-notify');

    let pos =  this.position.split('-')
    console.log(pos);
    this.htmlContainer.classList.add(pos[1]);
    this.htmlContainer.style[pos[0]] = '16px'
    this.htmlContainer.innerHTML = `
    <div class="be-notify__group">
      <h2 class="be-notify__title">${this.title}</h2>
      <div class="be-notify__content">${this.content}</div>
    </div>
    `;
    console.log(this.htmlContainer);
    this._body.appendChild(this.htmlContainer);
  }

  setPosition(position:string):string[]{
    return position.split('-')
  }
}