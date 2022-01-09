<script lang="ts" >
  import { notify } from '$lib/utils/beerui';

import { BeButton } from '$lib';

function openInfo():void{
  notify({
    title: '相思',
    message: '红豆生南国,春来发几枝,红豆生南国.愿君多采撷，此物最相思'
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
  notify({title,message,position})
}


</script>

<section class="page-container content">
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
</section>