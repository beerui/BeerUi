<script lang="ts">
	import { getContext, onMount } from 'svelte';

	export let label: string = ''; //
	let initialLabelWidth: string = '80px' // 表单域标签的宽度

	const ctx = getContext("BeForm");

	// label的监听
	const unsubscribe = ctx.labelWidthItems.subscribe((value) => {
		if (!value && initialLabelWidth) return;
		initialLabelWidth = value;
	});

	onMount(() => {
		return () => {
			unsubscribe();
		};
	});
</script>
<div
	{...$$restProps}
	class:be-form-item={true}
>
	<div class='be-form-item__label' style:width={initialLabelWidth}>{label}</div>
	<div class='be-form-item__content' style:margin-left={initialLabelWidth}>
		<slot></slot>
	</div>
</div>
