<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { objectAssign } from '$lib/utils';

	type LabelPosition = '' | 'top' | 'left' | 'right'

	export let ref: Element = null; // 获得对表单元素的引用
	export let inline = false; // 行内表单模式
	export let labelWidth = '80px'; // 表单域标签的宽度，默认 '80px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。

	export let model: any = null; // 获得表单元素绑定的值
	export let rules: any = null; // 获得表单元素绑定的验证规则
	export let labelPosition: LabelPosition = ''; // 表单域标签的位置
	export let validateOnRuleChange = true; // 规则改变时验证
	export let hideRequiredAsterisk = false; // 是否隐藏必填字段的标签旁边的红色星号

	let fields = []
	export const resetFields = () => {
		if (!model) {
			console.warn('[BeerUi Warn][Form]model is required for resetFields to work.');
			return;
		}
		fields.forEach(field => {
			field.resetField();
		});
	}

	export const clearValidate = (props = []) => {
		const fields = props.length
			? (typeof props === 'string'
					? fields.filter(field => props === field.prop)
					: fields.filter(field => props.indexOf(field.prop) > -1)
			) : fields;
		fields.forEach(field => {
			field.clearValidate();
		});
	}

	export const validate = (callback) => {
		if (!model) {
			console.warn('[BeerUi Warn][Form]model is required for validate to work!');
			return;
		}
		let promise;
		// if no callback, return promise
		if (typeof callback !== 'function' && window.Promise) {
			promise = new window.Promise((resolve, reject) => {
				callback = function(valid, invalidFields) {
					valid ? resolve(valid) : reject(invalidFields);
				};
			});
		}
		let valid = true;
		let count = 0;
		// 如果需要验证的fields为空，调用验证时立刻返回callback
		if (fields.length === 0 && callback) {
			callback(true);
		}
		let invalidFields = {};
		fields.forEach(field => {
			field.validate('', (message, field) => {
				if (message) {
					valid = false;
				}
				invalidFields = objectAssign({}, invalidFields, field);
				if (typeof callback === 'function' && ++count === fields.length) {
					callback(valid, invalidFields);
				}
			});
		});
		if (promise) {
			return promise;
		}
	}
	export const validateField = (props, cb) => {
		props = [].concat(props);
		const fields = fields.filter(field => props.indexOf(field.prop) !== -1);
		if (!fields.length) {
			console.warn('[BeerUi Warn]please pass correct props!');
			return;
		}
		fields.forEach(field => {
			field.validate('', cb);
		});
	}

	const labelWidthWatch = writable(labelWidth);
	const labelPositionWatch = writable(labelPosition);
	const rulesWatch = writable(rules);
	const modelWatch = writable(model);
	const inlineWatch = writable(inline);
	$: labelWidthWatch.set(labelWidth);
	$: labelPositionWatch.set(labelPosition);
	$: modelWatch.set(model);
	$: inlineWatch.set(inline);

	const watchRules = (rules, fields) => {
		if (validateOnRuleChange || !rules || !fields) return
	}
	$: watchRules(rules, fields)

	const callback = (item) => {
		// console.log('callback', item);
	}
	const addFiledCallback = (item) => {
		fields.push(item)
	}
	setContext("BeForm", { labelWidthWatch, labelPositionWatch, rulesWatch, modelWatch, inlineWatch, callback, addFiledCallback, hideRequiredAsterisk });

</script>
<form
	{...$$restProps}
	class:be-form="{true}"
	class:be-form--label-top={labelPosition === 'top'}
	class:be-form--label-right={labelPosition === 'right'}
	class:be-form--label-left={labelPosition === 'left'}
	class:be-form--inline={inline}
	bind:this="{ref}"
	on:submit
>
	<slot />
</form>
