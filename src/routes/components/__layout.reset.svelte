<script lang="ts">
	import  '$lib/assets/scss/index.scss'
	import LayoutHeader from '$lib/demo/layout/LayoutHeader.svelte';
	import { page } from '$app/stores';
  import SideBar from '$lib/demo/layout/SideBar.svelte';

	$:formatUrl = () => {
	  if ($page.url.pathname.indexOf('/svg') !== -1) {
		  return '/' + $page.url.pathname.split('/')[1]
		}
	  return $page.url.pathname
	}
</script>
<div class='be-warp'>
	<LayoutHeader menu={formatUrl()} />
	<div class='be-container'>
		<SideBar />
		<div class='be-main'>
			<slot></slot>
			<div class='be-main__footer'>
				<div class='list'>
					<div class='list-item'><span>Contributors</span></div>
					<div class='list-item'><a href='https://github.com/beerui/BeerUi'>BeerUi</a></div>
				</div>
				<div class='list'>
					<div class='list-item'><span>Github</span></div>
					<div class='list-item'><a href='https://github.com/beerui/BeerUi'>组件 BeerUi</a></div>
					<div class='list-item'><a href='https://github.com/beerui/Svelte-Beerui-admin'>系统 Svelte-BeerUi-Admin</a></div>
				</div>
			</div>
		</div>
	</div>
</div>
<style lang='scss' global>
	.be-warp {
	  height: 100%;overflow: hidden;
    background: var(--bg-color-container);
	}
	.be-container, .be-main {
		height: calc(100vh - 60px);overflow-x: hidden;overflow-y: auto;position: relative;
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 8px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: var(--scrollbar-color);
      border-radius: 6px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: var(--scrollbar-color);
    }
	}
	.be-main__footer {
		height: 100px;
		margin-left: 240px;
		padding: 15px;
		background: var(--bg-color-footer);
		display: flex;
		justify-content: space-around;
		.list {
			&-item {margin: 5px;display: block;}
		}
		span {color: var(--text-secondary)}
		a {color: var(--text-primary)}
	}
	.page-container {
		margin-left: 260px;padding: 35px;
    h1,h2,h3,h4,h5,p,span {color: var(--text-color-primary)}
	}
  .demo-title {font-size: 22px;color: var(--text-color-primary);margin: 15px 0;}
  .demo-list {margin: 16px 0;}

  .demo-block {
    border: 1px solid var(--border-level-1-color);border-radius: 3px;transition: .2s;
    .source {padding: 24px;}
    .meta {background: var(--bg-color-code);border-top: 1px solid var(--border-level-2-color);transition: height .2s;}
    .description {
      padding: 20px;box-sizing: border-box;font-size: 14px;
      line-height: 22px;color: var(--text-color-primary);word-break: break-word;background-color: var(--bg-color-container);
    }
  }
  .demo-code-container {padding: 20px;}
  .pt-0 {padding-top: 0;}
  .pb-0 {padding-bottom: 0;}
  .high-code {
    width: 100%;background: var(--bg-color-code);border-radius: 6px;
    .hljs-tag {color: #878787;}
    code {
      background-color: transparent;font-size: 14px;
    }
    & * {margin: 0;padding: 0;border: 0;line-height: 1.3;}
  }
</style>
