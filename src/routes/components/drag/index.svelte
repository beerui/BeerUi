<script>
import BeDrag from '$lib/be-drag/BeDrag.svelte';

const list = [
	{ key: 1, label: 'write some docs' },
	{ key: 2, label: 'start writing JSConf talk' },
	{ key: 3, label: 'buy some milk' },
	{ key: 4, label: 'mow the lawn' },
	{ key: 5, label: 'feed the turtle' },
	{ key: 6, label: 'fix some bugs' },
]
</script>

<div class='page-container'>
	<BeDrag {list} />
</div>
