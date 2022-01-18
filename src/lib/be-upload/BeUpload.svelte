<script lang="ts">
	import { onMount } from 'svelte';

	interface FileListItem {
		result: string,
		name: string,
		size: string
	}

	let fileList:FileListItem[] = [] // 文件列表
	let isActive = false
	onMount(() => {
		const dropzone = document.querySelector('.dropzone')
		const files = document.querySelector('.files')

		const init = () => {

			dropzone.addEventListener('dragenter', () => isActive = true)
			dropzone.addEventListener('dragleave', () => isActive = false)
			dropzone.addEventListener('dragover', (e) => {
				e.preventDefault()
				e.stopPropagation()
				e.dataTransfer.dropEffect = 'copy'
			})
			dropzone.addEventListener('drop', (e) => {
				console.log(e);
				e.preventDefault()
				e.stopPropagation()
				isActive = false
				const { files } = e.dataTransfer
				handleFileUpload(files)
			})

			files.addEventListener('change', e => {
				const { files } = e.target
				handleFileUpload(files)
			})
		}

		const uploadFiles = async (files) => {
			const form = new FormData()
			files.forEach(file => form.append(file.name, file))

			const request = await fetch('//dragdropfiles.glitch.me/upload', {
				method: 'POST',
				body: form
			})

			return await request.json()
		}
		const isAllowedType = (file) => ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)

		const handleFileUpload = async (files) => {
			const fileToUpload = [...files].filter(isAllowedType)

			fileToUpload.forEach(showFilePreview)

			const uploaded = await uploadFiles(fileToUpload)
			if (uploaded) {
				console.log(uploaded);
				for (const image of uploaded.images) {
					console.log(image);
				}
			}
		}
		document.addEventListener('dragover', e => e.preventDefault())
		document.addEventListener('drop', e => e.preventDefault())

		if ('draggable' in document.createElement('div')) init()

		const showFilePreview = (file) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.addEventListener('load', e => {
				fileList.push(<FileListItem>{
					result: e.target.result,
					name: file.name,
					size: file.size
				})
				fileList = fileList
			})
		}


	})
</script>
<div class='be-uploader'>
	<div style='display: none;' class='dragme'></div>
	<h2>上传文件</h2>
	<p>仅接受 .png, .jpg, .svg</p>
	<input type='file' class='files' accept='image/*' multiple>
	<div class='dropzone' class:active={isActive}>拖拽上传</div>
	<div class='list'>
		{#each fileList as item}
		<div style="display: flex;">
			<img src={item.result} alt={item.name} style='width: 20px;margin-right: 10px;' />
			<p>{item.name} <span>{item.size} bytes</span></p>
		</div>
		{/each}
	</div>
</div>

<style lang="scss">
  @import '../assets/scss/modules/upload';
</style>
