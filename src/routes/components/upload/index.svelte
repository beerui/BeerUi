<script>
	import { BeUpload } from '$lib';
	import { onMount } from 'svelte';
	import BeButton from "$lib/be-button/BeButton.svelte";

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
</script>
<div class='page-container'>
	<h1>Upload 上传</h1>
	<p>通过点击或者拖拽上传文件</p>
	<h2>点击上传</h2>
	<BeUpload
		class="upload-demo"
		action="https://jsonplaceholder.typicode.com/posts/"
		onPreview={handlePreview}
		onRemove={handleRemove}
		beforeRemove={beforeRemove}
		multiple
		limit={3}
		onExceed={handleExceed}
		fileList={[]}>
		<BeButton size="small" type="primary">点击上传</BeButton>
		<p slot="tip">只能上传jpg/png文件，且不超过500kb</p>
	</BeUpload>
</div>

