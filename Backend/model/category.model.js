const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  username: { type: String, required: true },
  categoryName: { type: String, required: true },

  subCategories: {
    type: Array,
    required: true,
    default: [],
  }
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;