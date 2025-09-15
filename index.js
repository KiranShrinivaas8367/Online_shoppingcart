import cart from "./cart.js";
import script from "./script.js"
import products from "./products.js";

let app = document.getElementById('app')
let temporary = document.getElementById('temporary')    
let navBar = document.getElementById('navbar')
//load template file
const loadTemplate = ()=>{
    fetch('./template.html')
        .then(response => response.text())
        .then(html => {
            // console.log(html)
            app.innerHTML = html;
            let cartTab = document.getElementById('cartTab');
            cartTab.innerHTML = temporary.innerHTML;
            temporary.innerHTML = null;
            cart();
            initApp();
        })
}
loadTemplate();

const initApp = ()=>{
    //List the Products
    let productList = document.querySelector('.listProduct')
    products.forEach((product,key)=>{
        // console.log(product);
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <a href="./detail.html?id=${product.id}">
            <img src="${product.image}" alt="">
            </a>
            <h2 class="title">${product.name}</h2>
            <div class="price">Rs.${product.price}</div>
            <button class="addCart" data-id="${product.id}">Add to Cart</button>
           `
        productList.appendChild(newItem);
    })
}

const loadNav = ()=>{
    fetch('./index1.html')
        .then(response => response.text())
        .then(html =>{
            navBar.innerHTML = html;
            script();
        })
}
loadNav();