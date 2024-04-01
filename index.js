const express = require ('express')
const mydb=require('./Config/DB')
const app = express();
const rout=require('./Routes/route')
app.use(express.json());
app.use(rout);
app.listen(3004,()=>{
console.log('server is runningss');

}
)
