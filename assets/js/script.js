const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
        }
    } else {
        elem.addEventListener(type, callback);
    }
};

//navbar toggle

const navToggler = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    navToggler.classList.toggle("active");
};

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
    navbar.classList.remove("active");
    navToggler.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

//activar header cuando la ventana de desplaza hacia abajo

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
    if (window.scrollY > 100) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
};

addEventOnElem(window, "scroll", activeElemOnScroll);

/*==========================
  ====JAVASCRIPT PRODUCTOS==
  ==========================*/

//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');

let alertPagado = document.querySelector('.btnPagar')



let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions

function mensajePagado() {
    alert('¡Gracias por la compra!');
}

function showCart(x) {
    document.getElementById("products-id").style.display = "block";
}
function closeBtn() {
    document.getElementById("products-id").style.display = "none";
}


loadEventListenrs();
function loadEventListenrs() {
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);

    alertPagado.addEventListener('click', mensajePagado);
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard = totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);

        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml() {
    clearHtml();
    buyThings.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}€</h5>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value=${amount} class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        //SUMAR Y RESTAR CANTIDAD 

        const plusIcon = row.querySelector('.sumar-cantidad');
        const minusIcon = row.querySelector('.restar-cantidad');
        const amountInput = row.querySelector('.carrito-item-cantidad');

        plusIcon.addEventListener('click', () => {
            product.amount++;
            amountInput.value = product.amount;
            totalCard = parseFloat(totalCard) + parseFloat(price);
            totalCard = totalCard.toFixed(2);
            priceTotal.innerHTML = totalCard;
        });

        minusIcon.addEventListener('click', () => {
            if (product.amount > 1) {
                product.amount--;
                amountInput.value = product.amount;
                totalCard = parseFloat(totalCard) - parseFloat(price);
                totalCard = totalCard.toFixed(2);
                priceTotal.innerHTML = totalCard;
            }
        });

        containerBuyCart.appendChild(row);
    });

    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
}
containerBuyCart.appendChild(row);

priceTotal.innerHTML = totalCard;

amountProduct.innerHTML = countProduct;
function clearHtml() {
    containerBuyCart.innerHTML = '';
}



// document.addEventListener('DOMContentLoaded', function () {
//     const carousel = document.querySelector('.carousel');
//     const slides = document.querySelector('.carousel-slides');
//     const slideWidth = carousel.clientWidth;
//     let slideIndex = 0;
  
//     function showSlide(index) {
//       slides.style.transform = `translateX(-${slideWidth * index}px)`;
//     }
  
//     function nextSlide() {
//       slideIndex = (slideIndex + 1) % slides.children.length;
//       showSlide(slideIndex);
//     }
  
//     function startCarousel() {
//       setInterval(nextSlide, 3000); // Cambiar cada 3 segundos (3000 ms)
//     }
  
//     startCarousel();
//   });
  