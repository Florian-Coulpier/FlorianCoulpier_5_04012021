/////////////////////////////////////////////////////////// PANIER.HTML ///////////////////////////////////////////////////////////////////

// Identification emplacement panier dans le html
let panierListe = document.getElementById("panier");
panierStorage = JSON.parse(localStorage.getItem("panierStorage"));

tableauPanier = () => {
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
    JSON.parse(localStorage.getItem("panierStorage")).forEach((detailTeddies)=>{
      totalPrix += detailTeddies.price / 100;
    });

    // Affichage du prix total à payer dans l'addition
    document.getElementById("totalTeddies").textContent = totalPrix + " €";
    removePanier.addEventListener('click', clearPanier);
  };
};

//Supprimer un produit du panier
clearPanier = () =>{
  //vide le localstorage
  localStorage.clear();
  console.log("Administration : localStorage vidé");
  window.location.reload();
};  


////////////////////// Validation du formulaire ///////////////////////

// Véricfication des données
verifData = () => {

  // Utilisation de regex
  let verifString = /[a-zA-Z]/;
  let verifNumber = /[0-9]/;
  let verifEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$ , "g" /;
  let verifSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

  // Récupération des inputs
  let formNom = document.getElementById("formNom").value;
  let formPrenom = document.getElementById("formPrenom").value;
  let formMail = document.getElementById("formMail").value;
  let formAdresse = document.getElementById("formAdresse").value;
  let formVille = document.getElementById("formVille").value;

  
} 