<script lang="ts">
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { BeerPS, filterClass, mapAttributes } from "$lib/utils/beerui";

  const dispatch = createEventDispatcher()
  const initData = getContext('checkGroupInit')
  // 选中
  export let checked: Boolean = false;
  export let id = "";
  export let disabled = "";
  export let name = "";
  export let value = "";
  export let label = "";

  let checkedList: String[] = initData?._checked || [];
  // 接收 选中数据
  const _setCheckedList = BeerPS.subscribe("setCheckedList", (items) => {
    setSelectList(items)
  });
  // 设置传入的选入参数
  const setSelectList = (items) => {
    // 判断选中状态
    label && items.length > 0 && items.includes(label) ? checked = true : checked = false;
  }
  // 设置初始值
  setSelectList(checkedList)

  onDestroy(() => {
    BeerPS.unsubscribe(_setCheckedList)
  })
  $: className = () => {
    const normalClass = [];
    if (checked) normalClass.push("is-checked");
    if (disabled) normalClass.push("is-disabled");
    return [...normalClass, ...filterClass($$props, "be-table--", [""])].join(" ");
  };
  const onChange = (event) => {
    checked = event.target.checked;
    dispatch('change', checked)
    BeerPS.publish("checkGroupChange", { label, checked });
  };
</script>
<!--is-checked-->
<label class={'be-checkbox ' + className()} style={$$props.style}>
  <span class={'be-checkbox__input ' + className()}>
    <span class="be-checkbox__inner"></span>
    <input
	    {...mapAttributes({ disabled, id, name, value })}
	    type="checkbox"
	    aria-hidden="false"
	    class="be-checkbox__original"
	    value={label}
	    {checked}
	    on:change|stopPropagation={onChange}
	    on:click|stopPropagation
	    on:contextmenu
	    on:dblclick
	    on:focusin
	    on:focusout
	    on:keydown
	    on:keyup
	    on:pointercancel
	    on:pointerdown
	    on:pointerenter
	    on:pointerleave
	    on:pointermove
	    on:pointerout
	    on:pointerup
	    on:input
    >
  </span>
	<span class="be-checkbox__label">
	  {#if label}
	    {label}
	  {:else}
	    <slot />
	  {/if}
  </span>
</label>
