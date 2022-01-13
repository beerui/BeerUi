<script lang="ts" >
import Notice from '$lib/utils/notice'
import { onMount } from 'svelte'
 
import { BeButton } from '$lib';
let notice;
onMount(() => {
  notice = new Notice()
})

function openInfo():void{
 notice.setNotice({
    title: '相思',
    message: '红豆生南国，春来发几枝',
    duration:0,
  })
}

function openPosInfo(position:string):void{
  let title:string = '提示'
  let message:string = '这是信息'
  if(position === 'top-right'){
    title = '提示'
    message = '两情若是久长时，又岂在朝朝暮暮。'
  }else if(position === 'top-left'){
    title = '江行寄远'
    message = '思君不可得，愁见江水碧。'
  }else if(position === 'bottom-right'){
    title = '长恨歌'
    message = '后宫佳丽三千人，三千宠爱在一身。'
  }else if(position === 'bottom-left'){
    title = '长恨歌'
    message = '在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。'
  }
  notice.setNotice({
    title,
    message,
    position,
    duration:3000
  })
}

function openColorNotice(){
  notice.setNotice({
    title: '上邪',
    message: '山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。',
    duration:3000,
    titleColor:"#2b9939",
    messageColor:"#7376f0"
  })
}


// 
let closeNotice;
function openNotice(){
closeNotice =  notice.setNotice({
    title: '滕王阁序',
    message: '落霞与孤鹜齐飞,秋水共长天一色',
    duration:0,
  })
}
function closeOne(){
  closeNotice.close()
}

function closeAll(){
  notice.closeAll()
}

function openNotice1(){
  notice.setNotice({
    title: '三五七言',
    message: '入我相思门',
    duration:3000,
    onClose:onClose
  })
}
function onClose(){
  alert('知我相思苦')
}



</script>

<div class="page-container content">
	<h2>notice</h2>
	<p>显示全局的通知提醒消息</p>
	<h3>基本用法</h3>
  <div class="demo-block demo-notice">
    <BeButton size="normal" type="default" on:click={openInfo}>点击弹出消息</BeButton>
  </div>
  <h3>指定位置</h3>
  <p>默认为<code>top-right</code>可选择<code>bottom-right</code><code>top-left</code><code>bottom-left</code></p>
  <div class="demo-block demo-notice">
    <BeButton size="normal" type="default" on:click={() =>openPosInfo('top-right')}>右上角</BeButton>
    <BeButton size="normal" type="default" on:click={() =>openPosInfo('bottom-right')}>右下角</BeButton>
    <BeButton size="normal" type="default" on:click={() =>openPosInfo('top-left')}>左上角</BeButton>
    <BeButton size="normal" type="default" on:click={() =>openPosInfo('bottom-left')}>左下角</BeButton>
  </div>
  <h3>自定义颜色</h3>
  <p>添加参数<code>titleColor</code>可修改标题颜色,添加<code>messageColor</code>可修改信息颜色</p>
  <div>
    <BeButton size="normal" type="default" on:click={openColorNotice}>自定义颜色</BeButton>
  </div>
  <h3>手动关闭</h3>
  <p>目前手动关闭只能关闭最后一个notice使用<code>close</code>如果要一次性关闭所有可使用<code>closeAll</code>
  <div>
    <BeButton size="normal" type="default" on:click={openNotice}>弹出</BeButton>
    <BeButton size="normal" type="default" on:click={closeOne}>关闭</BeButton>
    <BeButton size="normal" type="default" on:click={closeAll}>关闭所有</BeButton>
  </div>
  <h3>监听notice关闭</h3>
  <p>添加参数<code>onClose</code>类型为<code>Function</code></p>
  <div>
    <BeButton size="normal" type="default" on:click={openNotice1}>弹出</BeButton>
  </div>
</div>
