/////////////////////////////////////////////////////////// PANIER.HTML ///////////////////////////////////////////////////////////////////
// Objet à envoyer à l'api
let contact;
let products = [];

// Identification emplacement panier dans le html
let panierListe = document.getElementById("panier");
panierStorage = JSON.parse(localStorage.getItem("panierStorage"));

const panierTableau = () => {
  // Si il y a un produit dans le panier remove "panierVide" et créer le tableau
  if(JSON.parse(localStorage.getItem("panierStorage")).length > 0){

    // Suppression du "panierVide"
    document.getElementById("panierVide").remove();
    
    // Création de la structure html pour stocker les teddies
    const tablePanier = document.createElement("table");
    const ligneEntete = document.createElement("tr");
    const panierNom = document.createElement("th");
    const panierPrixUnit = document.createElement("th");
    const panierImg = document.createElement("th");
    const lignePrixTotal = document.createElement("tr");
    const entetePrixTotal = document.createElement("th");
    const resultPrixTotal = document.createElement("th");
    const removePanier = document.createElement("button");

    // Agencement de la structure html
    panierListe.appendChild(tablePanier);
    tablePanier.appendChild(ligneEntete);
    ligneEntete.appendChild(panierNom);
    panierNom.textContent = "Nom";
    ligneEntete.appendChild(panierPrixUnit);
    panierPrixUnit.textContent = "Prix";
    ligneEntete.appendChild(panierImg);
    panierImg.textContent = "Image";
    panierListe.appendChild(removePanier);
    removePanier.textContent = "Supprimer mon panier";
    removePanier.setAttribute("class", "btn btn-danger col-lg-12 mt-4 mb-3")
    
    // Pour tous les detailTeddies présent dans le localStorage effectuer cette boucle
    JSON.parse(localStorage.getItem("panierStorage")).forEach((detailTeddies) => {
      
      // Création de la ligne produit
      let ligneTeddie = document.createElement("tr");
      let nomTeddie = document.createElement("td");
      let prixUnitTeddie = document.createElement("td");
      let imgTd = document.createElement("td");
      let imgTeddie = document.createElement("img");

      // Insertion dans le HTML
      tablePanier.appendChild(ligneTeddie);
      ligneTeddie.appendChild(nomTeddie);
      ligneTeddie.appendChild(prixUnitTeddie);
      ligneTeddie.appendChild(imgTd);
      imgTd.appendChild(imgTeddie);

      // Contenu des lignes
      nomTeddie.innerHTML = detailTeddies.name;
      prixUnitTeddie.textContent = detailTeddies.price / 100 + " €";
      imgTeddie.setAttribute("src", detailTeddies.imageUrl);
      
    });

    // Calcule de la somme total
    tablePanier.appendChild(lignePrixTotal);
    lignePrixTotal.appendChild(entetePrixTotal);
    entetePrixTotal.textContent = "Prix total";
    lignePrixTotal.appendChild(resultPrixTotal);
    resultPrixTotal.setAttribute("id", "totalTeddies")

    // On initie le prix à 0€
    let totalPrix = 0;

    // Pour tout les detailTeddies leur prix s'additionnent
    JSON.parse(localStorage.getItem("panierStorage")).forEach((detailTeddies) => {
      totalPrix += detailTeddies.price / 100;
    });

    // Affichage du prix total à payer dans l'addition
    document.getElementById("totalTeddies").textContent = totalPrix + " €";
    removePanier.addEventListener('click', clearPanier);
  };
};

// Supprimer un produit du panier
const clearPanier = () => {
  // vide le localstorage
  localStorage.clear();
  console.log("localStorage vidé");
  window.location.reload();
};  


////////////////////// Validation du formulaire ///////////////////////

// Véricfication des données
const verifData = () => {

  // Utilisation de regex
  let verifNumber = /[0-9]/;
  let verifEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
  let verifSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;
  let verifMessage = "";

  // Récupération des inputs
  let formNom = document.getElementById("formNom").value;
  let formPrenom = document.getElementById("formPrenom").value;
  let formEmail = document.getElementById("formEmail").value;
  let formAdresse = document.getElementById("formAdresse").value;
  let formVille = document.getElementById("formVille").value;

  // Vérification du nom
  if(verifNumber.test(formNom) == true || verifSpecialCharacter.test(formNom) == true || formNom == ""){
    verifMessage = "Corriger votre nom, une erreur semble être commise";
  }else{
    console.log("Le nom est correct");
  };

  // Vérification du prénom
  if(verifNumber.test(formPrenom) == true || verifSpecialCharacter.test(formPrenom) == true || formPrenom == ""){
    verifMessage = verifMessage + "\n" + "Corriger votre prénom, une erreur semble être commise";
  }else{
    console.log("Le prénom est correct");
  };

  // Vérification de l'email
  if(verifEmail.test(formEmail) == false){
    verifMessage = verifMessage + "\n" + "Corriger votre email, une erreur semble être commise";
  }else{
    console.log("L'email est correct");
  };

  // Vérification de l'adresse
  if(verifSpecialCharacter.test(formAdresse) == true || formAdresse == ""){
    verifMessage = verifMessage + "\n" + "Corriger votre adresse, une erreur semble être commise";
  }else{
    console.log("L'adresse est correct");
  };

  // Vérification de la ville
  if(verifNumber.test(formVille) == true && verifSpecialCharacter.test(formVille) == true || formVille == ""){
    verifMessage = verifMessage + "\n" + "Corriger votre ville, une erreur semble être commise";
  }else{
    console.log("La ville est correct");
  };

  // Si il y a une erreur sur un input la corriger, sinon construire l'objet contact
  if(verifMessage != ""){
    alert("Veuillez corriger les informations incorrects :" + "\n" +  verifMessage);
  }else {
    contact = {
      lastName: formNom,
      firstName: formPrenom,
      address: formAdresse,
      city: formVille,
      email: formEmail,
    };
    return contact;
  }
};

// Vérification de l'état du panier
const verifPanier = () => {
  let etatPanier = JSON.parse(localStorage.getItem("panierStorage"));
  // Si le panier est vide ou null
  if  (etatPanier.length < 1 || etatPanier == null) {
    alert("Votre panier est vide");
    return false;
  } else {
    console.log("Le panier contient des articles");
    return true;
  }
};


////////////////////////// Envoie vers l'api ///////////////////////////

// URL de l'api pour la requête POST
let url = "http://localhost:3000/api/teddies/order";

// Création de la requête POST
const envoiForm = (envoiCommande, url) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        sessionStorage.setItem("order", this.responseText);
        window.location = "./confirmation.html";
        resolve(JSON.parse(this.responseText));
        console.log(envoiCommande);
      } else {
      }
    };
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(envoiCommande);
    console.log(envoiCommande);
  });
};

confirmCommande = () => {
  let commander = document.getElementById("buttonCommander");
  commander.addEventListener("click", (event) => {
    event.preventDefault()

    // Implémentation du tableau products envoyé à l'API
    if (verifPanier() == true && verifData() != null) {
      console.log("les infos sont OK !");
      
      panierStorage.forEach((produit) => {
        products.push(produit._id);
      });
      console.log(products.price);

      // Création de l'objet à envoyer
      let objApi = {
        contact,
        products,
      };

      // Transformer l'objet en chaine de caractère et l'envoyer
      let envoiCommande = JSON.stringify(objApi);
      envoiForm(envoiCommande, url);
      console.log(objApi);

      //Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
      contact = {};
      products = [];
      localStorage.clear();
    } else {
      console.log("ERROR");
    }
  });
};