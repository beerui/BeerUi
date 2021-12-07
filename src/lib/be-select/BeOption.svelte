<script lang="ts">
export let options;
</script>


  {#each options as item, index}
  <option value={item.value}>{item.label}</option>
  {/each}
