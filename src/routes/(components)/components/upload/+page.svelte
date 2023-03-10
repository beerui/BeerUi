<script>
	import { BeUpload } from '$lib';
	import { onMount } from 'svelte';
	import BeButton from "$lib/be-button/BeButton.svelte";
	import BeIcon from "$lib/be-icon/BeIcon.svelte";
	import DemoBlock from "$lib/demo/DemoBlock.svelte";

	let fileList3 =  []
	let fileList1 =  [{name: 'food.jpg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
	let fileList2 =  [{name: 'food.jpg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
	onMount(() => {
	})
	let handleExceed = (evt) => {
		console.log('handleExceed', evt);
	};
	const handlePreview = (evt) => {
		console.log('handlePreview', evt);
	}
	const handleRemove = (evt) => {
		console.log('handleRemove', evt);
	}
	const beforeRemove = (evt) => {
		console.log('beforeRemove', evt);
	}
	const handleChange = (evt) => {
		console.log('handleChange', evt);
	}
	const handleSuccess = (response, file, fileList) => {
		console.log('handleSuccess', response, file, fileList);
		console.log('fileList', fileList);
	}
	const beforeAvatarUpload = (file) => {
		const isJPG = file.type === 'image/jpeg';
		const isLt2M = file.size / 1024 / 1024 < 2;

		console.log('beforeAvatarUpload');
		if (!isJPG) {
			console.log('上传头像图片只能是 JPG 格式!');
		}
		if (!isLt2M) {
			console.log('上传头像图片大小不能超过 2MB!');
		}
		return isJPG && isLt2M;
	}
	const beforeUpload = (file) => {
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			console.log('上传头像图片大小不能超过 2MB!');
		}
		console.log('isLt2M', isLt2M);
		return isLt2M;
	}
	const submitHandle = () => {
		console.log(fileList2);
	}
</script>
<svelte:head>
	<title>上传 Upload 组件文档 BeerUi-官方文档</title>
	<meta name="description" content="BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component">
	<meta name="keywords" content="Upload 上传, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit">
</svelte:head>
<div class='page-container'>
	<h1>Upload 上传</h1>
	<p>通过点击或者拖拽上传文件</p>
	<h2>点击上传</h2>
	<DemoBlock
		code={`
<BeUpload
	action="https://jsonplaceholder.typicode.com/posts/"
	multiple
	limit={9}
	fileList={fileList1}>
	<BeButton size="small" type="primary">点击上传</BeButton>
	<p slot="tip">只能上传jpg/png文件，且不超过500kb</p>
</BeUpload>
`} js={`
let fileList1 =  [{name: 'food.jpg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
`}>
		<div slot="source">
			<div class="demo-list">
				<BeUpload
					action="https://jsonplaceholder.typicode.com/posts/"
					multiple
					limit={9}
					hideUpload={true}
					beforeRemove={beforeRemove}
					fileList={fileList1}>
					<BeButton size="small" type="primary">点击上传</BeButton>
					<p slot="tip">只能上传jpg/png文件，且不超过500kb</p>
				</BeUpload>
			</div>
		</div>
		<div slot="description">
			<ol>
				<li><a href="https://element.eleme.cn/#/zh-CN/component/upload" target="_blank">Element Ui Upload</a></li>
				<li>accept	接受上传的文件类型（thumbnail-mode 模式下此参数无效）	string	—	—</li>
				<li>listType	文件列表的类型	string	text/picture/picture-card	text</li>
				<li>autoUpload	是否在选取文件后立即进行上传	boolean	—	true</li>
				<li>fileList	上传的文件列表, 例如: 	array	—	[]</li>
			</ol>
		</div>
	</DemoBlock>
	<h1>照片墙</h1>
	<p>使用 list-type 属性来设置文件列表的样式。</p>

	<DemoBlock
		code={`
<BeUpload
	style="width: 480px;"
	action="https://jsonplaceholder.typicode.com/posts/"
	multiple
	listType="picture-card"
	limit={9}
	hideUpload={true}
	fileList={fileList2}>
	<div class="upload-card"><BeIcon name="add" width="40" height="40" /></div>
</BeUpload>
`} js={`
const submitHandle = () => {
	console.log(fileList2);
}
`}>
		<div slot="source">
			<div>
				<BeButton on:click={submitHandle}>查看文件</BeButton>
			</div>
			<div class="demo-list">
				<BeUpload
					style="width: 480px;"
					action="https://jsonplaceholder.typicode.com/posts/"
					multiple
					listType="picture-card"
					limit={2}
					hideUpload={true}
					fileList={fileList2}>
					<div class="upload-card"><BeIcon name="add" width="40" height="40" /></div>
					<p slot="tip">只能上传jpg/png文件，且不超过500kb</p>
				</BeUpload>
			</div>
		</div>
		<div slot="description">
			<ol>
				<li>hideUpload 在超出限制个数后 隐藏上传按钮</li>
				<li><a href="https://element.eleme.cn/#/zh-CN/component/upload" target="_blank">Element Ui Upload</a></li>
			</ol>
		</div>
	</DemoBlock>
	<h1>拖拽上传</h1>

	<DemoBlock
		code={`
<BeUpload
	style="width: 480px;"
	action="https://jsonplaceholder.typicode.com/posts/"
	drag
	multiple
	limit={3}
	accept='.pdf,.doc,.docx'
	fileList={fileList3}
	beforeUpload={beforeUpload}
>
	<div class="upload-card__drag">
		<div class="upload-card__icon">
			<BeIcon name="upload" width="40" height="40" />
		</div>
		<div class="be-upload__text">将文件拖到此处，或<em>点击上传</em></div>
	</div>
	<p slot="tip">application/pdf,application/doc,application/docx 只能上传jpg/png文件，且不超过2MB</p>
</BeUpload>
`} js={`
const beforeUpload = (file) => {
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		console.log('上传头像图片大小不能超过 2MB!');
	}
	console.log('isLt2M', isLt2M);
	return isLt2M;
}
`}>
		<div slot="source">
			<div class="demo-list">
				<BeUpload
					style="width: 480px;"
					action="https://jsonplaceholder.typicode.com/posts/"
					drag
					multiple
					accept='.pdf,.doc,.docx'
					limit={3}
					fileList={fileList3}
					beforeUpload={beforeUpload}
				>
					<div class="upload-card__drag">
						<div class="upload-card__icon">
							<BeIcon name="upload" width="40" height="40" />
						</div>
						<div class="be-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					</div>
					<p slot="tip">application/pdf,application/doc,application/docx 只能上传jpg/png文件，且不超过2MB</p>
				</BeUpload>
			</div>
		</div>
		<div slot="description">
			<ol>
				<li>drag	是否启用拖拽上传	boolean	—	false</li>
			</ol>
		</div>
	</DemoBlock>
	<h3 class='demo-table-title'>Attributes</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>参数</th>
			<th>说明</th>
			<th>类型</th>
			<th>可选值</th>
			<th>默认值</th>
		</tr>
		</thead>	<tbody>
	<tr>
		<td>action</td>
		<td>必选参数，上传的地址</td>
		<td>string</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>headers</td>
		<td>设置上传的请求头部</td>
		<td>object</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>multiple</td>
		<td>是否支持多选文件</td>
		<td>boolean</td>
		<td>—</td>
		<td>true</td>
	</tr>
	<tr>
		<td>data</td>
		<td>上传时附带的额外参数</td>
		<td>object</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>name</td>
		<td>上传的文件字段名</td>
		<td>string</td>
		<td>—</td>
		<td>file</td>
	</tr>
	<tr>
		<td>withCredentials</td>
		<td>支持发送 cookie 凭证信息</td>
		<td>boolean</td>
		<td>—</td>
		<td>false</td>
	</tr>
	<tr>
		<td>showFileList</td>
		<td>是否显示已上传文件列表</td>
		<td>boolean</td>
		<td>—</td>
		<td>true</td>
	</tr>
	<tr>
		<td>drag</td>
		<td>是否启用拖拽上传</td>
		<td>boolean</td>
		<td>—</td>
		<td>false</td>
	</tr>
	<tr>
		<td>accept</td>
		<td>接受上传的<a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept'>文件类型</a>（thumbnail-mode
			模式下此参数无效）
		</td>
		<td>string</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>onPreview</td>
		<td>点击文件列表中已上传的文件时的钩子</td>
		<td>function(file)</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>onRemove</td>
		<td>文件列表移除文件时的钩子</td>
		<td>function(file, fileList)</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>onSuccess</td>
		<td>文件上传成功时的钩子</td>
		<td>function(response, file, fileList)</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>onError</td>
		<td>文件上传失败时的钩子</td>
		<td>function(err, file, fileList)</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>onProgress</td>
		<td>文件上传时的钩子</td>
		<td>function(event, file, fileList)</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>onChange</td>
		<td>文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用</td>
		<td>function(file, fileList)</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>beforeUpload</td>
		<td>上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。</td>
		<td>function(file)</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>beforeRemove</td>
		<td>删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。</td>
		<td>function(file, fileList)</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>listType</td>
		<td>文件列表的类型</td>
		<td>string</td>
		<td>text/picture/picture-card</td>
		<td>text</td>
	</tr>
	<tr>
		<td>autoUpload</td>
		<td>是否在选取文件后立即进行上传</td>
		<td>boolean</td>
		<td>—</td>
		<td>true</td>
	</tr>
	<tr>
		<td>fileList</td>
		<td>{`上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]`}</td>
		<td>array</td>
		<td>—</td>
		<td>[]</td>
	</tr>
	<tr>
		<td>httpRequest</td>
		<td>覆盖默认的上传行为，可以自定义上传的实现</td>
		<td>function</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>disabled</td>
		<td>是否禁用</td>
		<td>boolean</td>
		<td>—</td>
		<td>false</td>
	</tr>
	<tr>
		<td>limit</td>
		<td>最大允许上传个数</td>
		<td>number</td>
		<td>—</td>
		<td>—</td>
	</tr>
	<tr>
		<td>onExceed</td>
		<td>文件超出个数限制时的钩子</td>
		<td>function(files, fileList)</td>
		<td>—</td>
		<td>-</td>
	</tr>
	</tbody>
	</table>
	<h3 class='demo-table-title'>Events</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>事件名称</th>
			<th>说明</th>
			<th>回调参数</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>clearFiles</td>
			<td>清空已上传的文件列表（该方法不支持在 beforeUpload 中调用）</td>
			<td>—</td>
		</tr>
		<tr>
			<td>abort</td>
			<td>取消上传请求</td>
			<td>（ file: fileList 中的 file 对象 ）</td>
		</tr>
		<tr>
			<td>submit</td>
			<td>手动上传文件列表</td>
			<td>—</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Slot</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>name</th>
			<th>说明</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>tip</td>
			<td>提示</td>
		</tr>
		</tbody>
	</table>
</div>
