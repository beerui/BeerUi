<script lang="ts">
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import { BeForm, BeFormItem } from '$lib';
    import { onMount } from 'svelte';

	let ref
    onMount(() => {
	    console.log(ref);
    })
</script>
<div class="page-container content">
	<h2>textarea 文本框</h2>
	<p>通过鼠标或键盘输入字符</p>
	<h3>基本用法</h3>

	<ol>
		<li>value</li>
	</ol>
	<DemoBlock code={`
`} js={`
import { BeForm } from '@brewer/beerui';
`}>
		<div slot="source">
			<div class="demo-list">
				<BeForm
					bind:ref={ref}
					label-width="80px"
					class='ddwadw'
				>
					<BeFormItem label='活动名称'>1</BeFormItem>
				</BeForm>
			</div>
		</div>
	</DemoBlock>
</div>
