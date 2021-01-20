///////////////////////////////////////////////////// REQUETE GET VERS L'API ///////////////////////////////////////////////////////////////

getTeddies = () => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (
        this.readyState == XMLHttpRequest.DONE &&
        this.status >= 200 &&
        this.status < 400
      ) {
        resolve(JSON.parse(this.responseText));
        console.log(this.responseText);
      } else {
      }
    };
    request.open("GET", "http://localhost:3000/api/teddies/" + idTeddies);
    request.send();
  });
};


/////////////////////////////////////////////////////////// PRODUIT.HTML ///////////////////////////////////////////////////////////////////

// Déclaration d'une variable ajouter à la requête GET pour ajout de l'id du produit
let idTeddies = "";

// Déclaration d'une fonction d'implémentation du produit qui sera séléctionner avec son id
async function detailTeddies() {

  // Ciblage de l'id dans l'URL saute 4 caractères pour le récupérer dans l'API
  idTeddies = location.search.substring(4);
  const detailTeddies = await getTeddies();
  console.log(detailTeddies)
  
  // Création de la structure pour stocker le produit
  document.getElementById("picture").setAttribute("src", detailTeddies.imageUrl);
  document.getElementById("informationTitle").innerHTML = detailTeddies.name; 
  document.getElementById("informationDescription").innerHTML = detailTeddies.description;
  document.getElementById("informationPrice").innerHTML = "Prix : " + detailTeddies.price / 100 + " €";

  // Récupération des colors pour les boucler sur chaque teddies 
  detailTeddies.colors.forEach((teddie) => {
    let choixOption = document.createElement("option");
    // Mettre les colors dans "choix_option"
    let selectColor = document.getElementById("choix_option");
    selectColor.appendChild(choixOption).innerHTML = teddie;
  });
    

////////////// PANIER STORAGE ///////////////

  // Voir si il y a des produits dans le panier, si oui le parser sinon créer un tableau vide
  if(localStorage.getItem("panierStorage")){
    console.log("le panier existe dans le localStorage");
  }else{
    console.log("Le panier n'existe pas, le créer et l'envoyer dans le localStorage");
    // Le panier est un tableau de produits
    let panierInit = [];
    localStorage.setItem("panierStorage", JSON.stringify(panierInit));
  };

  // Parser le panier une fois créer
  let panierStorage = JSON.parse(localStorage.getItem("panierStorage"));

  // Identifier le bouton afin de créer l'évènement clic
  let boutonPanier = document.getElementById("ajoutPanier");
  
  // Récupérer les données du produit
  let produit = detailTeddies;
  
  // Au clic mettre le produit dans le panier
  boutonPanier.addEventListener("click", function() {

    // Ajout du produit dans le panier + alert
    panierStorage.push(produit);
    localStorage.setItem("panierStorage", JSON.stringify(panierStorage));

    // Création de l'alert
    alert("Vous avez ajouté ce produit dans votre panier")
  });
}

