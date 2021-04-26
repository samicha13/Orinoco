//Je récupére les élèments 
const Panier = document.getElementById("teddyCard");
const totalP = document.getElementById("totalPanier");
const mainPanier = document.getElementById("mainPanier")

const productsId = [];


//Création de la variable
let totalProduitPanier = 0 ;

function recuperationPanier() {

  //création d'une boucle pour récupérer les éléments du panier
  
  for(let i = 0; i < localStorage.length;i++){
  
    let elementid = localStorage.key(i);
    productsId.push(elementid)

    let teddyStorage = JSON.parse(localStorage.getItem(elementid))
    console.log(teddyStorage)
    
    const divTextPanier = document.createElement("div");
    Panier.appendChild( divTextPanier);
     divTextPanier.className = " divTextPanier"
    console.log( divTextPanier)
  
    const imgPanier = document.createElement("img");
    divTextPanier.appendChild(imgPanier);
    imgPanier.src = teddyStorage.imageUrl;
    imgPanier.setAttribute("alt", "ours en Peluche");
    imgPanier.className = "imgPanier";
    console.log(imgPanier);

    const h2Panier = document.createElement("h2");
    divTextPanier.appendChild(h2Panier);
    h2Panier.textContent = teddyStorage.name;
    h2Panier.className = "h2Panier";
    console.log(h2Panier);
    
    const selectPanier = document.createElement("p");
    divTextPanier.appendChild(selectPanier);
    selectPanier.innerHTML = `Couleur : ${teddyStorage.select}`;
    selectPanier.className = "selectPanier";
    console.log(selectPanier);
    
    const qtyPanier = document.createElement("p");
    divTextPanier.appendChild(qtyPanier);
    qtyPanier.innerHTML = `Quantité : ${teddyStorage.qty}`
    qtyPanier.className = "qtyPanier";
    console.log(qtyPanier);
    
    const prixTeddyPanier = document.createElement("p");
    divTextPanier.appendChild(prixTeddyPanier);
    prixTeddyPanier.innerHTML = `Prix : ${teddyStorage.price * teddyStorage.qty} €`;
    console.log(prixTeddyPanier.innerHTML)
    prixTeddyPanier.className = "prixTeddyPanier";
    console.log(prixTeddyPanier)

    
    totalProduitPanier = totalProduitPanier + (teddyStorage.price * teddyStorage.qty );
    //console.log(totalProduitPanier)
  }
}
//recuperationPanier(localStorage)
  
//création d'une condition au cas ou le panier est vide
if (localStorage.length == 0) {
    //
    let panierVide = document.createElement("p");
    mainPanier.appendChild(panierVide);
    panierVide.className = "panierVide"
    panierVide.innerHTML =`Votre panier est vide`
}else{
   recuperationPanier() 
}

//bouton supprimer les articles
document.getElementById("removePanier").addEventListener("click", () => {
  localStorage.clear(); //efface
  productsId =[];
  location.reload(); //recharge la page
})

     
//afficher le prix total
let totalPrixPanier = document.createElement("p");
totalPrixPanier.className = 'totalPrixPanier mt-3 pt-3';
totalPrixPanier.innerHTML = `Prix total de votre panier : ${totalProduitPanier} €`;
totalP.appendChild(totalPrixPanier)


