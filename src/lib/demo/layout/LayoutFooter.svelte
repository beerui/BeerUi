<script>
	let env = process.env.NODE_ENV
	export let isWhite
</script>

<div class='be-main__footer' class:white={isWhite} style={$$props.style}>
	<div class='list'>
		<div class='list-item'><span>Contributors</span></div>
		<div class='list-item'><a href='https://github.com/beerui/BeerUi'>BeerUi</a></div>
	</div>
	<div class='list'>
		<div class='list-item'><span>Resource</span></div>
		<div class='list-item'><a href='https://svelte.dev/'>svelte</a></div>
		<div class='list-item'><a href='https://kit.svelte.dev/'>svelteKit</a></div>
		<div class='list-item'><a href='https://www.npmjs.com/package/@brewer/beerui'>@brewer/beerui</a></div>
	</div>
	<div class='list'>
		<div class='list-item'><span>Github</span></div>
		<div class='list-item'><a href='https://github.com/beerui/BeerUi'>组件 BeerUi</a></div>
		{#if env === 'office'}
			<div class='list-item'><a class='beian' rel='noreferrer' target='_blank' href='https://beian.miit.gov.cn/'>皖ICP备2022015490号-1</a></div>
		{/if}
<!--		<div class='list-item'>-->
<!--			系统 Svelte-BeerUi-Admin-->
<!--			<a href='https://github.com/beerui/Svelte-Beerui-admin'>系统 Svelte-BeerUi-Admin</a>-->
<!--		</div>-->
	</div>
</div>
<style lang='scss'>
	.be-main__footer {
		padding: 30px;
		margin-top: 30px;
		display: flex;
		justify-content: space-around;
		box-shadow: inset 0px 6px 6px 4px rgb(25 65 115 / 5%);

	  &.white {
		.list {
		  a {color: rgba(255, 255, 255, .85)}
		  span {color: rgba(255, 255, 255, .55)}
		}
	  }
		.list {
			&-item {
				margin: 5px;
				display: block;
			}
		}

		span {
			color: var(--text-secondary)
		}

		a {
			color: var(--text-secondary);
			//text-shadow: 0 4px 4px rgb(0 0 0 / 25%);
		}
	  .beian {
		text-shadow: 0 1px 2px #999;
	  }
	}
</style>
