<script>
	import { onMount } from 'svelte';
	import { BeButton, BeLoading } from '$lib';
  import {loading , loadingSerive} from '$lib/utils/loading'
  let load = true
  onMount(()=> {
    // setTimeout(() => {
    //   load = true
    //   setTimeout(() => {
    //     load = false
    //   }, 5000);
    // }, 5000);
  })
  function showLoading() {
    
    let loadingInstance1 = new loadingSerive({target:document.querySelector('body')})
    loadingInstance1.show()
    setTimeout(() => {
      loadingInstance1.close()
      }, 5000);
  }
  </script>



<div class='page-container'>
  <div class="test" use:loading={load} style="height:300px;" >111111111111111111111111111111111111111111111111</div>
  <div class="test2" style="height:300px;" >111111111111111111111111111111111111111111111111</div>

  <BeButton class='demo-button' size="normal" type="primary" on:click={showLoading}>默认按钮</BeButton>
</div>