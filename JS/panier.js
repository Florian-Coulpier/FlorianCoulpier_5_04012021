/////////////////////////////////////////////////////////// PANIER.HTML ///////////////////////////////////////////////////////////////////

let panier = document.getElementById("panier");

let recupPanier = JSON.parse(localStorage.getItem('panier'));
console.log(recupPanier.name)
 
// Création de la structure html pour stocker les teddies
const divArticle = document.createElement("div");
const divImgArticle = document.createElement("div");
const imgArticle = document.createElement("img");
const nameArticle = document.createElement("h4");
const priceArticle = document.createElement("p");
const removeArticle = document.createElement("i");

// Ajout des class aux balises index html
divArticle.setAttribute("class", "row");
divImgArticle.setAttribute("class", "col-lg-3");
imgArticle.setAttribute("src", recupPanier.imageUrl);
nameArticle.setAttribute("id", "nameArticle");
nameArticle.setAttribute("class", "col-lg-3");
priceArticle.setAttribute("id", "priceArticle");
priceArticle.setAttribute("class", "col-lg-3");
removeArticle.setAttribute("class", "fas fa-times col-lg-3");

// Agencement de la structure html
panier.appendChild(divArticle);
divArticle.appendChild(divImgArticle);
divImgArticle.appendChild(imgArticle);
divArticle.appendChild(nameArticle);
divArticle.appendChild(priceArticle);
divArticle.appendChild(removeArticle);

// Contenu des balises index html
nameArticle.innerHTML = recupPanier.name;
priceArticle.textContent = recupPanier.price / 100 + " euros";