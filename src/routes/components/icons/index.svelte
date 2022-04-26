<script>
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  import BeIcon from '$lib/be-icon/BeIcon.svelte';
  import { svgNameList } from '$lib/utils/svgList.js';
  import Clipboard from '$utils/Clipboard'
  import { showNotice } from '$lib';

  const ClipboardHandle = icon => {
	  showNotice({
		  toast: true,
		  message: '已复制名称' + icon,
		  type: 'success'
	  })
	  Clipboard(icon)
  }

</script>
<div class='page-container'>
	<h2>BeIcon 图标</h2>
	<DemoBlock code={`<BeIcon name='add' color='#000' />`} js={`import { BeIcon } from '@brewer/beerui'`}>
		<div slot='source'>
			<div class='demo-list'>
				{#each svgNameList as icon}
					<div class='icon-list' on:click={() => ClipboardHandle(icon)}>
						<div class='demo-icon'>
							<BeIcon name={icon} width='30' height='30' />
						</div>
						<div style="text-align:center;">{icon}</div>
					</div>
				{/each}
			</div>
		</div>
		<div slot='description'>
			使用name来使用不同的图标样式。
		</div>
	</DemoBlock>
</div>
<style lang='scss'>
	.icon-list {
    width: 200px;
    height: 120px;
    padding: 25px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    border-radius: 6px;
		&:hover {background: var(--bg-color-demo-hover)}
	}
	.demo-more {
		border: 1px solid var(--border-level-1-color);
		color: var(--text-color-primary);
		background: var(--bg-color-demo);
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		&:hover {
      background: var(--bg-color-demo-hover);
		}
	}
	.demo-icon {padding-bottom: 30px;color: var(--text-color-primary);}
	.demo-list {display: flex;flex-wrap: wrap;color: var(--text-color-primary);}
</style>
