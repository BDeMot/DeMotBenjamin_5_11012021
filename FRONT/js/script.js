let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/api/cameras");
xhr.responseType = "json";
xhr.send();
xhr.onload = function(){
    const cameras = xhr.response;
    createCard(cameras);
};

function createCard(cameras) {
    for (let i = 0; i < cameras.length; i++){
        const divColCard = document.createElement('div');
        const divCard = document.createElement('div');
        const divBody = document.createElement('div');
        const cardH5 = document.createElement('H5');
        const cardP = document.createElement('p');

        let img = new Image(350, 220);
        img.src = cameras[i].imageUrl;
        
        divColCard.classList.add('col-12');
        divColCard.classList.add('col-lg-4');
        divCard.classList.add('card');
        divBody.classList.add('card-body');
        cardH5.classList.add('card-title');
        cardP.classList.add('card-text');
        img.classList.add('card-img-top');

        cardH5.textContent = cameras[i].name;
        cardP.textContent = cameras[i].price/100 + "€";

        divColCard.appendChild(divCard);
        divCard.appendChild(img);
        divCard.appendChild(divBody);
        divBody.appendChild(cardH5);
        divBody.appendChild(cardP);

        document.getElementById('parent').appendChild(divColCard);
    }
}




