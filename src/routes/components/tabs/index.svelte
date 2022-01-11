<script lang="ts">
	import { BeTabs, BeTabPane } from '$lib';
	import type { TabItem } from '$lib/common';

	let active = 'u1'
	const tabClick = (evt) => {
		active = evt.detail
	}
	let items:TabItem[] = [{ key: 'u1', label: '用户管理' }, { key: 'u2', label: '配置管理' }, { key: 'u3', label: '角色管理' }, { key: 'u4', label: '定时任务补偿' } ]
</script>
<div class='page-container'>
	<h2>Tabs 选项卡切换</h2>
	<p class='desc'>选项卡切换。</p>
	<h3>基本用法</h3>
	<div class="demo-block demo-dialog">
		<BeTabs bind:active={active} {items} on:tabClick={tabClick}>
			{#each items as item}
			<BeTabPane {active} {...item}>
				<h3>{item.label}</h3>
				<h3>选项卡切换</h3>
			</BeTabPane>
			{/each}
		</BeTabs>
	</div>
</div>
