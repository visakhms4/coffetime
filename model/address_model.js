const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: String,
    required: true,
    min: 10,
    max: 10,
  },
  locality: String,
  city: String,
  address: String,
});

module.exports = mongoose.model("address_model", addressSchema, "address");
