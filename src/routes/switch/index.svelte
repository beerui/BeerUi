<script>
	import { BeSwitch } from '$lib';
	let switchValue = ''
	$: {
		console.log(switchValue)
	}
</script>

<BeSwitch bind:value={switchValue} />
