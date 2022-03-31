<script lang="ts">
  import { svgList, svg1024NameList } from '$lib/utils/svgList';

  export let name = ''
  export let color = 'none'
  export let width = '16'
  export let height = '16'

  let isIconfont = svg1024NameList.includes(name) || false

  let _class: $$props["class"] = "";
  export {_class as class};
</script>
<div class='be-icon {_class}' style='width: {width}px;height: {height}px;'>
	<svg class="be-svg" width="100%" height="100%" viewBox="0 0 {isIconfont ? '1024 1024' : '16 16'}" style='color: {color}' xmlns="http://www.w3.org/2000/svg">
		{@html svgList[name]}
	</svg>
</div>
