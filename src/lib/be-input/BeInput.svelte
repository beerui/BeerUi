<script lang="ts">
  /**
   * this is input component
  */
  import { createEventDispatcher } from 'svelte'
  export let value = '';
  export let placeholder = '';
  export let size = '';
  export let readonly = false;
  export let disabled = false;
  // 是否显示清除按钮
  export let clearable = false;
  // 右侧icon
  export let suffixIcon = ''
  // let showClear = false;
  
  function showClear() {
    return clearable&&!readonly&&!disabled
  }
  let suffix;
  // 判断后置内容是否纯在
  function getSuffixVisible(){
    return $$slots.suffix
  }
  
  let dispatch = createEventDispatcher()
  // 在input失去焦点时触发
  function blur(event){
    dispatch('blur',event)
  }
  // 在input获得焦点时触发
  function focus(event){
    dispatch('focus',event)
  }
  // 仅在输入框失去焦点或用户按下回车时触发
  function change(event){
    dispatch('change', event.target.value);
  }
  // 在 input 值改变时触发
  function input(event){
    dispatch('input', event.target.value);
  }
</script>

<div class={['be-input', size?' be-input--'+ size:'', disabled?' is-disabled':''].join('')}>
  <input type="text" placeholder={placeholder} bind:value class="be-input__inner" {readonly} {disabled} on:blur={(e)=>{blur(e)}} on:focus={(e)=>{focus(e)}} on:change={(e)=>{change(e)}} on:input={(e)=>{input(e)}}>
  {#if getSuffixVisible()}
  <div class="be-input__suffix">
    <div class="be-input__suffix-inner">
      <template>
        <slot name="suffix"></slot>
        <!-- suffixIcon -->
        {#if suffixIcon}
        <i class={['be-input__icon ', suffixIcon].join('')}></i>
        {/if}
      </template>
    </div>
  </div>
  {/if}
</div>