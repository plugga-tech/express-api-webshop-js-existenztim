// import {testLog} from './script/testModules.js';
// testLog();

let publishedBaseUrl = "http://localhost:3000/api/"
let productList = document.getElementById("productList");

const init = async () => {
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

const printProducts = (products) => {
    productList.innerHTML = products.map(product => {
        // placeholder img hardcoded, an improvment would be to make a property key with an img path on the product :)
        return /*html*/`
        <div id =${product.name}>
            <ul>
                <li>${product.name}</li>
                <li><img src="./public/placeholder.jpg"></li> 
                <li>${product.description}</li>
                <li>Price: ${product.price} kr</li>
                <li>Quantity in stock: ${product.lager}</li>
            </ul>
        </div>`
    })
}
