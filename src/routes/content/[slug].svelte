<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		console.log(page)
		return { props: { slug: '' } }
	}
</script>
<script lang="ts">
	export let slug: any
	console.log(this)
</script>
content {slug}
