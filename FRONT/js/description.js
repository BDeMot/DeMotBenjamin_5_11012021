/*jshint esversion: 6 */ 
let idForDesc = localStorage.getItem('idProduct');
    

get("http://localhost:3000/api/cameras/" + idForDesc)
.then((response) =>{
    
        let cam = response;
        let options = cam.lenses;
        let image = new Image(350, 270);
        image.classList.add('img');
        image.src = cam.imageUrl;
    
        for (let i = 0; i<options.length; i++){
    
            let option = document.createElement('option');
            option.setAttribute('value', [i]);
            option.textContent = options[i];
    
            document.getElementById('parentOptions').appendChild(option);
            document.getElementById('name').textContent = cam.name;
            document.getElementById('description').textContent = cam.description;
            document.getElementById('price').textContent = cam.price/100 + '€';
            document.getElementById('parentImage').appendChild(image);
            }
    
        let addButton = document.getElementById('addToCart');
    
        addButton.addEventListener('click', function(){
        let addToCart = [];
        addToCart.push(idForDesc);
    
        let buyingList = getAndSplit();
        addToCart.push(buyingList);
            localStorage.setItem('buyingList', addToCart);
               
    
               howManyInCart();
               
            });
        
})
.catch((err) => {
    console.log(err)
})
