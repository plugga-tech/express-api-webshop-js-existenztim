const greeting = document.getElementById("userGreeting");
const cartIcon = document.querySelector("#cart span");
let publishedBaseUrl = "http://localhost:3000/api/";

export const sendOrder = async () => {
    const cartToSend = JSON.parse(localStorage.getItem("productCart"));
    const userId = parseInt(localStorage.getItem("userid"));

    let userOrder = {
        user: userId, 
        products: cartToSend
      }

    if(localStorage.getItem("username")){
        try {
            const response = await fetch(`${publishedBaseUrl}users/add`,{
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
            }
        } catch(err) {
            greeting.innerText = err;
        }
    } else {
        alert("You must be logged in to send an order!")
    }
}