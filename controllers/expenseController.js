const db = require('../util/db-connection');
const bcrypt = require('bcrypt');
const Expenses = require('../models/expenses');
const path = require('path');

const getExpensePage = (req,res) => {

    res.sendFile(path.join(__dirname,'../','views','expense.html'));
}

const addExpense = async (req,res) => {
    
    try{
        const {expense,description,category} = req.body;
        const expnse = await Expenses.create({
            expense : expense,
            description : description,
            category : category
        }) 
        res.status(200).json({message:'expense added',expnse});
    } catch(error){
        console.log(error);
        res.status(500).json({message:'expense not added'});
    }
}

const getExpenseData = async (req,res) =>{

    try{
        const expense = await Expenses.findAll();
        res.status(200).json(expense);
    } catch(error){
        console.log(error);
        res.status(500).json({message:'error while retrieving'});
    }

}

const deleteExpense = async (req,res) =>{

    try{
        const {id} = req.params;
        const expense = await Expenses.destroy({
            where : {id : id}
        });
        
        res.status(200).json({message:'entry deleted successfully'});

    } catch(error){
        console.log(error);
        res.status(500).json({message:'entry deleting failed'});
    }
}

module.exports = {
   
    getExpensePage,
    addExpense,
    getExpenseData,
    deleteExpense
}