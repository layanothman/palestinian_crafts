const db =require('../Config/DB')
class ProjectModel{



    static async getAllProjects(){
        


        return new Promise(resolve=>{

            db.query("select * from project",[],(error , result)=>{

                if(!error)
                resolve(result)

            })


        })


    }




    static async addProject(id,name,image,description,materials,crafts,type,group_size,deadline,status,owner_id){

        return new Promise(resolve => {
            db.query("insert into project(pid, project_name,project_image, project_description,materials,crafts,type,group_size,deadline,status,owner_id) values (?,?,?,?,?,?,?,?,?,?,?) ",[id,name,image,description,materials,crafts,type,group_size,deadline,status,owner_id],(e,r)=> {
                if (!e) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
        

    }

    static async updateProject(id,name,image,description,materials,crafts,type,group_size,deadline,status,owner_id){

        return new Promise(resolve => {
            db.query("update project set  project_name=?,project_image=?, project_description=?,materials=? , crafts=?, type=?,group_size=?,deadline=?,status=?,owner_id=? where pid=? ",[name,image,description,materials,crafts,type,group_size,deadline,status,owner_id,id],(error,result)=> {
                if(!error)
                resolve(result)

         })

       })
    
   }

   static async deleteProject(id){
    

    return new Promise(resolve => {
        db.query("delete from project where pid=?",[id],(error,result)=>{
            if(error)
            resolve(false)
            else
            resolve(true)

        })
    })

}
static async filterProjects(filterConditions) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM project WHERE 1 = 1';
        const values = [];

        if (filterConditions.materials) {
            sql += ' AND materials = ?';
            values.push(filterConditions.materials);
        }
        if (filterConditions.crafts) {
            sql += ' AND crafts = ?';
            values.push(filterConditions.crafts);
        }
        if (filterConditions.status) {
            sql += ' AND status = ?';
            values.push(filterConditions.status);
        }
        if (filterConditions.group_size) {
            sql += ' AND group_size = ?';
            values.push(filterConditions.group_size);
        }
        if (filterConditions.type) {
            sql += ' AND type = ?';
            values.push(filterConditions.type);
        }

        db.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

static async searchByProjectName(projectName) {
       
    const sql = `SELECT * FROM project WHERE project_name LIKE '%${projectName}%'`;
    return await this.queryDatabase(sql);
}

static async searchByOwnerName(ownerName) {
    const sql = `SELECT * FROM project WHERE owner_id IN (SELECT uid FROM user WHERE username LIKE '%${ownerName}%')`;
    return await this.queryDatabase(sql);
}

static async queryDatabase(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


}
module.exports=ProjectModel