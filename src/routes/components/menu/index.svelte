<script lang="ts">
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
	import BeMenu from "$lib/be-menu/BeMenu.svelte";
	import BeMenuItem from "$lib/be-menu/BeMenuItem.svelte";
	import BeSubMenu from "$lib/be-menu/BeSubMenu.svelte";
	import BeButton from "$lib/be-button/BeButton.svelte";
	import type { NavMenu } from "$lib/common";
	import BeIcon from "$lib/be-icon/BeIcon.svelte";

	let MenuDom: NavMenu;
	let setMenuActive = (key) => MenuDom.setMenuActive(key);
	const changeMenu = evt => console.log(evt)
	let collapse = true;
	const toggleCollapse = () => collapse = !collapse;
</script>
<div class="page-container">
	<h2>NavMenu 导航菜单</h2>
	<p>为网站提供导航功能的菜单。</p>
	<h3>基础用法</h3>
	<DemoBlock
		code={`
<BeMenu class="be-menu-demo" key='1' active="1" mode="horizontal" bind:this={MenuDom} on:change={changeMenu}>
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
		<div slot="source">
			<BeButton on:click={() => setMenuActive('2-1')}>设置 我的工作台 选项1</BeButton>
			<div class="demo-list">
				<BeMenu class="be-menu-demo" key="1" active="1" mode="horizontal" trigger="click" bind:this={MenuDom}
				        on:change={changeMenu}>
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
	<h2>侧栏</h2>
	<p>垂直菜单，可内嵌子菜单。</p>
	<DemoBlock
		code={`
<div style="width: 200px;min-height: 200px;">
	<BeMenu class="be-menu-demo"  key="2" active="1" mode="vertical" trigger="click">
		<BeMenuItem index="1">处理中心</BeMenuItem>
		<BeSubMenu index="2">
			<div slot="icon">
				<BeIcon name="app" />
			</div>
			<div slot="title">我的工作台</div>
			<BeMenuItem index="2-1">
				<div slot="icon">
					<BeIcon name="app" />
				</div>
				选项1
			</BeMenuItem>
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
`} js={`
`}>
		<div slot="source">
			<div class="demo-list">
				<div style="width: 200px;min-height: 200px;">
					<BeMenu class="be-menu-demo" key="2" active="1" mode="vertical" trigger="click">
						<BeMenuItem index="1">处理中心</BeMenuItem>
						<BeSubMenu index="2">
							<div slot="icon">
								<BeIcon name="app" />
							</div>
							<div slot="title">我的工作台</div>
							<BeMenuItem index="2-1">
								<div slot="icon">
									<BeIcon name="app" />
								</div>
								选项1
							</BeMenuItem>
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
		</div>
		<div slot="description">
			<ol>
				<li>存在多个Menu时 使用key:string 绑定菜单</li>
				<li>mode 模式 string horizontal / vertical vertical</li>
				<li>trigger 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) string hover / click hover</li>
				<li>mode为vertical时 trigger只能为click</li>
			</ol>
		</div>
	</DemoBlock>
	<h2>折叠</h2>
	<DemoBlock
		code={`
<BeButton on:click={toggleCollapse}>切换 collapse</BeButton>
<div style="width: 200px;min-height: 200px;">
	<BeMenu class="be-menu-demo"  key='3' active="1" mode="vertical" trigger="hover" {collapse}>
		<BeMenuItem index="1">
			<div slot="icon">
				<BeIcon name="chart-bubble" />
			</div>
			处理中心
		</BeMenuItem>
		<BeSubMenu index="2">
			<div slot="icon">
				<BeIcon name="app" />
			</div>
			<div slot="title">我的工作台</div>
			<BeMenuItem index="2-1">
				<div slot="icon">
					<BeIcon name="app" />
				</div>
				选项1
			</BeMenuItem>
			<BeMenuItem index="2-2">选项2</BeMenuItem>
			<BeMenuItem index="2-3">选项3</BeMenuItem>
			<BeSubMenu index="2-4">
				<div slot="title">选项4</div>
				<BeMenuItem index="2-4-1">选项1</BeMenuItem>
				<BeMenuItem index="2-4-2">选项2</BeMenuItem>
				<BeMenuItem index="2-4-3">选项3</BeMenuItem>
			</BeSubMenu>
		</BeSubMenu>
		<BeMenuItem index="3" disabled>
			<div slot="icon">
				<BeIcon name="gift" />
			</div>
			消息中心
		</BeMenuItem>
		<BeMenuItem index="4">
			<div slot="icon">
				<BeIcon name="desktop" />
			</div>
			订单管理
		</BeMenuItem>
	</BeMenu>
</div>
`} js={`
let collapse = true;
const toggleCollapse = () => collapse = !collapse
`}>
		<div slot="source">
			<div>
				<BeButton on:click={toggleCollapse}>切换 collapse</BeButton>
			</div>
			<div class="demo-list">
				<div style="width: 200px;min-height: 200px;">
					<BeMenu class="be-menu-demo" key="3" active="1" mode="vertical" trigger="hover" {collapse}>
						<BeMenuItem index="1">
							<div slot="icon">
								<BeIcon name="chart-bubble" />
							</div>
							处理中心
						</BeMenuItem>
						<BeSubMenu index="2">
							<div slot="icon">
								<BeIcon name="app" />
							</div>
							<div slot="title">我的工作台</div>
							<BeMenuItem index="2-1">
								<div slot="icon">
									<BeIcon name="app" />
								</div>
								选项1
							</BeMenuItem>
							<BeMenuItem index="2-2">选项2</BeMenuItem>
							<BeMenuItem index="2-3">选项3</BeMenuItem>
							<BeSubMenu index="2-4">
								<div slot="title">选项4</div>
								<BeMenuItem index="2-4-1">选项1</BeMenuItem>
								<BeMenuItem index="2-4-2">选项2</BeMenuItem>
								<BeMenuItem index="2-4-3">选项3</BeMenuItem>
							</BeSubMenu>
						</BeSubMenu>
						<BeMenuItem index="3" disabled>
							<div slot="icon">
								<BeIcon name="gift" />
							</div>
							消息中心
						</BeMenuItem>
						<BeMenuItem index="4">
							<div slot="icon">
								<BeIcon name="desktop" />
							</div>
							订单管理
						</BeMenuItem>
					</BeMenu>
				</div>
			</div>
		</div>
		<div slot="description">
			<ol>
				<li>collapse 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） boolean — false</li>
			</ol>
		</div>
	</DemoBlock>
</div>
