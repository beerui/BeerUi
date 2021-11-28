<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import Button from "./Button.svelte";
</script>

<!-- 👇 Creates specific parameters for the story -->
<Meta
	title="Components/Button"
	component={Button}
	argTypes={{
		name: { control: 'text' },
		textColor: { control: 'color' },
	}}
/>

<Template let:args>
	<Button {...args} />
</Template>

<Story
	name="Jane"
	args={{
		name: 'Jane',
		textColor: 'rgb(173, 216, 230)',
	}}
/>

<Story
	name="John"
	args={{
		name: 'John',
		textColor: 'rgb(71, 134, 155)',
	}}
/>

<Story
	name="Jina"
	args={{
		name: 'Jina',
		textColor: 'rgb(169, 169, 169)',
	}}
/>
