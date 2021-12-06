<script>
	import { BeButton } from '$lib';
</script>
<div class='page-container'>
	<h1>Size</h1>
	<div class='mt-10'><BeButton size="large" type="primary">提交</BeButton> <code>large</code></div>
	<div class='mt-10'><BeButton size="medium" type="primary">提交</BeButton> <code>medium</code></div>
	<div class='mt-10'><BeButton size="normal" type="primary">提交</BeButton> <code>normal</code></div>
	<div class='mt-10'><BeButton size="small" type="primary">提交</BeButton> <code>small</code></div>
	<div class='mt-10'><BeButton size="mini" type="primary">提交</BeButton> <code>mini</code></div>
	<h1>Color</h1>
	<div class='mt-10'><BeButton size="normal" type="primary">提交</BeButton> <code>primary</code></div>
	<div class='mt-10'><BeButton size="normal" type="success">提交</BeButton> <code>success</code></div>
	<div class='mt-10'><BeButton size="normal" type="info">提交</BeButton> <code>info</code></div>
	<div class='mt-10'><BeButton size="normal" type="warning">提交</BeButton> <code>warning</code></div>
	<div class='mt-10'><BeButton size="normal" type="danger">提交</BeButton> <code>danger</code></div>
	<h1>Round</h1>
	<div class='mt-10'><BeButton size="normal" round='circle' type="primary"><div class='be-icon'>icon</div></BeButton> <code>circle</code></div>
	<div class='mt-10'><BeButton size="normal" round='lg' type="primary">提交</BeButton> <code>lg</code></div>
	<div class='mt-10'><BeButton size="normal" round='md' type="primary">提交</BeButton> <code>md</code></div>
	<div class='mt-10'><BeButton size="normal" round='mini' type="primary">提交</BeButton> <code>mini</code></div>
</div>

<style lang='scss'>
.mt-10 {margin-top: 1rem;}
</style>
