<script lang="ts" >
  import { notify } from '$lib/utils/beerui';

import { BeButton } from '$lib';

function openInfo():void{
  notify('相思', '红豆生南国,春来发几枝,红豆生南国,春来发几枝,红豆生南国,春来发几枝')
}

</script>

<section class="page-container content">
	<h2>notice</h2>
	<p>显示全局的通知提醒消息</p>
	<h3>基本用法</h3>
    <BeButton size="normal" type="default" on:click={openInfo}>点击弹出消息</BeButton>
</section>