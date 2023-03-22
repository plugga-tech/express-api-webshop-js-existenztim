import {generateLoginForm, generateLogoutForm} from './script/userForm.js';

let publishedBaseUrl = "http://localhost:3000/api/"
let productList = document.getElementById("productList");

const init = () => {
    
    if(localStorage.getItem("username")) {
        generateLogoutForm();
    } else {
        generateLoginForm();
    }
    fetchProducts();
}

const fetchProducts = async () => {
    const response = await fetch(`${publishedBaseUrl}products/`);
    try {
        const data = await response.json();
        // console.log(data);
        return printProducts(data);
    } catch (err) {
        return console.log(err);
    }
    // printUser();
}

const printProducts = (products) => {
    productList.innerHTML = products.map(product => {
        // placeholder img hardcoded, an improvment would be to make a property key with an img path on the product :)
        return /*html*/`
        <div id ="${product.name}-container">
            <ul>
                <li>${product.name}</li>
                <li><img src="./public/placeholder.jpg"></li> 
                <li>${product.description}</li>
                <li>Price: ${product.price} kr</li>
                <li>Quantity in stock: ${product.lager}</li>
                <button id="${product.name}-btn">Add to cart!</button>
            </ul>
        </div>`
    }).join(''); //since it's an array, removes the ","
    creatBtnsEventlistener();
}

const creatBtnsEventlistener = () => {
    let AddBtns = document.querySelectorAll('[id$="-btn"]');
    AddBtns.forEach(button => button.addEventListener("click", () => {
        if(localStorage.getItem("username")){
            alert("added to cart!"); //make it actually add to cart
        } else {
            alert("You must be logged in to add to cart!");
        }
    }))
}

init();