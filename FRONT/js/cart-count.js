window.onload = function(){
    let counter = localStorage.getItem('howManyInCart');
    document.getElementById('cart').textContent = counter;
};


