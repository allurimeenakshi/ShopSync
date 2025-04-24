let exp = require("express");
const {Db} = require('mongodb')
const sports = exp.Router();
const expressAsyncHandler = require('express-async-handler')


//add body parser middleware
sports.use(exp.json());

sports.get("/all",expressAsyncHandler(async(reqObj, resObj) => {

  const sportsCollection = reqObj.app.get('sportsCollection')

  console.log("object", sportsCollection);
  
  let prodList  = await sportsCollection.find().toArray()
  resObj.send({message : "products: ", payload : prodList})
}));

  module.exports = sports;