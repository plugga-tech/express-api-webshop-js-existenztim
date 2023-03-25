let productCart = [];
let productList = document.getElementById("productList");
let publishedBaseUrl = "http://localhost:3000/api/"
const greeting = document.getElementById("userGreeting");
const cartIcon = document.querySelector("#cart span");

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
        const productId = button.dataset.productId;
        if(localStorage.getItem("username")){
            try {
                fetch(`${publishedBaseUrl}products/${productId}`)
                .then(response => response.json())
                .then(data => {
                    if (!data.hasOwnProperty('quantity')) {
                        data.quantity = 1;
                    }
                    
                    let productExists = false;
                    productCart.forEach(product => {
                        if(product._id === data._id) {
                            productExists = true;
                            product.quantity += 1;
                        }
                    });

                    if(!productExists) {
                        productCart.push(data);
                    }

                    cartIcon.innerHTML = parseInt(cartIcon.innerHTML) + 1;
                    localStorage.setItem('productCart', JSON.stringify(productCart));
                    
                    alert(`product no:${productId} added to cart!`); //lazy dev :) 
                });
            } catch(err){
                greeting.innerText = err;
            }

        } else {
            alert("You must be logged in to add to cart!");
        }
    }))
}
