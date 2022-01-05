<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import BeButton from '../be-button/BeButton.svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import DragEvent from '$lib/_actions/drag';

	const dispatch = createEventDispatcher()
	export let mask = true // 是否需要遮罩层
	export let isDrag = false // 是否需要拖拽
	export let isLimit = false // 限制拖拽
	export let visible = true // 是否显示 Dialog
	export let title = '提示' // 是否显示 Dialog
	export let closeOnClickModal = true // 是否可以通过点击 modal 关闭 Dialog

	let dragStatus = false
	const handle_close = () => {
		if (closeOnClickModal) {
			close();
		}
	}
	const handle_confirm = (type: string) => {
		if (type === 'cancel') {
			dispatch('beforeClose', type)
			visible = false;
		}
		if (type === 'confirm') {
			dispatch('beforeClose', type)
			visible = false;
		}
	}

	const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}
	}
	const close = () => {
		dispatch('beforeClose')
		visible = false;
	}
	// 拖动状态
	const isInDragHandle = (evt) => dragStatus = evt.detail
</script>
<!--
@component
Here's some documentation for this component.
It will show up on hover.

- You can use markdown here.
- You can also use code blocks here.
- Usage:
  ```javascript
	  let visible = false
	let openDialog = () => {
		visible = true
	}
	const beforeClose = (evt) => {
		console.log(evt.detail)
	}
  ```
-->
<svelte:window on:keydown={handle_keydown}/>
{#if visible}
	<div class='be-dialog' use:clickOutside|stop={ { isInDrag: dragStatus } } on:outside={close}>
		{#if mask}
		<div class="be-dialog__mask" transition:fade="{{delay: 0, duration: 300}}" on:click={handle_close}></div>
		{/if}
		<div class="be-dialog__container relative z-50" use:DragEvent|stopPropagation={ { isLimit, isDrag } } on:isInDrag={isInDragHandle} role="dialog" aria-modal="true" transition:fade="{{delay: 0, duration: 300}}">
			<slot name='header'>
				<div class='be-dialog__header dragArea' class:drag={isDrag}>
					<span class='be-dialog__title'>{title}</span>
					<div class='be-dialog__close' on:click={close}>×</div>
				</div>
			</slot>
			<div class="be-dialog__body">
				<slot></slot>
			</div>
			<slot name='footer'>
				<div class='be-dialog__footer'>
					<span class='be-dialog-footer'>
						<BeButton type='default' on:click={() => handle_confirm('cancel')}>取消</BeButton>
						<BeButton type='primary' on:click={() => handle_confirm('confirm')}>确定</BeButton>
					</span>
				</div>
			</slot>
		</div>
	</div>
{/if}

<style lang="scss">
  @import '../assets/scss/modules/dialog';
</style>
