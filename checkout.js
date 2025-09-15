import cart from "./cart.js";
import products from "./products.js";

let app = document.getElementById('app')
const loadTemplate = ()=>{
    fetch('./template.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;
            let cartTab = document.getElementById('cartTab')
            cartTab.innerHTML = null;
            let cartIcon = document.querySelector('.cart-icon')
            
            cart();  
            listCart();
        })
}
loadTemplate();

function listCart(){
    let cartList = document.querySelectorAll('.item')
    let checkOut = document.querySelector('.listCheckOut')
    // console.log(cartList,cartList.length);
    // for(let i of cartList)
    //     console.log(i);
    let total=0;
    cartList.forEach(item => {
        let button = item.querySelector('.quantity button');
        let prod_id = button.dataset.id
        console.log(prod_id)
        // document.addEventListener('click', (e) => {
        //     let btnClick = e.target;
        //     // console.log(btnClick)
        //     let id_product = btnClick.dataset.id;  
        // })
        
        let position = products.findIndex((value) => value.id == prod_id)
        console.log(position)
        let info = products[position];
        let newItem = document.createElement('div');
        let quantityVal = document.querySelector('.item .quantity span')
        let quantity = quantityVal.innerText;
        console.log(+quantity)
        newItem.classList.add('item');
        newItem.innerHTML = `
        <div class="image">
            <img src="${info.image}" alt="">
        </div>
        <div class="title">${info.name}</div>
        <div class="price">${info.price * +quantity}</div>
        <div class="quantity">
        
            <div class="quantity">Quantity:<span>${quantity}</span></div>
    
        </div>
        `
        checkOut.appendChild(newItem);
        let totalPrice = document.querySelector('.total')
        let selprice = document.querySelector('.item .price')
        let price = +selprice.innerText
        total = total + price;
        console.log(total,price)
        totalPrice.innerHTML = `Total: ${total}`
    })
    
}