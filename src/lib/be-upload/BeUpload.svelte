<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import BeIcon from "$lib/be-icon/BeIcon.svelte";
	import ajax from "./ajax";
	import previewImages from "../utils/PreviewImage";

	const dispatch = createEventDispatcher()

	const noop = () => {}

	const onStart = (rawFile) => {
		rawFile.uid = Date.now() + tempIndex++;
		let file = {
			status: 'ready',
			name: rawFile.name,
			size: rawFile.size,
			percentage: 0,
			uid: rawFile.uid,
			url: '',
			raw: rawFile
		};
		if (listType === 'picture-card' || listType === 'picture') {
			try {
				file.url = URL.createObjectURL(rawFile);
			} catch (err) {
				console.error('[Element Error][Upload]', err);
				return;
			}
		}
		fileList.push(file);
		handleOnChange(file, fileList);
	}
	const handleProgress = (ev, rawFile) => {
		const file = getFile(rawFile);
		onProgress(ev, file, fileList);
		file.status = 'uploading';
		file.percentage = ev.percent || 0;
	}
	const handleSuccess = (res, rawFile) => {
		const file = getFile(rawFile);
		if (file) {
			file.status = 'success';
			file.response = res;
			onSuccess(res, file, fileList);
			handleOnChange(file, fileList);
		}
	}
	const handleError = (err, rawFile) => {
		const file = getFile(rawFile);
		file.status = 'fail';
		fileList.splice(fileList.indexOf(file), 1);
		onError(err, file, fileList);
		handleOnChange(file, fileList);
	}
	const handleRemove = (file, raw) => {
		if (raw) {
			file = getFile(raw);
		}
		let doRemove = () => {
			abort(file);
			fileList.splice(fileList.indexOf(file), 1);
			hideUploadHandle([])
			fileListDom()
			onRemove(file, fileList);
		};
		if (!beforeRemove) {
			doRemove();
		} else if (typeof beforeRemove === 'function') {
			const before = beforeRemove(file, fileList);
			if (before && before.then) {
				before.then(() => {
					doRemove();
				}, noop);
			} else if (before !== false) {
				doRemove();
			}
		}
	}
	const handleChange = (evt) => {
		const files = evt.target.files;
		if (!files) return;
		fileListDom()
		uploadFiles(files);
	}
	const handleOnChange = (file, fileList) => {
		fileListDom()
		onChange(file, fileList);
	}
	export let accept: string // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
	export let multiple: boolean = true // 是否支持多选文件	boolean
	export let name: string = 'file' // 上传的文件字段名 默认 file
	export let data: object = null // 上传时附带的额外参数
	export let withCredentials: boolean = false // 支持发送 cookie 凭证信息
	export let showFileList: boolean = true // 是否显示已上传文件列表
	export let drag: boolean = false // 是否启用拖拽上传
	export let action: string = '' // 必选参数，上传的地址	string
	export let headers: string = '' // 设置上传的请求头部	object
	export let onPreview: Function = noop // 点击文件列表中已上传的文件时的钩子 function(file)
	export let onRemove: Function = noop // 文件列表移除文件时的钩子	function(file, fileList)
	export let onSuccess: Function = noop // 文件上传成功时的钩子	function(response, file, fileList)
	export let onError: Function = noop // 文件上传失败时的钩子	function(err, file, fileList)
	export let onProgress: Function = noop // 文件上传时的钩子	function(event, file, fileList)
	export let onChange: Function = noop // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用	function(file, fileList)
	export let beforeUpload: Function = noop // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	function(file)
	export let beforeRemove: Function = noop // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。	function(file, fileList)
	export let listType: string = 'text' // text/picture/picture-card
	export let autoUpload: boolean = true // 是否在选取文件后立即进行上传	boolean	—	true
	export let fileList: any[] = [] // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array
	export let httpRequest: Function = ajax // 覆盖默认的上传行为，可以自定义上传的实现 function
	export let disabled: boolean = false // 是否禁用	boolean
	export let hideUpload: boolean = false // 是否自动隐藏上传按钮	boolean
	export let isHideUpload: boolean = false // 是否隐藏上传按钮	boolean
	export let limit: number = null // 最大允许上传个数
	export let onExceed: Function = noop // 文件超出个数限制时的钩子	function(files, fileList)

	let files = null // input元素
	let uploadInner = null // input元素
	let mouseover = false;
	let reqs = {}
	let dragOver = false
	let draging = false
	let tempIndex = 1

	const isImage = (str) => {
		return str.indexOf('image') !== -1;
	}
	const handleClick = () => {
		if (!disabled) {
			files.value = null
			files.click();
		}
	}
	// 隐藏上传按钮
	const hideUploadHandle = (files) => {
		if (hideUpload) isHideUpload = fileList.length + files.length >= limit;
	}
	const uploadFiles = (files) => {
		hideUploadHandle(files)
		if (limit && fileList.length + files.length > limit) {
			onExceed && onExceed(files, fileList);
			return;
		}
		let postFiles = Array.prototype.slice.call(files);
		if (!multiple) { postFiles = postFiles.slice(0, 1); }
		if (postFiles.length === 0) { return; }
		postFiles.forEach(rawFile => {
			onStart(rawFile);
			if (autoUpload) upload(rawFile);
		});
	}
	const upload = (rawFile) => {
		files.value = null;
		if (!beforeUpload) {
			return post(rawFile);
		}
		const before = beforeUpload(rawFile);
		if (before && before.then) {
			before.then(processedFile => {
				const fileType = Object.prototype.toString.call(processedFile);
				if (fileType === '[object File]' || fileType === '[object Blob]') {
					if (fileType === '[object Blob]') {
						processedFile = new File([processedFile], rawFile.name, {
							type: rawFile.type
						});
					}
					for (const p in rawFile) {
						if (rawFile.hasOwnProperty(p)) {
							processedFile[p] = rawFile[p];
						}
					}
					post(processedFile);
				} else {
					post(rawFile);
				}
			}, () => {
				handleRemove(null, rawFile);
			});
		} else if (before !== false) {
			post(rawFile);
		} else {
			handleRemove(null, rawFile);
		}
	}
	const post = (rawFile) => {
		const { uid } = rawFile;
		const options = {
			headers: headers,
			withCredentials: withCredentials,
			file: rawFile,
			data: data,
			filename: name,
			action: action,
			onProgress: e => {
				handleProgress(e, rawFile);
			},
			onSuccess: res => {
				handleSuccess(res, rawFile);
				delete reqs[uid];
			},
			onError: err => {
				handleError(err, rawFile);
				delete reqs[uid];
			}
		};
		const req = httpRequest(options);
		reqs[uid] = req;
		if (req && req.then) {
			req.then(options.onSuccess, options.onError);
		}
	}
	export const abort = (file) => {
		const _reqs = reqs;
		if (file) {
			let uid = file;
			if (file.uid) uid = file.uid;
			if (_reqs[uid]) {
				_reqs[uid].abort();
			}
		} else {
			Object.keys(_reqs).forEach((uid) => {
				if (_reqs[uid]) _reqs[uid].abort();
				delete _reqs[uid];
			});
		}
	}
	const getFile = (rawFile) => {
		let target;
		fileList.every(item => {
			target = rawFile.uid === item.uid ? item : null;
			return !target;
		});
		return target;
	}
	export const clearFiles = () => {
		hideUploadHandle([])
		fileList = [];
	}
	export const submit = () => {
		fileList
			.filter(file => file.status === 'ready')
			.forEach(file => {
				upload(file.raw); // 待测试
			});
	}
	// 文件改变
	const fileListDom = () => {
		fileList = fileList
	}
	let dragover = false;
	const onDragover = (evt) => {
		if (!disabled) {
			dragover = true;
		}
	}
	const onDrop = (e) => {
		if (disabled) return;
		dragover = false;
		if (!accept || accept === '*') {
			uploadFiles([].slice.call(e.dataTransfer.files))
			return;
		}
		const _file = [].slice.call(e.dataTransfer.files).filter(file => {
			const { type, name } = file;
			const extension = name.indexOf('.') > -1
				? `.${ name.split('.').pop() }`
				: '';
			const baseType = type.replace(/\/.*$/, '');
			return accept.split(',')
				.map(type => type.trim())
				.filter(type => type)
				.some(acceptedType => {
					if (/\..+$/.test(acceptedType)) {
						return extension === acceptedType;
					}
					if (/\/\*$/.test(acceptedType)) {
						return baseType === acceptedType.replace(/\/\*$/, '');
					}
					if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
						return type === acceptedType;
					}
					return false;
				});
		})
		uploadFiles(_file)
	}
