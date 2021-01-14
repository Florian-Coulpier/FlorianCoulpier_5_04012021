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
    document.getElementById("informationPrice").innerHTML = detailTeddies.price / 100 + " €";

    // Récupération des colors pour les boucler sur chaque teddies 
    detailTeddies.colors.forEach((teddie) => {
        let choixOption = document.createElement("option");
        // Mettre les colors dans "choix_option"
        let selectColor = document.getElementById("choix_option");
        selectColor.appendChild(choixOption).innerHTML = teddie;
    });

    // Lié une variable au bouton pour l'évènement
    let boutonPanier = document.getElementById('ajoutPanier');
    
    // On récupère les données de la page produit
    let productPage = detailTeddies;
    let productPageJson = JSON.stringify(productPage);
    console.log(productPageJson)

    // Voir si il y a des produits dans le panier, si oui le parser sinon créer un tableau vide
    const initPanier = () => {
        let panier = localStorage.getItem("panier");
        if(panier != null) {
            return JSON.parse(panier); 
        }else {
            return[];
        }
    }

    // Sauvegarde du panier
    const savePanier = (panier) => {
        localStorage.setItem("panier", productPageJson);
    }

    // Avec l'évènement click on envoie les données dans le localStorage + une alerte est créée
    boutonPanier.addEventListener('click', function () {
        
        // Envoie des données dans le storage via le panier
        let panierStorage = initPanier();
        panierStorage.push(productPageJson);
        savePanier(panier);
        
        // Envoie de l'alert
        alert('Votre teddie à bien été ajouté au panier');
    });
}
