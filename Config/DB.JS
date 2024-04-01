const mysql=require('mysql')
const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'palestinian_crafts',
});
db.getConnection(()=>{
console.log('connected to db successfully');
})
//to export it to another folders
module.exports=db;