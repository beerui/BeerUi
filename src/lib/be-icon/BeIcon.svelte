<script lang="ts">
  import RenderSvg from '$lib/_actions/renderSvg';
  export let name = ''
  export let width = '16'
  export let height = '16'
</script>
<div class='be-icon' style='width: {width}px;height: {height}px;'>
	<object use:RenderSvg={$$props} type="image/svg+xml" data={`/src/lib/assets/svg/${name}.svg`}></object>
</div>
