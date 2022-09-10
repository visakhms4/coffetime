const express = require("express");

const {
  getSignIn,
  getSignUp,
  userAuth,
  postSignIn,
  postSignUp,
  stopAuthenticate,
  getLogout,
  postVerifyOtp,
  verifyLogin,
} = require("../controllers/users/authentication");
const { getHome, getProductPage } = require("../controllers/users/main");
const {
  addToCart,
  getTotalAmount,
  getAllProducts,
  getCart,
  changeCartQuantity,
  removeFromCart,
} = require("../helpers/common");
const { addAddress, getCartProdutDetails, placeOrder } = require("../helpers/user/orders");
const router = express.Router();

// router.use((req, res, next) => {
//   res.setHeader("Cache-Control: no-cache, no-store, must-revalidate")
//   next();
// })
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

/* GET home page. */
router.get("/signin", stopAuthenticate, getSignIn);
router.post("/signin", stopAuthenticate, postSignIn);
router.get("/signup", stopAuthenticate, getSignUp);
router.post("/signup", stopAuthenticate, postSignUp);
router.post("/otpLogin", function (req, res, next) {
  res.cookie("phone", { phone: req.body.phone }, { maxAge: 5 * 60 * 1000 });
  client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: `+91${req.body.phone}`, channel: "sms" })
    .then((verification) => {
      console.log(verification.status);
      res.redirect("/verifyOtp");
    });
});
router.get("/otpLogin", function (req, res, next) {
  res.render("user/otp");
});
router.post("/verifyOtp", postVerifyOtp);
router.get("/verifyOtp", function (req, res, next) {
  res.render("user/verifyotp");
});

router.get("/", userAuth, getHome);
// router.get("/product/:id", getProductPage)
router.get("/logout", userAuth, getLogout);

router.get("/products", function (req, res, next) {
  console.log(req.user);
  getAllProducts().then((products) => {
    let user = req.token;
    console.log(user);
    res.render("user/products", {
      title: "Coffe Time",
      products: products,
      user: user,
    });
  });
});

router.get("/cart", function (req, res, next) {
  const id = req.session.user.userId;
  console.log(id);
  getCart(id).then((data) => {
    getTotalAmount(id).then((total) => {
      console.log(total);
      res.render("user/cart", { data: data, total: total });
    });
  });
});

router.get("/add-to-cart/:id", (req, res) => {
  console.log("started");
  console.log(req.params.id, req.session.user.userId);
  //let user = req.cookies.user ? req.cookies.user : null ;

  addToCart(req.params.id, req.session.user.userId).then(() => {
    res.redirect("/");
  });
});

router.get("/checkout", (req, res) => {
  getTotalAmount(req.session.user.userId).then((total) => {
    res.render("user/checkout", { total: total });
  });
});


router.post('/checkout', (req, res) => {
  console.log(req.body);
    let user = req.session.user
    addAddress(req.body).then((address) => {
      console.log(address);
      getCartProdutDetails(user.userId).then((products) => {
        getTotalAmount(user.userId).then((total) => { 
          const data = {
            userId: user.userId,
            addressId: address._id,
            paymentMethod: req.body.paymentMethod,
          };
          placeOrder(data, products, total).then(() => {
            res.json({ status: true });
          });
        });
      });
    });
})

router.post("/cart/changeQuantity", (req, res) => {
  const { cart, product, user, count } = req.body;
  changeCartQuantity(cart, product, count).then((data) => {
    getTotalAmount(user).then((total) => {
      data.total = total;
      console.log(data);
      res.status(200).json(data);
    });
  });
});
router.post("/cart/remove", (req, res) => {
  const { cart, product } = req.body;
  let user = req.cookies.user ? req.cookies.user : null;
  removeFromCart(cart, product).then((data) => {
    if (data) {
      res.redirect("/cart");
    } else {
      res.send("some error occured");
    }
  });



});
//profile

router.get("/profile", function (req, res, next) {
  console.log(req.session.user.userId);
  

  res.render("user/user_profile",{})
});
module.exports = router;
