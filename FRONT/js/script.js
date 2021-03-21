/*jshint esversion: 6 */ 
/*let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/api/cameras");
xhr.responseType = "json";
xhr.send();

xhr.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        const cameras = xhr.response;
        createCard(cameras);
    } else if (this.status != 200) {
     createAlert();
    }
};
*/

/****************************/



ajax('http://localhost:3000/api/cameras')
    .then((response) =>{
    
        for (let i = 0; i < response.length; i++){
            const linkToDesc = document.createElement('a');
            const divCard = document.createElement('div');
            const divBody = document.createElement('div');
            const cardH5 = document.createElement('H5');
            const cardP = document.createElement('p');
    
            let img = new Image(300, 220);
            img.src = response[i].imageUrl;
            
            linkToDesc.classList.add('col-12');
            linkToDesc.classList.add('col-lg-4');
            divCard.classList.add('card');
            divBody.classList.add('card-body');
            cardH5.classList.add('card-title');
            cardP.classList.add('card-text');
            img.classList.add('card-img-top');
            linkToDesc.setAttribute('href', 'pages/desc.html');
    
            cardH5.textContent = response[i].name;
            cardP.textContent = response[i].price/100 + "€";
    
            linkToDesc.appendChild(divCard);
            divCard.appendChild(img);
            divCard.appendChild(divBody);
            divBody.appendChild(cardH5);
            divBody.appendChild(cardP);
    
            document.getElementById('parent').appendChild(linkToDesc);
    
            linkToDesc.addEventListener('click', function(){
                localStorage.setItem('idProduct', response[i]._id);
            });
        };
    })
    .catch((err) =>{
        const divAlert = document.createElement('div');
    
        divAlert.classList.add('alert');
        divAlert.classList.add('alert-danger');
        divAlert.classList.add('col-12');
    
        divAlert.textContent = err;
    
        document.getElementById('parent').appendChild(divAlert);
    
    
});
