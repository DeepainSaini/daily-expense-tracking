const express  = require('express');
const db = require('./util/db-connection.js');
const app  = express();

const userRoute = require('./routes/userRoutes.js');
const expenseRoute = require('./routes/expenseRoutes.js');
const paymentRoute = require('./routes/paymentRoutes.js');
const premiumRoute = require('./routes/premiumRoutes.js');
const passwordRoute = require('./routes/passwordRoutes.js');
require('./models');
// const userModel = require('./models/users.js');
// const expenseModel = require('./models/expenses.js');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/',userRoute);
app.use('/',expenseRoute);
app.use('/',paymentRoute);
app.use('/premium',premiumRoute);
app.use('/called',passwordRoute);

db.sync({force:false}).then(()=>{
    app.listen(3000,(err)=>{
        console.log('server is running');
    });
}).catch((err)=>{
    console.log(err);
});
