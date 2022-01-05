<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import BeButton from '../be-button/BeButton.svelte';
	import clickOutside from '$lib/_actions/clickOutside';

	const dispatch = createEventDispatcher()
	export let mask = true // 是否需要遮罩层
	export let visible = true // 是否显示 Dialog
	export let title = '提示' // 是否显示 Dialog
	export let closeOnClickModal = true // 是否可以通过点击 modal 关闭 Dialog

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
	<div class='be-dialog' use:clickOutside on:outside={close}>
		{#if mask}
		<div class="be-dialog__mask" transition:fade="{{delay: 0, duration: 300}}" on:click={handle_close}></div>
		{/if}
		<div class="be-dialog__container relative z-50" role="dialog" aria-modal="true" transition:fade="{{delay: 0, duration: 300}}">
			<slot name='header'>
				<div class='be-dialog__header'>
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
