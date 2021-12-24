<script lang="ts">

	import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher()

  export let checked:boolean = false

  export let disabled:boolean = false

  export let width:number = 40

  export let activeColor:string

  export let inactiveColor:string

  let switchColor = ''
  function switchValue() {
    !switchDisabled && handleChange();
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


<div class="be-switch" class:is-checked = {checked} class:is-disabled = {switchDisabled} on:click={switchValue}>
  <!-- <input class="be-switch__input" disabled={switchDisabled} checked={checked} type="checkbox" /> -->
  <!--  {checked ? 'border-color:' + activeColor + ';background-color:' + activeColor : 'border-color:' + inactiveColor + ';background-color:' + inactiveColor}  -->
  <span class="be-switch__core" style="width: {width}px;{switchColor}"></span>
</div>

<style lang="scss">
  @import '../assets/scss/modules/switch';
</style>
