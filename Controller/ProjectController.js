const projectModel=require('../Models/Project');

class ProjectController{

    
    static async getAllProject(req,res){
       
        var projectList= await projectModel.getAllProjects();

        if (projectList)
        res.send(projectList);


    }

    static async addProject(req, res) {
    
        var id=req.body.pid;
        var name=req.body.project_name;
        var image= req.body.project_image;
        var description=req.body.product_description;
        var materials=req.body.materials;
        var crafts=req.body.crafts;
        var type=req.body.type;
        var group_size=req.body.group_size;
        var deadline=req.body.deadline;
        var status=req.body.status;
        var owner_id=req.body.owner_id;



        var x=await projectModel.addProject(id,name,image,description,materials,crafts,type,group_size,deadline,status,owner_id);
    
        if(x==true)
        res.send("Add project Successfully")
        else
        res.send("Failed to add a project")


    }
    static async updateProject(req, res){
       
        var id=req.body.pid;
        var name=req.body.project_name;
        var image= req.body.project_image;
        var description=req.body.product_description;
        var materials=req.body.materials;
        var crafts=req.body.crafts;
        var type=req.body.type;
        var group_size=req.body.group_size;
        var deadline=req.body.deadline;
        var status=req.body.status;
        var owner_id=req.body.owner_id;
        
        

        var x=await projectModel.updateProject(id,name,image,description,materials,crafts,type,group_size,deadline,status,owner_id);        if(x)
        res.send("Successfully Updated project")
        else{
            res.send("Failed to Update project information")

        }

    }
  
   

    static async deleteProject(req, res) {
        

        const id=req.body.pid;
        
        if(id)
        {
            var result=await projectModel.deleteProject(id);
            if(result)
            res.send("Successfully deleted project")
            else{
                res.send("Failed to delete project")
    
            }
        }



     }

     static async filterProject(req, res) {
        try {
            const { materials, crafts, status, group_size ,type} = req.query;
            
            let filterConditions = {};
            
            if (materials) {
                filterConditions.materials = materials;
            }
            if (crafts) {
                filterConditions.crafts = crafts;
            }
            if (status) {
                filterConditions.status = status;
            }
            if (group_size) {
                filterConditions.group_size = group_size;
            }
            if (type) {
                filterConditions.type = type;
            }
    
            const filteredProjects = await projectModel.filterProjects(filterConditions);
    
            res.json({ success: true, results: filteredProjects });
        } catch (error) {
            console.error('Error filtering projects:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    
    static async searchProject(req, res) {
        try {
            const { searchType, searchTerm } = req.query;

            if (!searchType || !searchTerm) {
                return res.status(400).json({ success: false, message: 'Search type and search term are required' });
            }

            let searchResults;
            if (searchType === 'projectName') {
                searchResults = await projectModel.searchByProjectName(searchTerm);
            } else if (searchType === 'projectOwner') {
                searchResults = await projectModel.searchByOwnerName(searchTerm);
            } else {
                return res.status(400).json({ success: false, message: 'Invalid search type' });
            }

            res.json({ success: true, results: searchResults });
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

      



}
module.exports=ProjectController