// import { saveUserId } from './script.js';
let loginForm = document.getElementById("loginForm");
const greeting = document.getElementById("userGreeting");
let publishedBaseUrl = "http://localhost:3000/api/"

export const generateUsers = () => {
    const userList = document.getElementById("userList");
    try {
        fetch(`${publishedBaseUrl}users`)
        .then(response => response.json())
        .then(users => {
            console.log(users);
            userList.innerHTML = users.map(user => {
                return /*html */`
                <ul id="${user.name}-container">
                    <li>Username : ${user.name}</li>
                    <li>email : ${user.email}</li>
                </ul>
            
            `
            }).join('');
        });   
    } catch(err){
        greeting.innerText = err;
    }
};

export const generateLogoutForm = () => {
    loginForm.innerHTML= /*html*/`
        <h2>You are now logged in</h2>
        <button id="logoutUserBtn">Logout</button>
    `
    let logoutUserBtn = document.getElementById("logoutUserBtn");
    logoutUserBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        localStorage.removeItem("userid");
        greeting.innerText = "You have been logged out."
        if(localStorage.getItem("productCart")){
            localStorage.removeItem("productCart"); //empty cart on logout
        }
        generateLoginForm();
    });
}

export const generateLoginForm = () => {
    loginForm.innerHTML= /*html*/`
    <p>New user? Create an account!</p>
    
    <input type="text" id="newUserName" placeholder="username"/>
    <input type="email" id="newEmail" placeholder="email"/>
    <input type="password" id="newPassword" placeholder="password"/>
    <button id="saveUserBtn">Create user</button>

    <p>Or login here:</p>
    <input type="text" id="loginEmail" placeholder="email" />
    <input type="password" id="loginPassword" placeholder="password" />
    <button id="loginUserBtn">Login</button>
    `;
    
    saveUserBtn.addEventListener("click", async () => {  
        let newUserName = document.getElementById("newUserName");
        let newEmail = document.getElementById("newEmail");
        let newPassword = document.getElementById("newPassword");

        let newUser = {
            name: newUserName.value,
            email: newEmail.value,
            password: newPassword.value
        }

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
        }
        catch(err) {
            greeting.innerText = err;
        }
    });

    loginUserBtn.addEventListener("click", async () => {
        let loginEmail = document.getElementById("loginEmail");
        let loginPassword = document.getElementById("loginPassword");

        let loginUser = {
            email: loginEmail.value,
            password: loginPassword.value
        }
        const response = await fetch(`${publishedBaseUrl}users/login`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUser)
        });
    
        const data = await response.json();
 
        if (data.name) {
            //console.log(data);
            greeting.innerText = "";
            greeting.innerHTML += /*html*/` 
                <p>You are logged in as ${data.name}<p>
            `;
            localStorage.setItem("username", data.name); // Sets the username in local storage
            localStorage.setItem("userid", data._id); 
            generateLogoutForm(); 
        } 
        else {
            greeting.innerText = "failed to login, please check your username or password and try again";
        }
        loginEmail.value = "";
        loginPassword.value = "";
    });
}