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
					limit={9}
					fileList={fileList2}>
					<div class="upload-card"><BeIcon name="add" width="40" height="40" /></div>
				</BeUpload>
			</div>
		</div>
		<div slot="description">
			<ol>
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
	accept='application/pdf,application/doc,application/docx'
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
					accept='application/pdf,application/doc,application/docx'
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
</div>
