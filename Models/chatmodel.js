const db=require("../Config/DB.JS")



class chatModel
{   
    
    
    static async getchat(location) {
        return new Promise(resolve => {
            console.log("getting users from db");
            db.query("SELECT username,uid,email FROM user WHERE location = ?", [location], (error, result) => {
                console.log("naah");
                if (!error) {
                    resolve(result);
                    console.log("hello there");
                } else {
                    console.log(error);
                    resolve(null);
                }
            });
        });
    }

    static async getchati(interest) {
        return new Promise(resolve => {
            console.log("getting users from db");
            db.query("SELECT username,uid,email FROM user WHERE interest = ?", [interest], (error, result) => {

                if (!error) {
                    resolve(result);
                } else {
                    console.log(error);
                    resolve(null);
                }
            });
        });
    }
    

static async addchat(userid,user2id,msgg,e )
{
return new Promise(resolve=>{
    db.query("insert into message(uid1,uid2,msg,email)values (?,?,?)",[userid,user2id,msgg,e],(e,r)=>{
if (!e)
resolve(true)
else
resolve(false)

    })
     
})
}



}

module.exports= chatModel