const { Types } = require("mongoose");
const user_model = require("../../model/user_model");

module.exports = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      user_model.find({isDelete : false }).then((users) => {
        resolve(users);
      });
    });
  },
  getUser : () => {
    return new Promise((resolve, reject) => {
      user_model.find({_id:Types.ObjectId(id) }).then((users) => {
        resolve(users);
        
      });
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      user_model.updateOne({ _id: Types.ObjectId(id) },{$set :{isDelete :true}}).then((done) => {
        if (done) {
          resolve(done);
        } else {
          console.log("some error happened");
        }
      });
    });
  },
  blockUnblock: (id) => {
    return new Promise((resolve, reject) => {
      user_model.findOne({ _id: Types.ObjectId(id) }).then((result) => {
        if (result.isAllowed) {
          user_model
            .updateOne(
              { _id: Types.ObjectId(id) },
              { $set: { isAllowed: false } }
            )
            .then((status) => {
              resolve(status);
            });
        } else {
          user_model
            .updateOne(
              { _id: Types.ObjectId(id) },
              { $set: { isAllowed: true } }
            )
            .then((status) => {
              resolve(status);
            });
        }
      });
    });
  },
};
