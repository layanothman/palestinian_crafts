const resourceModel=require("../Models/Resources")


class Resourcescontroller{


    static async getallResources(req,res)
    {
        console.log("gt all Resources")
        
        var results= await resourceModel.getresource();
        if (results)
            res.send(results)

    }


    // static async addnewResource(req,res)
    // {
    //     console.log("add a new Resource")
       
       
    //      var x=await resourceModel.addResource(req.body.resource_id, req.body.resource_name,  req.body.resource_description, req.body.price, req.body.quantity, req.body.uid)
    //      if(x==true)
    //        res.send("added successfully");
    //      else
    //      {
    //        res.send ("add failed") 
      
    //      } 

    // }


    
    // static async addnewResource(req,res){

  
    //   var resource_id= req.body.resource_id
    //   var resource_name =req.body.resource_name 
    //   var resource_description =req.body.resource_description
    //   var price = req.body.price
    //   var quantity= req.body.quantity
    //   var uid= req.body.uid

    //   var x=await resourceModel.addResource(resource_id,resource_name,resource_description,price,quantity,uid)
    //         if(x==true)  
    //         res.send("added succefully")
    //       else  res.send("add failed")
    //       if(results) {
    //        res.send(results)
    //        } 
    //   }


///run

      static async addnewResource(req,res)
      {
          console.log("add a new Resource")
         
      
           var x=await resourceModel.addresource(req.body.resource_id, req.body.resource_name,req.body.resource_description,req.body.price,req.body.quantity,req.body.uid)
           if(x==true)
             res.send("added successfully");
           else
           {
             res.send ("add failed") 
        
           } 
  
      }

    static async deleteresource(req,res)
    {
      const resid=req.body.resource_id;
     
      // const resname=req.body.resource_name;
      // const resdes= req.body.resource_description;
      // const resprice=  req.body.price;
      // const resquan=   req.body.quantity;
      // const userid=   req.body.uid;



      if(resid)
      {
        var result=await resourceModel.deleteresource(resid);
        if(result)
        res.send("delete done")
      else
      res.send("failed to delete user")
      }
    }

    static async updateresource(req,res)
    {
      console.log("edit resource");

      const resid=req.body.resource_id;
      const resname=req.body.resource_name;
      const resdes= req.body.resource_description;
      const resprice=  req.body.price;
      const resquan=   req.body.quantity;
      const userid=   req.body.uid;
      

    
     var x= await resourceModel.edit(resid,resname,resdes,resprice,resquan,userid)
     if(x)
     res.send("data edited successfully")
    else
    res.send("editing failed")
    }

}

module.exports=Resourcescontroller