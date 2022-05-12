<script lang='ts'>
	/**
	 * 只支持24小时制
	 * 参考 https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi
	 * TODO：
	 * - 支持12小时
	 * - 支持PM AM
	 */
	import { onDestroy } from 'svelte';
	import { classes } from '../utils';
	import { FormatTime } from '$lib/utils/beerui';

	let _class = null;
	export { _class as class };

	export let async = false;
	export let formatTime = 'yyyy-MM-dd HH:mm:ss'; // 格式化格式
	export let defaultTime = ''; // 格式化格式

	// 实例化时间
	const times = new FormatTime(formatTime);

	let timer = null;
	let timerShow = defaultTime;
	if (async) times.getTime;
	timer = setInterval(() => timerShow = times.getTime, 1000);
	onDestroy(() => timer && clearInterval(timer));
</script>
<div class={classes('be-timer', _class)}>{timerShow}</div>
