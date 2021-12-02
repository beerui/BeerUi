<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let type = ''
    export let size = ''
    export let round = ''
    export let disabled = false
    export let loading = false
    export const autofocus = false
    export const style = ''
    export const buttonSize = ['', 'large', 'medium', 'small', 'mini'] as const
    export const buttonNativeType = ['button', 'submit', 'reset'] as const

    const dispatch = createEventDispatcher()
    const handleClick = (evt: MouseEvent) => {
        console.log(evt)
        dispatch('click', evt)
    }
</script>
<button
    class={[
        'beer-button',
        disabled ? ' beer-button--disabled' : '',
        size ? ' beer-button--' + size : '',
        type ? ' beer-button--' + type : '',
        round ? ' beer-button--' + round : '',
        loading ? ' beer-button--' + loading : ''
    ].join('')}
    autofocus
    style
    on:click={handleClick}
>
    <beer-icon></beer-icon>
    <span>
        <slot></slot>
    </span>
</button>
