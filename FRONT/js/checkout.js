/*jshint esversion: 6 */ 
var buyingList = getAndSplit();
var totalPrice = 0;

window.onload = sendToXhr();

function sendToXhr (){
    for (let i = 0; i<buyingList.length; i++){ 
        ajax('http://localhost:3000/api/cameras/' + buyingList[i])
        .then((response)=>{
            let liItem = document.createElement('li');
            let divItem = document.createElement('div');
            let h6Item = document.createElement('h6');
            let supprItem = document.createElement('small');
            let spanItem = document.createElement('span');

            let listParent = document.getElementById('listItem');

            liItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');
            h6Item.classList.add('my-0');
            supprItem.classList.add('text-muted');
            spanItem.classList.add('text-muted');

            h6Item.textContent = response.name;
            supprItem.textContent = "Retirer";
            spanItem.textContent = response.price/100 + " €";
            addPrices(response.price); //calcul le prix total

            divItem.appendChild(h6Item);
            divItem.appendChild(supprItem);

            liItem.appendChild(divItem);
            liItem.appendChild(spanItem);

            var nodeSibling = document.getElementById('total');
            listParent.insertBefore(liItem, nodeSibling);
            price();


            supprItem.addEventListener('click', function(){
        
                let toRemove = buyingList.indexOf(response._id);
                buyingList.splice(toRemove, 1);
                listParent.removeChild(liItem);
                updateBuyingList();
                howManyInCart(buyingList.length);
                totalPrice -= response.price;
       
                price();
            });
    

        })
        .catch((err) => {
            console.log(err);
        });
    }
}

/*
function getIdFromApi(id){
    let xhr_list = new XMLHttpRequest();
    xhr_list.open('get', 'http://localhost:3000/api/cameras/'+id);
    xhr_list.responseType = "json";
    xhr_list.send();
    xhr_list.onload = function(){
        createItemList(xhr_list.response);
    
    };
}

function createItemList(item){
    let liItem = document.createElement('li');
    let divItem = document.createElement('div');
    let h6Item = document.createElement('h6');
    let supprItem = document.createElement('small');
    let spanItem = document.createElement('span');

    let listParent = document.getElementById('listItem');

    liItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');
    h6Item.classList.add('my-0');
    supprItem.classList.add('text-muted');
    spanItem.classList.add('text-muted');

    h6Item.textContent = item.name;
    supprItem.textContent = "Retirer";
    spanItem.textContent = item.price/100 + " €";
    addPrices(item.price); //calcul le prix total

    divItem.appendChild(h6Item);
    divItem.appendChild(supprItem);

    liItem.appendChild(divItem);
    liItem.appendChild(spanItem);

    var nodeSibling = document.getElementById('total');
    listParent.insertBefore(liItem, nodeSibling);
    price();


    supprItem.addEventListener('click', function(){
        
        let toRemove = buyingList.indexOf(item._id);
            buyingList.splice(toRemove, 1);
            listParent.removeChild(liItem);
          updateBuyingList();
          howManyInCart(buyingList.length);
          totalPrice -= item.price;
       
          price();
        });
    
}*/

function addPrices(price){
    totalPrice += price;

}

function updateBuyingList(){
    localStorage.setItem('buyingList', buyingList);
    
}

function price(){
    let elTotalPrice = document.getElementById('totalPrice');
    elTotalPrice.textContent =  totalPrice/100 + " €";
}