<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	export let ref: Element = null; // 获得对表单元素的引用
	export let inline: Boolean = false; // 行内表单模式
	export let labelWidth: string = '80px'; // 表单域标签的宽度，默认 '80px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。

	const labelWidthItems = writable(labelWidth);
	$: labelWidthItems.set(labelWidth);

	setContext("BeForm", { labelWidthItems });
</script>
<form
	{...$$restProps}
	class:be-form="{true}"
	bind:this="{ref}"
	on:click
	on:keydown
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:submit
>
	<slot />
</form>
