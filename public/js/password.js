
document.getElementById('forgotForm').addEventListener('submit',(event)=>{
    
    const email = event.target.forgotEmail.value;
    axios.post('http://localhost:3000'+"/called/password/forgotpassword",{email}).then((res)=>{

        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })

})