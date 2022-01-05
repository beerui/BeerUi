<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let type = ''
    export let size = ''
    export let round = ''
    export let disabled = false
    export let loading = false
    const dispatch = createEventDispatcher()
    const handleClick = (evt: MouseEvent) => {
        dispatch('click', evt)
    }
</script>
<button
    class={[
        'be-button',
        disabled ? ' be-button--disabled' : '',
        size ? ' be-button--' + size : '',
        type ? ' be-button--' + type : '',
        round ? ' be-button--round__' + round : '',
        loading ? ' be-button--' + loading : ''
    ].join('')}
	on:click|stopPropagation={handleClick}
>
<!--    <beer-icon></beer-icon>-->
    <span>
        <slot></slot>
    </span>
</button>

<style lang="scss">
  @import '../assets/scss/modules/button';
</style>
