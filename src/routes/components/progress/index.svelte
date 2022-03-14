<script lang="ts">
	import DemoBlock from "$lib/demo/DemoBlock.svelte";
import { BeProgress } from '$lib';
</script>
<div class="page-container content">
	<h2>Progress 进度条</h2>
	<p>用于展示操作进度，告知用户当前状态和预期。</p>
	<h3>线形进度条</h3>
	<DemoBlock code={`
		<BeProgress percentage={60} type="line" status="success" />
		<BeProgress percentage={60} type="line" status="primary" />
		<BeProgress percentage={60} type="line" status="info" />
		<BeProgress percentage={60} type="line" status="warning" />
		<BeProgress percentage={60} type="line" status="danger" />`}
		js={``}>
		<div slot='source' class="progress">
			<BeProgress percentage={60} type="line" status="success" />
			<p></p>
			<BeProgress percentage={60} type="line" status="primary" />
			<p></p>
			<BeProgress percentage={60} type="line" status="info" />
			<p></p>
			<BeProgress percentage={60} type="line" status="warning" />
			<p></p>
			<BeProgress percentage={60} type="line" status="danger" />
		</div>
		<div slot='description'>
			Progress 组件设置percentage属性即可，表示进度条对应的百分比，必填，必须在 0-100。可通过status指定进度条状态
		</div>
	</DemoBlock>
	<h3>百分比内显</h3>
	<p>百分比不占用额外控件，适用于文件上传等场景。</p>
	<DemoBlock code={`
		<BeProgress percentage={70} type="line" strokWidth="20" textInside={true}/>
		<BeProgress percentage={60} type="line" strokWidth="20" status="danger" textInside={true} showText = {false}`}>
		<div slot='source' class="progress">
			<BeProgress percentage={70} type="line" strokWidth="20" textInside={true}/>
			<p></p>
			<BeProgress percentage={60} type="line" strokWidth="20" status="danger" textInside={true} showText = {false}/>
		</div>
		<div slot='description'>
			Progress 组件可通过 strokeWidth 属性更改进度条的高度，并可通过 textInside 属性来将进度条描述置于进度条内部。也可通过设置showText为false不显示进度条文字内容
		</div>
	</DemoBlock>
	<h3>自定义颜色</h3>
	<p>可以通过 <code>color</code> 设置进度条的颜色，<code>background</code>设置背景颜色</p>
	<DemoBlock code={`
			<BeProgress percentage={40} type="line" color="#000000" background="#999999"/>`}
		js={``}>
		<div slot='source' class="progress">
			<BeProgress percentage={40} type="line" color="#000000" background="#999999"/>
		</div>
	</DemoBlock>
	<h3>环形进度条</h3>
	<DemoBlock code={`
		<BeProgress percentage={10} type="circle" />
		<BeProgress percentage={10} type="circle" width={146}`}
		js={``}>
		<div slot='source' class="progress flex items-center">
			<BeProgress percentage={10} type="circle" />
			<BeProgress percentage={10} type="circle" width={146}/>
		</div>
		<div slot='description'>
			可通过width设置环形进度条画布宽度
		</div>
	</DemoBlock>
	<h3>仪表盘进度条</h3>
	<DemoBlock code={`
		<BeProgress percentage={10} type="dashboard" />`}
		js={``}>
		<div slot='source' class="progress">
			<BeProgress percentage={10} type="dashboard" />
		</div>
	</DemoBlock>
	<!-- <BeProgress percentage={70} type="line" strokWidth="20" textInside={true}/> -->
	<!-- <BeProgress percentage={10} type="circle" status="danger"  strokWidth="6" width={126}/> -->
	<!-- <BeProgress percentage={10} type="dashboard" status="danger" color="#000000"  strokWidth="6" width={126}/> -->
</div>
<style>
	.progress {
		width:300px;
	}
</style>