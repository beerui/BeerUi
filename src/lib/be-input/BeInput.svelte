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
  export let type = 'text';
  // 右侧icon
  export let suffixIcon = ''
  // let showClear = false;
  let input
  function showClear() {
    return clearable&&!readonly&&!disabled
  }
  let suffix;
  // 判断后置内容是否存在
  function getSuffixVisible(){
    return $$slots.suffix
  }

  let dispatch = createEventDispatcher()
  // 在input失去焦点时触发
  function blur(event){
    dispatch('blur',event)
  }
  // 是输入框获取焦点
  export function getblur(){
    input.focus()
  }
  // 在input获得焦点时触发
  function focus(event){
    dispatch('focus',event)
  }
  // 仅在输入框失去焦点或用户按下回车时触发
  function change(event){
    dispatch('change', event.target.value)
  }
  // 在 input 值改变时触发
  function onInput(event){
    dispatch('input', event.target.value)
  }
</script>

<div
	class={['be-input', size?' be-input--'+ size:'', disabled?' is-disabled':''].join('')}
	style={$$props.style}
	on:click
	on:contextmenu
	on:dblclick
	on:focus
	on:focusin
	on:mousedown
	on:mouseup
	on:focusout
	on:keydown
	on:keyup
	on:pointercancel
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:pointerout
	on:pointerup
	on:input
>
  <input
	  {type}
     {placeholder}
	  bind:value
	  class="be-input__inner"
	  {readonly}
	  {disabled}
	  on:blur={blur}
	  on:focus={focus}
	  on:change={change}
	  on:input={onInput}
	  bind:this={input}
  >
  {#if getSuffixVisible()}
  <span class={['be-input__suffix',disabled ? ' is-disabled':''].join('')}>
    <span class="be-input__suffix-inner ">
      <template>
        <slot name="suffix"></slot>
        <!-- suffixIcon -->
        {#if suffixIcon}
        <i class={['be-input__icon ', suffixIcon].join('')}></i>
        {/if}
      </template>
    </span>
  </span>
  {/if}
</div>

