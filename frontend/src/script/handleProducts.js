let productCart = [];
let productList = document.getElementById("productList");

export const printProducts = (products) => {
    productList.innerHTML = products.map(product => {
        // placeholder img hardcoded, an improvment would be to make a property key with an img path on the product :)
        return /*html*/`
        <div id ="${product._id}">
            <ul>
                <li>${product.name}</li>
                <li><img src="./public/placeholder.jpg"></li> 
                <li>${product.description}</li>
                <li>Price: ${product.price} kr</li>
                <li>Quantity in stock: ${product.lager}</li>
                <button id="${product.name}-btn" data-product-id="${product._id}">Add to cart!</button> 
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
            let productId = button.dataset.productId;
            console.log(productId); 
        } else {
            alert("You must be logged in to add to cart!");
        }
    }))
}
