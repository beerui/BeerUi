<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let type: String = ''
    export let size: String = ''
    export let round: String = ''
    export let disabled: Boolean = false
    export let loading: Boolean = false
    export let autofocus: Boolean = false
    export let style: String = ''
    export let buttonSize = ['', 'large', 'medium', 'small', 'mini'] as const
    export let buttonNativeType = ['button', 'submit', 'reset'] as const

    const dispatch = createEventDispatcher()
    const handleClick = (evt: MouseEvent) => {
        console.log(evt)
        dispatch('click', evt)
    }
</script>
<button
    class={[
        'beer-button',
        disabled ? 'beer-button--disabled' : '',
        size ? 'beer-button--' + size : '',
        type ? 'beer-button--' + type : '',
        round ? 'beer-button--' + round : '',
        loading ? 'beer-button--' + loading : ''
    ].join(' ')}
    autofocus
    style
    on:click={handleClick}
>
    <beer-icon></beer-icon>
    <span>
        <slot></slot>
    </span>
</button>

<style>
</style>
