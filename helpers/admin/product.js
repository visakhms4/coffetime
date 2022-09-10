const { Types } = require("mongoose");
const product_model = require("../../model/product_model");

module.exports = {
  addProduct: function (body) {
    console.log("body");
    return new Promise((resolve, reject) => {
   
      const { name, description, rating, category, price } = body;
      product_model
        .create({
          Product_name: name,
          description: description,
          Rating: rating,
          Category: category,
          Price: Number(price),
          isDelete : false,
        })
        .then((state) => {
          console.log(state);
          resolve(state);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  updateProduct: (productId, body) => {
    const { name, description, rating, category, price } = body;
    return new Promise((resolve, reject) => {
      product_model.updateOne(
        { _id: Types.ObjectId(productId) },
        {
          $set: {
            Product_name: name,
            description: description,
            Rating: rating,
            Category: category,
            Price: Number(price),
          },
        }
      ).then((result) => {
        resolve(result);
      })
    });
  },
};
