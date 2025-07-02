const cashfree = Cashfree({
    mode: "sandbox",
});

document.getElementById("payment-btn").addEventListener("click", async () => {
     
    try{
         const token = localStorage.getItem('token');
        //fetch payment session id from backend.
        const response = await axios.post('http://localhost:3000'+"/pay",{},{headers : {'Authorization' : token}});

        const {paymentSessionId} = response.data;
        
        //initialize checkout options.
        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_self",
        };
        
        //start checkout process.
        const result = await cashfree.checkout(checkoutOptions);
        console.log("Result",result);
    } catch(error){
        console.log('Error:',error);
    }

});