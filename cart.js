import products from "./products.js";
const cart = () =>{
    let iconCart = document.querySelector('.cart-icon');
    let closeBtn = document.querySelector('.cartTab .close');
    let body = document.querySelector('body')
    let cart = [];

    iconCart.addEventListener('click',()=>{
        body.classList.add('activeTab')
    })

    closeBtn.addEventListener('click', ()=>{
        body.classList.remove('activeTab')
    })  

    document.addEventListener('click',(event)=>{
        console.log(event.target);
        let buttonClick = event.target;
        let idProduct = buttonClick.dataset.id;
        let position = cart.findIndex((value) => 
            // console.log(value);//This had a huge problem in accessing the cart.
            value.product_id == idProduct
        )
        console.log(position,+idProduct)
        let quantity = position < 0 ? 0 : cart[position].quantity;
        // console.log(listCards[position].quantity)
        // console.log(quantity);

        if(buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')){
            Number(quantity++);
            console.log(quantity)
            setProuctCart(idProduct,position,quantity);
        }
        else if(buttonClick.classList.contains('minus'))
        {
            Number(quantity--);
            console.log(quantity);
            setProuctCart(idProduct,position,quantity);
        }
    })

    function setProuctCart(idProduct,position,quantity){
        console.log(position)
        if(quantity > 0)
        {
            if(position < 0){
                cart.push({
                product_id: idProduct,
                quantity: quantity
                });
            }
            else
            {
                cart[position].quantity = quantity;
                console.log(cart[position].quantity); //This statement is not appearing in console window
            }
            // console.log(listCards[position].quantity);
            // console.log(quantity);
            // let id = Number(idProduct)
            // console.log(id);
            // listCards[id-1] = JSON.parse(JSON.stringify(products[id-1]));
            // listCards[id-1].product_id = products[id-1].id;
            // listCards[id-1].quantity = quantity;
            // listCards[id-1].productPrice = +listCards[id-1].price;
            // console.log(listCards);
        }
        else{
            cart.splice(position,1);
        }

        localStorage.setItem('cart',JSON.stringify(cart));
        refreshCartHTML();
    }

    function refreshCartHTML(){
        let listCart = document.querySelector('.list-cart');
        let totalCnt = document.querySelector('.cart-icon span');
        let checkOut = document.querySelector('.listCheckOut')

        let total = 0;
        listCart.innerHTML = null;

        cart.forEach(product =>{
            total += product.quantity;
            let position = products.findIndex((value) => 
                // console.log(value.id, product.id);This statement appears error
                value.id == product.product_id
                )
            let info = products[position];
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = `
            <div class="image">
            <img src="${info.image}" alt="">
            </div>
            <div class="title">${info.name}</div>
            <div class="price">${info.price * product.quantity}</div>
            <div class="quantity">
                <button class="minus" data-id=${info.id}>-</button>
                <span>${product.quantity}</span>
                <button class="plus" data-id=${info.id}>+</button>
            </div>`
            listCart.appendChild(newItem);
            // checkOut.appendChild(newItem)
            // console.log(cart)
        })
        totalCnt.innerHTML = `${total}`;
    }

    // function changeQuantity(key,quantity){
        
    //     if(quantity == 0)
    //         delete listCards[key];
    //     else
    //     {
    //         listCards[key].quantity = quantity;
    //         listCards[key].price = quantity * listCards[key].productPrice;
    //         totalCnt.innerHTML = listCards[key].price;
    //     }
    // }
    const initApp = () => {
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        refreshCartHTML();
    }
    initApp();
}
export default cart;
