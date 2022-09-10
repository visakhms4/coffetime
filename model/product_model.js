const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
//    Product_id : Number,
   Product_name :{
     type: String,
    require:true
   } ,
   description :{
    type: String,
    require:true
   } ,
   Rating : {
    type: String,
    require:true
   } ,
   Category : {
    type: String,
    require:true
   } ,
   Price : {
    type: Number,
    require:true
   } ,
   Number_of_sales : {
    type: Number,
    require:true
   } ,
   isDelete : {
    type : Boolean
   }
})

module.exports = mongoose.model("product_models",userSchema,"products")