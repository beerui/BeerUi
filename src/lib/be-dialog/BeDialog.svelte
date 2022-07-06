<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import BeButton from '../be-button/BeButton.svelte';
	import clickOutside from '$lib/_actions/clickOutside';
	import DragEvent from '$lib/_actions/drag';

	const dispatch = createEventDispatcher()
	export let mask = true // 是否需要遮罩层
	export let isDrag = false // 是否需要拖拽
	export let width = '50%' // Dialog 的宽度拖拽
	export let isLimit = false // 限制拖拽
	export let isFree = false // 限制拖拽
	export let visible = true // 是否显示 Dialog
	export let isHideFooter = false // 是否显示 footer
	export let title = '提示' // 标题文字
	export let closeOnClickModal = true // 是否可以通过点击 modal 关闭 Dialog
	export let beforeClose = null // 是否可以通过点击 modal 关闭 Dialog 传入函数 接收返回值true/false false时不执行关闭操作

	let dragStatus = false
	const handle_close = () => {
		if (closeOnClickModal) {
			close();
		}
	}
	const handle_confirm = (type: string) => {
		if (type === 'cancel') {
			dispatch('confirmHandle', type)
			close(type);
		}
		if (type === 'confirm') {
			dispatch('confirmHandle', type)
			close(type);
		}
	}

	const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}
	}
	const close = (type = '') => {
		if (beforeClose) {
			if (beforeClose(type)) visible = false
		} else {
			visible = false
		}
	}
	// 拖动状态
	const isInDragHandle = (evt) => dragStatus = evt.detail
	let _class: $$props["class"] = "";
	export {_class as class};
</script>
<!--
@component
import { BeDialog } from "@brewer/beerui";

### Props
- mask: true // 是否需要遮罩层
- isDrag: false // 是否需要拖拽
- isLimit: false // 限制拖拽
- isFree: false // 限制拖拽
- visible: true // 是否显示 Dialog
- title: '提示' // 标题文字
- closeOnClickModal: true // 是否可以通过点击 modal 关闭 Dialog

### Event
- beforeClose

- Usage:
  ```javascript
	let visible = false
	let openDialog = () => {
		visible = true
	}
	const beforeClose = ({ detail }) => {
		console.log(detail)
	}
  ```
-->
<svelte:window on:keydown={handle_keydown}/>
{#if visible}
<!--	<div class={_class} class:be-dialog={true} style={$$props.style} use:clickOutside|stop={ { isInDrag: dragStatus } } on:outside={close}>-->
	<div class={_class} class:be-dialog={true} style={$$props.style} on:outside={close}>
		{#if mask}
		<div class="be-dialog__mask" transition:fade="{{delay: 0, duration: 300}}" on:click={handle_close}></div>
		{/if}
		<div
			class="be-dialog__container relative z-50"
		    use:DragEvent|stopPropagation={ { isLimit, isDrag, isFree, els: '.drag' } }
		    on:isInDrag={isInDragHandle}
		    role="dialog"
		    aria-modal="true"
		    transition:fade="{{delay: 0, duration: 300}}"
			style:width={width}
		>
			<slot name='header'>
				<div class='be-dialog__header' class:drag={isDrag}>
					<span class='be-dialog__title'>{title}</span>
					<div class='be-dialog__close' on:click={close}>×</div>
				</div>
			</slot>
			<div class="be-dialog__body">
				<slot></slot>
			</div>
			{#if !isHideFooter}
			<slot name='footer'>
				<div class='be-dialog__footer'>
					<span class='be-dialog-footer'>
						<BeButton type='default' on:click={() => handle_confirm('cancel')}>取消</BeButton>
						<BeButton type='primary' on:click={() => handle_confirm('confirm')}>确定</BeButton>
					</span>
				</div>
			</slot>
			{/if}
		</div>
	</div>
{/if}

