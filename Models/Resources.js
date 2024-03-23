const db=require("/config/DB")
class resourceModel {
       




    static async getResources(){
        try {
          const result = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM resource", [], (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          });
          return result;
        } catch (error) {
          throw new Error(error.message);
        }

      } 

static async getmyResource(topic){
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM `resources` WHERE `topic`=?", [topic], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }

} 

static async addResource(research_id,user_id, topic,links,desc){
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT `type` FROM `user` WHERE `user_id`=?", [user_id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    if (result && result.length > 0 && result[0].type === 1) {
      return new Promise((resolve) => {
        db.query("INSERT INTO `resources`(`research_id`, `user_id`, `topic`, `links`, `description`) VALUES (?,?,?,?,?)",
          [research_id, user_id, topic, links, desc], (error, result) => {
            if (!error) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
      });
    } else {
      console.log("You can't add resource."); // Log the message if the user isn't authorized
      return false; // Indicate the failure to add resource due to unauthorized user
    }
  } catch (error) {
    console.error("Error:", error);
    return false; // Return false to indicate an error occurred
  }
}

}
module.exports=Resources