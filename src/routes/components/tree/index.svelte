<script lang="ts">
  import DemoBlock from "$lib/demo/DemoBlock.svelte";
  import BeTree from "$lib/be-tree/BeTree.svelte";
  import BeButton from "$lib/be-button/BeButton.svelte";

  const data = [{
    label: "一级 1",
    children: [{
      label: "二级 1-1",
      children: [{
        label: "三级 1-1-1"
      }]
    }]
  }, {
    label: "一级 2",
    children: [{
      label: "二级 2-1",
      children: [{
        label: "三级 2-1-1"
      }]
    }, {
      label: "二级 2-2",
      children: [{
        label: "三级 2-2-1"
      }]
    }]
  }, {
    label: "一级 3",
    children: [{
      label: "二级 3-1",
      children: [{
        label: "三级 3-1-1"
      }]
    }, {
      label: "二级 3-2",
      children: [{
        label: "三级 3-2-1"
      }]
    }]
  }];
  const defaultProps = { children: "children", label: "label" };
  const handleNodeClick = (evt) => console.log("index", evt.detail);

  const defaultProps1 = { children: "zones", label: "name" };
  let count = 0;
  const loadNode = (node, resolve) => {
    if (node.level === 0) {
      return resolve([{ name: "region1" }, { name: "region2" }]);
    }
    if (node.level > 3) return resolve([]);
    if (!resolve) return;
    let hasChild;
    if (node?.data?.name === "region1") {
      hasChild = true;
    } else if (node?.data?.name === "region2") {
      hasChild = false;
    } else {
      hasChild = Math.random() > 0.5;
    }

    setTimeout(() => {
      let data;
      if (hasChild) {
        data = [{
          name: "zone" + count++
        }, {
          name: "zone" + count++
        }];
      } else {
        data = [];
      }

      resolve(data);
    }, 500);
  };
  const handleCheckChange = (evt) => {
    console.log(evt);
  };
  const defaultProps2 = {
    label: "name",
    children: "zones",
    isLeaf: "leaf"
  };
  const loadNode2 = (node, resolve) => {
    if (node.level === 0) {
      return resolve([{ name: "region" }]);
    }
    if (node.level > 1) return resolve([]);

    setTimeout(() => {
      const data = [{
        name: "leaf",
        leaf: true
      }, {
        name: "zone"
      }];

      resolve(data);
    }, 500);
  };
  let dataDefault = [{
    id: 1,
    label: "一级 1",
    children: [{
      id: 4,
      label: "二级 1-1",
      children: [{
        id: 9,
        label: "三级 1-1-1"
      }, {
        id: 10,
        label: "三级 1-1-2"
      }]
    }]
  }, {
    id: 2,
    label: "一级 2",
    children: [{
      id: 5,
      label: "二级 2-1"
    }, {
      id: 6,
      label: "二级 2-2"
    }]
  }, {
    id: 3,
    label: "一级 3",
    children: [{
      id: 7,
      label: "二级 3-1"
    }, {
      id: 8,
      label: "二级 3-2"
    }]
  }];
  const data2 = [{
    id: 1,
    label: "一级 2",
    children: [{
      id: 3,
      label: "二级 2-1",
      children: [{
        id: 4,
        label: "三级 3-1-1"
      }, {
        id: 5,
        label: "三级 3-1-2",
        disabled: true
      }]
    }, {
      id: 2,
      label: "二级 2-2",
      disabled: true,
      children: [{
        id: 6,
        label: "三级 3-2-1"
      }, {
        id: 7,
        label: "三级 3-2-2",
        disabled: true
      }]
    }]
  }];
  let data3 = [{
    id: 1,
    label: "一级 1",
    children: [{
      id: 4,
      label: "二级 1-1",
      children: [{
        id: 9,
        label: "三级 1-1-1"
      }, {
        id: 10,
        label: "三级 1-1-2"
      }]
    }]
  }, {
    id: 2,
    label: "一级 2",
    children: [{
      id: 5,
      label: "二级 2-1"
    }, {
      id: 6,
      label: "二级 2-2"
    }]
  }, {
    id: 3,
    label: "一级 3",
    children: [{
      id: 7,
      label: "二级 3-1"
    }, {
      id: 8,
      label: "二级 3-2"
    }]
  }];
  let theTree = null;
  const getCheckedNodes = () => {
    console.log(theTree);
    console.log(theTree.getCheckedNodes());
  };
  const getCheckedKeys = () => {
    console.log(theTree.getCheckedKeys());
  };
  const setCheckedNodes = () => {
    theTree.setCheckedNodes([{
      id: 5,
      label: "二级 2-1"
    }, {
      id: 9,
      label: "三级 1-1-1"
    }]);
    console.log("theTree", theTree);
  };
  const setCheckedKeys = () => {
    theTree.setCheckedKeys([3]);
  };
  const resetChecked = () => {
    theTree.setCheckedKeys([]);
  };
  let checkChangeHandle = evt => {
    console.log('checkChangeHandle', evt);
  };
