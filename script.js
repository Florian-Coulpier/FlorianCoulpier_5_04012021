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
      request.open("GET", "http://localhost:3000/api/teddies/" + idOurs);
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
        let myContenant = document.createElement("div");
        let myDiv = document.createElement("div");
        let myPicture = document.createElement("img");
        let myDesc = document.createElement("div");
        let myName = document.createElement("h2");
        let myPrice = document.createElement("p");
        let myId = document.createElement("a");

        // Ajout des class aux balises index HTML
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
        
        // Contenu des balises index HTML
        myName.textContent = teddie.name;
        myPrice.textContent = teddie.price / 100 + " euros";
        myId.textContent = "En savoir plus";
    });
}


/////////////////////////////////////////////////////////// PRODUIT.HTML ///////////////////////////////////////////////////////////////////

let idOurs = '';
async function detailTeddie() {

     = location.search.substring(4);
    console.log(myId)
}