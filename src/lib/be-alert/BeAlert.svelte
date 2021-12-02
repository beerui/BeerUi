<script lang="ts">
    /**
     * This is a Alert component
    */

  import { createEventDispatcher } from 'svelte'

  // 标题
  export let title = ""
  // 主题 success/warning/info/error
  export let type = 'info'
  // 辅助性文字. 也可通过默认slot传入
  export let description = ''
  // 是否可关闭 默认为true
  export let closable = true
  // 文字是否居中
  export let center = true
  // 关闭按钮自定义
  export let closeText = ''
  // 是否显示图标
  export let showIcon = false
  // 选择提供的主题
  export let effect = 'light'
  console.log('be-alert--' + type);
  const dispatch = createEventDispatcher()
  // 关闭alert
  function close(){
    dispatch('close')
  }
</script>

<div class={['be-alert',type ? ' be-alert--' + type:'', effect ? ' is-' + effect:'' ].join('')}>
    {#if showIcon}
  <i class={['be-alert__icon',' be-icon-'+ type, ' is-big'].join('')}></i>
    {/if}
  <div class="be-alert__content">
    <span class="be-alert__title"><slot name="title" >{title}</slot></span>
    <p><slot class="be-alert__description">{description}</slot></p>
    {#if closable}
    <i class="be-alert__closebtn be-icon-close" on:click={close}></i>
    {/if}
  </div>
</div>
<style lang="scss">
  // @import '@/assets/scss/module/alert.scss'
</style>