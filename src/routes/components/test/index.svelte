<script>
  import Nested from '$lib/Nested.svelte';

  class TreeStore {
    constructor(options) {
      this.data = []
      for (let option in options) {
        if (options.hasOwnProperty(option)) {
          this[option] = options[option];
        }
      }
      console.log(this);
      this.root = this.data
    }

    setCheckedKeys(arr) {
      this.data.forEach((el1, index) => {
        arr.forEach(el => {
          if (el1.id === el) {
            this.data[index].checked = true
          }
        })
      })
    }
  }
  let answer = 42
  let props = {
    key: 'id'
  }
  const data = [{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 9,
    label: '三级 1-1-1'
  }]
  const setCheckedKeysHandle = () => {
    store.setCheckedKeys([5])
    console.log(store.data);
    root = store.data
  }
  const store = new TreeStore({
	    data: data,
	    props: props
	  });
  let root = store['data']
</script>

<div class='page-container'>
	<Nested node={root} />
	<div on:click={setCheckedKeysHandle}>
		设置
	</div>
	<ol>
		{#each root as child}
			<li>{child.label} {child.checked || 'false'}</li>
		{/each}
	</ol>

</div>
