const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
  name: String,
  details: String,
  price: Number,
});

module.exports = mongoose.model("Dish", DishSchema);
