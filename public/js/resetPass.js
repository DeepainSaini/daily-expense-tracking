
document.getElementById('resetForm').addEventListener('submit',(event)=>{

    event.preventDefault();
    const newPassword = event.target.newPassword.value;
    const uuid = window.location.pathname.split('/').pop();
    console.log("UUID:", uuid);

    axios.post('http://localhost:3000'+`/called/reset-password/${uuid}`,{newPassword}).then((res)=>{
       
        event.target.newPassword.value = "";
        console.log(res.data);
       
    }).catch((err)=>{
       console.log(err);
    })
})