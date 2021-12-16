var listOfProducts;



/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            listOfProducts = products;
            addProductsToWebpage();
        });

}

function initSite() {
    loadProducts();
}



function addProductsToWebpage() {
    // Salva nella var

    var main = document.getElementsByTagName("main")[0];
    var cartItems = document.createElement("section")
    cartItems.classList.add("cart-items")

    for (var i = 0; i < listOfProducts.length; i++) {
        var items = createCartItems(listOfProducts[i]);
        cartItems.appendChild(items)
    }
    main.appendChild(cartItems)
}


function createCartItems(cart) {

    var itemContainer = document.createElement("article")
    itemContainer.classList.add("item-container")

    var cartText = document.createElement("h1")
    cartText.innerText = cart.title;
    itemContainer.appendChild(cartText)

    //crea descrizione 
    var cartDescription = document.createElement("p")
    cartDescription.innerText = cart.description;
    itemContainer.appendChild(cartDescription)

    //creo container per img
    var imgeContainer = document.createElement("div")
    imgeContainer.classList.add("img-container")
    itemContainer.appendChild(imgeContainer)


    var cartImg = document.createElement("img")
    cartImg.src = "./assets/" + cart.image
    cartImg.classList.add("img-product")
    imgeContainer.appendChild(cartImg)

    // //prezzo cont

    var priceContainer = document.createElement("p")
    priceContainer.innerText = cart.price + "   " + "euro"
    itemContainer.appendChild(priceContainer)

    // //bottoncino

    var buttonContainer = document.createElement("div")
    buttonContainer.classList.add("btn-container")
    itemContainer.appendChild(buttonContainer)

    var addToCartButton = document.createElement('button')
    addToCartButton.title = cart.title;
    addToCartButton.classList.add("btn-addtocart")
    buttonContainer.addEventListener("click", function () {
        addItem(cart)
    });
    buttonContainer.appendChild(addToCartButton)

    // //buttontext
    var buttontext = document.createElement("span")
    buttontext.innerText = "Lägg till i Kundvagnen"
    buttontext.classList.add("btn-text")
    addToCartButton.appendChild(buttontext)

    // //button icon

    var buttonIcon = document.createElement("i")
    buttonIcon.className = "cart2 fas fa-cart-arrow-down";
    addToCartButton.appendChild(buttonIcon)

    return itemContainer

}


function addItem(item) {

    let cartItems = localStorage.getItem("cartInCart")

    if (cartItems) {
        cartItems = JSON.parse(cartItems)
    } else {
        item.inCart = 1
        cartItems = []
    }

    cartItems.push(item)

    // prod nel array

    document.getElementById("counter").textContent = cartItems.length


    localStorage.setItem("cartInCart", JSON.stringify(cartItems))

}

