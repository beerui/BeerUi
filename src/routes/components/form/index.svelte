<script lang="ts">
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import {
		BeForm,
	    BeFormItem,
	    BeInput,
	    BeSelect,
	    BeOption,
	    BeDatePicker,
	    BeSwitch,
	    BeCheckboxGroup,
	    BeCheckbox,
	    BeRadioGroup,
	    BeRadio,
	    BeTextarea,
	    BeButton,
	    BeTimePicker
	} from '$lib';
    import { onMount } from 'svelte';

	let ref
    onMount(() => {
	    console.log(ref);
    })

    // eg1
    let form = {
	    name: '',
	    region: '',
	    date1: '',
	    date2: '',
	    delivery: false,
	    type: [],
	    resource: '',
	    desc: ''
    }
    let onSubmit = () => {
	    console.log(form);
    };

	// eg2
    let formInline = {
	    user: '',
	    region: ''
    }
    let onSubmitInline = () => {
	    console.log(formInline);
    };

    // eg3
    let labelPosition = 'right'
    let formLabelAlign = {
	    name: '',
	    region: '',
	    type: ''
    }

	// eg 4
    let ruleForm = {
	    name: '',
	    region: '',
	    date1: '',
	    date2: '',
	    delivery: false,
	    type: [],
	    resource: '',
	    desc: ''
    }
    let rules = {
	    name: [
		    { required: true, message: '请输入活动名称', trigger: 'blur' },
		    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	    ],
	    region: [
		    { required: true, message: '请选择活动区域', trigger: 'change' }
	    ],
	    date1: [
		    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    date2: [
		    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
	    ],
	    type: [
		    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
	    ],
	    resource: [
		    { required: true, message: '请选择活动资源', trigger: 'change' }
	    ],
	    desc: [
		    { required: true, message: '请填写活动形式', trigger: 'blur' }
	    ]
    }
	let ruleFormDom = null
	const submitRules = () => {
		ruleFormDom.validate((valid) => {
			if (valid) {
				alert('submit!');
			} else {
				console.log('error submit!!');
				return false;
			}
		});
	}
    const resetForm = (formName) => {
	    formName.resetFields();
    }
</script>
<div class="page-container content">
	<h2>Form 表单</h2>
	<p>由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据</p>
	<h3>基本用法</h3>

	<ol>
		<li>value</li>
	</ol>

<!--	<h3>典型表单</h3>-->
<!--	<p>包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。</p>-->
<!--	<DemoBlock code={`-->
<!--`} js={`-->
<!--import { BeForm } from '@brewer/beerui';-->
<!--`}>-->
<!--		<div slot="source">-->
<!--			<div class="demo-list">-->
<!--				form: {JSON.stringify(form)}-->
<!--				<hr>-->
<!--				<BeForm-->
<!--					bind:ref={ref}-->
<!--					bind:model={form}-->
<!--					labelWidth="80px"-->
<!--				>-->
<!--					<BeFormItem label='活动名称'>-->
<!--						<BeInput bind:value={form.name} />-->
<!--					</BeFormItem>-->
<!--					<BeFormItem label='活动区域'>-->
<!--						<BeSelect bind:value={form.region}>-->
<!--							<BeOption label="区域一" value="shanghai"></BeOption>-->
<!--							<BeOption label="区域二" value="beijing"></BeOption>-->
<!--						</BeSelect>-->
<!--					</BeFormItem>-->
<!--					<BeFormItem label='活动时间'>-->
<!--						<div class='flex'>-->
<!--							<BeDatePicker bind:value={form.date1} placeholder='选择日期' selectMode="date" />-->
<!--							<span class='px-10'>-</span>-->
<!--							<BeTimePicker bind:value={form.date2}/>-->
<!--						</div>-->
<!--					</BeFormItem>-->
<!--					<BeFormItem label='即时配送'>-->
<!--						<BeSwitch bind:checked={form.delivery} />-->
<!--					</BeFormItem>-->
<!--					<BeFormItem label='活动性质'>-->
<!--						<BeCheckboxGroup bind:checked={form.type}>-->
<!--							<BeCheckbox label="美食/餐厅线上活动" name="type"></BeCheckbox>-->
<!--							<BeCheckbox label="地推活动" name="type"></BeCheckbox>-->
<!--							<BeCheckbox label="线下主题活动" name="type"></BeCheckbox>-->
<!--							<BeCheckbox label="单纯品牌曝光" name="type"></BeCheckbox>-->
<!--						</BeCheckboxGroup>-->
<!--					</BeFormItem>-->
<!--					<BeFormItem label='特殊资源'>-->
<!--						<BeRadioGroup bind:checked={form.resource}>-->
<!--							<BeRadio label="线上品牌商赞助"></BeRadio>-->
<!--							<BeRadio label="线下场地免费"></BeRadio>-->
<!--						</BeRadioGroup>-->
<!--					</BeFormItem>-->
<!--					<BeFormItem label='活动形式'>-->
<!--						<BeTextarea bind:value={form.desc}></BeTextarea>-->
<!--					</BeFormItem>-->
<!--					<BeFormItem>-->
<!--						<BeButton type='primary' on:click={onSubmit}>立即创建</BeButton>-->
<!--						<BeButton>取消</BeButton>-->
<!--					</BeFormItem>-->
<!--				</BeForm>-->
<!--			</div>-->
<!--		</div>-->
<!--	</DemoBlock>-->
<!--	<h3>行内表单</h3>-->
<!--	<p>当垂直方向空间受限且表单较简单时，可以在一行内放置表单。</p>-->
<!--	<DemoBlock code={`-->
<!--`} js={`-->
<!--`}>-->
<!--		<div slot="source">-->
<!--			<div class="demo-list">-->
<!--				formInline: {JSON.stringify(formInline)}-->
<!--				<hr>-->
<!--				<BeForm-->
<!--					bind:model={formInline}-->
<!--					inline-->
<!--				>-->
<!--					<BeFormItem label='审批人'>-->
<!--						<BeInput bind:value={formInline.user} />-->
<!--					</BeFormItem>-->
<!--					<BeFormItem label='活动区域'>-->
<!--						<BeSelect bind:value={formInline.region}>-->
<!--							<BeOption label="区域一" value="shanghai"></BeOption>-->
<!--							<BeOption label="区域二" value="beijing"></BeOption>-->
<!--						</BeSelect>-->
<!--					</BeFormItem>-->
<!--					<BeFormItem>-->
<!--						<BeButton type='primary' on:click={onSubmitInline}>查询</BeButton>-->
<!--					</BeFormItem>-->
<!--				</BeForm>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div slot='description'>-->
<!--			设置 inline 属性可以让表单域变为行内的表单域-->
<!--		</div>-->
<!--	</DemoBlock>-->
<!--	<h3>对齐方式</h3>-->
<!--	<p>根据具体目标和制约因素，选择最佳的标签对齐方式。</p>-->
<!--	<DemoBlock code={``} js={``}>-->
<!--		<div slot="source">-->
<!--			<div class="demo-list">-->
<!--				formLabelAlign: {JSON.stringify(formLabelAlign)}-->
<!--				<hr>-->
<!--				<BeRadioGroup bind:checked={labelPosition}>-->
<!--					<span class='px-10'><BeRadio label="left">左对齐</BeRadio></span>-->
<!--					<span class='px-10'><BeRadio label="right">右对齐</BeRadio></span>-->
<!--					<span class='px-10'><BeRadio label="top">顶部对齐</BeRadio></span>-->
<!--				</BeRadioGroup>-->
<!--				<hr>-->
<!--				<BeForm-->
<!--					bind:model={formLabelAlign}-->
<!--					{labelPosition}-->
<!--					inline-->
<!--				>-->
<!--					<BeFormItem label='名称'>-->
<!--						<BeInput bind:value={formLabelAlign.name} />-->
<!--					</BeFormItem>-->
<!--					<BeFormItem label='活动区域'>-->
<!--						<BeSelect bind:value={formLabelAlign.region}>-->
<!--							<BeOption label="区域一" value="shanghai"></BeOption>-->
<!--							<BeOption label="区域二" value="beijing"></BeOption>-->
<!--						</BeSelect>-->
<!--					</BeFormItem>-->
<!--					<BeFormItem label='活动形式'>-->
<!--						<BeInput bind:value={formLabelAlign.type} />-->
<!--					</BeFormItem>-->
<!--					<BeFormItem>-->
<!--						<BeButton type='primary' on:click={onSubmitInline}>查询</BeButton>-->
<!--					</BeFormItem>-->
<!--				</BeForm>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div slot='description'>-->
<!--			通过设置 label-position 属性可以改变表单域标签的位置，可选值为 top、left，当设为 top 时标签会置于表单域的顶部-->
<!--		</div>-->
<!--	</DemoBlock>-->
	<h3>表单验证</h3>
	<p>在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。</p>
	<DemoBlock code={``} js={``}>
		<div slot="source">
			<div class="demo-list">
				ruleForm: {JSON.stringify(ruleForm)}
				<hr>
				<BeForm
					bind:model={ruleForm}
					bind:rules={rules}
					bind:this={ruleFormDom}
				>
					<BeFormItem label='活动名称' prop='name'>
						<BeInput bind:value={ruleForm.name} />
					</BeFormItem>
					<BeFormItem label='活动区域' prop='region'>
						<BeSelect bind:value={ruleForm.region}>
							<BeOption label="区域一" value="shanghai"></BeOption>
							<BeOption label="区域二" value="beijing"></BeOption>
						</BeSelect>
					</BeFormItem>
					<BeFormItem label='活动时间' required>
						<div class='flex'>
							<BeFormItem prop='date1'>
								<BeDatePicker bind:value={ruleForm.date1} placeholder='选择日期' selectMode="date" />
							</BeFormItem>
							<span class='px-10'>-</span>
							<BeFormItem prop='date2'>
								<BeTimePicker bind:value={ruleForm.date2}/>
							</BeFormItem>
						</div>
					</BeFormItem>
					<BeFormItem label='即时配送' prop='delivery'>
						<BeSwitch bind:checked={ruleForm.delivery} />
					</BeFormItem>
					<BeFormItem label='活动性质' prop='type'>
						<BeCheckboxGroup bind:checked={ruleForm.type}>
							<BeCheckbox label="美食/餐厅线上活动" name="type"></BeCheckbox>
							<BeCheckbox label="地推活动" name="type"></BeCheckbox>
							<BeCheckbox label="线下主题活动" name="type"></BeCheckbox>
							<BeCheckbox label="单纯品牌曝光" name="type"></BeCheckbox>
						</BeCheckboxGroup>
					</BeFormItem>
					<BeFormItem label='特殊资源' prop='resource'>
						<BeRadioGroup bind:checked={ruleForm.resource}>
							<BeRadio label="线上品牌商赞助"></BeRadio>
							<BeRadio label="线下场地免费"></BeRadio>
						</BeRadioGroup>
					</BeFormItem>
					<BeFormItem label='活动形式' prop='desc'>
						<BeTextarea bind:value={ruleForm.desc}></BeTextarea>
					</BeFormItem>
					<BeFormItem>
						<BeButton type='primary' on:click={onSubmit}>立即创建</BeButton>
						<BeButton>取消</BeButton>
					</BeFormItem>
				</BeForm>
			</div>
		</div>
		<div slot='description'>
			Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见 async-validator
		</div>
	</DemoBlock>
</div>

<style lang='scss'>
	.px-10 {padding-left: 10px;padding-right: 10px;}
</style>
