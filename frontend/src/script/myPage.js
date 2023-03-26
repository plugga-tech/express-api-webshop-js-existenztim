
let publishedBaseUrl = "http://localhost:3000/api/";
export const fetchUserDetails = () => {
    if(localStorage.getItem("userid")){
        const userId = (localStorage.getItem("userid"));
    console.log(userId)
    let userDetails = {
        id: userId, 
      }
      console.log(userDetails);
    fetch(`${publishedBaseUrl}users`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userDetails)
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
    })
    .catch(err => {
    console.error(err);
    });
    } else {
        alert("You are not logged in!")
    }
    
}