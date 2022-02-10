<script lang="ts">
  import { svgList } from '$lib/utils/svgList';

  export let name = ''
  export let color = 'none'
  export let width = '16'
  export let height = '16'
</script>
<div class='be-icon' style='width: {width}px;height: {height}px;'>
	<svg class="be-svg" width="100%" height="100%" viewBox="0 0 16 16" style='color: {color}' xmlns="http://www.w3.org/2000/svg">
		{@html svgList[name]}
	</svg>
</div>
