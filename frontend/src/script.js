import {generateLoginForm, generateLogoutForm, generateUsers} from './script/userForm.js';
import {printProducts} from './script/handleProducts.js';
import { sendOrder } from './script/handleOrder.js';
import { fetchUserDetails } from './script/myPage.js';

const orderBtn = document.querySelector(".cart-container button");
orderBtn.addEventListener("click", sendOrder);

const myPageBtn = document.querySelector(".cart-container button:nth-of-type(2)");
myPageBtn.addEventListener("click", fetchUserDetails);

let publishedBaseUrl = "http://localhost:3000/api/"

export const init = () => {
    if(localStorage.getItem("username")) {
        generateLogoutForm();
    } else {
        generateLoginForm();
    }
    generateUsers();
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
}

init();