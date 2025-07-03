const form = document.querySelector('form');
const token = localStorage.getItem('token');

function checkPremiumStatus(){
    
    axios.get('http://localhost:3000'+"/premiumStatus",{headers : {'Authorization' : token}}).then((result)=>{
        
        console.log(result);
        if(result.data.isPremium){
            document.getElementById('premiumHeading').style.display = 'block';
            document.getElementById('leaderboard').style.display = 'block';
            
            // document.getElementById('leaderboard').addEventListener('click',(event)=>{

            //     axios.get('http://localhost:3000'+"/premium/showLeaderBoard").then((result)=>{

            //         console.log(result);
            //     }).catch((err)=>{
            //         console.error("Failed to fetch leaderboard", err);
            //     })
            // })

        } else {
           
            document.getElementById('payment-btn').style.display = 'block';
          }

    }).catch((err)=>{
        console.log(err);
    });
}

window.addEventListener('DOMContentLoaded',(event)=>{

    checkPremiumStatus();

    axios.get('http://localhost:3000'+"/expense/data",{headers : {'Authorization' : token}}).then((result)=>{

        result.data.forEach(expense => {
            displayUserOnScreen(expense);
        });
    }).catch((err)=>{
        console.log(err);
    });
})

form.addEventListener('submit',function(event){
   
    event.preventDefault();
    const expense = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const obj = {
        expense : expense,
        description : description,
        category : category
    };

    
    
    axios.post('http://localhost:3000'+"/expense",obj,{headers : {'Authorization' : token}}).then((result)=>{
        
        console.log(result.data.expnse);
        displayUserOnScreen(result.data.expnse);

    }).catch((err)=>{
            console.log(err);
    })

    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";

})

function displayUserOnScreen(expenseDetails){

    
    const list = document.querySelector('.list');

    const expenseItem = document.createElement('li');
    expenseItem.className = "expense-group-item";
    expenseItem.innerHTML = 'Rs.' + expenseDetails.expense + ' - ' + expenseDetails.description + ' - ' + expenseDetails.category;
    
    expenseItem.id = expenseDetails.id;

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('delete');
    deleteBtn.appendChild(deleteBtnTxt);
    deleteBtn.className = "delete-btn";
    expenseItem.appendChild(deleteBtn);

    list.appendChild(expenseItem);



    deleteBtn.addEventListener('click', (event)=>{

        const entryToDelete = event.target.parentElement.id;
        axios.delete('http://localhost:3000'+`/expense/${entryToDelete}`,{headers : {'Authorization' : token}}).then((result)=>{
                list.removeChild(event.target.parentElement);
        }).catch((err)=>{
            console.log(err);
        })
    })

   
}


document.getElementById('leaderboard').addEventListener('click',(event)=>{

    axios.get('http://localhost:3000'+"/premium/showLeaderBoard").then((result)=>{

        document.getElementById('leaderHeading').style.display = 'block';
        document.querySelector('.leaderboard-list').innerHTML = '';  //empties previous list because when you click leaderboard button again same list appends to previous list .

       
        result.data.forEach(leaderBoardData => {
            displayLeaderBoard(leaderBoardData);
        });

    }).catch((err)=>{
        console.error("Failed to fetch leaderboard", err);
    })
})
   

function displayLeaderBoard(userDetails) {
  
    const list = document.querySelector('.leaderboard-list');

    const user = document.createElement('li');
    user.className = "user-group-item";
    user.innerHTML = 'Name : ' + userDetails.name + '     Total Expense : ' + userDetails.totalExpense;

    list.appendChild(user);
}
    

    

