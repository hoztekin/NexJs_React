const mongoose = require("mongoose");

const BillSchma = mongoose.Schema(
  {
    customerName: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    paymentMode: { type: String, require: true },
    cardItems: { type: Array, require: true },
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
  },
  { timestamps: true }
);

const Bill = mongoose.model("bills", BillSchma);
module.exports = Bill;
