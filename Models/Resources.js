const db=require('../Config/DB')
class resourceModel {
       



  static async getresource()
  {
      return new Promise(resolve =>
          {
              console.log("getting resource from db")
              db.query("select * from resource",[],(error,result)=>
              {
              if(!error) 
                  resolve(result)
              else 
                  console.log(error)
              })
          })
  }

// static async getmyResource(topic){
//   try {
//     const result = await new Promise((resolve, reject) => {
//       db.query("SELECT * FROM `resources` WHERE `topic`=?", [topic], (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//     return result;
//   } catch (error) {
//     throw new Error(error.message);
//   }

// } 


////// add resourse

// static async addResource(nresource_id,nresource_name, nresource_description,nprice,nquantity,nuid){
//     try {
//       const result = await new Promise((resolve, reject) => {
//         db.query("SELECT `type` FROM `user` WHERE `uid`=?", [nuid], (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         });
//       });
  
//       if (result && result.length > 0 && result[0].type === 1) {
//         return new Promise((resolve) => {
//           db.query("INSERT INTO `resource`('resource_id','resource_name', 'resource_description','price','quantity','uid') VALUES (?,?,?,?,?,?)",
//             [nresource_id,nresource_name,nresource_description,nprice,nquantity,nuid], (error, result) => {
//               if (!error) {
//                 resolve(true);
//               } else {
//                 resolve(false);
//               }
//             });
//         });
//       } else {
//         console.log("You can't add resource."); // Log the message if the user isn't authorized
//         return false; // Indicate the failure to add resource due to unauthorized user
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       return false; // Return false to indicate an error occurred
//     }
//   }

  static async addresource(lresource_id,lresource_name, lresource_description,lprice,lquantity,luid)
  {
  return new Promise(resolve=>{
      db.query("insert into resource(resource_id,resource_name,resource_description,price,quantity,uid) values (?,?,?,?,?,?)",[lresource_id,lresource_name,lresource_description,lprice,lquantity,luid],(e,r)=>{
  if (!e)
  resolve(true)
  else
  resolve(false)
  
      })
       
  })
  }






  static async deleteresource(resource_id)
  {
      return new Promise(resolve=>{
        db.query("delete from resource where resource_id=?",[resource_id],(error,result)=>
        {
          if (error)
          resolve(false)
          else
          resolve(true)
        })
  
      })
  }
  



  
  static async edit(resid,resname,resdes,resprice,resquan,userid)
{
    return new Promise(resolve=>{
        db.query("update resource set resource_name=?, resource_description=?,price=?,quantity=?,uid=? where resource_id=?",[resid,resname,resdes,resprice,resquan,userid],(error,result)=>
   { if(!error)
    resolve(true)
    else{
    resolve(false)
    console.log(error)}
   })
    })


}

}
module.exports=resourceModel