<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import BeIcon from '../be-icon/BeIcon.svelte';
	import { linear, quintOut } from 'svelte/easing';

	const dispatch = createEventDispatcher()
	export let mask = true // 是否需要遮罩层
	export let visible = true // 是否显示 Dialog
	export let title = '提示' // 标题文字
	export let direction = 'rtl' // 方向
	export let size = '30%' // 窗体的大小, 请传入 'x%'/'100px'
	export let isShowHeader = true // 是否显示头部
	export let isShowClose = true // 是否显示关闭按钮
	export let closeOnClickModal = true // 是否可以通过点击 modal 关闭 Dialog
	export let beforeClose = null // 是否可以通过点击 modal 关闭 Dialog 传入函数 接收返回值true/false false时不执行关闭操作
	export let isCloseEscape = true // 是否可以通过按下 ESC 关闭 Drawer
	const handleClose = () => closeOnClickModal && close();
	onDestroy(() => {
		dispatch('close')
	})

	const handleKeydown = e => isCloseEscape && e.key === 'Escape' && close();
	const close = () => {
		if (beforeClose) {
			if (beforeClose()) visible = false
		} else {
			visible = false
		}
	}
	function whoosh(node, params) {
		const dir = ['rtl', 'btt'].includes(direction)  ? 1 : -1
		return {
			delay: params.delay || 0,
			duration: params.duration || 100,
			easing: params.easing || linear,
			css: (t, u) => ['rtl', 'ltr'].includes(direction) ? `transform: translate(${ dir*100 * u }%)` : `transform: translateY(${ dir*100 * u }%)`
		};
	}

	$: if (!visible) dispatch('close', visible);
	let _class: $$props["class"] = "";
	export {_class as class};
</script>
<svelte:window on:keydown={handleKeydown}/>
{#if visible}
	<div
		class='be-drawer__wrapper {_class}'
		style={$$props.style}
	>
		<div class='be-drawer__container'>
			<div
				class='be-drawer {direction}'
				in:whoosh={{ name: 'in', easing: linear }}
				out:whoosh={{ name: 'out', easing: quintOut }}
				style:width={['rtl', 'ltr'].includes(direction) ? size : '100%'}
				style:height={['rtl', 'ltr'].includes(direction) ? '100%' : size}
			>
				{#if isShowHeader}
					<header class='be-drawer__header'>
						<span role="heading" {title}>
							<slot name='title'>{title}</slot>
						</span>
						{#if isShowClose}
							<div on:click={close}>
								<BeIcon class='be-drawer__close-btn' name='close' />
							</div>
						{/if}
					</header>
				{/if}
				<section class="be-drawer__body">
					<slot></slot>
				</section>
			</div>
			{#if mask}
				<div class="be-drawer__mask" transition:fade="{{delay: 0, duration: 300}}" on:click={handleClose}></div>
			{/if}
		</div>
	</div>
{/if}

