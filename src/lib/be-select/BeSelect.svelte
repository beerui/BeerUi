<script lang='ts'>
	import BeInput from '../be-input/BeInput.svelte';
	import { cubicInOut, sineIn } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte'
	// export let value = '1';
	export let options;
	// 下拉框选中的值
	export let value;
	// 是否禁用
	export let disabled = false;

	// option选中的id
	let checkedId;
	// 下拉框
	let isSelect = true;
	// 获取输入框
	let input

	let softFocus = false

	let dispatch = createEventDispatcher()

	function rotateHandler(e) {
		if(disabled) {
			e.preventDefault()
			return
		}
		isSelect = !isSelect;
	}
	// 鼠标右键点击
	function handleMousedown(item,e){
		if(item.disabled){
			e.preventDefault()
		}
	}
	// 选中下拉选项
	function selectOption(item) {
		if(!item.disabled){
			isSelect = true;
			value = item.label;
			checkedId = item.value;
			dispatch('change',item.value)
		}else{
			input.getblur()
		}

	}
	function blurHandler(e){
		setTimeout(()=>{
			if (!isSelect) {	isSelect = true;	}
		},100)
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
	function zoomIn(node, params) {
		return {
			duration:params.duration,
			easing: cubicInOut,
			css: t => {
				return `
        opacity: ${t};
        transform: scaleY(${t});
        transform-origin: center top;`
			}
		};
	}
</script>

<div class='be-select'>
	<!--  disabled?' is-disabled':'' -->
	<div class={['be-select__content',disabled ? ' is-disabled':''].join('')}>
		<div on:click={(e) => {	rotateHandler(e);}} class='w-full'>
			<BeInput bind:value bind:this={input} readonly disabled={disabled} on:blur={(e) => { blurHandler(e) }}>
				<div slot='suffix'>
					{#if isSelect}
						<div class='be-select__top_arrows' in:arrowsRotate
							 on:click|stopPropagation={(e) => { rotateHandler(e);}} />
					{:else}
						<div class='be-select__bottom_arrows' in:arrowsRotate
							 on:click|stopPropagation={(e) => {	rotateHandler(e);}} />
					{/if}
				</div>
			</BeInput>
		</div>
	</div>
	<div class='be-select__option_content'>
		{#if !isSelect}
			<ul class='be-select__option' in:zoomIn="{{duration: 300}}" out:zoomIn="{{duration: 300}}">
				{#each options as item, index}
					<li value={item.value} on:click|preventDefault ={(e) => { selectOption(item,e);}}
						on:mousedown={(e) => {handleMousedown(item,e)}}
						class={['be-select-dropdown__item ',checkedId === item.value ? 'be-select__checked': '',item.disabled?'is-disabled':''].join('')}>{item.label}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang="scss">
  @import '../assets/scss/modules/select';
</style>
