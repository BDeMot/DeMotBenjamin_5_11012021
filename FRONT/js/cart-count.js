/*jshint esversion: 6 */ 
window.onload = howManyInCart()


function howManyInCart(){
  document.getElementById('cart').textContent = getAndSplit().length;
}


function getAndSplit(){
  let get = localStorage.getItem('buyingList');
  if (get === null){
    console.log('Le panier est vide');
  } else {
    let itemsArray = get.split(',');

    for (let i = 0; i < itemsArray.length; i++){
      if (itemsArray[i] === ''){
        itemsArray.splice(i, 1);
      }
    }
    console.log(itemsArray);
    return itemsArray;
  }
}


