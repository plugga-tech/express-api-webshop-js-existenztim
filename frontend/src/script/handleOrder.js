const greeting = document.getElementById("userGreeting");
const cartIcon = document.querySelector("#cart span");
let publishedBaseUrl = "http://localhost:3000/api/";

export const sendOrder = async () => {
    const cartToFilter = JSON.parse(localStorage.getItem("productCart"));
    console.log("ofilterad array: ",cartToFilter);
    const filteredCart = cartToFilter.map(product => ({ productId: product._id, quantity: product.quantity }))
    const userId = (localStorage.getItem("userid"));
    console.log(userId);
    console.log("filterad array: ",filteredCart)
    let userOrder = {
        user: userId, 
        products: filteredCart
      }
    console.log(userOrder)

    
if(localStorage.getItem("username") && filteredCart.length > 0){
        try {
            const response = await fetch(`${publishedBaseUrl}orders/add`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userOrder)
            });
    
            const data = await response.json();
            if (data._id) {
                greeting.innerText = "";
                greeting.innerHTML += /*html*/` 
                    <p>Order: ${data._id} was succesfully sent!<p>
                `;
                alert("We have recived your order.");
                cartIcon.innerHTML = 0;
                localStorage.removeItem("productCart");
            }
        } catch(err) {
            greeting.innerText = err;
        }
    } else if(filteredCart.length = 0){
        alert("You have no products in the cart")
    } else {
        alert("You must be logged in the send an order!")
    }
}