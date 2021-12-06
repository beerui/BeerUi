<script>
	import { getContext, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	export let message = ''
	export let modal = true // 是否需要遮罩层
	export let visible = true // 是否显示 Dialog
	export let closeOnClickModal = true // 是否可以通过点击 modal 关闭 Dialog

	const handle_close = () => {
		console.log(window)
		if (closeOnClickModal) visible = false;
	}

	const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>
<svelte:window on:keydown={handle_keydown}/>
{#if visible}
	<div class='be-dialog'>
		<div class="be-dialog--mask" transition:fade="{{delay: 0, duration: 300}}" on:click={handle_close}></div>
		<div class="be-dialog--container relative z-50" role="dialog" aria-modal="true" bind:this={modal} transition:fade="{{delay: 0, duration: 300}}">
			<p>{message}</p>
		</div>
	</div>
{/if}