</script>
<div class="be-upload" style={$$props.style}>
	{#if drag}
		<div
			class="be-upload--{listType}"
			class:be-upload-dragger={drag}
			class:be-upload__hide={isHideUpload}
			on:click|stopPropagation={handleClick}
			on:drop|preventDefault={onDrop}
			on:dragover|preventDefault={onDragover}
			on:dragleave|preventDefault={() => dragover = false}
		>
			<slot></slot>
			<input bind:this={files} on:change={handleChange} type="file" {name} {multiple} {accept} class="be-upload__input">
		</div>
		<div class="be-upload__tip">
			<slot name="tip"></slot>
		</div>
	{/if}
	{#if showFileList}
		<ul class="be-upload-list be-upload-list--{listType}">
		{#each fileList as file}
		<li tabindex="0" class="be-upload-list__item is-{file.status || 'success'}">
			{#if listType === 'picture-card'}
				<div>
					<img src={file.url} alt="" class="be-upload-list__item-thumbnail">
					<span class="be-upload-list__item-actions">
						<span class="be-upload-list__item-preview" on:click={previewImages(file.url)}>
							<BeIcon width="20" height="20" name="zoom-in" />
						</span>
<!--						<span class="be-upload-list__item-delete">-->
<!--							<BeIcon width="20" height="20" name="download" />-->
<!--						</span>-->
						<span class="be-upload-list__item-delete" on:click={() => handleRemove(file, file.raw)}>
							<BeIcon width="20" height="20" name="delete" />
						</span>
					</span>
				</div>
			{:else}
				<a class="be-upload-list__item-name"><BeIcon name="file" />{file.name}</a>
				<label class="be-upload-list__item-status-label">
					{#if file.status === 'fail'}
						<BeIcon name="close-circle" />
					{:else if file.status === 'ready'}
						<BeIcon name="upload" />
					{:else if file.status === 'uploading'}
						<BeIcon name="loading" />
					{:else}
						<BeIcon name="check-circle" />
					{/if}
				</label>
				<span class="be-icon-close" on:click={() => handleRemove(file, file.raw)}><BeIcon name="close" /></span>
			{/if}
		</li>
		{/each}
	</ul>
	{/if}
	{#if !drag}
		<div
			class="be-upload--{listType}"
			class:be-upload-dragger={drag}
			class:be-upload__hide={isHideUpload}
			on:click|stopPropagation={handleClick}
			on:drop|preventDefault={onDrop}
			on:dragover|preventDefault={onDragover}
			on:dragleave|preventDefault={() => dragover = false}
		>
			<slot></slot>
			<input bind:this={files} on:change={handleChange} type="file" {name} {multiple} {accept} class="be-upload__input">
		</div>
		<div class='be-upload__tip'>
			<slot name='tip'></slot>
		</div>
	{/if}
</div>
