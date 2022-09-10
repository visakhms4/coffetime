const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  deliveryDetails: mongoose.Schema.Types.ObjectId,
  products: Array,
  totalAmount: Number,
  status: String,
  date: Date,
});

module.exports = mongoose.model("order_model", orderSchema, "orders");
