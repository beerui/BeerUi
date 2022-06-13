<script lang='ts'>

	import { BeButton } from '$lib';
	import BeIcon from '$lib/be-icon/BeIcon.svelte';
	import DemoBlock from '$lib/demo/DemoBlock.svelte';
	import { showNotice, closeALlNotice, closeNotice } from '$lib';


	let noticeInstance;
	function openInfo(): void {
		noticeInstance = showNotice({
			title: '相思',
			message: '红豆生南国，春来发几枝',
			duration: 3000
		});
	}

	function openPosInfo(position: string): void {
		let title: string = '提示';
		let message: string = '这是信息';
		if (position === 'top-right') {
			title = '提示';
			message = '两情若是久长时，又岂在朝朝暮暮。';
		} else if (position === 'top-left') {
			title = '江行寄远';
			message = '思君不可得，愁见江水碧。';
		} else if (position === 'bottom-right') {
			title = '长恨歌';
			message = '后宫佳丽三千人，三千宠爱在一身。';
		} else if (position === 'bottom-left') {
			title = '长恨歌';
			message = '在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。';
		}
		showNotice({
			title,
			message,
			position,
			duration: 3000
		});
	}

	function openColorNotice() {
		showNotice({
			title: '上邪',
			message: '山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。',
			duration: 3000,
			titleColor: '#2b9939',
			messageColor: '#7376f0'
		});
	}


	function openNotice() {
		showNotice({
			title: '滕王阁序',
			message: '落霞与孤鹜齐飞,秋水共长天一色',
			duration: 0
		});
	}

	function closeOne() {
		closeNotice(noticeInstance);
	}

	function closeAll() {
		closeALlNotice();
	}

	function openNotice1() {
		showNotice({
			title: '三五七言',
			message: '入我相思门',
			duration: 3000,
			onClose: onClose
		});
	}

	function onClose() {
		alert('知我相思苦');
	}

	function openNotice2() {
		showNotice({
			title: '木兰花·拟古决绝词柬友',
			message: '人生若只如初见，何事秋风悲画扇。',
			duration: 0,
			onClick: onClick
		});
	}

	function onClick() {
		alert('你好Beer UI');
	}

	const openTypeNotice = (type, toast) => {
		showNotice({
			title: '提示',
			toast: toast,
			message: type,
			duration: 30000,
			type
		});
	}
	const types = {
		success: { name: 'check-circle-filled', color: '#67c23a' },
		warning: { name: 'error-circle-filled', color: '#e6a23c' },
		info: { name: 'info-circle-filled', color: '#909399' },
		error: { name: 'close-circle-filled', color: '#f56c6c' }
	}
</script>

