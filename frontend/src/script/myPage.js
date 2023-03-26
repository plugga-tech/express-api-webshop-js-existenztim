
let publishedBaseUrl = "http://localhost:3000/api/";
export const fetchUserDetails = async () => {
    if(localStorage.getItem("userid")){
        const userId = (localStorage.getItem("userid"));
        let userDetails = {
            id: userId, 
        }
    try {
        const response = await fetch(`${publishedBaseUrl}users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
            })
        const data = await response.json()
        generateUserDetails(data)
    } catch (err) {
        console.error(err)
    }
    } else {
        alert("You are not logged in!")
    }
    
}

const generateUserDetails = async (user) => {
    const userList = document.getElementById("userList");
    userList.innerHTML = /*html */`
        <h3>Your details below:<h3>
        <ul id=${user._id}>
            <li>username: ${user.name}</li>
            <li>email: ${user.email}</li>
        <ul>
        `
        try {
            const response = await fetch(`${publishedBaseUrl}orders/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    { 
                        user: user._id,
                        token: "1234prod1234"
                    })
                })
            const data = await response.json()
            generateOrders(data)
        } catch (err) {
            console.error(err)
            userList.innerHTML = err;
        }
    }
    
    const generateOrders = (orders) => {
        console.log(orders)
        const userList = document.getElementById("userList");
        userList.innerHTML += /*html */`
            <h3>Your orders below:<h3>
            <ul>
                ${orders.map(order => {
                    return /*html */`
                    <br><br>
                    <ul>Order Id: ${order._id}
                    ${order.products.map(product => {
                        return /*html */`
                        <li>productId: ${product.productId}</li>
                        <li>quantity: ${product.quantity}</li> 
                        `
                    }).join('')}
                    </ul>`
                }).join('')}
            </ul>
            `
    }