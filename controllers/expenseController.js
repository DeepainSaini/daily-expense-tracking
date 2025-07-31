const db = require('../util/db-connection');
const bcrypt = require('bcrypt');
const Expenses = require('../models/expenses');
const Users = require('../models/users');
const sequelize = require('../util/db-connection');
const path = require('path');
const { off } = require('process');

const getExpensePage = (req,res) => {

    res.sendFile(path.join(__dirname,'../','views','expense.html'));
}

const addExpense = async (req,res) => {
    
    const t = await sequelize.transaction();
    try{
        const {expense,description,note,category} = req.body;
        const expnse = await Expenses.create({
            expense : expense,
            description : description,
            category : category,
            userId : req.user.id,
            note : note,
        },{transaction: t}) 
        console.log("EXPENSE",typeof(expense));
        const user = await Users.findByPk(req.user.id,{transaction: t});
        user.totalExpense += parseInt(expense);
        await user.save({transaction: t});
        await t.commit();
        res.status(200).json({message:'expense added',expnse});

    } catch(error){
        console.log(error);
        await t.rollback()
        res.status(500).json({message:'expense not added'});
    }
}

const getExpenseData = async (req,res) =>{

    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5
        const offset = (page-1)*limit;

        const {count,rows : expenses} = await Expenses.findAndCountAll({
            where : {userId : req.user.id},
            limit : limit,
            offset : offset,
            order  : [['createdAt','DESC']]
        });
        
        const totalPages = Math.ceil(count/limit);
        res.status(200).json({
            expenses : expenses,
            currentPage : page,
            totalPages : totalPages,
            totalExpenses : count,
            hasNextPage : page<totalPages,
            hasPreviousPage : page>1
        });

    } catch(error){
        console.log(error);
        res.status(500).json({message:'error while retrieving'});
    }

}

const deleteExpense = async (req,res) =>{
    
    const t = await sequelize.transaction();
    try{
        const {id} = req.params;
        const expense = await Expenses.findByPk(id,{transaction: t});
        const user = await Users.findByPk(req.user.id,{transaction: t});

        if(expense.userId === req.user.id && user.id === req.user.id){
            user.totalExpense -= expense.expense;
            await user.save({transaction: t});
            await expense.destroy({transaction: t});
        }

        
        if (expense === 0) {
            await t.rollback();
            return res.status(403).json({ message: 'Not authorized or expense not found' });
        }
        
        await t.commit();
        res.status(200).json({message:'entry deleted successfully'});

    } catch(error){
        console.log(error);
        await t.rollback();
        res.status(500).json({message:'entry deleting failed'});
    }
}

module.exports = {
   
    getExpensePage,
    addExpense,
    getExpenseData,
    deleteExpense
}