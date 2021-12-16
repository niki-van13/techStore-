function initSite() {
    loadProducts();
}




function loadProducts() {
    let cartItems = localStorage.getItem('cartInCart')
    let belopp = document.getElementById("belopp")
    let main = document.getElementsByTagName("main")[0]

    let Msg = document.createElement('h1')
    Msg.textContent = 'Kundvagnen är tom.'

    if (!cartItems) {
        main.appendChild(Msg)


    } else {
        let mainSection = document.createElement("section")
        mainSection.id = "cartItemsContainer";
        document.getElementById('priceContainer').style.display = 'block';
        let sum = 0;
        cartItems = JSON.parse(cartItems)
        document.getElementById("counter").textContent = cartItems.length

        for (let i = 0; i < cartItems.length; i++) {
            let items = loadCards(cartItems[i], i);
            sum += cartItems[i].price;
            mainSection.appendChild(items)
        }
        belopp.textContent = sum
        main.appendChild(mainSection)

    }
}

let checkOutButton = document.getElementById('checkOutBtn');
checkOutButton.addEventListener('click', function () {
    alert("Tack för ditt köp!");
    localStorage.clear();
    location.reload();
})


function loadCards(cart, index) {
    //console.log(item)
    var itemContainer = document.createElement("article")
    itemContainer.classList.add("item-container")

    //creo container per img
    var imgeContainer = document.createElement("div")
    imgeContainer.classList.add("img-container")
    itemContainer.appendChild(imgeContainer)


    var cartImg = document.createElement("img")
    cartImg.src = "./assets/" + cart.image
    cartImg.classList.add("img-product")
    imgeContainer.appendChild(cartImg)


    var cartText = document.createElement("h1")
    cartText.innerText = cart.title;
    itemContainer.appendChild(cartText)
    // //prezzo cont

    var priceContainer = document.createElement("p")
    priceContainer.innerText = cart.price + "euro"
    itemContainer.appendChild(priceContainer)

    // //bottoncino

    var buttonContainer = document.createElement("div")
    buttonContainer.classList.add("btn-container")
    itemContainer.appendChild(buttonContainer)

    var removeToCartButton = document.createElement('button')
    removeToCartButton.title = cart.title
    removeToCartButton.id = index
    removeToCartButton.classList.add("btn-removetocart")
    buttonContainer.addEventListener("click", function () {
        removeItem(removeToCartButton.id)
    });
    buttonContainer.appendChild(removeToCartButton)

    // //buttontext
    var buttontext = document.createElement("span")
    buttontext.innerText = "Ta Bort"
    buttontext.classList.add("btn-text")
    removeToCartButton.appendChild(buttontext)

    // //button icon

    var buttonIcon = document.createElement("i")
    buttonIcon.className = "far fa-trash-alt";
    removeToCartButton.appendChild(buttonIcon)

    return itemContainer
}



function removeItem(id) {

    let cartItems = localStorage.getItem("cartInCart")
    cartItems = JSON.parse(cartItems)
    cartItems.splice(id, 1)


    cartItems = JSON.stringify(cartItems)
    localStorage.setItem("cartInCart", cartItems)

    location.reload();



}

