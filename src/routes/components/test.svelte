<script>
	// class Character {
	// 	constructor(name, weapon) {
	// 		this.name = name
	// 		this.weapon = weapon
	// 	}
	// 	attack() {
	// 		return 'attack with ' + this.weapon
	// 	}
	// }
	//
	// class Elf extends Character{
	// 	constructor(name, weapon, type) {
	// 		super(name, weapon);
	// 		this.type = type
	// 	}
	// }
	//
	// class Ogre extends Character{
	// 	constructor(name, weapon, color) {
	// 		super(name, weapon);
	// 		this.color = color
	// 	}
	// 	makeFort() {
	// 		return this.color
	// 	}
	// }
	//
	// const dolby = new Elf('Dolby', 'cloth', 'house')
	// dolby.attack = false
	// console.log(dolby.attack)
	// const shrek = new Ogre('Shrek', 'club', 'green')
	// console.log(shrek.makeFort())

	//	data --> fn ->> data ->> fn -->
	const chen3 = (num) => num * 3
	const absVal = (num) => Math.abs(num)

	// const chenAndAbs = (num) => absVal(chen3(num))
	//
	// console.log(chenAndAbs(-50))
	//
	// const compose = (chen3, absVal) => {
	//   return function(data) {
	// 		return chen3(absVal(data))
	//   }
	// }
	// const c = compose(chen3, absVal)
	// console.log('c', c(-50));

	// Amazon

	// 1 添加到购物车 cart中
	// 2 计算购物车中的税
	// 3 购买操作 把购物车中的所有价格累加
	// 4 清空购物车
	const user = {
		name: 'Kim',
		cart: [],
		purchases: [] // 买
	}

	const easyBuyItem = (user, item) => {
		console.log(Object.assign({}, user, { purchases: item }));
	}
	// easyBuyItem(user, { name: 'Mac', price: 344 })
	// const compose = (f, g) => (...data) => f(g(...data))
	// const purchasesItem = (...fns) => fns.reduce(compose)
	// purchasesItem(
	// 		emptyCart,
	// 		buyItem,
	// 		taxComputed,
	// 		addToCart
	// )(user, { name: 'MacBook', price: 300 })
	//
	// console.log('user', user);
	<!--function addToCart(user, item) {-->
	<!--	console.log('addToCart', user);-->
	<!--	const newCart = user.cart.concat(item)-->
	<!--	return Object.assign({}, user, { cart: newCart })-->
	<!--}-->
	<!--function taxComputed(user) {-->
	// 	console.log('taxComputed', user);
	// 	const { cart } = user
	// 	const rate = 1.3
	// 	const newCart = cart.map(el => { return { name, price: el.price * rate } })
	// 	return Object.assign({}, user, { cart: newCart })
	// }
	// function buyItem(user) {
	// 	console.log('buyItem', user);
	// 	return Object.assign({}, user, { purchases: user.cart })
	// }
	// function emptyCart(user) {
	// 	console.log('emptyCart', user);
	// 	return Object.assign({}, user, { cart: [] })
	// }
	// emptyCart(buyItem(taxComputed(addToCart({ name: 'Mac', price: 100 }))))
</script>
