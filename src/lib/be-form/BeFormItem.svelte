<script lang="ts">
	import AsyncValidator from 'async-validator';
	import { getContext, onMount } from 'svelte';
	import { eventBus, getPropByPath, objectAssign } from '$lib/utils';
	import { get_current_component } from 'svelte/internal';

	export let label: string = ''; //
	export let prop: string = ''; // 匹配 rule
	export let rules: [Object, Array<any>] = []; // 匹配 rule
	export let required: boolean = false
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
	let modelValue = ''
	let fieldValue = ''
	const unsubscribeFieldValue = ctx.modelWatch.subscribe(value => {
		modelValue = value;
		if (prop) fieldValue = modelValue[prop]
	});
	// 验证规则监听
	let formRules = []
	let formRule = []
	let validateState = ''
	const unsubscribeRulesWatch = ctx.rulesWatch.subscribe(items => formRules = items);
	const initRule = (p) => {
		if (!p) return
		formRule = formRules[p]
		initRequired(formRule)
	}
	$: initRule(prop)
	const initModel = (p) => {
		if (!p) return
		fieldValue = modelValue[p]
	}
	$: initModel(prop)

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
	let validateDisabled = false
	let validateMessage = ''
	const getRules = () => {
		let formRules = formRule;
		const selfRules = rules;
		const requiredRule = required !== undefined ? { required: !!required } : [];
		const prop = getPropByPath(formRules, prop || '');
		formRules = formRules ? (prop.o[prop || ''] || prop.v) : [];
		return [].concat(selfRules || formRules || []).concat(requiredRule);
	}
	const getFilteredRule = (trigger) => {
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
		validateDisabled = false;
		const rules = getFilteredRule(trigger);
		if ((!rules || rules.length === 0) && required === undefined) {
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
		model[prop] = fieldValue;
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
	export let _for = ''
	export let size = ''
	export let inlineMessage: [String, Boolean] = []
	export let showMessage: Boolean = true
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
	const addValidateEvents = () => {
		const rules = getRules();
		if (rules.length || required !== undefined) {
			eventBus.on('BEFormItem', (item) => {
				console.log('onFieldBlur', item);
				onFieldBlur()
			});
			eventBus.on('BEFormItem', (item) => {
				console.log('onFieldChange', item);
				onFieldChange()
			});
		}
	}
	export const removeValidateEvents = () => {
		eventBus.off('');
	}
	onMount(() => {

		if (prop) {
			ctx.addFiledCallback({
				label,
				prop,
				required,
				validate,
				clearValidate,
				removeValidateEvents,
				addValidateEvents,
				fieldValue,
				rules,
				formRule,
				error,
				validateStatus,
				for: _for
			})
		}
		// addValidateEvents()
		return () => {
			unsubscribeLabelWidth();
			unsubscribeLabelPosition();
			unsubscribeRulesWatch();
			unsubscribeFieldValue();
		};
	});
	const validateHandle = () => {

	}
</script>
<div on:click={validateHandle}>validate</div>
<div>rules: {JSON.stringify(rules)}</div>
<div>formRule: {JSON.stringify(formRule)}</div>
<div>fieldValue: {JSON.stringify(fieldValue)}</div>
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
	</div>
	<div class='be-form-item__error'></div>
</div>
