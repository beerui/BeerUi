<script>
	import Logo from '$lib/demo/Logo.svelte';
</script>
<svelte:head>
	<title>BeerUi</title>
	<meta name="description" content="BeerUi, base on svelte 3.0 web component">
	<meta name="keywords" content="BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div style='width: 200px;margin: 30px auto;'>
	<Logo />
</div>
<h3 class='title'>怎么来的？</h3>
<div class='m-content'>
	<div class='content'>
		2021年11月19日晚,在路边摊此起彼伏的喧闹声中。"来!干杯",一口啤酒入喉,沁人心腑。玩笑中又透露出一丝的认真,叫BeerUI吧!在这一天一个Svelte UI 组件库BeerUI诞生了。
	</div>
	<div class='content'>
		就像它的名字Beer一样,我们致力于使用它时如啤酒般清爽,平顺甘醇,也流露出些许的不羁与放荡,回味时也有丝丝的香甜,让你欲罢不能流连忘返。
	</div>
	<div class='content'>
		当然这也是我们坚定不移的理念,在这充满荆棘且蜿蜒曲折的路上,以键盘为剑,我们握紧手中剑披荆斩棘走在这路上,通向崇高的目标的道路,总是崎岖的艰难的,也许会慢但是我们永远不会停止。
	</div>
</div>
<style lang='scss'>
	.title {color: #f0f8ff;text-align: center;margin: 30px 0;font-size: 80px;text-shadow: 0 4px 4px rgb(0 0 0 / 25%);}
	.m-content {background: rgb(255 255 255 / 5%);padding: 60px 0;margin-bottom: 60px;}
	.content{
		color: #f0f8ff;text-indent:50px;padding-bottom: 20px;width: 50%; margin: 0 auto;line-height: 1.8;
		font-size: 18px;letter-spacing: 1.2px;text-shadow: 0 4px 4px rgb(0 0 0 / 25%);
	}
</style>
