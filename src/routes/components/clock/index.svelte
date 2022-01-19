<script>
	import BeClock from '$lib/be-clock/BeClock.svelte';
  import DemoBlock from '$lib/demo/DemoBlock.svelte';

	const code = `
<BeClock defaultTime="00:00:00" formatTime="HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022-10-01 00:00:00" formatTime="yyyy-MM-dd HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022年10月01日 00:00:00" formatTime="yyyy年MM月dd日  HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022年10月01日 00:00:00" formatTime="yyyy/MM/dd HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022年10月01日 00:00:00" formatTime="yyyy_MM_dd HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022年10月01日 00:00:00" formatTime="yyyyyyyyMM_dd HH:mm:ss" />
	`
	const js = `import { BeClock } from '@beerui/beerui'`
</script>

<div class='page-container'>
	<h1>BeClock 倒计时组件</h1>
	<DemoBlock {code} {js}>
		<div slot='source'>
			<div class='demo-list flex'>年月日：<BeClock class='m-timer' async defaultTime="2022-10-01" formatTime="yyyy-MM-dd" /></div>
			<div class='demo-list flex'>时分秒：<BeClock formatTime="HH:mm:ss" /></div>
			<div class='demo-list flex'><BeClock class='m-timer' async formatTime="yyyy年MM月dd日  HH:mm:ss" /></div>
			<div class='demo-list flex'><BeClock class='m-timer' async formatTime="yyyy/MM/dd HH:mm:ss" /></div>
			<div class='demo-list flex'><BeClock class='m-timer' async formatTime="yyyy_MM_dd HH:mm:ss" /></div>
			<div class='demo-list flex'><BeClock class='m-timer' async formatTime="yyyyyyyyMM_dd HH:mm:ss" /></div>
		</div>
		<div slot='description'>
			defaultTime: 初始展示时间
			<hr>
			formatTime: 日期格式
			<div>年 yyyy</div>
			<div>月 MM/M</div>
			<div>日 dd/d</div>
			<div>时 HH/h</div>
			<div>分 mm/m</div>
			<div>秒 ss/s</div>
		</div>
	</DemoBlock>
</div>
