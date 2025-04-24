let exp = require("express");
const {Db} = require('mongodb')
const homeApp = exp.Router();
const expressAsyncHandler = require('express-async-handler')


//add body parser middleware
homeApp.use(exp.json());

homeApp.get("/all",expressAsyncHandler(async(reqObj, resObj) => {
console.log("request obj" , reqObj);
  const homeAppsCollection = reqObj.app.get('homeAppsCollection')

  
  let prodList  = await homeAppsCollection.find().toArray()


  resObj.send({message : "products: ", payload : prodList})
  }));

  module.exports = homeApp;