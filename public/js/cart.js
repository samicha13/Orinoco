

//declaration de la variable dans laquelle on a met les key et values 


let  prixTotalPanier = 0;
let a = [];


//console.log(arrayPanier.length);

const panierRecap = document.getElementById("panier-recap");
panierRecap.className = "col-12  text-center";

//----- Affichage produit panier---//

const positionElement1 = document.querySelector("#container-produits-panier");

console.log(positionElement1);


//fetch
function getById(id) {
    return fetch("http://localhost:3000/api/teddies/" + id);
}
function addTeddie(teddie) { // fonction pour afficher nom couleur et prix dans le panier 
    console.log(teddie);

    
 //card du produit
    const cardDescription = document.createElement("div");
    panierRecap.appendChild(cardDescription);
    cardDescription.className = " col-6  text-center";

    //caractéristique
    const cardBody = document.createElement("div");
    cardBody.className = "cardBody "
    cardDescription.appendChild(cardBody);

    //Nom de l'ours
    const cardTitle = document.createElement("h2");
    cardTitle.textContent = teddie.name;
    cardTitle.className = "cardTitle  card-text";
    cardBody.appendChild(cardTitle);

 

    //couleur choisie
    const cardColor= document.createElement("p");
    cardColor.textContent = "Couleur :" + " "+ teddie.color;
    cardColor.className = "cardColor  card-text";
    cardBody.appendChild(cardColor);

 // titre quantité
 const quantity = document.createElement("p");
 cardBody.appendChild(quantity);
 quantity.textContent = "Quantité :" +" "+ teddie.qty ;
 quantity.className = "quantity";


    //Prix produit
    const cardPrice = document.createElement("p");
    cardBody.appendChild(cardPrice);
    cardPrice.textContent = `Prix unitaire : ${teddie.price / 100} €`;
    cardPrice.className = "card-text-price ";

    // création d'un total panier afin de mettre a jour les prix des ours en fct de leur qté
  const montantPanier = document.getElementById("montant-panier");
   //Prix de l'ours
   const cardPriceTotal = document.createElement('p');
   cardPriceTotal.className = 'card-text-total ';
   cardBody.appendChild(cardPriceTotal);
   
   cardPriceTotal.innerHTML = 'Prix : ' + (JSON.parse(teddie.price/100))*(JSON.parse(teddie.qty));
   cardPriceTotal.textContent = 'Total : ' + (JSON.parse(teddie.price /100))*(JSON.parse(teddie.qty)) + ' ' + '€';

   
   // appel de la div avec l'id montant-final pour afficher le total générale
    
   prixTotalPanier  = prixTotalPanier + (JSON.parse(teddie.price/100))*(JSON.parse(teddie.qty)); 
    textMontantPanier.innerHTML = "Votre montant total est de :" +" "+ prixTotalPanier +' '+ '€';
    
 a[0]=  prixTotalPanier;

    


   
//Bouton 

// element déclencheur
cardBtn.addEventListener("click",Delete) 

function Delete(event){
    localStorage.clear();}

}

// Afficher montant panier 
const montantFinal = document.getElementById('montant-final');
textMontantPanier = document.createElement("p");
   montantFinal.appendChild(textMontantPanier);

   // btn pour supprimer le panier
const supprimerTotal = document.getElementById("supprimer-panier");

const cardBtn = document.createElement('a');
cardBtn.href = "cart.html"          //lien pour récupérer l'id du produit
cardBtn.className = ' btn btn-dark m-1';
cardBtn.textContent = 'Supprimer';
supprimerTotal.appendChild(cardBtn);

// tiitre remplir le formulaire
const infoClient = document.getElementById("info-Client");
infoClient.textContent = " Veuillez rentrer vos coordonnées :";
infoClient.className = "p-3";


// bouton pour confirmer et passer au formulaire
const cardBtnConfirmer = document.getElementById("btnConfirmation");
cardBtnConfirmer.href = "confirmer.html"          //lien pour récupérer l'id du produit
cardBtnConfirmer.className = 'btn btn-outline-info m-1';
cardBtnConfirmer.textContent = 'confirmer votre commande !';

// bouton pour confirmer et passer au formulaire
const cardBtnRetour = document.getElementById("btnRetour");
cardBtnRetour.href = "confirmer.html"          //lien pour récupérer l'id du produit
cardBtnRetour.className = 'btn btn-outline-info m-1';
cardBtnRetour.textContent = 'Retour';
   
function upPanier() {

//si le panier est vide : afficher le panier est vide

    const items = JSON.parse(localStorage.getItem("Panier"));
    if (items === null) {
        const panierVide = `
<div class="container-panier-vide">
<div>Le panier est vide</div>
</div>`;
        positionElement1.innerHTML = panierVide;
    } else { // si le panier n'est pas vide on affiche 


        items.map(item => {
            console.log(item);
            this.getById(item.id)
             

                .then((res) => res.json())
                .then((teddie) => {
                    teddie.color = item.color;
                    teddie.qty = item.qty;
                    addTeddie(teddie);
                  
                }); 
                 
        })
    }
}
console.log(a); 

upPanier();




