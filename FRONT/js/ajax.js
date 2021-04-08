/*jshint esversion: 6 */ 
function get(url) {
    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject('Request status' + xhr.status +  ' : Une erreur est survenue !');
        xhr.send();
    });
}

function send(url, form){
    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url +"order");
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject('Request status' + xhr.status +  ' : Une erreur est survenue !');
        xhr.send(JSON.stringify(form));
    })
}
