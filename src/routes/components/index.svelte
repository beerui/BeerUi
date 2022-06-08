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
	<LineCode code={`import '@brewer/beerui/assets/scss/dist/beer.css'`} />

	<ReplBlock js={`import BeButton from '@brewer/beerui/be-button'`} html={`
<BeButton type="default">Hello BeerUi</BeButton>
	`} />
<!--	<DemoBlock code={`-->
<!--<BeButton>-->
<!--	<div class='flex justify-center items-center'>-->
<!--		<BeIcon name='add'></BeIcon>-->
<!--		Add-->
<!--	</div>-->
<!--</BeButton>`} js={`-->
<!--import { BeButton } from '@brewer/beerui'`}>-->
<!--		<div slot='source'>-->
<!--			<div class='demo-list'>-->
<!--				<BeButton>-->
<!--					<div class='flex justify-center items-center'>-->
<!--						<BeIcon name='add'></BeIcon>-->
<!--						Add-->
<!--					</div>-->
<!--				</BeButton>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div slot='description'>-->
<!--		</div>-->
<!--	</DemoBlock>-->
<!--	<h2>按需引用</h2>-->
<!--	<DemoBlock code={`-->
<!--<BeButton>-->
<!--	<div class='flex justify-center items-center'>-->
<!--		<BeIcon name='add'></BeIcon>-->
<!--		Add-->
<!--	</div>-->
<!--</BeButton>`} js={`-->
<!--import BeButton from '@brewer/beerui/be-button/BeButton.svelte'`}>-->
<!--		<div slot='source'>-->
<!--			<div class='demo-list'>-->
<!--				<BeButton>-->
<!--					<div class='flex justify-center items-center'>-->
<!--						<BeIcon name='add'></BeIcon>-->
<!--						Add-->
<!--					</div>-->
<!--				</BeButton>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div slot='description'>-->
<!--			在全局css处引入css，`@brewer/beerui/assets/scss/dist/beer.css`-->
<!--		</div>-->
<!--	</DemoBlock>-->
<!--	<h2>REPL</h2>-->
<!--	<iframe class='m-iframe' src='https://svelte.dev/repl/19e434b319d84e54abce9eae4b1c7b91?version=3.46.4' frameborder='0'></iframe>-->
</div>
<style lang='scss'>
	//.m-iframe {width: 100%;height: 600px;}
</style>
