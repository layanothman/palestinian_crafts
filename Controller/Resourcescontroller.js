const resourceModel=require("/Models/Resources")

class resourcesController{
    static async getallResources(req,res){

        var result=await resourceModel.getResources();
    
if(result) {
 res.send(result)
    }
   
    }
    
  static async getmyResource(req,res){
    var topic=req.body.topic
    

    var x=await resourceModel.getmyResource(topic)
    if(x) {
        res.send(x)
           }
    
}
    static async addResource(req,res){

var  research_id=req.body.research_id
var  userid=req.body.userid
var topic =req.body.topic
var links=req.body.links
var desc = req.body.desc

var x=await resourceModel.addResource(research_id,userid,topic,links,desc)
      if(x==true)  
      res.send("added succefully")
    else  res.send("add failed")
    if(results) {
     res.send(results)
     } 
}

}
module.exports=ResourcesController