<script lang='ts'>
    // 选中的列表
    import { createEventDispatcher, onDestroy, setContext } from "svelte";
    import { BeerPS } from "$lib/utils/beerui";

    const dispatch = createEventDispatcher()
    export let checked:String[] = []
    // 初始化数据
    setContext('checkGroupInit', { _checked: checked })

    // 监听选项改变
    const checkGroupHandle = BeerPS.subscribe('checkGroupChange', ({ label, isChecked }) => {
      if (isChecked) {
        checked.push(label)
      } else {
        const index = checked.findIndex(el => label === el)
        checked.splice(index, 1)
      }
      dispatch('onChange', checked)
    })
    onDestroy(() => {
      BeerPS.unsubscribe(checkGroupHandle)
    })
    // 设置选中数据
    export const setCheckedList = (items) => {
      checked = items;
      BeerPS.publish('setCheckedList', checked)
    }

</script>
<div role="group" aria-label="checkbox-group" class="el-checkbox-group">
	<slot></slot>
</div>
