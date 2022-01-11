<script lang="ts">
	import '../../static/scss/index.scss';
	import  '$lib/assets/scss/index.scss'
	import LayoutHeader from '$lib/demo/layout/LayoutHeader.svelte';
	import { page } from '$app/stores';

</script>
<div class='be-warp'>
	<LayoutHeader menu={$page.url.pathname} />
	<div class='be-container'>
		<slot></slot>
	</div>
</div>
<style lang='scss'>
	.be-warp {
	  height: 100%;overflow: hidden;
		background-image: radial-gradient(#B7C4CD 2px, transparent 2px),radial-gradient(#B7C4CD 2px, transparent 2px);
		background-size: calc(20 * 2px) calc(20 * 2px);
		background-position: 0 0,calc(10 * 2px) calc(10 * 2px);
	}
</style>
