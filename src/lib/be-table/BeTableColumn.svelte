<script lang="ts">
  export let prop:string = ''
  export let label:string = ''
  export let width:string = ''
</script>
<div class='be-table__column' data-prop={prop} data-label={label} data-width={width}>
	<slot></slot>
</div>
