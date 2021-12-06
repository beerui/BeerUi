<script lang="ts">
	import { onMount } from 'svelte';
	import { elasticOut, sineInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	// export let value = '1';
	export let options;
	export let selectValue;
	let selectId;
	let isSelect = true;
	// $: console.log(select);
	// onMount(() => {});
	function rotatefun() {
		isSelect = !isSelect;
	}
	// 选中下拉选项
	function selectOption(item) {
		isSelect = true;
		selectValue = item.label;
		selectId = item.value;
	}
	// Rotate
	function arrowsRotate(node, params) {
		// console.log(node);
		return {
			duration: 400,
			css: (t) => {
				const eased = sineInOut(t);
				return `
					transform: rotate(${eased * (isSelect ? -45 : 135)}deg);`;
			},
		};
	}
	function optionTran() {}
</script>

<div class="be-select">
	<!-- <select bind:value={value} bind:this={select} class="be-select"  >
    {#each options as item, index}
    <option value={item.value}>{item.label}</option>
    {/each}
  </select> -->
	<div class="be-select__content">
		<input
			type="text"
			class="be-select__input"
			on:click={() => {
				rotatefun();
			}}
			bind:value={selectValue}
			on:blur={() => {
				if (!isSelect) {
					isSelect = true;
				}
			}}
			readonly
		/>
		{#if isSelect}
			<div
				class="be-select__top_arrows"
				in:arrowsRotate
				on:click={() => {
					rotatefun();
				}}
			/>
		{:else}
			<div
				class="be-select__bottom_arrows"
				in:arrowsRotate
				on:click={() => {
					rotatefun();
				}}
			/>
		{/if}
	</div>
	<div>
		{#if !isSelect}
			<ul
				class="be-select__option"
				transition:fly={{ y: 0, duration: 500 }}
			>
				{#each options as item, index}
					<li
						value={item.value}
						on:click={() => {
							selectOption(item);
						}}
						class={selectId === item.value
							? 'be-select__checked'
							: ''}
					>
						{item.label}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
