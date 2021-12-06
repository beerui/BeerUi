<script lang="ts">
  import { onMount } from 'svelte'
  export let value = '1'
  export let options;
  let select;
  $:console.log(select)
  onMount(()=>{
    
  })
</script>

<div>
  <select bind:value={value} bind:this={select} class="be-select"  >
    {#each options as item, index}
    <option value={item.value}>{item.label}</option>
    {/each}
  </select>
</div>