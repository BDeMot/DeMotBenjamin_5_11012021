/*jshint esversion: 6 */ 

get('http://localhost:3000/api/cameras')
    .then((response) =>{
    
        for (let i = 0, nb = response.length; i < nb; i++){
            const linkToDesc = document.createElement('a');
            const divCard = document.createElement('div');
            const divBody = document.createElement('div');
            const cardH5 = document.createElement('H5');
            const cardP = document.createElement('p');
    
            let img = new Image(300, 220);
            img.src = response[i].imageUrl;
            
            linkToDesc.classList.add('col-12', 'col-lg-4', 'mt-4');

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
        let divAlert = document.createElement('div');
    
        divAlert.classList.add('alert', 'alert-danger', 'col-12');
    
        divAlert.textContent = err;
    
        document.getElementById('parent').appendChild(divAlert);
    
    
});
