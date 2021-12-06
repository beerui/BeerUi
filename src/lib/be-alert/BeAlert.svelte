<script lang="ts">
    /**
     * This is a Alert component
    */

  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  // 标题
  export let title = ""
  // 主题 success/warning/info/error
  export let type = 'info'
  // 辅助性文字. 也可通过默认slot传入
  export let description = ''
  // 是否可关闭 默认为true
  export let closable = true
  // 文字是否居中
  // export let center = true
  // 关闭按钮自定义
  // export let closeText = ''
  // 图标
  // export let iconClass = ''
  // 选择提供的主题
  export let effect = 'light'
  // 循环滚动播放
  // export let scrollable = false


  console.log('be-alert--' + type);
  const dispatch = createEventDispatcher()

  // 关闭alert
  function close(){
    dispatch('close')
  }
  console.log($$slots);
</script>
<!-- <div > -->
  <div transition:fade class={['be-alert',type ? ' be-alert--' + type:'', effect ? ' is-' + effect:'' ].join('')}>
      <!-- {#if iconClass}
    <i class={['be-alert__icon', ' be-icon', ' be-icon-' + iconClass ].join('')}></i>
      {/if} -->
    <div class="be-alert__content">
        {#if $$slots.title || title}
      <span class="be-alert__title">
        <slot name="title">{title}</slot>
      </span>
        {/if}

      {#if $$slots.default && !description}
        <p class="be-alert__description" ><slot>{description}</slot></p>
      {/if}
      {#if closable}
      <i class="be-alert__closebtn be-icon-close" on:click={close}></i>
      {/if}
    </div>
  </div>
<!-- </div> -->
<style lang="scss">
  // @import '@/assets/scss/module/alert.scss'
</style>