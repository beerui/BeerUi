<script>
	import { BeSelect } from '$lib';
	let value = '2'
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
		},
		{
			value: '6',
			label: '黄金糕',
		},
		{
			value: '7',
			label: '双皮奶',
		},
		{
			value: '8',
			label: '蚵仔煎',
		},
		{
			value: '9',
			label: '龙须面',
		},
		{
			value: '10',
			label: '北京烤鸭',
		},
	];
	$:console.log(value);
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
</section>
