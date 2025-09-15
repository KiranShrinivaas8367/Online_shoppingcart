import products from "./products.js";
import cart from "./cart.js";

let app = document.getElementById('app')
let temporary = document.getElementById('temporary')    
// let navBar = document.getElementById('navbar')
//load template file
const loadTemplate = ()=>{
    fetch('./template.html')
        .then(response => response.text())
        .then(html => {
            // console.log(html)
            app.innerHTML = html;
            let cartTab = document.getElementById('cartTab');
            cartTab.innerHTML = null;
            // cartTab.innerHTML = temporary.innerHTML;
            // temporary.innerHTML = null;
            cart();
            initApp();
            listProducts();
        })
}
loadTemplate();

const initApp = () => {
    let idProduct = new URLSearchParams(window.location.search).get('id');
    let info = products.filter((value) => value.id == idProduct)[0];
    console.log(info.id,+idProduct);
    if(!info)
    {
        window.location.href = './index.html';
    }
    let detail = document.querySelector('.detail')
    // detail.querySelector('.image img').src = info.image;
    // detail.querySelector('.name').innerText = info.name;
    // detail.querySelector('.price').innerText = 'Rs.' + info.price;
    // detail.querySelector('.description').innerText = info.description;
    // detail.querySelector('.buttons .addCart').dataset.id = idProduct;

    detail.innerHTML = `
    <div class="image">
            <img src="${info.image}" alt="">
        </div>
        <div class="content">
            <div class="name">${info.name}</div>
            <div class="price">Rs.${info.price}</div>
            <div class="buttons">
                <button class="addCart" data-id=${idProduct}>Add to Cart
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
                <button><a href="./checkout.html">Checkout</a></button>
            </div>
            <div class="description">
                ${info.description}
            </div>
        </div>        
    `
}

const listProducts = () => {
    //Similar Products
    let idProduct = new URLSearchParams(window.location.search).get('id');
    let similarProduct = document.querySelector('.similarProduct')
    products.filter((value) => value.id != idProduct).forEach((product,key)=>{
        // console.log(product);
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <a href="./detail.html?id=${product.id}">
            <img src="${product.image}" alt="">
            </a>
            <h2 class="title">${product.name}</h2>
            <div class="price">Rs.${product.price}</div>
            <div class = "btn">
            <button class="addCart" data-id="${product.id}">Add to Cart</button>
            </div>
           `
        similarProduct.appendChild(newItem);
    })
}