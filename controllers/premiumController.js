const db = require('../util/db-connection');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const Expenses = require('../models/expenses');
const path = require('path');
const jwt = require('jsonwebtoken');
const sequelize = require('../util/db-connection');
const { group } = require('console');

const getLeaderBoard = async (req,res) => {

    try{
        const leaderBoardData = await Users.findAll({                                                          

            attributes : [
                'name',
                [sequelize.fn('SUM',sequelize.col('expenses.expense')),'totalExpense']      
            ],

            include : [{
                model : Expenses,
                attributes : [] //don't include full expense rows.
            }],

            group : ['user.id'],
            order : [[sequelize.literal('totalExpense'),'DESC']]
        });

        res.status(200).json(leaderBoardData);
    } catch(error){
        console.error("Leaderboard error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
    
}

module.exports = {
    getLeaderBoard
}

//SELECT users.name, SUM(expenses.expense) AS totalExpense
//FROM users
//JOIN expenses ON expenses.userId = users.id
//GROUP BY users.id
//ORDER BY totalExpense DESC;
//we can also use sequelize.query to write actual sql.