<script lang="ts">
	/**
	 * 只支持24小时制
	 * 参考 https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi
	 * TODO：
	 * - 支持12小时
	 * - 支持PM AM
	 */
	import { onDestroy, onMount } from "svelte";
	export let defaultTime:string = ''
	export let formatTime:string = 'yyyy-MM-dd HH:mm:ss' // 格式化格式

	const timerMatch:string[] = formatTime.match(/\W/g) // 取出分隔符
	const _timer:string[] = formatTime.replaceAll(/\W/g, ',').split(',') // 取出格式
	const getNowTime = () => {
		timerShow = ''
		const _date = new Date()
		const _year:string = String(_date.getFullYear())
		const _month:string = String(_date.getMonth() + 1)
		const _day:string = String(_date.getDate())
		const _hours:string = String(_date.getHours())
		const _minutes:string = String(_date.getMinutes())
		const _seconds:string = String(_date.getSeconds())
		const t = {
			yyyy: _year,
			M: _month,
			MM: concatZero(_month),
			d: _day,
			dd: concatZero(_day),
			H: _hours,
			HH: concatZero(_hours),
			m: _minutes,
			mm: concatZero(_minutes),
			s: _seconds,
			ss: concatZero(_seconds)
		}
		timerShow = concatTimer(t)
	}
	// 补零
	const concatZero = (v) => v.padStart(2, '0')
	// 拼接时间和分隔符
	const concatTimer = (t) => {
		let str = ''
		_timer.forEach((el, i) => str += t[el] + (timerMatch[i] || ''))
		return str
	}
	let timer = null
	let timerShow = defaultTime

	onMount(() => timer = setInterval(() => getNowTime(), 1000))
	onDestroy(() => timer && clearInterval(timer))
</script>
<div class="m-timer">{timerShow}</div>
<style>
    .m-timer {font-size: 24px;color: #def8ff;}
</style>
