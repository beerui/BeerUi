<script lang="ts">
	import { BeTabs, BeTabPane } from '$lib';
	import FancyList from '$lib/FancyList.svelte';

	let active = 'first'
	const handleClick = (tab, event) => {
		console.log(tab, event);
	}
	let items:string[] = ['用户管理', '配置管理', '角色管理', '定时任务补偿' ]
	let item
	$: {
		console.log(item);
	}
</script>
<div class='page-container'>
	<h2>Tabs 选项卡切换</h2>
	<p class='desc'>选项卡切换。</p>
	<h3>基本用法</h3>
<!--	<div class="demo-block demo-dialog">-->
<!--		<BeTabs let:active={active} on:tab-click={handleClick}>-->
<!--			<BeTabPane label="用户管理" name="first">用户管理</BeTabPane>-->
<!--			<BeTabPane label="配置管理" name="second">配置管理</BeTabPane>-->
<!--			<BeTabPane label="角色管理" name="third">角色管理</BeTabPane>-->
<!--			<BeTabPane label="定时任务补偿" name="fourth">定时任务补偿</BeTabPane>-->
<!--		</BeTabs>-->
<!--	</div>-->
	<FancyList items={items} let:item={item}>
		<div>{item}</div>
	</FancyList>
</div>
