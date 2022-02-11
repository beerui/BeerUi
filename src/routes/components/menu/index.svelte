<script lang='ts'>
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
		import BeMenu from '$lib/be-menu/BeMenu.svelte';
		import BeMenuItem from '$lib/be-menu/BeMenuItem.svelte';
		import BeSubMenu from '$lib/be-menu/BeSubMenu.svelte';

</script>
<div class='page-container'>
    <h2>NavMenu 导航菜单</h2>
    <p>为网站提供导航功能的菜单。</p>
    <ol>
        <li></li>
    </ol>
	<h3>基础用法</h3>
	<p>适用广泛的基础用法。，写在标签中的内容为 checkbox 按钮后的介绍。</p>
    <DemoBlock
	    code={`
`} js={`
`}>
        <div slot='source'>
            <div class='demo-list'>
							<BeMenu class="be-menu-demo" mode="horizontal">
								<BeMenuItem index="1">处理中心</BeMenuItem>
<!--								<BeSubMenu index="2">-->
<!--									<template slot="title">我的工作台</template>-->
<!--									<BeMenuItem index="2-1">选项1</BeMenuItem>-->
<!--									<BeMenuItem index="2-2">选项2</BeMenuItem>-->
<!--									<BeMenuItem index="2-3">选项3</BeMenuItem>-->
<!--									<BeSubMenu index="2-4">-->
<!--										<template slot="title">选项4</template>-->
<!--										<BeMenuItem index="2-4-1">选项1</BeMenuItem>-->
<!--										<BeMenuItem index="2-4-2">选项2</BeMenuItem>-->
<!--										<BeMenuItem index="2-4-3">选项3</BeMenuItem>-->
<!--									</BeSubMenu>-->
<!--								</BeSubMenu>-->
								<BeMenuItem index="3" disabled>消息中心</BeMenuItem>
								<BeMenuItem index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></BeMenuItem>
							</BeMenu>
            </div>
        </div>
	    <div slot="description">
		    使用 setCheckedList 方法可设置选中数据。
	    </div>
    </DemoBlock>
</div>
