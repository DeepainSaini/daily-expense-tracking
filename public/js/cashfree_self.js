const cashfree = Cashfree({
    mode: "sandbox",
});

document.getElementById("payment-btn").addEventListener("click", async () => {
     
    try{

        //fetch payment session id from backend.
        const response = await axios.post('http://localhost:3000'+"/pay");

        const {paymentSessionId} = response.data;
        
        //initialize checkout options.
        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_self",
        };
        
        //start checkout process.
        await cashfree.checkout(checkoutOptions);
    
    } catch(error){
        console.log('Error:',error);
    }

});