<div class='page-container content'>
	<h2>notice</h2>
	<p>显示全局的通知提醒消息</p>
	<h3>基本用法</h3>
	<ol>
		<li>showNotice(options) 显示消息弹框</li>
		<li>closeALlNotice 关闭所有消息弹框</li>
		<li>closeNotice(id, cb) 关闭单个消息弹框</li>
	</ol>
	<h4>options</h4>
	<ol>
		<li>title 标题 </li>
		<li>toast false 是否居中显示 只展示message内容 </li>
		<li>type 带有倾向性</li>
		<li>message 内容</li>
		<li>duration 持续时间</li>
		<li>position 展示位置</li>
		<li>titleColor 标题颜色</li>
		<li>messageColor 信息颜色</li>
		<li>onClick</li>
		<li>closeAll()</li>
		<li>close()</li>
	</ol>
	<DemoBlock js={`
import { showNotice, closeALlNotice, closeNotice } from '@brewer/beerui';
let noticeInstance;
function openInfo(): void {
	// 如需手动关闭需要接收返回的id 调用closeNotice(id) 指定去关闭
	noticeInstance = showNotice({
		title: '相思',
		message: '红豆生南国，春来发几枝',
		duration: 3000
	});
}

function openPosInfo(position: string): void {
	let title: string = '提示';
	let message: string = '这是信息';
	if (position === 'top-right') {
		title = '提示';
		message = '两情若是久长时，又岂在朝朝暮暮。';
	} else if (position === 'top-left') {
		title = '江行寄远';
		message = '思君不可得，愁见江水碧。';
	} else if (position === 'bottom-right') {
		title = '长恨歌';
		message = '后宫佳丽三千人，三千宠爱在一身。';
	} else if (position === 'bottom-left') {
		title = '长恨歌';
		message = '在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。';
	}
	showNotice({
		title,
		message,
		position,
		duration: 3000
	});
}

function openColorNotice() {
	showNotice({
		title: '上邪',
		message: '山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。',
		duration: 3000,
		titleColor: '#2b9939',
		messageColor: '#7376f0'
	});
}


function openNotice() {
	showNotice({
		title: '滕王阁序',
		message: '落霞与孤鹜齐飞,秋水共长天一色',
		duration: 0
	});
}

function closeOne() {
	closeNotice(noticeInstance);
}

function closeAll() {
	closeALlNotice();
}

function openNotice1() {
	showNotice({
		title: '三五七言',
		message: '入我相思门',
		duration: 3000,
		onClose: onClose
	});
}

function onClose() {
	alert('知我相思苦');
}

function openNotice2() {
	showNotice({
		title: '木兰花·拟古决绝词柬友',
		message: '人生若只如初见，何事秋风悲画扇。',
		duration: 0,
		onClick: onClick
	});
}

function onClick() {
	alert('你好Beer UI');
}

`}>
		<div slot='source'>
			<div class='demo-list'>
				<BeButton size='normal' type='default' on:click={openInfo}>点击弹出消息</BeButton>
				<hr>
				<h3>指定位置</h3>
				<p>默认为<code>top-right</code>可选择<code>bottom-right</code><code>top-left</code><code>bottom-left</code></p>
				<div class='demo-notice'>
					<BeButton size='normal' type='default' on:click={() =>openPosInfo('top-right')}>右上角</BeButton>
					<BeButton size='normal' type='default' on:click={() =>openPosInfo('bottom-right')}>右下角</BeButton>
					<BeButton size='normal' type='default' on:click={() =>openPosInfo('top-left')}>左上角</BeButton>
					<BeButton size='normal' type='default' on:click={() =>openPosInfo('bottom-left')}>左下角</BeButton>
				</div>
				<h3>自定义颜色</h3>
				<p>添加参数<code>titleColor</code>可修改标题颜色,添加<code>messageColor</code>可修改信息颜色</p>
				<div>
					<BeButton size='normal' type='default' on:click={openColorNotice}>自定义颜色</BeButton>
				</div>
				<h3>手动关闭</h3>
				<p>目前手动关闭只能关闭最后一个notice使用<code>close</code>如果要一次性关闭所有可使用<code>closeAll</code>
				<div>
					<BeButton size='normal' type='default' on:click={openNotice}>弹出</BeButton>
					<BeButton size='normal' type='default' on:click={closeOne}>关闭</BeButton>
					<BeButton size='normal' type='default' on:click={closeAll}>关闭所有</BeButton>
				</div>
			</div>
		</div>
	</DemoBlock>


	<h3>带有倾向性</h3>
	<p>带有 icon，常用来显示「成功 <span>success</span>、警告 <span>warning</span>、消息 <span>info</span>、错误 <span>error</span>」类的系统消息</p>
	<DemoBlock
	js={`
const openTypeNotice = (type, toast) => {
	showNotice({
		title: '提示',
		toast: toast,
		message: type,
		duration: 3000,
		type
	});
}
	`}
	code={`
	<BeButton size='normal' type='default' on:click={() => openTypeNotice('success', true)}>
		<div style='display: flex'>
			<BeIcon name='check-circle-filled' color='#67c23a' /> <span style='padding-left: 5px;'>成功</span>
		</div>
	</BeButton>
	<BeButton size='normal' type='default' on:click={() => openTypeNotice('warning')}>
		<div style='display: flex'>
			<BeIcon name='error-circle-filled' color='#e6a23c' /> <span style='padding-left: 5px;'>警告</span>
		</div>
	</BeButton>
	<BeButton size='normal' type='default' on:click={() => openTypeNotice('info')}>
		<div style='display: flex'>
			<BeIcon name='info-circle-filled' color='#909399' /> <span style='padding-left: 5px;'>消息</span>
		</div>
	</BeButton>
	<BeButton size='normal' type='default' on:click={() => openTypeNotice('error')}>
		<div style='display: flex'>
			<BeIcon name='close-circle-filled' color='#f56c6c' /> <span style='padding-left: 5px;'>错误</span>
		</div>
	</BeButton>`}
	>
		<div slot='source'>
			<BeButton size='normal' type='default' on:click={() => openTypeNotice('success', true)}>
				<div style='display: flex'>
					<BeIcon name='check-circle-filled' color='#67c23a' /> <span style='padding-left: 5px;'>成功</span>
				</div>
			</BeButton>
			<BeButton size='normal' type='default' on:click={() => openTypeNotice('warning')}>
				<div style='display: flex'>
					<BeIcon name='error-circle-filled' color='#e6a23c' /> <span style='padding-left: 5px;'>警告</span>
				</div>
			</BeButton>
			<BeButton size='normal' type='default' on:click={() => openTypeNotice('info')}>
				<div style='display: flex'>
					<BeIcon name='info-circle-filled' color='#909399' /> <span style='padding-left: 5px;'>消息</span>
				</div>
			</BeButton>
			<BeButton size='normal' type='default' on:click={() => openTypeNotice('error')}>
				<div style='display: flex'>
					<BeIcon name='close-circle-filled' color='#f56c6c' /> <span style='padding-left: 5px;'>错误</span>
				</div>
			</BeButton>
		</div>
		<div slot='description'>
			<ol>
				<li>title: string 标题</li>
				<li>toast: boolean 居中展示的提示。标题不显示 只展示message</li>
				<li>message: string 展示信息</li>
				<li>duration: number 持续时间</li>
				<li>type: number => success warning info error带图标的提示</li>
			</ol>
		</div>
	</DemoBlock>

	<h3>监听notice关闭</h3>
	<p>添加参数<code>onClose</code>类型为<code>Function</code></p>
	<div>
		<BeButton size='normal' type='default' on:click={openNotice1}>弹出</BeButton>
	</div>

	<h3>点击事件</h3>
	<p>添加参数<code>onClick</code>类型为<code>Function</code></p>
	<div>
		<BeButton size='normal' type='default' on:click={openNotice2}>弹出</BeButton>
	</div>
</div>
