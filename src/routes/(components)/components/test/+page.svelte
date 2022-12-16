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
	// const chen3 = (num) => num * 3
	// const absVal = (num) => Math.abs(num)

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
	// const user = {
	// 	name: 'Kim',
	// 	cart: [],
	// 	purchases: [] // 买
	// }
	//
	// const easyBuyItem = (user, item) => {
	// 	console.log(Object.assign({}, user, { purchases: item }));
	// }
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
	// function addToCart(user, item) {
	// 	console.log('addToCart', user);
	// 	const newCart = user.cart.concat(item)
	// 	return Object.assign({}, user, { cart: newCart })
	// }
	// function taxComputed(user) {
	// 	console.log('taxComputed', user);
	// 	const { cart } = user
	// 	const rate = 1.3
	// 	const newCart = cart.map(el => { return { name, price: el.price * rate } })
	// 	return Object.assign({}, user, { cart: ne wCart })
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


	// const name = 'My Name Is Motou!'
	// function reverse() {
	// 	let _name = name.split('')
	// 	return _name.reverse().join('')
	// }
	//
	// console.log(reverse());

	// function mergeArray(a1, a2) {
	// 	const res = []
	// 	let a = a1[0]
	// 	let b = a2[0]
	// 	let i = 1
	// 	let j = 1
	//
	// 	while (a || b) {
	// 		console.log(a, b);
	// 		if (!b || a < b) {
	// 			res.push(a)
	// 			a = a1[i]
	// 			i++
	// 		} else {
	// 			res.push(b)
	// 			b = a2[j]
	// 			j++
	// 		}
	// 	}
	// 	return res
	// }
	//
	// console.log(mergeArray([0,5,88], [2,5,5,6]));


	class HashTable {
		constructor(size) {
			this.data = new Array(size)
		}

		_hash(key) {
			let hash = 0
			for (let i = 0; i < key.length; i++) {
				hash = (hash + key.charCodeAt(i) * i) % this.data.length
			}
			return hash
		}

		set(key, value) {
			let address = this._hash(key)
			if (!this.data[address]) {
				this.data[address] = []
			}
			this.data[address].push([key, value] )

			return this.data
		}
		get(key) {
			let address = this._hash(key)
			let current = this.data[address]
			if (current) {
				for (let i = 0; i < current.length; i++) {
					if (current[i][0] === key) {
						return current[i][1]
					}
				}
			}
			return undefined
		}
		keys() {
			const keysArray = []
			for (let i = 0; i < this.data.length; i++) {
			if (this.data[i]) {
					keysArray.push(this.data[i][0][0])
				}
			}
			return keysArray
		}
	}

	const myHash = new HashTable(5)
	myHash.set('mo', 10000)
	myHash.set('wang', 10000)
	console.log(myHash.set('motou', 100))
	console.log(myHash.get('motou'));
	console.log(myHash.keys());





</script>
