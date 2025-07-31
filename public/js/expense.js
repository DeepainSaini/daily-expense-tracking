const form = document.querySelector('form');
const token = localStorage.getItem('token');
let currentPage = 1;
let expenseLimit = parseInt(localStorage.getItem('expenseLimit')) || 10;

function checkPremiumStatus(){
    
    axios.get('http://localhost:3000'+"/premiumStatus",{headers : {'Authorization' : token}}).then((result)=>{
        
    
        if(result.data.isPremium){
            document.getElementById('premiumHeading').style.display = 'block';
            document.getElementById('leaderboard').style.display = 'block';
            document.getElementById('download-btn').style.display = 'block';
            
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

function loadExpenses(page = 1) {
    
    const list = document.querySelector('.list');
    list.innerHTML = '';

    axios.get('http://localhost:3000'+`/expense/data?page=${page}&limit=${expenseLimit}`,{headers : {'Authorization' : token}}).then((result)=>{
        
        console.log("Expenses from backend:", result.data.expenses);
        result.data.expenses.forEach(expense => {
            displayUserOnScreen(expense);
        });

        showPagination(result.data);

    }).catch((err)=>{
        console.log(err);
    });
}

function initializePaginationSettings(){
    const expensesPerPageSelect = document.getElementById('expensesPerPage');

    expensesPerPageSelect.value = expenseLimit;

    expensesPerPageSelect.addEventListener('change',function(){
        const newLimit = parseInt(expensesPerPageSelect.value);
        expenseLimit = newLimit;
        currentPage = 1;

        localStorage.setItem('expenseLimit',newLimit);

        loadExpenses(currentPage);
    })
}

window.addEventListener('DOMContentLoaded',(event)=>{

    checkPremiumStatus();
    initializePaginationSettings();
    loadExpenses(1);

})

function showPagination(data) {

    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if(data.hasPreviousPage){
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.className = 'pagination-btn';
        prevBtn.addEventListener('click',()=>{
            currentPage--;
            loadExpenses(currentPage);
        });
        pagination.appendChild(prevBtn);
    }

    //page number
    for(let i=1;i<=data.totalPages;i++){
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = `pagination-btn ${i===currentPage ? 'active' : ''}`;
        pageBtn.addEventListener('click',()=>{
            currentPage = i;
            loadExpenses(currentPage);
        })
        pagination.appendChild(pageBtn);
    }

    //next button
    if(data.hasNextPage){
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.className = 'pagination-btn';
        nextBtn.addEventListener('click',()=>{
            currentPage++;
            loadExpenses(currentPage);
        });
        pagination.appendChild(nextBtn);
    }


}

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
        loadExpenses(currentPage);

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
                adjustPaginationAfterDelete();
        }).catch((err)=>{
            console.log(err);
        })
    })

   
}

function adjustPaginationAfterDelete(){
    const currentListItems = document.querySelectorAll('.expense-group-item');

    if(currentListItems.length === 1 && currentPage > 1){
        currentPage--;
    }

    loadExpenses(currentPage);
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

document.getElementById('download-btn').addEventListener('click',(event)=>{

    axios.get('http://localhost:3000'+"/expense/download",{headers : {'Authorization' : token}}).then((result)=>{
         
        if(result.status === 201){
            var a = document.createElement('a');
            a.href = result.data.fileUrl;
            a.download = 'expenses.csv';
            a.click();
        }
        else{
            throw new Error("result.data.message");
        }
    }).catch((err)=>{
        console.log(err);
    })
         
})
    

    

