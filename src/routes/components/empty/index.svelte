<script lang='ts'>
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import BeEmpty from "$lib/be-empty/index.ts";
    import BeButton from "$lib/be-button/BeButton.svelte";
</script>
<div class='page-container'>
    <h2>Empty 空状态</h2>
    <p>空状态时的占位提示。</p>
	<h3>基础用法</h3>
    <DemoBlock
	  code={`
<BeEmpty description="描述文字" />
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeEmpty description="描述文字" />
            </div>
        </div>
    </DemoBlock>
	<h3>自定义图片</h3>
    <DemoBlock
	  code={`
<BeEmpty description="描述文字" image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeEmpty description="描述文字" image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
            </div>
        </div>
    </DemoBlock>
	<h3>图片尺寸</h3>
    <DemoBlock
	  code={`
<BeEmpty description="描述文字" size="300px" />
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeEmpty description="描述文字" size="300px" />
            </div>
        </div>
    </DemoBlock>
	<h3>底部内容</h3>
	<p>使用默认插槽可在底部插入内容。</p>
    <DemoBlock
	  code={`
<BeEmpty description="描述文字">
	<BeButton>默认插槽</BeButton>
</BeEmpty>
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeEmpty description="描述文字">
		            <BeButton>默认插槽</BeButton>
	            </BeEmpty>
            </div>
        </div>
    </DemoBlock>
</div>
