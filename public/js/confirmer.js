const order = JSON.parse(localStorage.getItem('order'));
if (order === null) {
    { document.location.href = "index.html" };
} else {
    console.log(order.orderId);
    document.getElementById('order__firstName').innerText = order.contact.firstName
    document.getElementById('order__email').innerText = order.contact.email
    document.getElementById('order__id').innerText = order.orderId
    document.getElementById("main").classList.remove('d-none')
    const totalPrice = JSON.parse(localStorage.getItem('total'));
    document.getElementById('order__total').innerText = "Montant total :" + " " + totalPrice + "€"
    //Ecoute du bouton 'Revenir à l'accueil': vide les localStorages avant de retourner à l'accueil
    const endOfOrder = document.getElementById('index-btn');
    endOfOrder.addEventListener('click', () => {
        localStorage.removeItem('Panier');
        localStorage.removeItem('order');
        localStorage.removeItem('total');
        localStorage.removeItem('formulaireValues');
    });
}