import { get, send } from './ajax.js'
import { getAndSplit, howManyInCart } from './cart-count.js'

const buyingList = getAndSplit()
let totalPrice = 0

window.onload = sendToXhr()

function sendToXhr () {
  for (let i = 0, nb = buyingList.length; i < nb; i++) {
    get('http://localhost:3000/api/cameras/' + buyingList[i])
      .then((response) => {
        const liItem = document.createElement('li')
        const divItem = document.createElement('div')
        const h6Item = document.createElement('h6')
        const supprItem = document.createElement('small')
        const spanItem = document.createElement('span')

        const listParent = document.getElementById('listItem')

        liItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm')
        h6Item.classList.add('my-0')
        supprItem.classList.add('text-muted')
        spanItem.classList.add('text-muted')

        h6Item.textContent = response.name
        supprItem.textContent = 'Retirer'
        spanItem.textContent = response.price / 100 + ' €'
        addPrices(response.price) // calcul le prix total

        divItem.appendChild(h6Item)
        divItem.appendChild(supprItem)

        liItem.appendChild(divItem)
        liItem.appendChild(spanItem)

        const nodeSibling = document.getElementById('total')
        listParent.insertBefore(liItem, nodeSibling)
        price()

        supprItem.addEventListener('click', function () {
          const toRemove = buyingList.indexOf(response._id)
          buyingList.splice(toRemove, 1)
          listParent.removeChild(liItem)
          updateBuyingList()
          howManyInCart(buyingList.length)
          totalPrice -= response.price

          price()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function addPrices (price) {
  totalPrice += price
}

function updateBuyingList () {
  localStorage.setItem('buyingList', buyingList)
}

function price () {
  const elTotalPrice = document.getElementById('totalPrice')
  elTotalPrice.textContent = totalPrice / 100 + ' €'
  if (totalPrice == 0) {
    document.getElementById('bim').setAttribute('disabled', 'disabled')
  }
}

/** ************ */
/* FORM HANDLER */
/** ************ */

function sendData () {
  const products = buyingList

  // Relie l'objet FormData et l'élément <form>
  const FD = new FormData(form)

  // crée un objet 'contact' et récupère les valeurs entrées dans <form> via leurs keys de l'objet FormData
  	const contact = {
		  firstName: FD.get('firstName'),
		  lastName: FD.get('lastName'),
		  address: FD.get('address'),
		  city: FD.get('city'),
		  email: FD.get('mail')
	  }

  const req = { contact, products }

  send('http://localhost:3000/api/cameras/', req)
    .then((response) => {
      console.log(response)
      sessionStorage.setItem('confirmation', response)
      window.location.assign('./confirmation.html')
    })
    .then(localStorage.clear())
    .catch((err) => {
      const divAlert = document.createElement('div')

      divAlert.classList.add('alert', 'alert-danger', 'col-12')
      divAlert.textContent = err

      document.getElementById('parent').appendChild(divAlert)
    })
}

const form = document.getElementById('form')

form.addEventListener('submit', function (e) {
  e.preventDefault()
	  	sendData()
})

// form validater
const input = document.getElementsByTagName('input')

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener('input', function (e) {
    e.target.classList.add('needs-validation')

    if (e.target.validity.valid) {
      e.target.classList.replace('needs-validation', 'validated')
    } else {
      e.target.classList.replace('validated', 'needs-validation')
    }

    let areAllValid = 0

    for (let j = 0; j < input.length; j++) {
      if (input[j].validity.valid === true) {
        areAllValid++
      } else {
        areAllValid--
      }
    }

    if (areAllValid == input.length && buyingList != '') {
      document.getElementById('bim').removeAttribute('disabled')
    } else {
      document.getElementById('bim').setAttribute('disabled', 'disabled')
    }
  })
}
