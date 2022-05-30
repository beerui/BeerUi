<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { getPropByPath } from '$lib/utils';

	export let label: string = ''; //
	export let prop: string = ''; // 匹配 rule
	export let rules: [Object, Array<any>] = []; // 匹配 rule
	export let required = undefined
	let initialLabelWidth: string = '80px' // 表单域标签的宽度

	const ctx = getContext("BeForm");

	// label的监听
	const unsubscribeLabelWidth = ctx.labelWidthWatch.subscribe((value) => {
		if (!value && initialLabelWidth) return;
		initialLabelWidth = value;
	});
	// labelPosition的监听
	let isLabelPositionTop = false
	const unsubscribeLabelPosition = ctx.labelPositionWatch.subscribe(value => isLabelPositionTop = value === 'top');
	// 验证规则监听
	let formRules = []
	const unsubscribeRulesWatch = ctx.rulesWatch.subscribe(items => {
		if (!prop) return
		formRules = items[prop]
	});

	const getRules = () => {
		const selfRules = rules;
		const requiredRule = required !== undefined ? { required: !!required } : [];
		const prop = getPropByPath(formRules, prop || '');
		formRules = formRules ? (prop.o[prop || ''] || prop.v) : [];
		return [].concat(selfRules || formRules || []).concat(requiredRule);
	}
	const isRequired = () => {
		console.log('prop', prop);
		let rules = getRules();
		let isRequired = false;
		if (rules && rules.length) {
			rules.every(rule => {
				if (rule.required) {
					isRequired = true;
					return false;
				}
				return true;
			});
		}
		console.log('isRequired', isRequired);
		return isRequired;
	}
	onMount(() => {
		console.log('isRequired', isRequired());
		return () => {
			unsubscribeLabelWidth();
			unsubscribeLabelPosition();
			unsubscribeRulesWatch();
		};
	});
</script>

<hr>
required: {required}
<div on:click={isRequired}>isRequired</div>
<div
	{...$$restProps}
	class:be-form-item={true}
	class:is-required={isRequired() || required}
>
	<div class='be-form-item__label' style:width={isLabelPositionTop ? '' : initialLabelWidth}>{label}</div>
	<div class='be-form-item__content' style:margin-left={isLabelPositionTop ? '' : initialLabelWidth}>
		<slot></slot>
	</div>
</div>
