export function howManyInCart () {
  const get = localStorage.getItem('buyingList')
  if (get === null) {
    localStorage.setItem('buyingList', '')
  }

  	document.getElementById('cart').textContent = getAndSplit().length
}

export function getAndSplit () {
  const get = localStorage.getItem('buyingList')

  const itemsArray = get.split(',')

    	for (let i = 0; i < itemsArray.length; i++) {
      		if (itemsArray[i] === '') {
        		itemsArray.splice(i, 1)
      		}
    	}

  return itemsArray
}
