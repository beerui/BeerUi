<script lang="ts">
  import DemoBlock from "$lib/demo/DemoBlock.svelte";
  import BeTree from '$lib/be-tree/BeTree.svelte';
  import BeButton from "$lib/be-button/BeButton.svelte";
  import BeInput from '$lib/be-input/BeInput.svelte';

  let dataLazy = []
  setTimeout(() => {
	 dataLazy = data
  }, 1000)
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
    }, 5000);
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

  let theFilterTree = null
  let value = ''
  const filterText = () => {
	  theFilterTree.filter(value)
  }
  const filterNodeMethod = (value, data) => {
	  if (!value) return true;
	  return data.label.indexOf(value) !== -1;
  }
</script>
<div class="page-container">
	<h2>Tree 树形控件</h2>
	<p>用清晰的层级结构展示信息，可展开或折叠。</p>
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
	            <BeTree bind:data={dataLazy} props={defaultProps} on:nodeClick={handleNodeClick} />
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
		            defaultExpandedKeys={[2, 3]}
	                defaultCheckedKeys={[5]}
	            />
	            <!--		            on:checkChange={checkChangeHandle}-->
            </div>
        </div>
	    <div slot="description">
		    通过disabled设置禁用状态。
	    </div>
    </DemoBlock>
	<h3>节点过滤</h3>
	<p>通过关键字过滤树节点</p>
	<DemoBlock
		js={`
  let theFilterTree = null
  let value = ''
  const filterText = () => {
	  theFilterTree.filter(value)
  }
  const filterNodeMethod = (value, data) => {
	  if (!value) return true;
	  return data.label.indexOf(value) !== -1;
  }`}
		code={`
<BeInput bind:value placeholder="请输入内容" on:input={filterText} />
<BeTree
	bind:this={theFilterTree}
	data={data3}
	showCheckbox
	nodeKey="id"
	defaultExpandAll
	highlightCurrent
	defaultExpandedKeys={[2, 3]}
	defaultCheckedKeys={[5]}
	filterNodeMethod={filterNodeMethod}
/>
		`}>

		<div slot='source'>
			<div class="buttons">
				<BeInput bind:value placeholder="请输入内容" on:input={filterText} />
			</div>
			<div class='demo-list'>
				<BeTree
					bind:this={theFilterTree}
					data={data3}
					showCheckbox
					nodeKey="id"
					defaultExpandAll
					highlightCurrent
					defaultExpandedKeys={[2, 3]}
					defaultCheckedKeys={[5]}
					filterNodeMethod={filterNodeMethod}
				/>
			</div>
		</div>
		<div slot="description">
			在需要对节点进行过滤时，调用 Tree 实例的filter方法，参数为关键字。需要注意的是，此时需要设置filterNodeMethod，值为过滤函数。
		</div>
	</DemoBlock>
	<h3 class='demo-table-title'>Attributes</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>参数</th>
			<th>说明</th>
			<th>类型</th>
			<th>可选值</th>
			<th>默认值</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>data</td>
			<td>展示数据</td>
			<td>array</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>emptyText</td>
			<td>内容为空的时候展示的文本</td>
			<td>String</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>nodeKey</td>
			<td>每个树节点用来作为唯一标识的属性，整棵树应该是唯一的</td>
			<td>String</td>
			<td>—</td>
			<td>label</td>
		</tr>
		<tr>
			<td>props</td>
			<td>配置选项，具体看下表</td>
			<td>object</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>renderAfterExpand</td>
			<td>是否在第一次展开某个树节点后才渲染其子节点</td>
			<td>boolean</td>
			<td>—</td>
			<td>true</td>
		</tr>
		<tr>
			<td>load</td>
			<td>加载子树数据的方法，仅当 lazy 属性为true 时生效</td>
			<td>function(node, resolve)</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>renderContent</td>
			<td>树节点的内容区的渲染 Function</td>
			<td>{`Function(h, { node, data, store }`}</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>highlightCurrent</td>
			<td>是否高亮当前选中节点，默认值是 false。</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>defaultExpandAll</td>
			<td>是否默认展开所有节点</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>expandOnClickNode</td>
			<td>是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。</td>
			<td>boolean</td>
			<td>—</td>
			<td>true</td>
		</tr>
		<tr>
			<td>checkOnClickNode</td>
			<td>是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>autoExpandParent</td>
			<td>展开子节点的时候是否自动展开父节点</td>
			<td>boolean</td>
			<td>—</td>
			<td>true</td>
		</tr>
		<tr>
			<td>defaultExpandedKeys</td>
			<td>默认展开的节点的 key 的数组</td>
			<td>array</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>showCheckbox</td>
			<td>节点是否可被选择</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>checkStrictly</td>
			<td>在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>defaultCheckedKeys</td>
			<td>默认勾选的节点的 key 的数组</td>
			<td>array</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>currentNodeKey</td>
			<td>当前选中的节点</td>
			<td>string, number</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>filterNodeMethod</td>
			<td>对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏</td>
			<td>Function(value, data, node)</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>accordion(TODO)</td>
			<td>是否每次只打开一个同级树节点展开</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>indent(TODO)</td>
			<td>相邻级节点间的水平缩进，单位为像素</td>
			<td>number</td>
			<td>—</td>
			<td>16</td>
		</tr>
		<tr>
			<td>iconClass(TODO)</td>
			<td>自定义树节点的图标</td>
			<td>string</td>
			<td>-</td>
			<td>-</td>
		</tr>
		<tr>
			<td>lazy</td>
			<td>是否懒加载子节点，需与 load 方法结合使用</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>draggable(TODO)</td>
			<td>是否开启拖拽节点功能</td>
			<td>boolean</td>
			<td>—</td>
			<td>false</td>
		</tr>
		<tr>
			<td>allowDrag(TODO)</td>
			<td>判断节点能否被拖拽</td>
			<td>Function(node)</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>allowDrop(TODO)</td>
			<td>拖拽时判定目标节点能否被放置。<code>type</code> 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后</td>
			<td>Function(draggingNode, dropNode, type)</td>
			<td>—</td>
			<td>—</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Props</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>参数</th>
			<th>说明</th>
			<th>类型</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>label</td>
			<td>指定节点标签为节点对象的某个属性值</td>
			<td>string, function(data, node)</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>children</td>
			<td>指定子树为节点对象的某个属性值</td>
			<td>string</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>指定节点选择框是否禁用为节点对象的某个属性值</td>
			<td>boolean, function(data, node)</td>
			<td>—</td>
			<td>—</td>
		</tr>
		<tr>
			<td>isLeaf</td>
			<td>指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效</td>
			<td>boolean, function(data, node)</td>
			<td>—</td>
			<td>—</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Method</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>name</th>
			<th>说明</th>
			<th>参数</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>filter</td>
			<td>对树节点进行筛选操作</td>
			<td>接收一个任意类型的参数，该参数会在 filter-node-method 中作为第一个参数</td>
		</tr>
		<tr>
			<td>updateKeyChildren</td>
			<td>通过 keys 设置节点子元素，使用此方法必须设置 node-key 属性</td>
			<td>(key, data) 接收两个参数，1. 节点 key 2. 节点数据的数组</td>
		</tr>
		<tr>
			<td>getCheckedNodes</td>
			<td>若节点可被选择（即 <code>show-checkbox</code> 为 <code>true</code>），则返回目前被选中的节点所组成的数组</td>
			<td>(leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 <code>false</code> 2. 是否包含半选节点，默认值为 <code>false</code>
			</td>
		</tr>
		<tr>
			<td>setCheckedNodes</td>
			<td>设置目前勾选的节点，使用此方法必须设置 node-key 属性</td>
			<td>(nodes) 接收勾选节点数据的数组</td>
		</tr>
		<tr>
			<td>getCheckedKeys</td>
			<td>若节点可被选择（即 <code>show-checkbox</code> 为 <code>true</code>），则返回目前被选中的节点的 key 所组成的数组</td>
			<td>(leafOnly) 接收一个 boolean 类型的参数，若为 <code>true</code> 则仅返回被选中的叶子节点的 keys，默认值为 <code>false</code></td>
		</tr>
		<tr>
			<td>setCheckedKeys</td>
			<td>通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性</td>
			<td>(keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 <code>true</code> 则仅设置叶子节点的选中状态，默认值为
				<code>false</code></td>
		</tr>
		<tr>
			<td>setChecked</td>
			<td>通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性</td>
			<td>(key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中 3. boolean 类型，是否设置子节点 ，默认为 false
			</td>
		</tr>
		<tr>
			<td>getHalfCheckedNodes</td>
			<td>若节点可被选择（即 <code>show-checkbox</code> 为 <code>true</code>），则返回目前半选中的节点所组成的数组</td>
			<td>-</td>
		</tr>
		<tr>
			<td>getHalfCheckedKeys</td>
			<td>若节点可被选择（即 <code>show-checkbox</code> 为 <code>true</code>），则返回目前半选中的节点的 key 所组成的数组</td>
			<td>-</td>
		</tr>
		<tr>
			<td>getCurrentKey</td>
			<td>获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null</td>
			<td>—</td>
		</tr>
		<tr>
			<td>getCurrentNode</td>
			<td>获取当前被选中节点的 data，若没有节点被选中则返回 null</td>
			<td>—</td>
		</tr>
		<tr>
			<td>setCurrentKey</td>
			<td>通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性</td>
			<td>(key) 待被选节点的 key，若为 null 则取消当前高亮的节点</td>
		</tr>
		<tr>
			<td>setCurrentNode</td>
			<td>通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性</td>
			<td>(node) 待被选节点的 node</td>
		</tr>
		<tr>
			<td>getNode</td>
			<td>根据 data 或者 key 拿到 Tree 组件中的 node</td>
			<td>(data) 要获得 node 的 key 或者 data</td>
		</tr>
		<tr>
			<td>remove</td>
			<td>删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性</td>
			<td>(data) 要删除的节点的 data 或者 node</td>
		</tr>
		<tr>
			<td>append</td>
			<td>为 Tree 中的一个节点追加一个子节点</td>
			<td>(data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node</td>
		</tr>
		<tr>
			<td>insertBefore</td>
			<td>为 Tree 的一个节点的前面增加一个节点</td>
			<td>(data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node</td>
		</tr>
		<tr>
			<td>insertAfter</td>
			<td>为 Tree 的一个节点的后面增加一个节点</td>
			<td>(data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node</td>
		</tr>
		</tbody>
	</table>
	<h3 class='demo-table-title'>Events</h3>
	<table class='demo-table'>
		<thead>
		<tr>
			<th>事件名称</th>
			<th>说明</th>
			<th>回调参数</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>nodeClick</td>
			<td>节点被点击时的回调</td>
			<td>共三个参数，依次为：传递给 <code>data</code> 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
		</tr>
		<tr>
			<td>nodeContextmenu</td>
			<td>当某一节点被鼠标右键点击时会触发该事件</td>
			<td>共四个参数，依次为：event、传递给 <code>data</code> 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
		</tr>
		<tr>
			<td>checkChange</td>
			<td>节点选中状态发生变化时的回调</td>
			<td>共三个参数，依次为：传递给 <code>data</code> 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点</td>
		</tr>
		<tr>
			<td>check(TODO)</td>
			<td>当复选框被点击的时候触发</td>
			<td>共两个参数，依次为：传递给 <code>data</code> 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含
				checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
			</td>
		</tr>
		<tr>
			<td>currentChange(TODO)</td>
			<td>当前选中节点变化时触发的事件</td>
			<td>共两个参数，依次为：当前节点的数据，当前节点的 Node 对象</td>
		</tr>
		<tr>
			<td>nodeExpand</td>
			<td>节点被展开时触发的事件</td>
			<td>共三个参数，依次为：传递给 <code>data</code> 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身</td>
		</tr>
		</tbody>
	</table>
</div>
