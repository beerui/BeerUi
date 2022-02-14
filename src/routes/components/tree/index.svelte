<script lang='ts'>
    import DemoBlock from '$lib/demo/DemoBlock.svelte';
    import BeTree from "$lib/be-tree/BeTree.svelte";

    const data = [{
	    label: '一级 1',
	    children: [{
	      label: '二级 1-1',
	      children: [{
	        label: '三级 1-1-1'
	      }]
	    }]
	  }, {
	    label: '一级 2',
	    children: [{
	      label: '二级 2-1',
	      children: [{
	        label: '三级 2-1-1'
	      }]
	    }, {
	      label: '二级 2-2',
	      children: [{
	        label: '三级 2-2-1'
	      }]
	    }]
	  }, {
	    label: '一级 3',
	    children: [{
	      label: '二级 3-1',
	      children: [{
	        label: '三级 3-1-1'
	      }]
	    }, {
	      label: '二级 3-2',
	      children: [{
	        label: '三级 3-2-1'
	      }]
	    }]
	  }]
  const defaultProps = {
    children: 'children',
    label: 'label'
  }
  const handleNodeClick = (data) => {
      console.log(data);
  }
</script>
<div class='page-container'>
    <h2>Tree 树形控件</h2>
    <p>用清晰的层级结构展示信息，可展开或折叠。</p>
	<h3>基础用法</h3>
	<p>基础的树形结构展示。</p>
    <DemoBlock
	  code={`
`}>
        <div slot='source'>
            <div class='demo-list'>
	            <BeTree {data} props={defaultProps} on:nodeClick={handleNodeClick} />
            </div>
        </div>
	    <div slot="description">
		    <ol>
			    <li>提供</li>
		    </ol>
	    </div>
    </DemoBlock>
</div>
