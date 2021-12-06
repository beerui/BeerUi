<script>
	import { BeSwitch } from '$lib';
	let switchValue = true
	let disabled = false
	let width = 40
	let activeColor = ''
	let inactiveColor = ''
	$: {
		console.log(switchValue)
	}
</script>

<BeSwitch bind:checked={switchValue} disabled={disabled} width={width} activeColor={activeColor} inactiveColor={inactiveColor}/>
