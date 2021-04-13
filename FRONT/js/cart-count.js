/*jshint esversion: 6 */ 
window.onload = howManyInCart()


function howManyInCart(){
	let get = localStorage.getItem('buyingList');
	if(get === null){
		localStorage.setItem('buyingList', '')
	} 
	
  	document.getElementById('cart').textContent = getAndSplit().length;
}


function getAndSplit(){
	let get = localStorage.getItem('buyingList');

    let itemsArray = get.split(',');

    	for (let i = 0; i < itemsArray.length; i++){
      		if (itemsArray[i] === ''){
        		itemsArray.splice(i, 1);
      		}
    	}
   
	return itemsArray;
}



