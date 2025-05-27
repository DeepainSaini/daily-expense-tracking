const express  = require('express');
const db = require('./util/db-connection.js');
const app  = express();

const userRoute = require('./routes/userRoutes.js');



app.use(express.json());
app.use(express.static('public'));

app.use('/',userRoute);

db.sync({force:true}).then(()=>{
    app.listen(3000,(err)=>{
        console.log('server is running');
    });
}).catch((err)=>{
    console.log(err);
});
