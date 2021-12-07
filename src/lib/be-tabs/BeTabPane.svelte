<script lang="ts">
export let active:string
export let key:string
export let label:string
$: isActive = key === active
</script>
<div class='be-tabs__content hidden' class:block={isActive}>
	<slot></slot>
</div>

