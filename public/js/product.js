let url = 'http://localhost:3000/api/teddies';

//Recupère les paramètres passés dans l'url du produit
const selectTeddies = window.location.search;

//Analyse des paramètres de la requête
const urlParams = new URLSearchParams(selectTeddies);

/* Récupère le paramètre ID*/
const productId = urlParams.get('id');


fetch(url) //recherche dans l'url
    .then((response) => {
        response.json().then((elements) => {

            const main = document.getElementById("main");
            const row = document.createElement("div");
            row.className = "row bg-white m-3 shadow-sm";        
            main.appendChild(row);

          


            elements.forEach(element => { //recherches  les infos des items dans l'API ours 

                if (productId === element._id) {  // structure HTML 

                    //div IMAGE
                    const divImg = document.createElement('div');
                    divImg.className = 'col-12 col-md-6 text-center p-0 d-flex align-items-center';
                    row.appendChild(divImg);

                    //image  ours
                    const imgProduct = document.createElement('img');
                    imgProduct.src = element.imageUrl;
                    divImg.appendChild(imgProduct);

                    // div description du produit
                    const divDescription = document.createElement('div');
                    divDescription.className = 'col-12 col-md-6 text-center d-flex align-items-stretch';
                    row.appendChild(divDescription);

                    //card du produit 
                    const cardDescription = document.createElement('div')
                    cardDescription.className = 'card border-0';
                    divDescription.appendChild(cardDescription);

                    //contenu des caractéristiques 
                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body mt-4 pt-4';
                    cardDescription.appendChild(cardBody);

                    //Nom de l'ours
                    const cardTitle = document.createElement('p');
                    cardTitle.className = 'card-title m-3 text-left font-weight-bold';
                    cardBody.appendChild(cardTitle);
                    cardTitle.innerHTML = element.name;                         //récupére  l'info

                    //Description en-tête
                    const descriptionHead = document.createElement('p');
                    descriptionHead.className = 'card-text m-2 text-left font-italic';
                    cardBody.appendChild(descriptionHead);
                    descriptionHead.textContent = 'Description du produit:';

                    //Description contenu 
                    const description = document.createElement('p');
                    description.className = 'card-text text-justify';
                    cardBody.appendChild(description);
                    description.innerHTML = element.description;

                    


                    /*option produit*/

                    // div (texte et options)
                    const divSelect = document.createElement('div');
                    divSelect.className = 'd-flex justify-content-between justify-content-lg-around';
                    cardBody.appendChild(divSelect);
                                        
                       //'Choisir une option' texte
                       const select = document.createElement('p');
                       select.className = 'card-text m-0 text-left font-italic choose-opt';
                       divSelect.appendChild(select);
                       select.textContent = 'Choisir une option'

                    //Création du selecteurs avec les options de couleurs
                    const selectList = document.createElement('select');
                    selectList.className = 'form-select';
                    selectList.id = 'list';
                    divSelect.appendChild(selectList);
                    selectList.innerHTML = element.colors;


                     //Récupération du tableau  de données dans l'api
                     const array = element.colors;

                     //Boucle pour afficher toutes les couleurs possibles
                     for (let i = 0; i < array.length; i++) {
 
                         let option = document.createElement('option');
                         option.className = 'option';
                         option.value = array[i];
                         option.text = array[i];
                         selectList.appendChild(option);

                     }
 




                     const oursQuantity = document.createElement("div");
                     cardBody.appendChild(oursQuantity);
                     oursQuantity.className = "oursquantity";

                     //titre quantité
                     const quantity = document.createElement("p");
                     oursQuantity.appendChild(quantity);
                     quantity.textContent = "Quantité";
                     quantity.className = "quantity";
                 
// choix de la quantité
                     const btnQuantity = document.createElement("input");
    oursQuantity.appendChild(btnQuantity);
    btnQuantity.setAttribute("type","number");
    btnQuantity.setAttribute("value",1);
    btnQuantity.setAttribute("min",0);
    btnQuantity.className = "quantityInput";
                   
//Prix ours


       const cardPrice = document.createElement('div');
     cardPrice.className = 'card-text m-3 font-weight-bold';
     cardBody.appendChild(cardPrice);
       
const priceProduct = document.createElement("p");
cardPrice.appendChild(priceProduct);
priceProduct.textContent = `Prix : ${element.price/100} €`;
priceProduct.className = "priceProduct";

// création du bouton ajouter au panier
const divBtn = document.createElement("div");
    cardBody.appendChild(divBtn);
    divBtn.className = "divBtnAjouter btn btn-dark m-3 p-2";

    
    const btnAjout = document.createElement("button");
    divBtn.appendChild(btnAjout);
    btnAjout.className = "btnAjout"
    btnAjout.innerHTML =`<a class="liens" href="cart.html" >Ajouter au Panier</a>`

    
    const btnReturn = document.createElement("button");
    divBtn.appendChild(btnReturn);
    btnReturn.className = "btnReturn";
    btnReturn.innerHTML =`<a  class="lien" href="index.html" >Retour</a>`;



btnAjout.addEventListener("click",produitEnregistreDansLocalStorage) 

}
});
})
});



 //----------le local storage ----------------

//fonction ajout au panier
function produitEnregistreDansLocalStorage(newProduct){


    let cartArray = [];
    let isPresent = false;

console.log(panier);
//-- s'il y a des produits enregistré dans le local storage
if(localStorage.getItem('panier')){

    cartArray = JSON.parse(localStorage.getItem('panier'));

    cartArray.forEach (elementInCart => { //On parcourt le tableau
        if(elementInCart.id == newProduct._id && elementInCart.color == newProduct.selectedColor){ //si l'élément à ajouter est déjà dans le panier & si il a la même couleurs
            elementInCart.qty++;
            isPresent = true;
        }
        
    }) 
    
}


if(!isPresent){ //si l'élément à ajouter n'est pas déjà présent dans le panier
    let cartEnter = { // On ajoute les éléments suivants
        id : element._id,
        name : element.name,
        price : element.price/100,
        description : element.description,
        imageUrl : element.imageUrl,
        select: select.value,   
        qty : btnQuantity.value, 
      }  
    

    // Ajout du des nouveaux éléments au tableau
    cartArray.push(cartEnter);

}

//ajout du tableau converti en JSON au localStorage
 //numberArticle.textContent = newProduct.qty;le total de qty -> elementInCart.qty ou localStorage.length;
 localStorage.setItem('panier', JSON.stringify(cartArray));
}
      