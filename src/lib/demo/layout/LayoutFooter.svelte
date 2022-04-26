<div class='be-main__footer' style={$$props.style}>
	<div class='list'>
		<div class='list-item'><span>Contributors</span></div>
		<div class='list-item'><a href='https://github.com/beerui/BeerUi'>BeerUi</a></div>
	</div>
	<div class='list'>
		<div class='list-item'><span>Resource</span></div>
		<div class='list-item'><a href='https://svelte.dev/'>svelte</a></div>
		<div class='list-item'><a href='https://kit.svelte.dev/'>svelteKit</a></div>
		<div class='list-item'><a href='https://www.npmjs.com/package/@brewer/beerui'>@brewer/beerui</a>
		</div>
	</div>
	<div class='list'>
		<div class='list-item'><span>Github</span></div>
		<div class='list-item'><a href='https://github.com/beerui/BeerUi'>组件 BeerUi</a></div>
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
		box-shadow: 1px -10px 15px 1px rgb(25 65 115 / 19%);


		.list {
			&-item {
				margin: 5px;
				display: block;
			}
		}

		span {
			color: var(--text-color-white)
		}

		a {
			color: var(--text-color-white);
			text-shadow: 0 4px 4px rgb(0 0 0 / 25%);
		}
	}
</style>
