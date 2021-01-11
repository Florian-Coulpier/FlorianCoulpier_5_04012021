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


///////////////////////////////////////////////////////// INDEX.HTML ///////////////////////////////////////////////////////////////////////


// Importation liste de produit sur l'index.html
async function teddies() {

    // Récupération de la promise pour reprendre les données
    const teddies = await getTeddies();
    
    // Identification de la liste en HTML
    const listeProduit = document.getElementById("listeProduit");
   
    // Création de l'objet Teddie
    teddies.forEach((teddie) => {

        // Création de la structure html pour stocker les teddies
        const myContenant = document.createElement("div");
        const myDiv = document.createElement("div");
        const myPicture = document.createElement("img");
        const myDesc = document.createElement("div");
        const myName = document.createElement("h2");
        const myPrice = document.createElement("p");
        const myId = document.createElement("a");

        // Ajout des class aux balises index html
        myContenant.setAttribute("class", "contenant-card col-lg-4 col-md-6 mb-5 mt-5");
        myDiv.setAttribute("class", "card");
        myPicture.setAttribute("src", teddie.imageUrl);
        myPicture.setAttribute("alt", "Photo de l'ours en peluche");
        myPicture.setAttribute("class", "card-top-img")
        myDesc.setAttribute("class", "card-description");
        myName.setAttribute("class", "card-description-title");
        myPrice.setAttribute("class", "card-description-price");
        myId.setAttribute("href", "produit.html?id=" + teddie._id);
        myId.setAttribute("class", "btn btn-info")
        
        // Agencement de la structure html
        listeProduit.appendChild(myContenant);
        myContenant.appendChild(myDiv);
        myDiv.appendChild(myPicture);
        myDiv.appendChild(myDesc);
        myDesc.appendChild(myName);
        myDesc.appendChild(myPrice);
        myDesc.appendChild(myId);
        
        // Contenu des balises index html
        myName.textContent = teddie.name;
        myPrice.textContent = teddie.price / 100 + " euros";
        myId.textContent = "En savoir plus";
    });
}


/////////////////////////////////////////////////////////// PRODUIT.HTML ///////////////////////////////////////////////////////////////////

// Déclaration d'une variable ajouter à la requête GET
let idTeddies = "";

// Déclaration d'une fonction d'implémentation du produit qui sera séléctionner avec son _id
async function detailTeddies() {

    // Ciblage de l'_id dans l'URL pour le récupérer dans l'API
    idTeddies = location.search.substring(4);
    const detailTeddies = await getTeddies();
    console.log(detailTeddies)
   
    // Création de la structure pour stocker le produit
    document.getElementById("picture").setAttribute("src", detailTeddies.imageUrl);
    document.getElementById("informationTitle").innerHTML = detailTeddies.name; 
    document.getElementById("informationDescription").innerHTML = detailTeddies.description;
    document.getElementById("informationPrice").innerHTML = detailTeddies.price / 100 + " €";

} 