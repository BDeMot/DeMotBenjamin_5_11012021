import { get } from './ajax.js'
import { howManyInCart, getAndSplit } from './cart-count.js'

const idForDesc = localStorage.getItem('idProduct')

window.onload = howManyInCart;

// l'id de l'objet, stocké sur localStorage, est envoyée à l'API
//qui enverra ensuite l'id à la BDD
get('http://localhost:3000/api/cameras/' + idForDesc)
  .then((response) => {
    const cam = response
    const options = cam.lenses
    const image = new Image(350, 270)
    image.classList.add('img')
    image.src = cam.imageUrl

    for (let i = 0; i < options.length; i++) {
      const option = document.createElement('option')
      option.setAttribute('value', [i])
      option.textContent = options[i]

      document.getElementById('parentOptions').appendChild(option)
      document.getElementById('name').textContent = cam.name
      document.getElementById('description').textContent = cam.description
      document.getElementById('price').textContent = cam.price / 100 + '€'
      document.getElementById('parentImage').appendChild(image)
    }

    const addButton = document.getElementById('addToCart')

// pour mettre à jour la liste des objets ajoutés au panier, 
// l'id de l'objet est mise dans un tableau, le panier est
// récupéré via getandSplit() sous forme de tableau.
// Les deux tableaux sont regroupés et stocker enfin sur LocalStorage
    addButton.addEventListener('click', function () {
      const addToCart = []
      addToCart.push(idForDesc)

      const buyingList = getAndSplit()
      addToCart.push(buyingList)
      localStorage.setItem('buyingList', addToCart)

      howManyInCart()
    })
  })
  .catch((err) => {
    console.log(err)
  })
