<script lang='ts'>
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import BeMenu from '$lib/be-menu/BeMenu.svelte';
	import BeMenuItem from '$lib/be-menu/BeMenuItem.svelte';
	import BeSubMenu from '$lib/be-menu/BeSubMenu.svelte';
    import BeButton from "$lib/be-button/BeButton.svelte";
    import type { NavMenu } from "$lib/common";

    let MenuDom: NavMenu
    let setMenuActive = (key) => MenuDom.setMenuActive(key)
    const changeMenu = (evt) => console.log('changeMenu', evt.detail)

</script>
<div class='page-container'>
    <h2>NavMenu 导航菜单</h2>
    <p>为网站提供导航功能的菜单。</p>
	<h3>基础用法</h3>
    <DemoBlock
	    code={`
<BeMenu class="be-menu-demo" active="1" mode="horizontal" bind:this={MenuDom} on:change={changeMenu}>
	<BeMenuItem index="1">处理中心</BeMenuItem>
	<BeSubMenu index="2">
		<div slot="title">我的工作台</div>
		<BeMenuItem index="2-1">选项1</BeMenuItem>
		<BeMenuItem index="2-2">选项2</BeMenuItem>
		<BeMenuItem index="2-3">选项3</BeMenuItem>
		<BeSubMenu index="2-4">
			<div slot="title">选项4</div>
			<BeMenuItem index="2-4-1">选项1</BeMenuItem>
			<BeMenuItem index="2-4-2">选项2</BeMenuItem>
			<BeMenuItem index="2-4-3">选项3</BeMenuItem>
		</BeSubMenu>
	</BeSubMenu>
	<BeMenuItem index="3" disabled>消息中心</BeMenuItem>
	<BeMenuItem index="4">订单管理</BeMenuItem>
</BeMenu>
`} js={`
let MenuDom: NavMenu
let setMenuActive = (key) => MenuDom.setMenuActive(key)
const changeMenu = (evt) => console.log('changeMenu', evt.detail)
`}>
        <div slot='source'>
	        <BeButton on:click={() => setMenuActive('2-1')}>设置 我的工作台 选项1</BeButton>
            <div class='demo-list'>
				<BeMenu class="be-menu-demo" active="1" mode="horizontal" bind:this={MenuDom} on:change={changeMenu}>
					<BeMenuItem index="1">处理中心</BeMenuItem>
					<BeSubMenu index="2">
						<div slot="title">我的工作台</div>
						<BeMenuItem index="2-1">选项1</BeMenuItem>
						<BeMenuItem index="2-2">选项2</BeMenuItem>
						<BeMenuItem index="2-3">选项3</BeMenuItem>
						<BeSubMenu index="2-4">
							<div slot="title">选项4</div>
							<BeMenuItem index="2-4-1">选项1</BeMenuItem>
							<BeMenuItem index="2-4-2">选项2</BeMenuItem>
							<BeMenuItem index="2-4-3">选项3</BeMenuItem>
						</BeSubMenu>
					</BeSubMenu>
					<BeMenuItem index="3" disabled>消息中心</BeMenuItem>
					<BeMenuItem index="4">订单管理</BeMenuItem>
				</BeMenu>
            </div>
        </div>
	    <div slot="description">
		    <ol>
			    <li>bind:this={MenuDom} 绑定菜单DOM</li>
			    <li>active: 当前选中菜单的index</li>
			    <li>使用 setMenuActive 方法可设置选中数据。</li>
			    <li>使用 change 方法可监听菜单改变。</li>
		    </ol>
	    </div>
    </DemoBlock>
</div>
