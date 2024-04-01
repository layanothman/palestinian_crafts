const express=require('express')
const mydb=require('./Config/DB.JS')
const app=express();
const rout=require("./Routes/route.js")
// const suppliesRouter = require('./Routes/suppliesRouter');

const bodyparser=require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(rout)

app.use('/supplies', rout
);


app.listen(3000,()=>{
    console.log('server is running');

})
