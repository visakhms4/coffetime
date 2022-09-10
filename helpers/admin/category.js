const { promise } = require("bcrypt/promises");
const { Types } = require("mongoose");
const category = require("../../controllers/admin/category");
const category_model = require("../../model/category_model");

module.exports = {
  addCategory: function (body) {
    console.log("in add category");
    console.log(body);
    return new Promise((resolve, reject) => {
      const { Name, description } = body;
      category_model
        .create({
          Category_name: Name,
          Category_description: description,
          isDelete: false,
        })
        .then((state) => {
          console.log("success category added");
          resolve(state);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  get_category: (id) => {
    return new Promise((resolve, reject) => {
      console.log(id);
      category_model
        .findOne({ _id: Types.ObjectId(id) })
        .then((showcategory) => {
          console.log(showcategory);
          resolve(showcategory);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  update_category : (id,body) => {
    const { Name,description } = body;
    return new Promise((resolve,reject) => {
        category_model.updateOne(
            { _id: Types.ObjectId(id)},
            {
                $set: {
                    Category_name : Name,
                    Category_description : description,
                },
            }
        ).then((result) => {
            resolve(result);
        })
    });
  },
};
