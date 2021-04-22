// Récupère la liste des objets du panier stockée sur LocalStorage, 
// si cette liste n'existe pas, la créer. Appelle la fonction qui va retourner
// cette liste sous forme de tableau. Puis compte le nombre d'entrée du tableau.
export function howManyInCart () {
  const get = localStorage.getItem('buyingList')
  if (get === null) {
    localStorage.setItem('buyingList', '')
  }

  document.getElementById('cart').textContent = getAndSplit().length
}

//Quand cette fonction est appelée, elle récupère le panier stockée sur LocalStorage,
//la découpe proprement en tableau,  et le retourne.
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
