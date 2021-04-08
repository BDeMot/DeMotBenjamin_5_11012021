/*jshint esversion: 6 */ 

function sendData() {
	const XHR = new XMLHttpRequest();
	
	let products = buyingList;
	
	// Relie l'objet FormData et l'élément <form>
	const FD = new FormData( form );
	
	//crée un objet 'contact' et récupère les valeurs entrées dans <form> via leurs keys de l'objet FormData
  	let contact = {
		  firstName : FD.get('firstName'),
		  lastName : FD.get('lastName'),
		  address : FD.get('address'),
		  city : FD.get('city'),
		  email : FD.get('mail')
	  };

	let req = { contact, products };

	send('http://localhost:3000/api/cameras/', req)
	.then((response) =>{
		console.log(response);
		sessionStorage.setItem('confirmation', response);
		window.location.assign('./confirmation.html')
	})
	.catch((err) =>{
		let divAlert = document.createElement('div');
    
        divAlert.classList.add('alert', 'alert-danger', 'col-12');
        
        divAlert.textContent = err;
    
        document.getElementById('parent').appendChild(divAlert);
	}) 
	}
  

	const form = document.getElementById( 'form' );  
  
	
	form.addEventListener( "submit", function ( e ) {
		e.preventDefault();
	  	sendData();	
	} );

