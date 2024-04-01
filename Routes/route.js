const express = require('express')
const productController=require('../Controller/ProductController')
const ProjectController=require('../Controller/ProjectController')
const CourseController=require('../Controller/CourseController')
const router = require('express').Router();



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