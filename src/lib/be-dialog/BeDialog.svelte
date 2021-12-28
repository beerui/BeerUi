<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import BeButton from '../be-button/BeButton.svelte';

	const dispatch = createEventDispatcher()
	export let mask = true // 是否需要遮罩层
	export let visible = true // 是否显示 Dialog
	export let title = '提示' // 是否显示 Dialog
	export let closeOnClickModal = true // 是否可以通过点击 modal 关闭 Dialog

	const handle_close = () => {
		if (closeOnClickModal) visible = false;
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
	};
</script>
<svelte:window on:keydown={handle_keydown}/>
{#if visible}
	<div class='be-dialog'>
		{#if mask}
		<div class="be-dialog__mask" transition:fade="{{delay: 0, duration: 300}}" on:click={handle_close}></div>
		{/if}
		<div class="be-dialog__container relative z-50" role="dialog" aria-modal="true" transition:fade="{{delay: 0, duration: 300}}">
			<slot name='header'>
				<div class='be-dialog__header'>
					<span class='be-dialog__title'>{title}</span>
					<div class='be-dialog__close' on:click={handle_close}>×</div>
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
