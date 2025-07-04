const cashfree = Cashfree({
    mode: "sandbox",
});

document.getElementById("payment-btn").addEventListener("click", async () => {
     
    try{

        //fetch payment session id from backend.
        const response = await axios.post('http://localhost:3000'+"/pay");

        const {paymentSessionId,orderId} = response.data;
        localStorage.setItem("cf_order_id", orderId);

        
        //initialize checkout options.
        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_modal",
        };
        
        //start checkout process.
       const result = await cashfree.checkout(checkoutOptions);
       console.log(result);

        if(result.error){
            // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
            console.log("User has closed the popup or there is some payment error, Check for Payment Status");
            console.log(result.error);
        }
        if(result.redirect){
            // This will be true when the payment redirection page couldnt be opened in the same window
            // This is an exceptional case only when the page is opened inside an inAppBrowser
            // In this case the customer will be redirected to return url once payment is completed
            console.log("Payment will be redirected");
        }
        if(result.paymentDetails){
            // This will be called whenever the payment is completed irrespective of transaction status
            console.log("Payment has been completed, Check for Payment Status");
            console.log(result.paymentDetails.paymentMessage);
            const orderId = localStorage.getItem("cf_order_id");

            const response = await axios.get(`http://localhost:3000/payment-status/${orderId}`);
            console.log(response);
            const { orderStatus } = response.data;

            
            if(orderStatus==="failed" || orderStatus==="failure"){
                alert('payment failed');
            }else if(orderStatus==="success"){
                alert("payment success");
            }

          

        }
    
    } catch(error){
        console.log('Error:',error);
    }
    
});