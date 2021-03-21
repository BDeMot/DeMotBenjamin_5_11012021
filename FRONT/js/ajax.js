/*jshint esversion: 6 */ 
function ajax(url) {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = "json";
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject("Request status " + xhr.status +  " : Une erreur est survenue !");
        xhr.send();
    });
}