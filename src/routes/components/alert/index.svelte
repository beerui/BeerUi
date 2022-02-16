<script lang="ts">
import { BeAlert } from '$lib';
</script>
<div class="page-container content">
  <h2 >Alert 警告</h2>
  <p>用于页面中展示重要的提示信息</p>
  <h3>基本用法</h3>
  <div class="demo-block demo-alert">
    <div class="source">
      <div>
        <BeAlert  title="这是消息提示" type="info"></BeAlert>
        <BeAlert title="成功提示的文案" type="success"></BeAlert>
        <BeAlert title="警告提示的文案" type="warning"></BeAlert>
        <BeAlert title="错误提示的文案" type="danger"></BeAlert>
      </div>
    </div>
  </div>
  <h3>主题</h3>
  <p>
    BeerUi alert提供两个主题
    <code>light</code>
    和
    <code>dark</code>
  </p>
</div>

