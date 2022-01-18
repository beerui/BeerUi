<script lang="ts">
  import { svgList } from '$lib/utils/svgList';

  export let name = ''
  export let color = 'none'
  export let width = '16'
  export let height = '16'
</script>
<div class='be-icon' style='width: {width}px;height: {height}px;'>
	<slot></slot>
</div>
