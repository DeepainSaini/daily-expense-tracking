
function handleFormSubmit(event){

    event.preventDefult();
    const obj = {
        name : event.target.name.value,
        email : event.target.email.value,
        password : event.target.password.value
    }

    axios.post('http://localhost:3000'+"/",obj).then((result)=>{
        console.log(result.data);
    }).catch((err)=>{
        console.log(err);
    })
}