const db =require('../Config/DB')

class CourseModel{

    static async getAllCourse(){
        return new Promise(resolve=>{
            console.log("tt")
            db.query("SELECT course_id, uid, course_name, course_description, craft, price, material_type from course",[],(error , result)=>{

                if(!error)
                resolve(result)
            else resolve(error)

            })

        })
    }

    static async addCourse(uid,name,description,craft,price,material_url,material_type){

        return new Promise(resolve => {
            db.query("insert into course(uid, course_name, course_description,craft,price,material_url,material_type) values (?,?,?,?,?,?,?) ",[uid,name,description,craft,price,material_url,material_type],(e,r)=> {
                if (!e) {
                    resolve(true);
                } else {
                
                    resolve(false);
                }
            });
        });
        

    }

    static async updateCourse(uid,name,description,craft,price,material_url,material_type,id){

        return new Promise(resolve => {
            db.query("update course set  uid=?,course_name=?, course_description=?, craft=?, price=?, material_url=?,material_type=? where course_id=? ",[uid,name,description,craft,price,material_url,material_type,id],(error,result)=> {
                if(!error)
                resolve(result)

         })

       })
    
   }

   static async deleteCourse(id){
    
    
    return new Promise(resolve => {
        db.query("delete from course where course_id=?",[id],(error,result)=>{
            
            if(error)
            resolve(false)
            else
            resolve(true)

        })
    })

}

static async buyCourse(courseId, userId,email,address) {
    console.log("Df");
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM course WHERE course_id = ?";
        db.query(query, [courseId], (error, results) => {
            if (error) {
                console.error("Error checking course availability:", error);
                reject({ success: false, error: "Internal server error" });
            } else {
                if (results.length === 0) {
                    console.log("0");
                    resolve({ success: false, error: "Course not found" });
                } else {
                    console.log("11");
                    const course = results[0];
                    if (course.size > 0) {
                       
                        const updateQuery = "UPDATE course SET size = size - 1 WHERE course_id = ?";
                        db.query(updateQuery, [courseId], (updateError, updateResult) => {
                            if (updateError) {
                                console.error("Error updating course size:", updateError);
                                reject({ success: false, error: "Internal server error" });
                            } else {
                              
                                const order = {
                                    total_products: courseId,
                                    uid: userId,
                                    placed_on: new Date(),
                                    total_price:course.price,
                                    email:email,
                                    address:address
                                   
                                };
                                const insertOrderQuery = "INSERT INTO orders SET ?";
                                db.query(insertOrderQuery, order, (insertError, insertResult) => {
                                    if (insertError) {
                                        console.error("Error inserting order:", insertError);
                                        reject({ success: false, error: "Internal server error" });
                                    } else {
                                      
                                        resolve({ success: true, materialUrl: course.materialUrl });
                                    }
                                });
                            }
                        });
                    } else {
                      
                        resolve({ success: false, error: "Course is full" });
                    }
                }
            }
        });
    });
}


}

module.exports=CourseModel