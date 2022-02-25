<script lang="ts">
	import { onMount } from "svelte";
	import BeIcon from "$lib/be-icon/BeIcon.svelte";

	interface FileListItem {
		result: string,
		name: string,
		size: string
	}

	const noop = () => {}

	export let accept: string = 'image/*' // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
	export let multiple: boolean = true // 是否支持多选文件	boolean
	export let name: string = 'file' // 上传的文件字段名 默认 file
	export let data: object = null // 上传时附带的额外参数
	export let withCredentials: boolean = false // 支持发送 cookie 凭证信息
	export let showFileList: boolean = true // 是否显示已上传文件列表
	export let drag: boolean = false // 是否启用拖拽上传
	export let action: string = '' // 必选参数，上传的地址	string
	export let headers: string = '' // 设置上传的请求头部	object
	export let onPreview: Function = null // 点击文件列表中已上传的文件时的钩子 function(file)
	export let onRemove: Function = null // 文件列表移除文件时的钩子	function(file, fileList)
	export let onSuccess: Function = null // 文件上传成功时的钩子	function(response, file, fileList)
	export let onError: Function = null // 文件上传失败时的钩子	function(err, file, fileList)
	export let onProgress: Function = null // 文件上传时的钩子	function(event, file, fileList)
	export let onChange: Function = null // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用	function(file, fileList)
	export let beforeUpload: Function = null // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	function(file)
	export let beforeRemove: Function = null // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。	function(file, fileList)
	export let listType: string = 'text' // text/picture/picture-card
	export let autoUpload: boolean = true // 是否在选取文件后立即进行上传	boolean	—	true
	export let fileList: [] = [] // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array
	export let httpRequest: Function = null // 覆盖默认的上传行为，可以自定义上传的实现 function
	export let disabled: boolean = false // 是否禁用	boolean
	export let limit: number = null // 最大允许上传个数
	export let onExceed: Function = noop // 文件超出个数限制时的钩子	function(files, fileList)

	let files = null // input元素
	let uploadInner = null // input元素
	let mouseover = false;
	let reqs = {}
	let _uploadFiles = []
	let dragOver = false
	let draging = false
	let tempIndex = 1
	onMount(() => {

	});
	const isImage = (str) => {
		return str.indexOf('image') !== -1;
	}
	const handleClick = () => {
		if (!disabled) {
			files.value = null
			files.click();
		}
	}
	const handleChange = (evt) => {
		const files = evt.target.files;
		console.log('files', files);
		if (!files) return;
		uploadFiles(files);
	}
	const uploadFiles = (files) => {
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
				onRemove(null, rawFile);
			});
		} else if (before !== false) {
			post(rawFile);
		} else {
			onRemove(null, rawFile);
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
				onProgress(e, rawFile);
			},
			onSuccess: res => {
				onSuccess(res, rawFile);
				delete reqs[uid];
			},
			onError: err => {
				onError(err, rawFile);
				delete reqs[uid];
			}
		};
		const req = httpRequest(options);
		reqs[uid] = req;
		if (req && req.then) {
			req.then(options.onSuccess, options.onError);
		}
	}
	const abort = (file) => {
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
		_uploadFiles.push(file);
		onChange(file, _uploadFiles);
	}
	const handleProgress = (ev, rawFile) => {
		const file = getFile(rawFile);
		onProgress(ev, file, _uploadFiles);
		file.status = 'uploading';
		file.percentage = ev.percent || 0;
	}
	const handleSuccess = (res, rawFile) => {
		const file = getFile(rawFile);
		if (file) {
			file.status = 'success';
			file.response = res;
			onSuccess(res, file, _uploadFiles);
			onChange(file, _uploadFiles);
		}
	}
	const handleError = (err, rawFile) => {
		const file = getFile(rawFile);
		const fileList = _uploadFiles;
		file.status = 'fail';
		fileList.splice(fileList.indexOf(file), 1);
		onError(err, file, _uploadFiles);
		onChange(file, _uploadFiles);
	}
	const handleRemove = (file, raw) => {
		if (raw) {
			file = getFile(raw);
		}
		let doRemove = () => {
			_abort(file); // ???
			let fileList = _uploadFiles;
			fileList.splice(fileList.indexOf(file), 1);
			onRemove(file, fileList);
		};
		if (!beforeRemove) {
			doRemove();
		} else if (typeof beforeRemove === 'function') {
			const before = beforeRemove(file, _uploadFiles);
			if (before && before.then) {
				before.then(() => {
					doRemove();
				}, noop);
			} else if (before !== false) {
				doRemove();
			}
		}
	}
	const getFile = (rawFile) => {
		let fileList = _uploadFiles;
		let target;
		fileList.every(item => {
			target = rawFile.uid === item.uid ? item : null;
			return !target;
		});
		return target;
	}
	const _abort = (file) => {
		files['upload-inner'].abort(file); // ????
	}
	const clearFiles = () => {
		_uploadFiles = [];
	}
	const submit = () => {
		_uploadFiles
			.filter(file => file.status === 'ready')
			.forEach(file => {
				files['upload-inner'].upload(file.raw); // ????
			});
	}
</script>
<div class="be-upload">
	<div on:click|stopPropagation={handleClick}>
		<slot></slot>
		<input bind:this={files} on:change={handleChange} type="file" {name} {multiple} {accept} class="be-upload__input">
	</div>
	<div class="be-upload__tip">
		<slot name="tip"></slot>
	</div>
	<ul class="be-upload-list be-upload-list--text">
		<li tabindex="0" class="be-upload-list__item is-success">
			<a class="be-upload-list__item-name"><BeIcon name="file" />food.jpeg</a>
			<label class="be-upload-list__item-status-label">
				<BeIcon name="check-circle" />
<!--				<BeIcon name="close-circle" />-->
			</label>
			<span class="be-icon-close"><BeIcon name="close" /></span>
		</li>
		<li tabindex="0" class="be-upload-list__item is-success">
			<a class="be-upload-list__item-name"><BeIcon name="file" />food.jpeg</a>
			<label class="be-upload-list__item-status-label">
				<BeIcon name="check-circle" />
<!--				<BeIcon name="close-circle" />-->
			</label>
			<span class="be-icon-close"><BeIcon name="close" /></span>
		</li>
	</ul>
</div>
