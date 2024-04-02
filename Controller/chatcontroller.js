const chatmodel=require("../Models/chatmodel")


class chatcontroller{


  static async getchat(req, res) {
    console.log("get all users whose location");
    var results = await chatmodel.getchat(req.query.location);
    if (results) {
        res.send(results);
       
    } else {
        res.status(500).send("Error fetching users");
    }
}

static async getchati(req, res) {
  console.log("get all users whose interest");
  var results = await chatmodel.getchati(req.query.interest);
  if (results) {
      res.send(results);
  } else {
      res.status(500).send("Error fetching users");
  }
}





    static async addchat(req,res)
    {
        console.log("add a new chat")
         var x=await chatmodel.addchat(req.body.uid1,req.body.uid2,req.body.msg,req.body.email)
         if(x==true)
           res.send("added successfully");
         else
         {
           res.send ("add failed") 
      
         } 

    }




}

module.exports= chatcontroller
