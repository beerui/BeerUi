<script lang='ts'>
	import BeInput from '../be-input/BeInput.svelte';
	import { sineIn } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	// export let value = '1';
	export let options;
	// 下拉框选中的值
	export let value;
	// option选中的id
	let checkedId;
	// 下拉框
	let isSelect = true;

	function rotatefun() {
		isSelect = !isSelect;
	}

	// 选中下拉选项
	function selectOption(item) {
		isSelect = true;
		value = item.label;
		checkedId = item.value;
	}

	// 箭头动画
	function arrowsRotate(node, params) {
		return {
			duration: 300,
			css: (t) => {
				const eased = sineIn(t);
				return `transform: rotate(${ eased * (isSelect ? -45 : 135) }deg);`;
			}
		};
	}

	// option 下拉动画

</script>

<div class='be-select'>
	<!-- <select bind:value={value} bind:this={select} class="be-select"  >
    {#each options as item, index}
    <option value={item.value}>{item.label}</option>
    {/each}
  </select> -->
	<div class='be-select__content'>
		<div on:click={() => {	rotatefun();}} class='w-full'>
			<BeInput bind:value on:blur={() => { if (!isSelect) {	isSelect = true;	} console.log(isSelect) }}
					 readonly>
				<div slot='suffix'>
					{#if isSelect}
						<div class='be-select__top_arrows' in:arrowsRotate
							 on:click|stopPropagation={() => { rotatefun();}} />
					{:else}
						<div class='be-select__bottom_arrows' in:arrowsRotate
							 on:click|stopPropagation={() => {	rotatefun();}} />
					{/if}
				</div>
			</BeInput>
		</div>
	</div>
	<div class='be-select__option_content'>
		{#if !isSelect}
			<ul class='be-select__option' transition:fly={{ y: -20, duration: 300,easing:sineIn}}>
				{#each options as item, index}
					<li value={item.value} on:click|stopPropagation={() => { selectOption(item);}}
						class={checkedId === item.value ? 'be-select__checked': ''}>{item.label}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang="scss">
  @import '../assets/scss/modules/select';
</style>
