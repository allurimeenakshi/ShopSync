let exp = require("express");
const {Db} = require('mongodb')
const grocery = exp.Router();
const expressAsyncHandler = require('express-async-handler')


//add body parser middleware
grocery.use(exp.json());

grocery.get("/filtered",expressAsyncHandler(async(reqObj, resObj) => {

  const groceryCollection = reqObj.app.get('groceryCollection')

  console.log("object", groceryCollection);
  
  let prodList  = await groceryCollection.find().toArray()
  resObj.send({message : "products: ", payload : prodList})
}));


grocery.get("/all",expressAsyncHandler(async(reqObj, resObj) => {

  const groceryCollection = reqObj.app.get('groceryCollection')

  console.log("object", groceryCollection);
  
  let prodList  = await groceryCollection.find().toArray()
  resObj.send({message : "products: ", payload : prodList})
}));

  module.exports = grocery;