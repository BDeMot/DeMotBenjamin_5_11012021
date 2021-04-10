/*jshint esversion: 6 */ 

(() =>{
    const order = JSON.parse(sessionStorage.getItem('confirmation'));

    document.getElementById('orderNb').textContent  = order.orderId;
    document.getElementById('customerName').textContent = order.contact.firstName + ' ' + order.contact.lastName;
    document.getElementById('orderPrice').textContent = orderSum(order.products) + '€';
   

    function orderSum(product){
        let totalPrice = 0;
        for (let i = 0, j = product.length; i < j; i++){
            totalPrice += product[i].price;
        }

        return totalPrice/100
    }
})()