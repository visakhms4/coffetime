const order_models = require("../../model/order_models");
const user_model = require("../../model/user_model");

module.exports = {
    get_Allorders : function(req,res,next) {
        {
            return new Promise((resolve, reject) => {
              order_models
                .aggregate([
                  {
                    $lookup: {
                      from: "users"  ,
                      localField: "userId",
                      foreignField:"_id" ,
                      as: "order",
                    },
                  },
                  {
                    $unwind: "$order",
                  },
                ]) 
                .then((data) => {
                  console.log(data);
                  resolve(data);
                });
            });
          }
    }
}