<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import BeButton from '../be-button/BeButton.svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import DragEvent from '$lib/_actions/drag';
	import BeIcon from '../be-icon/BeIcon.svelte';

	const dispatch = createEventDispatcher()
	export let mask = true // 是否需要遮罩层
	export let visible = true // 是否显示 Dialog
	export let title = '提示' // 标题文字
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
<svelte:window on:keydown={handle_keydown}/>
{#if visible}
	<div class='be-drawer__wrapper'>
		<div class='be-drawer__container' class:be-drawer__open={visible}>
			<div class='be-drawer rtl'>
				<header class='be-drawer__header'>
					<span role="heading" title="我是标题">我是标题</span>
					<div on:click={close}>
						<BeIcon class='be-drawer__close-btn' name='close' />
					</div>
				</header>
				<section class="be-drawer__body"><span>我来啦!</span></section>
			</div>
		</div>
	</div>
<!--	<div class='be-dialog' style={$$props.style} on:outside={close}>-->
<!--		{#if mask}-->
<!--		<div class="be-dialog__mask" transition:fade="{{delay: 0, duration: 300}}" on:click={handle_close}></div>-->
<!--		{/if}-->
<!--		<div class="be-dialog__container relative z-50" role="dialog" aria-modal="true" transition:fade="{{delay: 0, duration: 300}}">-->
<!--			<slot name='header'>-->
<!--				<div class='be-dialog__header'>-->
<!--					<span class='be-dialog__title'>{title}</span>-->
<!--					<div class='be-dialog__close' on:click={close}>×</div>-->
<!--				</div>-->
<!--			</slot>-->
<!--			<div class="be-dialog__body">-->
<!--				<slot></slot>-->
<!--			</div>-->
<!--			<slot name='footer'>-->
<!--				<div class='be-dialog__footer'>-->
<!--					<span class='be-dialog-footer'>-->
<!--						<BeButton type='default' on:click={() => handle_confirm('cancel')}>取消</BeButton>-->
<!--						<BeButton type='primary' on:click={() => handle_confirm('confirm')}>确定</BeButton>-->
<!--					</span>-->
<!--				</div>-->
<!--			</slot>-->
<!--		</div>-->
<!--	</div>-->
{/if}

