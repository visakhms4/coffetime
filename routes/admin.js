var express = require('express');
const { Types } = require('mongoose');
const { postLogin, getLogout, adminAuth } = require('../controllers/admin/authentication');
const { dispay_products, add_product, post_addProduct, delete_product, getEditProduct, postEditProduct } = require('../controllers/admin/products');
const { display_users, add_user, getBlockUser, getdeleteUser } = require('../controllers/admin/users');
const { getUsers } = require('../controllers/users/user');
const product_model = require('../model/product_model');
const catogery_model = require('../model/category_model');
const { add_category, post_add_category, get_delete_category, edit_category, post_edit_category } = require('../controllers/admin/category');
const { addCategory, get_category, update_category } = require('../helpers/admin/category');
const category_model = require('../model/category_model');
const order_models = require('../model/order_models');
const { getOrders } = require('../helpers/user/orders');
const { get_Allorders } = require('../controllers/admin/orders');
var router = express.Router();

//admin verification data
const id = "qwerty";
const pass = "qwerty";

//cache control
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


//route admin login
router.get('/',adminAuth, function(req, res, next) {
  res.render('./admin/admin_page',{admin:true})
  // if(req.session.admin) {
  //   console.log(req.session.admin);
    
  // }else{

  //   res.render('./admin/admin_login',{admin:true});
  //   console.log('started')
  // }
});


//validate admin

router.get('/login', (req, res) => {
  res.render('./admin/admin_login',{admin:true});
})

router.post('/login',postLogin);
router.get('/products',adminAuth,dispay_products);
router.get('/addProduct',adminAuth,add_product);
// router.get('/users',adminAuth,display_users);
router.get('/addUser',adminAuth,add_user);
router.post('/addProduct',adminAuth, post_addProduct);
router.get('/deleteProduct/:id',adminAuth,delete_product);
router.get("/editproduct/:id",adminAuth, getEditProduct);
router.post("/editProduct/:id",adminAuth, postEditProduct);
//router.get("/users",adminAuth, getAllUsers);
router.get("/blockUser/:id",adminAuth, getBlockUser);
router.get("/deleteUser/:id",adminAuth, getdeleteUser);
router.get("/category",adminAuth,add_category)

router.post("/category",adminAuth, post_add_category);
router.get("/deleteCategory/:id",adminAuth, get_delete_category);

router.get("/category/:id",edit_category);
router.post("/category/:id",post_edit_category)

router.get("/orders",function(req,res,next){
  
   
  //get_Allorders().then((orders) => {
    //res.render("admin/order_details",{orders : orders , admin : true})

 // })
})


//router.post('/addProduct',function(req,res,next){
  
//})


//logout

router.get('/logout',getLogout);

module.exports = router;
