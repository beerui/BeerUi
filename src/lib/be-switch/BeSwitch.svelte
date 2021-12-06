<script>

  export let checked = false
  let input
  function switchValue() {
    checked = !checked
  }
  $: {
    console.log(input)
  }


</script>


<div class="be-switch" class:is-checked = {checked} on:click|preventDefault="{switchValue}">
  <input class="be-switch__input" bind:this={input} type="checkbox" />
  <span class="be-switch__core"></span>
</div>