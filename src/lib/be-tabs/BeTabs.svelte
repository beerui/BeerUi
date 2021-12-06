<script lang="ts">
export let active:string
console.log('active', active)
</script>
<div class="be-tabs">
	<slot prop={active}></slot>
</div>
