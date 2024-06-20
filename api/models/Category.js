const mongoose = require("mongoose");

const CategorySchma = mongoose.Schema(
  {
    title: { type: String, require: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", CategorySchma);
module.exports = Category;