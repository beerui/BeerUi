<script lang="ts">

	import { onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()
  export let checked = false
  export let disabled = false
  export let width = 40
  export let activeColor = ''
	export let name = ''
	export let inactiveColor = ''
  export let beforeChange = () =>{ return true}
  let switchColor = ''
  function switchValue() {
    if(beforeChange()) {
      !switchDisabled && handleChange();
    }
  }

  function setBackgroundColor(check) {
    let newColor = check ? activeColor : inactiveColor;
    switchColor = 'border-color:' + newColor + ';background-color:' + newColor
  }
  $:{
    if (activeColor || inactiveColor) {
      setBackgroundColor(checked);
    }
  }
  function handleChange() {
    const val = !checked
    checked = val
    dispatch('change', val)
  }

  onMount(() => {
    if (activeColor || inactiveColor) {
        setBackgroundColor(checked);
      }
  })

  $: switchDisabled =  disabled

</script>
<slot name="checked-slot" prop={checked}></slot>
<slot></slot>
<div
	{name}
	class="be-switch"
	class:is-checked = {checked}
	class:is-disabled = {switchDisabled}
	on:click={switchValue}
	on:keydown
>
  <span class="be-switch__core" style="width: {width}px;{switchColor}"></span>
</div>
