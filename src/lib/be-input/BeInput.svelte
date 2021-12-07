<script lang="ts">
    /**
     * this is input component
    */
  export let value;
  export let placeholder;
  export let size = '';
  export let readonly = false;
  export let disabled = false
</script>

<div class={['be-input', size?' be-input--'+ size:'', disabled?' is-disabled':''].join('')}>
  <input type="text" placeholder={placeholder} bind:value class="be-input__inner" {readonly} {disabled}>
</div>