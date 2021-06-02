/*constante de Url*/

const URL = "http://localhost:3000/api/teddies";




//récupération de l'id  et des parametres passés dans l'url du produit 
function getId() {
    const param = window.location.search
    const id = param.replace("?id=", "")
    if (!id) throw new Error("il manque l\'id")
    return id
}

// recherche dans l'url
fetch("http://localhost:3000/api/teddies/" + getId())
    .then(windowProduct => windowProduct.json())
    .then(windowProduct => {
        console.log(windowProduct)


        const oursContainer = document.getElementById("windowProduct");
        oursContainer.className = " bg-white m-3 shadow-sm row"


        function afficherLeProduit(Peluche) {

            /*structure HTML */

            /*je crée 2 blocs pour pouvoir mettre l'image à côté du texte
            
                /*création d'une div image pour y mettre la photo de l'ours*/
            const divImg = document.createElement("div");
            divImg.className = "col-12 col-md-8  text-center p-2 d-flex align-items-center"
            oursContainer.appendChild(divImg);

            const imgProduct = document.createElement("img");
            imgProduct.src = Peluche.imageUrl;
            imgProduct.className = "imgProduct";
            divImg.appendChild(imgProduct);


            //div description du produit
            const divProduct = document.createElement("div");
            oursContainer.appendChild(divProduct);
            divProduct.className = "  col-md-4  p-0 text-center d-flex align-items-stretch ";
            console.log(divProduct);


            //card du produit
            const cardDescription = document.createElement("div");
            divProduct.appendChild(cardDescription);
            cardDescription.className = "border-0";

            //caractéristique
            const cardBody = document.createElement("div");
            cardBody.className = "cardBody"
            cardDescription.appendChild(cardBody);

            //Nom de l'ours
            const cardTitle = document.createElement("h2");
            cardTitle.textContent = Peluche.name;
            cardTitle.className = "cardTitle text-left card-text";
            cardBody.appendChild(cardTitle);

            //Description du produit (en tête)
            const descrptionHead = document.createElement("p");
            cardBody.appendChild(descrptionHead);
            descrptionHead.className = "card-text text-left";
            descrptionHead.textContent = " Description du produit";

            // div description contenu
            const textProduct = document.createElement("p");
            cardBody.appendChild(textProduct);
            textProduct.textContent = Peluche.description;
            textProduct.className = "textProduct";

            //Prix produit
            const cardPrice = document.createElement("p");
            cardBody.appendChild(cardPrice);
            cardPrice.textContent = `Prix : ${Peluche.price / 100} €`;
            cardPrice.className = "card-text m-2";

            // option de la couleur des produits


            // div qui engloobe text et option
            const divSelect = document.createElement("div");
            divSelect.className = "d'flex justify-content-between justify-content-lg-around mt-3 mb-3'";
            cardBody.appendChild(divSelect);



            // Ajout du texte de choix d'une option
            const option = document.createElement("p");
            divSelect.appendChild(option);
            option.textContent = "Choissisez la couleur de votre ours" + " ";
            option.className = "option";

            //Création du formulaire qui contient les options
            const select = document.createElement("select");
            cardBody.appendChild(select);

            // boucle pour afficher  toute les options
            for (let color of windowProduct.colors) {

                let option = document.createElement('option')
                select.appendChild(option);
                option.innerHTML = color;
                select.setAttribute('value', color)
                select.id = ('value', windowProduct.colors.value);
            }

            // div regroupant nb ours et titre quantité
            const oursQuantity = document.createElement("div");
            cardBody.appendChild(oursQuantity);
            oursQuantity.className = "oursquantity";

            // titre quantité
            const quantity = document.createElement("p");
            oursQuantity.appendChild(quantity);
            quantity.textContent = "Quantité";
            quantity.className = "quantity";

            // choix du nombre d'ours voulu
            const btnQuantity = document.createElement("input");
            oursQuantity.appendChild(btnQuantity);
            btnQuantity.setAttribute("type", "number");
            btnQuantity.setAttribute("value", 1);
            btnQuantity.setAttribute("min", 0);
            btnQuantity.className = "quantityInput";

            // création d' une div qui regroupe 2 boutons
            const divBtn = document.createElement("div");
            cardBody.appendChild(divBtn);
            divBtn.className = "divBtnAjouter";

            //bouton ajout panier
            const btnAjout = document.createElement("button");
            divBtn.appendChild(btnAjout);
            btnAjout.className = "btn btn-outline-info m-2 p-2 cart_icon col-4"
            btnAjout.textContent = "Ajouter";
            btnAjout.setAttribute('role', 'button');

            // bouton retour accueil
            const btnReturn = document.createElement("a");
            divBtn.appendChild(btnReturn);
            btnReturn.className = "btn btn-outline-info shadow m-2 p2 col-7";
            btnReturn.href = 'index.html';
            btnReturn.setAttribute = ('role', 'button');
            btnReturn.textContent = 'Retour à la liste des produits';

            // element déclencheur
            btnAjout.addEventListener("click", envoiDuProduit)

            function envoiDuProduit(event) {
                // A RAJOUTER faire en 2 temps voir dabord si le produit est present ou pas, s'il est pas présent on l'ajoute et s'il est present on l'incremente de btn qty value

                //condition de sélectionner d'une quantité  si =0 envoyer une alerte     	
                if (btnQuantity.value == 0) {
                    alert("Veuillez sélectionner une quantité")
                    event.preventDefault();
                } else { // sinon on ajoute les elements id name price et description des que la qté est chosie



                    cardPrice.textContent = ((Peluche.price / 100) * (+btnQuantity.value)) + "€";


                    const pelucheCart = {
                        id: Peluche._id,
                        color: select.value,
                        qty: btnQuantity.value,
                    };

                    const arrayPanier = JSON.parse(localStorage.getItem('Panier')) || [];
                    const existPeluche = arrayPanier.filter(panier => (panier.id === pelucheCart.id && panier.color === pelucheCart.color))[0];


                    if (existPeluche) {
                        existPeluche['qty'] = parseInt(pelucheCart.qty) + parseInt(existPeluche['qty']);
                        console.log('déja présent');


                    } else {
                        arrayPanier.push(pelucheCart);
                    }

                    console.log(arrayPanier);


                    localStorage.setItem('Panier', JSON.stringify(arrayPanier));
                    // alerte pour informer que le produit à bien été ajouté
                    alert(`${btnQuantity.value} ${Peluche.name} ${select.value} ajouté au panier `);
                }
            }
        }
        afficherLeProduit(windowProduct);
    });