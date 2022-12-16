<script lang='ts'>
import ReplBlock from '$lib/demo/ReplBlock.svelte';
</script>
<div class='page-container'>
	<ReplBlock
		height='100vh'
		js={`import BeButton from '@brewer/beerui/be-button'`}
		html={`<BeButton type="default">Hello BeerUi</BeButton>`}
	/>
</div>
