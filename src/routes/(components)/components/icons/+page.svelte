<script>
  import DemoBlock from '$lib/demo/DemoBlock.svelte';
  import BeIcon from '$lib/be-icon/BeIcon.svelte';
  export const svgNameList = ['add-circle', 'add-rectangle', 'add', 'app', 'arrow-down-rectangle', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'attach', 'backtop-rectangle', 'backtop', 'backward', 'barcode', 'books', 'browse-off', 'browse', 'bulletpoint', 'calendar', 'call', 'caret-down-small', 'caret-down', 'caret-left-small', 'caret-left', 'caret-right-small', 'caret-right', 'caret-up-small', 'caret-up', 'cart', 'chart-bar', 'chart-bubble', 'chart-pie', 'chart', 'chat', 'check-circle-filled', 'check-circle', 'check-rectangle-filled', 'check-rectangle', 'check', 'chevron-down-circle', 'chevron-down-rectangle', 'chevron-down', 'chevron-left-circle', 'chevron-left-double', 'chevron-left-rectangle', 'chevron-left', 'chevron-right-circle', 'chevron-right-double', 'chevron-right-rectangle', 'chevron-right', 'chevron-up-circle', 'chevron-up-rectangle', 'chevron-up', 'circle', 'clear', 'close-circle-filled', 'close-circle', 'close-rectangle', 'close', 'cloud-download', 'cloud-upload', 'cloud', 'code', 'control-platform', 'creditcard', 'dashboard', 'delete', 'desktop', 'discount-filled', 'discount', 'download', 'edit-1', 'edit', 'ellipsis', 'enter', 'error-circle-filled', 'error-circle', 'error', 'file-add', 'file-copy', 'file-excel', 'file-image', 'file-paste', 'file-pdf', 'file-powerpoint', 'file-unknown', 'file-word', 'file', 'filter-clear', 'filter', 'flag', 'folder-add', 'folder-open', 'folder', 'fork', 'format-horizontal-align-bottom', 'format-horizontal-align-center', 'format-horizontal-align-top', 'format-vertical-align-center', 'format-vertical-align-left', 'format-vertical-align-right', 'forward', 'fullscreen-exit', 'fullscreen', 'gender-female', 'gender-male', 'gift', 'heart-filled', 'heart', 'help-circle-filled', 'help-circle', 'help', 'history', 'home', 'hourglass', 'image', 'info-circle-filled', 'info-circle', 'internet', 'jump', 'laptop', 'layers', 'link-unlink', 'link', 'loading', 'location', 'lock-off', 'lock-on', 'login', 'logo-android', 'logo-apple-filled', 'logo-apple', 'logo-chrome-filled', 'logo-chrome', 'logo-codepen', 'logo-github-filled', 'logo-github', 'logo-ie-filled', 'logo-ie', 'logo-windows-filled', 'logo-windows', 'logout', 'mail', 'menu-fold', 'menu-unfold', 'minus-circle-filled', 'minus-circle', 'minus-rectangle', 'mobile-vibrate', 'mobile', 'money-circle', 'more', 'move', 'next', 'notification-filled', 'notification', 'order-adjustment-column', 'order-ascending', 'order-descending', 'page-first', 'page-last', 'pause-circle-filled', 'photo', 'pin', 'play-circle-filled', 'play-circle-stroke', 'play-circle', 'play', 'poweroff', 'precise-monitor', 'previous', 'print', 'qrcode', 'queue', 'rectangle', 'refresh', 'remove', 'rollback', 'root-list', 'round', 'save', 'scan', 'search', 'secured', 'server', 'service', 'setting', 'share', 'shop', 'slash', 'sound', 'star-filled', 'star', 'stop-circle-1', 'stop-circle-filled', 'stop-circle', 'stop', 'swap-left', 'swap-right', 'swap', 'thumb-down', 'thumb-up', 'time-filled', 'time', 'tips', 'tools', 'unfold-less', 'unfold-more', 'upload', 'usb', 'user-add', 'user-avatar', 'user-circle', 'user-clear', 'user-talk', 'user', 'usergroup-add', 'usergroup-clear', 'usergroup', 'video', 'view-column', 'view-list', 'view-module', 'wallet', 'wifi', 'zoom-in', 'zoom-out']
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
<svelte:head>
	<title>BeIcon 图标 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="BeIcon 图标, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
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
						<div class='demo-text'>{icon}</div>
					</div>
				{/each}
			</div>
		</div>
		<div slot='description'>
			使用name来使用不同的图标样式。
		</div>
	</DemoBlock>
	<h3 class='demo-table-title'>Attributes</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>参数</th>
			<th>说明</th>
			<th>类型</th>
			<th>可选值</th>
			<th>默认值</th>
		</tr>
		</thead>
		<tbody>
			<tr>
				<td>name</td>
				<td>图标name</td>
				<td>string</td>
				<td>-</td>
				<td>''</td>
			</tr>
			<tr>
				<td>color</td>
				<td>图标颜色</td>
				<td>色值</td>
				<td>-</td>
				<td>''</td>
			</tr>
		</tbody>
	</table>
</div>
<style lang='scss'>
	.icon-list {
    width: 200px;
    height: 120px;
    padding: 25px;
    font-size: 20px;
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
	.demo-text {font-size: 14px;text-align: center;}
	.demo-list {display: flex;flex-wrap: wrap;color: var(--text-color-primary);}
</style>
