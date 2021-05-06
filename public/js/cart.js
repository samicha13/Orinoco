let url = 'http://localhost:3000/api/teddies';



fetch(url) //recherche et récupération dans l'URL 
    .then((response) => {
        response.json().then((elements) => {

            const main = document.getElementById('Test');
            const row = document.createElement('div');
            row.className = "row";
            main.appendChild(row);

    //Je récupére les élèments 
    const Panier = document.getElementById("teddyCard");
    const totalP = document.getElementById("totalPanier");
    console.log(totalP);
    const mainPanier = document.getElementById("mainPanier");
    let total=0;

    const productsId = [];
    Object.entries(localStorage).forEach(e => {

                // structure HTML 

                //div col
                const divCol = document.createElement("div");                 
                divCol.className = 'col-12 col-md-6 col-lg-3 text-center';  
                row.appendChild(divCol);  

                //carte
                const card = document.createElement('div')
                card.className = 'card m-3 shadow-sm rounded-3';
                divCol.appendChild(card);    

                //image 
                const cardImg = document.createElement('img');
                cardImg.src = JSON.parse(e[1])["imageUrl"];
                card.appendChild(cardImg); 

                //caractéristiques ( nom+prix+Quantité)
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                card.appendChild(cardBody);

                //Nom de l'ours
                const cardName = document.createElement('p');
                cardName.className = 'card-title m-1';
                cardBody.appendChild(cardName);
                cardName.innerHTML = JSON.parse(e[1])["name"];  

                // titre quantité
                const quantity = document.createElement("p");
                cardBody.appendChild(quantity);
                quantity.textContent = "Quantité";
                quantity.className = "quantity";
                
                //couleur
const color = document.createElement("p");
cardBody.appendChild(color);


                // Quantité
                const btnQuantity = document.createElement("input");
                cardBody.appendChild(btnQuantity);
                btnQuantity.setAttribute("id","quantite");
                btnQuantity.setAttribute("type","number");
                btnQuantity.setAttribute("value",JSON.parse(e[1])["qty"]);
                btnQuantity.setAttribute("min",0);
                btnQuantity.className = "quantityInput";

                //Prix de l'ours
                const cardPrice = document.createElement('p');
                cardPrice.className = 'card-text m-1';
                cardBody.appendChild(cardPrice);
                cardPrice.innerHTML = 'Prix : ' + (JSON.parse(e[1])["price"])*(JSON.parse(e[1])["qty"]);
                cardPrice.textContent = 'Prix : ' + (JSON.parse(e[1])["price"])*(JSON.parse(e[1])["qty"]) + ' ' + '€';

                total=total+(JSON.parse(e[1])["price"])*(JSON.parse(e[1])["qty"]);
                

    })

    const row2 = document.createElement('div');
    row.className = "row2";
    totalP.appendChild(row2);
    row2.innerHTML = 'Total Panier est' + total +"€";
    row2.textContent='Total de votre panier : ' + total +"€";

    //Bouton 
    const cardBtn = document.createElement('a');
    cardBtn.href = "cart.html"          //lien pour récupérer l'id du produit
    cardBtn.className = 'btn btn-dark m-1';
    cardBtn.textContent = 'Supprimer';
    row2.appendChild(cardBtn);

    // element déclencheur
    cardBtn.addEventListener("click",Delete) 

    function Delete(event){
        localStorage.clear();
        }
    })

})


