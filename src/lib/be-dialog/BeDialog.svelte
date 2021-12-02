<script>
	import { createEventDispatcher } from 'svelte';

	let out = false
	const dispatch = createEventDispatcher();
	const close = () => {
		out = true
		const timer = setTimeout(() => {
			out = false
			clearTimeout(timer)
			dispatch('close')
		}, 250)
	}
	const confirm = () => {
		close()
		dispatch('confirm')
	}
	export let title = '提示'
	export let visible = false
	export let footer = false
	export let icon = false
</script>
{#if visible}
	<div class="fixed z-50 inset-0 overflow-y-auto {visible ? 'modal-in' : ''} {out ? 'modal-out' : ''}"
		 aria-labelledby='modal-title' role='dialog' aria-modal='true'>
		<div class='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
			<div
				class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity {visible ? 'opacity-100' : ''} {out ? 'opacity-0' : ''}"
				aria-hidden='true' on:click={close}></div>
			<span class='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
			<div
				class='modal-card inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
				<div class='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
					<div class='flex items-start'>
						{#if icon}
							<div
								class='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
								<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none'
									 viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
									<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
										  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
								</svg>
							</div>
						{/if}
						<div class='mt-3 text-center w-full'>
							<h3 class='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
								{title}
							</h3>
							<div class='mt-2'>
								<slot></slot>
							</div>
						</div>
					</div>
				</div>
				<slot name='footer'>
					{#if footer}
						<div class='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
							<button on:click={confirm} type='button'
									class='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'>
								确认
							</button>
							<button on:click={close} type='button'
									class='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
								取消
							</button>
						</div>
					{/if}
				</slot>
			</div>
		</div>
	</div>
{/if}
<style>
	.bg-gray-50, .modal-card {background: #1f2d3d}
    .modal-in .modal-card {
        animation: modal_in .3s;
    }

    .modal-out .modal-card {
        animation: modal_out .2s;
        opacity: 0;
    }

    @keyframes modal_in {
        0% {
            transform: scale(0.8)
        }
        40% {
            transform: scale(1.2)
        }
        100% {
            transform: scale(1)
        }
    }

    @keyframes modal_out {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        40% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(0.1);
            opacity: 0;
        }
    }
</style>
