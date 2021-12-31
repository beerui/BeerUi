<script>
	import BeClock from '$lib/be-clock/BeClock.svelte';

  // const a1 = 'yyyy_MM_dd HH:mm:ss'
  // const a2 = 'yyyy/MM/dd HH:mm:ss'
  // const a3 = 'yyyyyyyyMM/dd HH:mm:ss'

</script>
<BeClock defaultTime="00:00:00" formatTime="HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022-10-01 00:00:00" formatTime="yyyy-MM-dd HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022年10月01日 00:00:00" formatTime="yyyy年MM月dd日  HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022年10月01日 00:00:00" formatTime="yyyy/MM/dd HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022年10月01日 00:00:00" formatTime="yyyy_MM_dd HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022年10月01日 00:00:00" formatTime="yyyyyyyyMM_dd HH:mm:ss" />

