
const express=require('express')
const Resourcescontroller=require("../Controller/Resourcescontroller")
const chatcontroller=require("../Controller/chatcontroller")
const suppliesController = require('../Controller/suppliesController');

const route=require ('express').Router();



route.get("/allResources",Resourcescontroller.getallResources)
route.post("/addResources",Resourcescontroller.addnewResource)
route.delete("/deleteResource",Resourcescontroller.deleteresource)
route.post("/editResource",Resourcescontroller.updateresource)

route.get("/getchat", chatcontroller.getchat)  //get users by location to chat with
route.get("/getchati", chatcontroller.getchati)   //get users by intersts to chat with
route.post("/addchat", chatcontroller.addchat)
////////////////////////
route.get('/search', suppliesController.searchSupplies);






=======

const productController=require('../Controller/ProductController')
const ProjectController=require('../Controller/ProjectController')
const CourseController=require('../Controller/CourseController')




router.get("/product/filter",productController.filterProducts)

 router.get('/product/search', productController.search)
 router.get("/product",productController.getAllProduct)
 router.post("/addProduct",productController.addProduct)
 router.put("/updateProduct",productController.updateProduct)
 router.delete("/deleteProduct",productController.deleteProduct)
 router.post("/buyProduct", productController.buyProduct)






router.get("/project/filter",ProjectController.filterProject)
router.get('/project/search', ProjectController.searchProject)
router.get("/project",ProjectController.getAllProject)
router.post("/addProject",ProjectController.addProject)
router.put("/updateProject",ProjectController.updateProject)
router.delete("/deleteProject",ProjectController.deleteProject)


router.get("/course",CourseController.getAllCourse)
router.post("/addCourse",CourseController.addCourse)
router.put("/updateCourse",CourseController.updateCourse)
router.delete("/deleteCourse",CourseController.deleteCourse)
router.post("/buyCourse", CourseController.buyCourse)



router.get('/videos/:videoId', CourseController.getVideoDetails)
router.get('/searchVideos/:keywords', CourseController.searchVideo);




module.exports=router

