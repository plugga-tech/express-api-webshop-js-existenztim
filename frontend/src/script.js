import {generateLoginForm, generateLogoutForm} from './script/userForm.js';
import {printProducts} from './script/handleProducts.js';
let publishedBaseUrl = "http://localhost:3000/api/"

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

init();