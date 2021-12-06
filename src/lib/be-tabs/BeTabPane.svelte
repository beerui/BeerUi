<script lang="ts">
export let label:string
export let name:string
export let active:string

console.log('active 2', active)
</script>
<div class='be-tabs'>
	<div class="be-tabs-pane">
		<div class='be-tabs__header'>
			<div class='be-tabs__nav-wrap'>
				<div class='be-tabs__nav-scroll'>
					<div class='be-tabs__nav' class:active={active === name}>
						<div class='be-tabs__item'>{label}</div>
					</div>
				</div>
			</div>
		</div>
		<div class='be-tabs__content hidden' class:show={active === name}>
			<slot></slot>
		</div>
	</div>
</div>
