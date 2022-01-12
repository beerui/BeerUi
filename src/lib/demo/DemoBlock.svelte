<script lang="ts">
import CodeView from '$lib/demo/CodeView.svelte';

export let code
export let js
</script>
<div class='demo-block'>
	<div class='source'>
		<slot name='source'></slot>
	</div>
	<div class='meta'>
		<div class='description'>
			<slot name='description'></slot>
		</div>
		<CodeView class='m-iframe' {js} />
		<CodeView class='m-iframe' {code} />
	</div>
</div>
<style lang='scss'>
	.demo-block {
    border: 1px solid var(--border-level-1-color);border-radius: 3px;transition: .2s;
		.source {padding: 24px;}
		.meta {background: var(--bg-color-code);border-top: 1px solid var(--border-level-2-color);transition: height .2s;}
		.description {
			padding: 20px;box-sizing: border-box;border: 1px solid #ebebeb;border-radius: 3px;font-size: 14px;
			line-height: 22px;color: #666;word-break: break-word;margin: 10px;background-color: #fff;
		}
	}
</style>
