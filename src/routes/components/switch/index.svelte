<script>
	import { BeSwitch } from '$lib';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	let switchValue = true
	let switchValue1 = true
	let switchValue2 = true
	let disabled = true
	let width = 40
	let activeColor = ''
	let inactiveColor = ''
	function change(val) {
		console.log(val)
		// setTimeout(() => {
		// 	switchValue = true
		// }, 3000);
	}
</script>


<div class='page-container'>
		<h2>Switch 开关</h2>
		<p>表示两种相互对立的状态间的切换，多用于触发「开/关」。</p>
		<h3>基本用法</h3>

	<DemoBlock code={`
<BeSwitch bind:checked={switchValue} on:change={change} inactiveColor="#fff000"/>
`}
	js={`
import { BeSwitch } from '@brewer/beerui';
let switchValue = true`}>
		<div slot="source">
			<div class="demo-list">
				<BeSwitch bind:checked={switchValue} on:change={change} inactiveColor="#fff000"/>
			</div>
		</div>
	</DemoBlock>
	<h3>禁用状态</h3>
	<DemoBlock code={`
<BeSwitch disabled={disabled} />
`}>
		<div slot="source">
			<div class="demo-list">
				<BeSwitch bind:checked={switchValue1} disabled={disabled} />
			</div>
		</div>
	</DemoBlock>
	<h3>改变前的回调</h3>
	<p>返回false会阻止Switch的切换</p>
	<DemoBlock code={`
<BeSwitch bind:checked={switchValue} beforeChange = {() => {return false}} />
`}>
		<div slot="source">
			<div class="demo-list">
				<BeSwitch bind:checked={switchValue2} beforeChange = {() => {return false}} />
			</div>
		</div>
	</DemoBlock>
</div>


