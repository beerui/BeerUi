<script lang="ts">
import { setContext } from "svelte";

export let separator: string = '/'
setContext('BeBreadcrumbSeparator', separator)
</script>
<svelte:options accessors />
<div aria-label="Breadcrumb" role="navigation" class="be-breadcrumb">
	<slot></slot>
</div>
