import { productCart } from "./handleProducts";
let publishedBaseUrl = "http://localhost:3000/api/";

export const sendOrder = async () => {
    let userOrder = {
        user: "64183668f0b5ed84e9747246", //behöver först fetcha user
        products: productCart
      }

    if(localStorage.getItem("username")){
        try {
            const response = await fetch(`${publishedBaseUrl}users/add`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
            });
    
            const data = await response.json();
            if (data.name) {
                greeting.innerText = "";
                greeting.innerHTML += /*html*/` 
                    <p>User ${data.name} was succesfully created!<p>
                `;
            }
        } catch(err) {
            greeting.innerText = err;
        }
    } else {
        alert("You must be logged in to send an order!")
    }
}