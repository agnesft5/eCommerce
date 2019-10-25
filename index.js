////////////////// GLOBALS /////////////////////
let cesta = [];
let arrayProductos = [];

/////////////////// GET ///////////////////////

function httpGet(theUrl) {
    let miPromesa = new Promise((resolve, reject) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                resolve(JSON.parse(xmlHttp.responseText));
            } else if (xmlHttp.readyState == 4) {
                reject(JSON.parse(xmlHttp.responseText))
            }
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    })
    return miPromesa;
};


////////////////////// PROMESA ////////////////////////


function getArray() {
    httpGet("https://cors-anywhere.herokuapp.com/http://prana-solutions.com/neoland/ecommerce/?endpoint=categories")
        .then((objSON) => {
            let arrCat = objSON.categories
            arrayProductos = [];
            for (let i = 0; i < arrCat.length; i++) {
                let catId = arrCat[i]["id"]

                httpGet(`https://cors-anywhere.herokuapp.com/http://prana-solutions.com/neoland/ecommerce/?endpoint=products&category_id=${catId}`)
                    .then((categories) => {
                        let arrProd = categories.products
                        arrayProductos[catId] = [];
                        for (let i = 0; i < arrProd.length; i++) {
                            arrayProductos[catId].push(arrProd[i])
                        }

                    })
            }
            console.log(arrayProductos)

        })
}

/////////////////// BOTONS CATEGORIA /////////////////////////////
let homeButton = document.querySelector(".home__button");
let electronicsButton = document.querySelector(".electronics__button");
let fashionButton = document.querySelector(".fashion__button");
let categoriesButton = document.querySelector(".categorias__button");


/////////////////// DADES CATEGORIA HOME/////////////////////
function getHome(arrayProductos) {
    for (let i = 0; i < arrayProductos["1"].length; i++) {
        let product = arrayProductos["1"][i];

        let productName = product["name"]
        let productDescription = product["description"]
        let productPrice = product["price"]
        let priceUnit = product["unit"]
        let imgLink = product["imageURL"]

        let prodContainer = document.querySelector(".products__container")
        let prodBanner = document.querySelector(".cardcontainer__wrapper")
        let catBanner = document.querySelector(".cards__bg")
        let productos = `<div class="col-sm-6 w-100 text-center"><div class="card text-white w-100 m-5 background__size" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('${imgLink}')"><h5 class="card__name">${productName}</h5><div class="card__description"><p class="product__description"></p><p class="card__text">${productPrice} ${priceUnit}</p><button type="button" class="btn btn-link">Añadir al carrito <i class="fa fa-shopping-cart"></i></button></div></div></div>`
        prodContainer.innerHTML += productos;
        prodBanner.className = "wrapper-grey cardcontainer__wrapper"
        catBanner.className = "banner cards__bg d-none"
    }
}


function getElectronics(arrayProductos) {
    for (let i = 0; i < arrayProductos["2"].length; i++) {
        let product = arrayProductos["2"][i];

        let productName = product["name"]
        let productDescription = product["description"]
        let productPrice = product["price"]
        let priceUnit = product["unit"]
        let imgLink = product["imageUrl"]

        let prodContainer = document.querySelector(".products__container")
        let prodBanner = document.querySelector(".cardcontainer__wrapper")
        let catBanner = document.querySelector(".cards__bg")
        let productos = `<div class="col-sm-6 w-100 text-center"><div class="card text-white w-100 m-5 background__size" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('${imgLink}')"><h5 class="card__name">${productName}</h5><div class="card__description"><p class="product__description"></p><p class="card__text">${productPrice} ${priceUnit}</p><button type="button" class="btn btn-link">Añadir al carrito <i class="fa fa-shopping-cart"></i></button></div></div></div>`
        prodContainer.innerHTML += productos;
        prodBanner.className = "wrapper-grey cardcontainer__wrapper"
        catBanner.className = "banner cards__bg d-none"
    }
}


function getFashion(arrayProductos) {
    for (let i = 0; i < arrayProductos["3"].length; i++) {
        let product = arrayProductos["3"][i];

        let productName = product["name"]
        let productDescription = product["description"]
        let productPrice = product["price"]
        let priceUnit = product["unit"]
        let imgLink = product["imageUrl"]

        let prodContainer = document.querySelector(".products__container")
        let prodBanner = document.querySelector(".cardcontainer__wrapper")
        let catBanner = document.querySelector(".cards__bg")
        let productos = `<div class="col-sm-6 w-100 text-center"><div class="card text-white w-100 m-5 background__size" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('${imgLink}')"><h5 class="card__name">${productName}</h5><div class="card__description"><p class="product__description"></p><p class="card__text">${productPrice} ${priceUnit}</p><button type="button" class="btn btn-link">Añadir al carrito <i class="fa fa-shopping-cart"></i></button></div></div></div>`
        prodContainer.innerHTML += productos;
        prodBanner.className = "wrapper-grey cardcontainer__wrapper"
        catBanner.className = "banner cards__bg d-none"
    }
}

/////////////////// BORRAR DATOS ////////////////////
function borrarDatos() {
    let prodContainer = document.querySelector(".products__container")
    let prodBanner = document.querySelector(".cardcontainer__wrapper")
    let catBanner = document.querySelector(".cards__bg")
    prodContainer.innerHTML ="";
    prodBanner.className = "wrapper-grey cardcontainer__wrapper d-none"
    catBanner.className = "banner cards__bg"
}


////////////////// EVENT LISTENER //////////////////

////////////////////// HOME ///////////////////////
homeButton.addEventListener("click", () => {
    getArray()
    getHome(arrayProductos)
})

///////////////// ELECTRONCIS ////////////////////
electronicsButton.addEventListener("click", () => {
    getArray()
    getElectronics(arrayProductos)
})

///////////////// FASHION ////////////////////

fashionButton.addEventListener("click", () => {
    getArray()
    getFashion(arrayProductos)
})

categoriesButton.addEventListener("click",()=>{
    borrarDatos();
})