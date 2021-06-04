

//declaration de la variable dans laquelle on a met les key et values 
const URL = "http://localhost:3000/api/teddies/order";
const items = JSON.parse(localStorage.getItem("Panier"));
let prixTotalPanier = 0;
let structurePanier = [];
const toto = 0;

//console.log(arrayPanier.length);

const panierRecap = document.getElementById("panier-recap");
panierRecap.className = "col-12  text-center";

//----- Affichage produit panier---//

const positionElement1 = document.querySelector("#container-produits-panier");

//console.log(positionElement1);


//fetch
function getById(id) {
    return fetch("http://localhost:3000/api/teddies/" + id);
}
function addTeddie(teddie) { // fonction pour afficher nom couleur et prix dans le panier 
    //console.log(teddie);



    //card du produit
    const cardDescription = document.createElement("div");
    panierRecap.appendChild(cardDescription);
    cardDescription.className = " cardDescriptionPanier  product card text-center";


    //caractéristique

    const cardBody = document.createElement("div");
    cardBody.className = "cardBodyPanier "
    cardDescription.appendChild(cardBody);
    //Nom de l'ours
    const cardTitle1 = document.getElementById("nom-tableau");
    const cardTitle = document.createElement("td");
    cardTitle.textContent = teddie.name;
    cardTitle.className = "cardTitlePanier  card-text";
    cardTitle1.appendChild(cardTitle);

    //couleur choisie
    const cardColor1 = document.getElementById("couleur-tableau");
    const cardColor = document.createElement("td");
    cardColor.textContent = teddie.color;
    cardColor.className = "cardColorPanier card-text";
    cardColor1.appendChild(cardColor);

    // titre quantité
    const quantity1 = document.getElementById("quantite-tableau");
    const quantity = document.createElement("td");
    quantity.textContent = teddie.qty;
    quantity.className = "quantityPanier";
    quantity1.appendChild(quantity);


    //Prix produit
    const cardPrice1 = document.getElementById("prix-tableau");
    const cardPrice = document.createElement("td");
    cardPrice.textContent = `${teddie.price / 100} €`;
    cardPrice.className = "cardPricePanier ";
    cardPrice1.appendChild(cardPrice);

    // création d'un total panier afin de mettre a jour les prix des ours en fct de leur qté
    const montantPanier = document.getElementById("montant-panier");
    //Prix de l'ours
    const cardPriceTotal1 = document.getElementById("total-tableau");
    const cardPriceTotal = document.createElement("td");
    cardPriceTotal.className = 'cardPriceTotalPanier';
    cardPriceTotal.textContent = + (JSON.parse(teddie.price / 100)) * (JSON.parse(teddie.qty)) + ' ' + '€';
    cardPriceTotal1.appendChild(cardPriceTotal);

    // btn pour supprimer le panier
    const supprimerTotal = document.getElementById("supprimer-tableau");
    const cardBtn_Supp = document.createElement("td");
    supprimerTotal.appendChild(cardBtn_Supp);

    const cardBtn = document.createElement('a');

    cardBtn.href = "cart.html"          //lien pour récupérer l'id du produit
    cardBtn.className = ' btn btn-dark m-1';
    cardBtn.textContent = 'Supprimer';
    cardBtn.id = teddie._id;


    cardBtn_Supp.appendChild(cardBtn);

    cardBtn.onclick = function () {
        const arrayPanier = (JSON.parse(localStorage.getItem("Panier")));
        for (let i = 0; i < arrayPanier.length; i++) {
            if (arrayPanier[i]["id"] == cardBtn.id) {

                arrayPanier.splice(i, 1);

            }
        }
        localStorage.setItem('Panier', JSON.stringify(arrayPanier));
        console.log(arrayPanier.length);
        if (arrayPanier.length == 0) {

            localStorage.removeItem('Panier');
        }

    };

    // appel de la div avec l'id montant-final pour afficher le total général

    prixTotalPanier = prixTotalPanier + (JSON.parse(teddie.price / 100)) * (JSON.parse(teddie.qty));
    textMontantPanier.innerHTML = "Votre montant total est de :" + " " + prixTotalPanier + ' ' + '€';

    structurePanier[0] = prixTotalPanier;
}
// Afficher montant panier 
const montantFinal = document.getElementById('montant-final');
textMontantPanier = document.createElement("p");
montantFinal.appendChild(textMontantPanier);

function upPanier() {

    //si le panier est vide : afficher le panier est vide

    const items = JSON.parse(localStorage.getItem("Panier"));
    if (items === null) {
        const panierVide = `
<div class="container-panier-vide pt-5 mt-4">
<div>Le panier est vide !</div>
</div>`;
        positionElement1.innerHTML = panierVide;

    } else { // si le panier n'est pas vide on affiche 



        items.map(item => {
            //console.log(item);
            this.getById(item.id)


                .then((res) => res.json())
                .then((teddie) => {
                    teddie.color = item.color;
                    teddie.qty = item.qty;
                    addTeddie(teddie);

                });



        })

        // fonction condition de validation de l'email
        function validateEmail(email) {
            let emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i); //on défini le format du mail
            let valid = emailReg.test(email); //comparaison avec le mail de l'acheteur

            if (validateEmail(email)) {
                alert("Email  valide");
            } else {
                alert("Email invalide");
            }
        }
        //*********************************Formulaire de commande  ****************$*/

        //-------- advent listener --------------


        document.getElementById("commander").addEventListener("submit", function (e) {
            e.preventDefault()
            alert('Commande envoyé!')

            const contact = {
                lastName: document.getElementById("nom").value,
                firstName: document.getElementById("prenom").value,
                address: document.getElementById("adresse").value,
                email: document.getElementById("email").value,
                city: document.getElementById("ville").value,

            }

            //  mettre l'objet  "formulaireValues" dans le local storage 

            localStorage.setItem("formulaireValues", JSON.stringify(contact));

            // mettre les values du formulaire et mettre les produits séléctionnés dans un objet à envoyer vers le serveur

            const data = {
                products: items.map(item => item.id),
                contact
            }

            console.log("data");
            console.log(data);
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            return fetch(URL, options)
                .then(response => response.json())
                .then(function (response) {
                    // Adds the order object retrieved in the request
                    localStorage.setItem('order', JSON.stringify(response))

                    localStorage.setItem('total', JSON.stringify(prixTotalPanier));
                    // Remove products from localstorage
                    localStorage.removeItem('products')
                    // Redirects to the order confirmation page
                    window.location.href = 'confirmer.html'

                });
        })
    }
}

upPanier();
