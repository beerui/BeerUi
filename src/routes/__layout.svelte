<script lang="ts">
	import  '$lib/assets/scss/index.scss'
	import LayoutHeader from '$lib/demo/layout/LayoutHeader.svelte';
	import { page } from '$app/stores';
	import LayoutFooter from '$lib/demo/layout/LayoutFooter.svelte';

</script>
<div class='be-warp'>
	<LayoutHeader menu={$page.url.pathname} />
	<div class='be-container'>
		<slot></slot>
		<LayoutFooter />
	</div>
</div>
<style lang='scss'>
	.be-warp {
	  background: rgb(107, 132, 173);
	}
</style>
