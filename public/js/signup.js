
function handleFormSubmit(event){

    event.preventDefault();
    const obj = {
        name : event.target.name.value,
        email : event.target.email.value,
        password : event.target.password.value
    }
    
    const errorDiv = document.getElementById('errormsg');

    axios.post('http://localhost:3000'+"/signup",obj).then((result)=>{
        console.log(result.data.user);
        event.target.name.value = "";
        event.target.email.value = "";
        event.target.password.value = "";

    }).catch((err)=>{
        
        if(err.response.data.message === "email already exists"){
            errorDiv.textContent = "Email already exists.";
            setTimeout(() => {
                errorDiv.textContent = "";
            }, 3000);
        }
        else{
            errorDiv.textContent = "Something went wrong.";
        }
    });

 
}

