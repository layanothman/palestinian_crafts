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




module.exports=route


