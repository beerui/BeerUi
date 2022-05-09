<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		if ('Notification' in window) init()

		setTimeout(showNotification, 2000)
	})

	const showNotification = () => {
		const notification = notify('Now Playing', 'Mr Brightest')

		if (notification) {
			notification.addEventListener('click', e => {
				window.parent.focus()
				e.target.close()
			})
		}
	}

	const notify = (title, body) => {
		if (Notification.permission === 'granted') {
			return new Notification(title, {
					body,
					icon: ''
				}
			)
		}
		return null
	}
	const init = async () => {
		const permission = await Notification.requestPermission()
		switch (permission) {
			case 'granted': {
				console.log('Permission was granted');
				break
			}
			case 'denied': {
				console.log('Permission was denied');
				break
			}
			default: {
				console.log('Permission was not granted or denied');
			}
		}
	}
</script>

