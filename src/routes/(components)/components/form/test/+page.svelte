<script>
	import { BeForm, BeFormItem, BeSelect, BeOption, BeButton, BeInput }  from '$lib';
	import BeRadio from '$lib/be-radio/BeRadio.svelte';
	let formInline = {
		user: '',
		region: '',
		date1: '',
		date2: '',
		delivery: false,
		type: [],
		resource: '',
		desc: ''
	}
	let onSubmitInline = (form) => {
		console.log(form);
	};
	let radio2 = '1'
</script>
<div class="page-container content">
	<BeRadio bind:checked={radio2} label='1'>备选项1</BeRadio>
	<BeRadio bind:checked={radio2} label='2'>备选项2</BeRadio>
	<BeForm
		bind:model={formInline}
		inline
	>
		<BeFormItem label='审批人'>
			<BeInput bind:value={formInline.user} />
		</BeFormItem>
		<BeFormItem label='活动区域'>
			<BeSelect bind:value={formInline.region}>
				<BeOption label="区域一" value="shanghai">
					qubuiadua
				</BeOption>
				<BeOption label="区域二" value="beijing">
					区域二
				</BeOption>
			</BeSelect>
		</BeFormItem>
		<BeFormItem>
			<BeButton type='primary' on:click={onSubmitInline}>查询</BeButton>
		</BeFormItem>
	</BeForm>
</div>