</script>
<div class="page-container">
	<h2>Tree 树形控件</h2>
	<p>用清晰的层级结构展示信息，可展开或折叠。</p>
	<ol>
		<li>TODO: filter</li>
		<li>TODO: 优化 load</li>
		<li>TODO：解决已知BUG</li>
	</ol>
	<h3>基础用法</h3>
	<p>基础的树形结构展示。</p>
    <DemoBlock
		js={`
const defaultProps = { children: 'children', label: 'label' }
const handleNodeClick = (evt) => console.log('index', evt.detail)`}
		code={`
<BeTree {data} props={defaultProps} on:nodeClick={handleNodeClick} />
`}>

        <div slot='source'>
            <div class='demo-list'>
	            <BeTree {data} props={defaultProps} on:nodeClick={handleNodeClick} />
            </div>
        </div>
    </DemoBlock>
	<h3>可选择</h3>
	<p>适用于需要选择层级时使用。</p>
    <DemoBlock
		js={`
const defaultProps1 = { children: 'zones', label: 'name' }
let count = 0
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    return resolve([{ name: 'region1' }, { name: 'region2' }]);
  }
  if (node.level > 3) return resolve([]);
  if (!resolve) return;
  let hasChild;
  if (node?.data?.name === 'region1') {
    hasChild = true;
  } else if (node?.data?.name === 'region2') {
    hasChild = false;
  } else {
    hasChild = Math.random() > 0.5;
  }

  setTimeout(() => {
      let data;
    if (hasChild) {
      data = [{
        name: 'zone' + count++
      }, {
        name: 'zone' + count++
      }];
    } else {
      data = [];
    }

    resolve(data);
  }, 3500);
}
const handleCheckChange = (evt) => {
      console.log(evt);
}`}
		code={`
<BeTree
  props={defaultProps1}
  load={loadNode}
  lazy
  showCheckbox
  on:nodeClick={handleNodeClick}
  on:checkChange={handleCheckChange}
/>
`}>

        <div slot='source'>
            <div class='demo-list'>
	            <BeTree
		            props={defaultProps1}
		            load={loadNode}
		            lazy
		            showCheckbox
		            on:nodeClick={handleNodeClick}
		            on:checkChange={handleCheckChange}
	            />
            </div>
        </div>
	    <div slot="description">
		    本例还展示了动态加载节点数据的方法。
	    </div>
    </DemoBlock>
	<h3>懒加载自定义叶子节点</h3>
	<DemoBlock
		js={`
const defaultProps2 = {
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf'
};
const loadNode2 = (node, resolve) => {
  if (node.level === 0) {
    return resolve([{ name: 'region' }]);
  }
  if (node.level > 1) return resolve([]);

  setTimeout(() => {
    const data = [{
      name: 'leaf',
      leaf: true
    }, {
      name: 'zone'
    }];

    resolve(data);
  }, 500)
}`}
		code={`
<BeTree
  props={defaultProps2}
  load={loadNode2}
  showCheckbox
  lazy
/>
`}>

		<div slot="source">
			<div class="demo-list">
				<BeTree
					props={defaultProps2}
					load={loadNode2}
					showCheckbox
					lazy
				/>
			</div>
		</div>
		<div slot="description">
			由于在点击节点时才进行该层数据的获取，默认情况下 Tree 无法预知某个节点是否为叶子节点，所以会为每个节点添加一个下拉按钮，如果节点没有下层数据，则点击后下拉按钮会消失。同时，你也可以提前告知 Tree
			某个节点是否为叶子节点，从而避免在叶子节点前渲染下拉按钮。
		</div>
	</DemoBlock>
	<h3>默认展开和默认选中</h3>
    <DemoBlock
		js={`
let dataDefault = [{
  id: 1,
  label: '一级 1',
  children: [{
    id: 4,
    label: '二级 1-1',
    children: [{
      id: 9,
      label: '三级 1-1-1'
    }, {
      id: 10,
      label: '三级 1-1-2'
    }]
  }]
}, {
  id: 2,
  label: '一级 2',
  children: [{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 6,
    label: '二级 2-2'
  }]
}, {
  id: 3,
  label: '一级 3',
  children: [{
    id: 7,
    label: '二级 3-1'
  }, {
    id: 8,
    label: '二级 3-2'
  }]
}]
`}
		code={`
<BeTree
  data={dataDefault}
  showCheckbox
  nodeKey="id"
  defaultExpandedKeys={[2, 3]}
  defaultCheckedKeys={[5, 7]}
/>
`}>

        <div slot='source'>
            <div class='demo-list'>
	            <BeTree
		            data={dataDefault}
		            showCheckbox
		            nodeKey="id"
		            defaultExpandedKeys={[2, 3]}
		            defaultCheckedKeys={[5, 7]}
	            />
            </div>
        </div>
	    <div slot="description">
		    分别通过default-expanded-keys和default-checked-keys设置默认展开和默认选中的节点。需要注意的是，此时必须设置node-key，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。	    </div>
    </DemoBlock>
	<h3>禁用状态</h3>
	<p>可将 Tree 的某些节点设置为禁用状态</p>
    <DemoBlock
		js={`
const data2 = [{
  id: 1,
  label: '一级 2',
  children: [{
    id: 3,
    label: '二级 2-1',
    children: [{
      id: 4,
      label: '三级 3-1-1'
    }, {
      id: 5,
      label: '三级 3-1-2',
      disabled: true
    }]
  }, {
    id: 2,
    label: '二级 2-2',
    disabled: true,
    children: [{
      id: 6,
      label: '三级 3-2-1'
    }, {
      id: 7,
      label: '三级 3-2-2',
      disabled: true
    }]
  }]
}]
`}
		code={`
<BeTree
  data={data2}
  showCheckbox
  nodeKey="id"
  defaultExpandedKeys={[2, 3]}
  defaultCheckedKeys={[5]}
/>
`}>

        <div slot='source'>
            <div class='demo-list'>
	            <BeTree
		            data={data2}
		            showCheckbox
		            nodeKey="id"
		            defaultExpandedKeys={[2, 3]}
		            defaultCheckedKeys={[5]}
	            />
            </div>
        </div>
	    <div slot="description">
		    通过disabled设置禁用状态。
	    </div>
    </DemoBlock>
	<h3>树节点的选择</h3>
	<p>可将 Tree 的某些节点设置为禁用状态</p>
    <DemoBlock
		js={`
let data3 = [{
  id: 1,
  label: '一级 1',
  children: [{
    id: 4,
    label: '二级 1-1',
    children: [{
      id: 9,
      label: '三级 1-1-1'
    }, {
      id: 10,
      label: '三级 1-1-2'
    }]
  }]
}, {
  id: 2,
  label: '一级 2',
  children: [{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 6,
    label: '二级 2-2'
  }]
}, {
  id: 3,
  label: '一级 3',
  children: [{
    id: 7,
    label: '二级 3-1'
  }, {
    id: 8,
    label: '二级 3-2'
  }]
}];
let theTree = null
const getCheckedNodes = () => {
  console.log(theTree);
  console.log(theTree.getCheckedNodes());
}
const getCheckedKeys = () => {
  console.log(theTree.getCheckedKeys());
}
const setCheckedNodes = () => {
	theTree.setCheckedNodes([{
      id: 5,
      label: '二级 2-1'
    }, {
      id: 9,
      label: '三级 1-1-1'
    }])
  console.log('theTree', theTree);
}
const setCheckedKeys = () => {
	theTree.setCheckedKeys([3])
}
const resetChecked = () => {
	theTree.setCheckedKeys([])
}
`}
		code={`
<BeButton on:click={getCheckedNodes}>通过 node 获取</BeButton>
<BeButton on:click={getCheckedKeys}>通过 key 获取</BeButton>
<BeButton on:click={setCheckedNodes}>通过 node 设置</BeButton>
<BeButton on:click={setCheckedKeys}>通过 key 设置</BeButton>
<BeButton on:click={resetChecked}>清空</BeButton>
<BeTree
  bind:this={theTree}
  data={data3}
  showCheckbox
  nodeKey="id"
  defaultExpandAll
  highlightCurrent
  defaultExpandedKeys={[2, 3]}
  defaultCheckedKeys={[5]}
/>
`}>

        <div slot='source'>
	        <div class="buttons">
		        <BeButton on:click={getCheckedNodes}>通过 node 获取</BeButton>
		        <BeButton on:click={getCheckedKeys}>通过 key 获取</BeButton>
		        <BeButton on:click={setCheckedNodes}>通过 node 设置</BeButton>
		        <BeButton on:click={setCheckedKeys}>通过 key 设置</BeButton>
		        <BeButton on:click={resetChecked}>清空</BeButton>
	        </div>
            <div class='demo-list'>
	            <BeTree
		            bind:this={theTree}
		            data={data3}
		            showCheckbox
		            nodeKey="id"
		            defaultExpandAll
		            highlightCurrent
		            on:checkChange={checkChangeHandle}
		            defaultExpandedKeys={[2, 3]}
		            defaultCheckedKeys={[5]}
	            />
            </div>
        </div>
	    <div slot="description">
		    通过disabled设置禁用状态。
	    </div>
    </DemoBlock>
</div>
