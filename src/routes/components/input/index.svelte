<script lang="ts">
    import BeInput from '$lib/be-input/BeInput.svelte'
    import { onMount } from 'svelte'
    let value = ''
    let input
    onMount(()=>{
      console.log(input)
    })
</script>
<div class="page-container content">
	<h2>input 输入框</h2>
	<p>通过鼠标或键盘输入字符</p>
	<h3>基本用法</h3>
	<div class="demo-block demo-input ">
		<div class="source">
			<div>
				<BeInput bind:value placeholder="请输入内容" />
			</div>
		</div>
	</div>
    <h3>尺寸</h3>
    <p>可通过 size 属性指定输入框的尺寸，除了默认的大小外，还提供了<code>medium</code> 、<code>small</code> 和<code>mini</code>  三种尺寸。</p>
	<div class="demo-block demo-input ">
		<div class="source">
			<div>
        <div class="demo-input-size">
            <BeInput bind:value placeholder="请输入内容" bind:this={input} />
            <BeInput bind:value placeholder="请输入内容"  size="medium" />
            <BeInput bind:value placeholder="请输入内容"  size="small" />
            <BeInput bind:value placeholder="请输入内容"  size="mini" />
        </div>
			</div>
		</div>
	</div>
  <h3>禁用状态</h3>
  <p>通过<code>disabled</code> 属性指定是否禁用 input 组件</p>
<div class="demo-block demo-input ">
  <div class="source">
    <div>
      <div class="demo-input-size">
          <BeInput bind:value placeholder="请输入内容" disabled />
      </div>
    </div>
  </div>
</div>
</div>
