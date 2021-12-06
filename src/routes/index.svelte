<script>
	import { First, BeButton } from '$lib';
	let count = 1
	function handleClick(e,val) {
		console.log(e,val)
	}
</script>

<First title="dwrew" name="2222" textColor="yellowgreen" />
<BeButton size="small" type="primary" disabled>提交</BeButton>
<a href='content/1'>content 1</a>
<a href='content/2'>content 2</a>
<div on:click={(e) =>  {handleClick(e, 111)}}>11111</div>