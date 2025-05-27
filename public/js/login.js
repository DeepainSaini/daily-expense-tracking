function handleLogin(event){

    event.preventDefault();
    
    const obj = {
       email : event.target.email.value,
       password : event.target.password.value
    }

    const errorDiv = document.getElementById('errormsg');
    
    
    axios.post('http://localhost:3000'+`/login`,obj).then((result)=>{
        console.log(result.data.user);
        alert("User Logged In Successfully");
        
        event.target.email.value = "";
        event.target.password.value = "";

        window.location.href = "/expense";
    }).catch((error)=>{
         if(error.response.data.message === "user not found"){
            errorDiv.textContent = "User Not Exist";
            setTimeout(() => {
                errorDiv.textContent = "";
            }, 3000);
         }
         else if(error.response.data.message === "Incorrect Password"){
            errorDiv.textContent = "Incorrect Password";
            setTimeout(() => {
                errorDiv.textContent = "";
            }, 3000);
         }
         else{
            console.log(error);
            errorDiv.textContent = "Something went wrong.";
         }
    });

}