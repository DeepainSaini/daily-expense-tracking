const form = document.querySelector('form');

window.addEventListener('DOMContentLoaded',(event)=>{

    axios.get('http://localhost:3000'+"/expense/data").then((result)=>{

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

   
    
    axios.post('http://localhost:3000'+"/expense",obj).then((result)=>{
        
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

    
    const list = document.querySelector('ul');

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
        axios.delete('http://localhost:3000'+`/expense/${entryToDelete}`).then((result)=>{
                list.removeChild(event.target.parentElement);
        }).catch((err)=>{
            console.log(err);
        })
    })

   
}



   

    

    

