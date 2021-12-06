<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher()

  export let checked:boolean = false

  export let disabled:boolean = false
  
  export let width:number = 40

  export let activeColor:string
  
  export let inactiveColor:string

  let core

  function switchValue() {
    !switchDisabled && handleChange();
  }

  function setBackgroundColor() {
    let newColor = checked ? activeColor : inactiveColor;
    core.style.borderColor = newColor;
    core.style.backgroundColor = newColor;
  }

  function handleChange() {
    const val = !checked
    checked = val
    setBackgroundColor()
    dispatch('change', val)
  }

  onMount(() => {
    
    if (activeColor || inactiveColor) {
        setBackgroundColor();
      }
  })
  
  $:switchDisabled =  disabled

</script>


<div class="be-switch" class:is-checked = {checked} class:is-disabled = {switchDisabled} on:click={switchValue}>
  <!-- <input class="be-switch__input" disabled={switchDisabled} checked={checked} type="checkbox" /> -->
  <span class="be-switch__core" bind:this={core} style="width: {width}px;"></span>
</div>