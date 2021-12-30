<script>
	import { BeSelect } from '$lib';
	let value = ''
	let options = [
		{
			value: '1',
			label: '黄金糕',
		},
		{
			value: '2',
			label: '双皮奶',
		},
		{
			value: '3',
			label: '蚵仔煎',
		},
		{
			value: '4',
			label: '龙须面',
		},
		{
			value: '5',
			label: '北京烤鸭',
		}
	];
	let options1 = [
		{
			value: '1',
			label: '黄金糕',
			disabled: true
		},
		{
			value: '2',
			label: '双皮奶',
		},
		{
			value: '3',
			label: '蚵仔煎',
		},
		{
			value: '4',
			label: '龙须面',
		},
		{
			value: '5',
			label: '北京烤鸭',
		}
	];
	let value1
</script>

<!-- <BeSelect {options} /> -->
<section class="page-container content">
	<h2>Select 选择框</h2>
	<p>当选项过多时，使用下拉菜单展示并选择内容。</p>
	<h3>基本用法</h3>
	<div class="demo-block demo-select ">
		<div class="source">
			<div>
				<BeSelect {options} bind:value={value}/>
			</div>
		</div>
	</div>
	<h3>有禁用选项</h3>
	<p>在<code>options</code>数组中设定<code>disabled</code>值为 true，即可禁用该选项</p>
	<div class="demo-block demo-select ">
		<div class="source">
			<div>
				<BeSelect options = {options1} bind:value={value1}/>
			</div>
		</div>
	</div>
	<h3>禁用状态</h3>
	<p>选择器不可用状态</p>
	<div class="demo-block demo-select ">
		<div class="source">
			<div>
				<BeSelect options = {options1} bind:value={value1} disabled/>
			</div>
		</div>
		<h3>位置</h3>
		<p>添加<code>position</code>属性默认为<code>bottom</code> 目前仅支持<code>top,bottom</code></p>
		<div class="demo-block demo-select ">
			<div class="source">
				<div>
					<BeSelect options = {options1} bind:value={value1} position={'top'} />
				</div>
			</div>
	</div>
</section>
