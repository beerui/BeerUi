<script lang='ts'>
import ReplBlock from '$lib/demo/ReplBlock.svelte';
import LineCode from '$lib/demo/LineCode.svelte';

// initial content
let value = "import { BeButton } from '@brewer/beerui'";

</script>
<div class='page-container'>
	<h1>快速开始</h1>
	<h2>安装</h2>
	<LineCode code={`npm i @brewer/beerui -D`} />
	<h2>使用</h2>

	<h4>快捷引入 包含css (推荐)</h4>
	<LineCode code={`import { BeButton } '@brewer/beerui'`} />
	<p>打包发布时，会按需打包</p>
	<hr>
	<h4>按需引入 css需要单独导入</h4>
	<LineCode code={`import { BeButton } '@brewer/beerui/be-button'`} />
	<LineCode code={`import '@brewer/beerui/assets/beer.css'`} />

	<h4>注意：</h4>
	<p>在REPL中不能直接导入 @brewer/beerui 因为repl无法识别入口文件中的css</p>
	<ReplBlock
		js={`import BeButton from '@brewer/beerui/be-button'`}
		html={`<BeButton type="default">Hello BeerUi</BeButton>`}
	/>
</div>
<style lang='scss'>
	//.m-iframe {width: 100%;height: 600px;}
</style>
