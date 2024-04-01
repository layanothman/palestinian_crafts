const courseModel=require('../Models/Course');
const axios = require('axios');
const API_KEY = 'AIzaSyAjHzZ42AX1HLmiB9wZEeS_89Rwa6TS-V8';

class CourseController{
    

    static async getAllCourse(req,res){
        

        var courseList= await courseModel.getAllCourse();

        if (courseList)
        res.send(courseList);


    }


    static async addCourse(req, res) {
        console.log("ddd")
    
        var uid=req.body.uid;
        var name=req.body.course_name;
        var description=req.body.course_description;
        var craft=req.body.craft;
        var price=req.body.price;
        var material_url=req.body.material_url;
        var material_type=req.body.material_type;




        var x=await courseModel.addCourse(uid,name,description,craft,price,material_url,material_type);
    
        if(x==true)
        res.send("Add course Successfully")
        else
        res.send("Failed to add a course")


   }

   static async updateCourse(req, res){
   
    var id=req.body.course_id;
    var uid=req.body.uid;
    var name=req.body.course_name;
    var description=req.body.course_description;
    var craft=req.body.craft;
    var price=req.body.price;
    var material_url=req.body.material_url;
    var material_type=req.body.material_type;
    
    

    var x=await courseModel.updateCourse(uid,name,description,craft,price,material_url,material_type,id);      
    if(x)
    res.send("Successfully Updated course")
    else{
        res.send("Failed to Update course information")

    }

}



static async deleteCourse(req, res) {
        

    const id=req.body.course_id;
    
    if(id)
    {
        var result=await courseModel.deleteCourse(id);
        if(result)
        res.send("Successfully deleted course")
        else{
            res.send("Failed to delete course")

        }
    }



 }

 
 static async buyCourse(req, res) {
    console.log("Df");

    try {
        
        const { course_id, uid,email,address } = req.body;

        // Call the model function to check course availability and make the purchase
        const purchaseResult = await courseModel.buyCourse(course_id, uid,email,address);
        console.log(purchaseResult);

        if (purchaseResult.success) {
            res.json({ success: true, message: "Course purchased successfully", materialUrl: purchaseResult.materialUrl });
        } else {
            res.status(400).json({ success: false, error: purchaseResult.error });
        }
    } catch (error) {
        console.error("Error buying course:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}
static async getVideoDetails(req, res) {
   

    try {
        const { videoId } = req.params;
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching video details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


}

static async searchVideo(req, res) {
    console.log("uuu")
    try {
        const { keywords } = req.params;
        const API_KEY = 'AIzaSyAjHzZ42AX1HLmiB9wZEeS_89Rwa6TS-V8';
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${keywords}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error searching videos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}








}

module.exports=CourseController