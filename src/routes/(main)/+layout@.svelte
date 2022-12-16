<script>
	import  '$lib/assets/beer.css'
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
<style>
    .be-warp {
        background: rgb(107, 132, 173);
    }
</style>