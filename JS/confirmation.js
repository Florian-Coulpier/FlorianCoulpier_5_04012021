//////////////////////////////////////////////////////// CONFIRMATION.HTML ///////////////////////////////////////////////////////////////

resultConfirm = () =>{
	if(sessionStorage.getItem("order") != null){
    // Parse du session storage
    let order = JSON.parse(sessionStorage.getItem("order"));

    // Implatation de prénom, nom et de l'id de commande
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("lastName").innerHTML = order.contact.lastName;
    document.getElementById("orderId").innerHTML = order.orderId;
  
    //Calcule de l'addition total
    let sommeConfirmTotal = 0;
    order.products.forEach((orderProduit) => {
      sommeConfirmTotal += orderProduit.price / 100;
    });

    //Affichage du prix total à payer dans l'addition
    console.log(sommeConfirmTotal);
    document.getElementById("confirmTotalPrice").textContent = sommeConfirmTotal + " €";

    // Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
    sessionStorage.removeItem("order");
  
  }else {

    // avertissement et redirection vers l'accueil
    alert("Aucune commande passée, vous êtes arrivé ici par erreur");
    window.open("./index.html");
  }
};

