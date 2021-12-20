<script>
	import { BeUpload } from '$lib';
	import { onMount } from 'svelte';

	onMount(() => {
		function init() {
			console.log(Notification.permission);
			Notification.requestPermission().then(permission => {
				console.log(permission);
			})
		}

		if ('Notification' in window) {
			init()
		}
	})
</script>
<div class='page-container'>
	<h1>Upload</h1>
	<BeUpload />
</div>

<style lang='scss'>
.mt-10 {margin-top: 1rem;}
</style>
