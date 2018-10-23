const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = Schema({
  owner: { type: String, required: true },

  product_name: { type: String, required: true },

  description: { type: String, required: true },

  price: { type: Schema.Types.Number, required: true },

  productImage: { type: String, required: true },

  creationDate: { type: Schema.Types.Date },

  phone_no: { type: Schema.Types.Number, required: true }
});

module.exports.createProduct = (newItem, callback) => {
  mongoose.Model.create(newItem, callback);
};

module.exports = mongoose.model("Store", ProductSchema);
