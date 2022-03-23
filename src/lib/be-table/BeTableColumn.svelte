<script lang="ts">
  export let prop: string = "";
  export let label: string = "";
  export let width: string = "";
  export let name: string = "";
  export let type: string = "";
  export let align: string = "";
  export let headeralign: string = "";
</script>
<div style='display: none;'
     class="be-table__source__column"
     data-prop={prop}
     data-type={type}
     data-label={label}
     data-name={name}
     data-width={width}
     data-align={align}
     data-headeralign={headeralign}
>
	<slot></slot>
</div>
