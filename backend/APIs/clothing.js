let exp = require("express");
const {Db} = require('mongodb')
const clothing = exp.Router();
const expressAsyncHandler = require('express-async-handler')


//add body parser middleware
clothing.use(exp.json());

clothing.get("/all",expressAsyncHandler(async(reqObj, resObj) => {

  const clothingCollection = reqObj.app.get('clothingCollection')

  console.log("object", clothingCollection);
  
  let prodList  = await clothingCollection.find().toArray()

  console.log("yeah" , prodList);
  resObj.send({message : "products: ", payload : prodList})
}));

  module.exports = clothing;