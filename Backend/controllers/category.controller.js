const CategoryModel = require("../model/category.model");
const { validationResult } = require("express-validator");

// const CategorySchema = mongoose.Schema({
//   username: { type: String, required: true },
//   categoryName: { type: String, required: true },

//   subCategories: {
//     type: Array,
//     required: true,
//     default: [],
//   }
// });

module.exports.createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, categoryName, subCategories } = req.body;

    const category = await CategoryModel.create({
      username,
      categoryName,
      subCategories,
    });

    res.status(200).json({
      message: "Category Created successfully",
      category,
    });
  } catch (err) {
    console.error("Error in creating category:", err.message);
    res.status(500).json({ message: "Can't Created Category" });
  }
};

module.exports.fetchCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({
      username: req.params.username,
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error in fetching category:", err.message);
    res.status(500).json({ message: "Can't fetch Category" });
  }
};

module.exports.addSubCategoryInArr = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, categoryName, subCategory } = req.body;
    const category = await CategoryModel.findOneAndUpdate(
      { username, categoryName },
      { $push: { subCategories: subCategory } },
      { new: true }
    );
    res.status(200).json({
      message: "Subcategory added successfully",
      category,
    });
  } catch (err) {
    console.error("Error in adding subcategory:", err.message);
    res.status(500).json({ message: "Can't add subcategory" });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await CategoryModel.findOneAndDelete({
      _id: id,
    });
    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error("Error in deleting category:", err.message);
    res.status(500).json({ message: "Can't delete category" });
  }
};
