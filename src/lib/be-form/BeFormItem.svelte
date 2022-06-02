<script lang="ts">
	import AsyncValidator from 'async-validator';
	import { getContext, onMount, setContext, tick } from 'svelte';
	import { deepClone, objectAssign } from '$lib/utils';
	import { writable } from 'svelte/store';

	export let label: string = ''; //
	export let prop: string = ''; // 匹配 rule
	export let rules: [Object, Array<any>]; // 匹配 rule
	export let required: boolean = false // 行内必填
	export let trigger: string = ''; // 匹配行内必填 触发事件
	export let message: string = ''; // 匹配行内必填 提示信息
	let isRequired: boolean = false
	let initialLabelWidth: string = '80px' // 表单域标签的宽度

	let _this = null
	const ctx = getContext("BeForm");

	// label的监听
	const unsubscribeLabelWidth = ctx.labelWidthWatch.subscribe((value) => {
		if (!value && initialLabelWidth) return;
		initialLabelWidth = value;
	});
	// labelPosition的监听
	let isLabelPositionTop = false
	const unsubscribeLabelPosition = ctx.labelPositionWatch.subscribe(value => isLabelPositionTop = value === 'top');
	// value的监听
	let modelValue: any = {}
	let fieldValue = ''
	const unsubscribeFieldValue = ctx.modelWatch.subscribe(value => {
		if (!prop) return
		modelValue = deepClone(value);
		fieldValue = modelValue[prop] || '';
	});
	// 验证规则监听
	let formRules = []
	let formRule = []
	let validateState = ''

	const initRequired = (rules) => {
		let _isRequired = false;
		if (rules && rules.length) {
			rules.every(rule => {
				if (rule.required) {
					_isRequired = true;
					return false;
				}
				return true;
			});
		}
		isRequired = _isRequired
	}

	const unsubscribeRulesWatch = ctx.rulesWatch.subscribe(items => {
		if (!prop) return
		formRules = items;
		formRule = formRules[prop]
		fieldValue = modelValue[prop] // initModel
		initRequired(formRule)
	});

	let validateDisabled = false
	let validateMessage = ''
	const getRules = () => {
		const requiredRule = required ? { required: !!required, message: message || '', trigger } : [];
		return [].concat(rules || formRule || []).concat(requiredRule);
	}
	const getFilteredRule = (trigger) => {
		if (!prop) return
		const rules = getRules();
		return rules.filter(rule => {
			if (!rule.trigger || trigger === '') return true;
			if (Array.isArray(rule.trigger)) {
				return rule.trigger.indexOf(trigger) > -1;
			} else {
				return rule.trigger === trigger;
			}
		}).map(rule => objectAssign({}, rule));
	}
	const validate = (trigger, callback = (validateMessage?: string, invalidFields?) => {}) => {
		if (!prop) return
		validateDisabled = false;
		const rules = getFilteredRule(trigger);
		if ((!rules || rules.length === 0) && !required) {
			callback();
			return true;
		}
		validateState = 'validating';
		const descriptor = {};
		if (rules && rules.length > 0) {
			rules.forEach(rule => {
				delete rule.trigger;
			});
		}
		descriptor[prop] = rules;
		const validator = new AsyncValidator(descriptor);
		const model = {};
		model[prop] = modelValue[prop] || '';
		validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
			validateState = !errors ? 'success' : 'error';
			validateMessage = errors ? errors[0].message : '';
			callback(validateMessage, invalidFields);
			ctx.callback && ctx.callback('validate', prop, !errors, validateMessage || null);
		});
	}
	const clearValidate = () => {
		validateState = '';
		validateMessage = '';
		validateDisabled = false;
	}
	export let error = ''
	export let validateStatus = ''
	const onFieldChange = () => {
		if (validateDisabled) {
			validateDisabled = false;
			return;
		}
		validate('change');
	}
	const onFieldBlur = () => {
		validate('blur');
	}

	const resetField = () => {
		validateState = '';
		validateMessage = '';
		// let model = form.model;
		// let value = fieldValue;
		// let path = prop;
		// if (path.indexOf(':') !== -1) {
		// 	path = path.replace(/:/, '.');
		// }
		// let prop = getPropByPath(model, path, true);
		// this.validateDisabled = true;
		// if (Array.isArray(value)) {
		// 	prop.o[prop.k] = [].concat(this.initialValue);
		// } else {
		// 	prop.o[prop.k] = this.initialValue;
		// }
		// // reset validateDisabled after onFieldChange triggered
		// this.$nextTick(() => {
		// 	this.validateDisabled = false;
		// });
		// this.broadcast('ElTimeSelect', 'fieldReset', this.initialValue);
	}
	// 传递到表单组件
	const FormItemEventCallback = async (item) => {
		await tick()
		if (item.type === 'change') onFieldChange()
		if (item.type === 'blur') onFieldBlur()
	}
	const propWatch = writable(prop);
	$: propWatch.set(prop);
	setContext("BeFormItem", { FormItemEventCallback, propWatch });

	onMount(() => {
		if (prop) {
			ctx.addFiledCallback({
				label,
				prop,
				required,
				validate,
				clearValidate,
				FormItemEventCallback,
				fieldValue,
				rules,
				formRule,
				resetField,
				error,
				validateStatus,
			})
		}
		return () => {
			unsubscribeLabelWidth();
			unsubscribeLabelPosition();
			unsubscribeRulesWatch();
			unsubscribeFieldValue();
		};
	});
	const validateHandle = () => {

	}

	// 初始化
	tick().then(() => {
		if (prop) {
			formRule = formRules[prop]
			fieldValue = modelValue[prop] // initModel
			initRequired(formRule)
		}
	})
</script>
<div
	{...$$restProps}
	bind:this={_this}
	class:be-form-item={true}
	class:is-error={validateState === 'error'}
	class:is-validating={validateState === 'validating'}
	class:is-success={validateState === 'success'}
	class:is-required={isRequired || required}
>
	{#if label}
		<div class='be-form-item__label' style:width={isLabelPositionTop ? '' : initialLabelWidth}>{label}</div>
	{/if}
	<div class='be-form-item__content' style:margin-left={(isLabelPositionTop || !label) ? '' : initialLabelWidth}>
		<slot></slot>
		{#if validateState === 'error'}
			<div class='be-form-item__error'>{validateMessage}</div>
		{/if}
	</div>
</div>
