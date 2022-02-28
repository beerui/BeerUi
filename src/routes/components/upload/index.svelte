<script>
	import { BeUpload } from '$lib';
	import { onMount } from 'svelte';
	import BeButton from "$lib/be-button/BeButton.svelte";
	import BeIcon from "$lib/be-icon/BeIcon.svelte";

	let fileList =  []
	// let fileList =  [{name: 'food.jpg', url: 'https://wapi.zhihuihedao.cn/uploads/banner/picturePic_93.jpg'}]
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
	$: {
		console.log('fileList-----', fileList);
	}
	const submitHandle = () => {
		console.log(fileList);
	}
</script>
<div class='page-container'>
	<h1>Upload 上传</h1>
	<p>通过点击或者拖拽上传文件</p>
	<h2>点击上传</h2>
<!--	<BeUpload-->
<!--		class="upload-demo"-->
<!--		action="https://jsonplaceholder.typicode.com/posts/"-->
<!--		onPreview={handlePreview}-->
<!--		onRemove={handleRemove}-->
<!--		onSuccess={handleSuccess}-->
<!--		beforeUpload={beforeAvatarUpload}-->
<!--		beforeRemove={beforeRemove}-->
<!--		multiple-->
<!--		listType="text"-->
<!--		limit={9}-->
<!--		onExceed={handleExceed}-->
<!--		{fileList}>-->
<!--		<BeButton size="small" type="primary">点击上传</BeButton>-->
<!--		<p slot="tip">只能上传jpg/png文件，且不超过500kb</p>-->
<!--	</BeUpload>-->
	<BeUpload
		class="upload-demo"
		style="width: 480px;"
		action="https://jsonplaceholder.typicode.com/posts/"
		onPreview={handlePreview}
		onChange={handleChange}
		multiple
		listType="picture-card"
		limit={9}
		{fileList}>
		<div class="upload-card"><BeIcon name="add" width="40" height="40" /></div>
	</BeUpload>
	<BeButton on:click={submitHandle}>submit</BeButton>
</div>
<style>
	.upload-card {width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;color: #8c939d;}
</style>
