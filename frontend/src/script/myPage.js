
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

const generateUserDetails = (user) => {
    const userList = document.getElementById("userList");
    userList.innerHTML = /*html */`
        <h3>Your details below:<h3>
        <ul id=${user._id}>
            <li>username: ${user.name}</li>
            <li>email: ${user.email}</li>
        <ul>
        `
}