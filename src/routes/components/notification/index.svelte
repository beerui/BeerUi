<script>
	import BeNotification from '$lib/be-notification/BeNotification.svelte';
	import { BeerPS, eventBus, mergeObject } from '$lib/utils/index.js';
	import { onMount } from 'svelte';

	eventBus.on('login', data => {
		console.log(data + '登陆');
	})
	eventBus.on('login', data => {
		console.log(data + '登陆数据写入');
	})
	eventBus.on('logout', data => {
		console.log(data + '退出');
	})
	console.log('eventBus', eventBus);
	eventBus.emit('login', '张三')
	// eventBus.off('logout')

	const obj1 = {
		a: 1,
		b: 2,
		c: () => {
			console.log('c');
		}
	}

	const obj2 = {
		b: 4,
		c: 1
	}
	obj2.d = obj1.c
	console.log('mergeObject', mergeObject(obj1, obj2));

	onMount(() => {
	})

	const pid = BeerPS.subscribe('talk', data => {
		console.log('A 接到通知');
		console.log(data);
	})
	BeerPS.subscribe('talk', data => {
		console.log('B 接到通知');
		console.log(data);
	})
	BeerPS.subscribe('cancel', data => {
		console.log('C 取消' + data);
	})
	BeerPS.publish('talk', {
		name: '华哥',
		age: 25,
		weight: 140
	})
	// BeerPS.unsubscribe(pid)
	console.log('pid', pid);
	console.log('BeerPS', BeerPS);
</script>
<div class='page-container'>
	<h1>Notification</h1>
	<BeNotification />

	<ul id='list'>
		<li>A</li>
		<li>B</li>
		<li>C</li>
		<li>D</li>
		<div>G</div>
	</ul>
</div>
