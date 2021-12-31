<script>
	import BeClock from '$lib/be-clock/BeClock.svelte';
</script>
<BeClock defaultTime="00:00:00" formatTime="HH:mm:ss" />
<BeClock class='m-timer' async defaultTime="2022-10-01 00:00:00" formatTime="yyyy年MM月dd HH:mm:ss" />

<style>
:global(.m-timer) {font-size: 24px;}
</style>
