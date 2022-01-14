<script>
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  import BeIcon from '$lib/be-icon/BeIcon.svelte';
  import { svgNameList } from '$lib/utils/svgList.js';
  import { tick } from 'svelte';
  let js = `import { BeIcon } from '@beerui/beerui'`

  let list = svgNameList.slice(0, 50)
  let code =
`
<BeIcon name='add' color='#000' />
`
	let isShowMore = true
	const showMore = async () => {
	  isShowMore = false
		await tick()
	  list = svgNameList
  }
</script>
<div class='page-container'>
	<DemoBlock {code} {js}>
		<div slot='source'>
			<div class='demo-list'>
				{#each list as icon}
					<div class='icon-list'>
						<div class='demo-icon'>
							<BeIcon name={icon} width='30' height='30' />
						</div>
						<div style="text-align:center;">{icon}</div>
					</div>
				{/each}
			</div>
			{#if isShowMore}
			<div class='demo-more' on:click={showMore}>查看更多</div>
			{/if}
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
