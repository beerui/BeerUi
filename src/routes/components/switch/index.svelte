<script>
	import { BeSwitch } from '$lib';
	let switchValue = true
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
		<h2 >Switch 开关</h2>
		<p>表示两种相互对立的状态间的切换，多用于触发「开/关」。</p>
		<h3>基本用法</h3>
		<div class="demo-block demo-alert">
			<div class="source">
					<!-- disabled={disabled} width={width} activeColor={activeColor} inactiveColor={inactiveColor} -->
					<BeSwitch bind:checked={switchValue} on:change={change} inactiveColor="#fff000"/>
			</div>
		</div>
		<h3>禁用状态</h3>
		<div class="demo-block demo-alert">
			<div class="source">
				<BeSwitch bind:checked={switchValue} disabled={disabled}/>
			</div>
		</div>
</div>


