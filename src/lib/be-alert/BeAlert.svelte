<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'

  export let title = ""  // 标题
  export let type = 'info'  // 主题 success/warning/info/error
  export let description = ''  // 辅助性文字
  export let closable = true  // 是否可关闭 默认为true
  export let center = false  // 文字是否居中
  export let closeText = ''  // 关闭按钮自定义

  const dispatch = createEventDispatcher()

  // 关闭alert
  let isClose = false
  function close(){
	  isClose = true
    dispatch('close')
  }
</script>
<div
	transition:fade
	class={['be-alert', type ? ' be-alert--' + type: ''].join('')}
	style:display={isClose ? 'none' : ''}
	class:is-center={center}
>
	<slot name='icon'></slot>
  <div class="be-alert__content">
    {#if $$slots.title || title}
	    <span class="be-alert__title">
	      <slot name="title">{title}</slot>
	    </span>
    {/if}
    {#if description}
      <p class="be-alert__description" >{description}</p>
    {/if}
    {#if closable}
	    {#if closeText}
		    <i class='be-alert__closebtn is-customed' on:click={close} on:keydown>{closeText}</i>
	    {:else}
		    <i class='be-alert__closebtn be-icon be-icon-close' on:click={close} on:keydown></i>
	    {/if}
    {/if}
  </div>
  </div>
