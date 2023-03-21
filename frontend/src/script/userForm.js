let loginForm = document.getElementById("loginForm");
const greeting = document.getElementById("userGreeting");
let publishedBaseUrl = "http://localhost:3000/api/"

export const generateLogoutForm = () =>{
    localStorage.removeItem("username");
    loginForm.innerHTML= /*html*/`
        <h2>You are now logged in</h2>
        <button id="logoutUserBtn">Logout</button>
    `
    logoutUserBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        greeting.innerText = "You have been logged out."
        generateLoginForm();
    });
}

export const generateLoginForm = () =>{
    loginForm.innerHTML= /*html*/`
    <p>New user? Create an account!</p>
    
    <input type="text" id="newUser" placeholder="username"/>
    <input type="password" id="newUserPassword" placeholder="password"/>
    <button id="saveUserBtn">Create user</button>

    <p>Or login here:</p>
    <input type="text" id="loginEmail" placeholder="email" />
    <input type="password" id="loginPassword" placeholder="password" />
    <button id="loginUserBtn">Login</button>
    `;
    
    saveUserBtn.addEventListener("click", () => {
        alert("User has been created");
    });

    loginUserBtn.addEventListener("click", async () => {
        let loginEmail = document.getElementById("loginEmail");
        let loginPassword = document.getElementById("loginPassword");
        
        let loginUser = {
            email: loginEmail.value,
            password: loginPassword.value
        }
        console.log(loginUser);
        const response = await fetch(`${publishedBaseUrl}users/login`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUser)
        });
    
        const data = await response.json();
        console.log(data)
        if (data.name) {
            greeting.innerText = "";
            greeting.innerHTML += /*html*/` 
                <p>You are logged in as ${data.name}<p>
            `;
            localStorage.setItem("username", data.name);
            generateLogoutForm(); 
        } 
        else {
            greeting.innerText = "failed to login, please check your username or password and try again";
        }
        loginEmail.value = "";
        loginPassword.value = "";
    });
}