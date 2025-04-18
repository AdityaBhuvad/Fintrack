const express = require("express");
const { body } = require("express-validator");
const CategoryController = require("../controllers/category.controller")


const router = express.Router();
// { username, categoryName, subCategories }

router.post(
    '/create',
    [
        body("username").isLength({min:6}).withMessage("Username is required"),
        body("categoryName").isLength({min:2}).withMessage("Category name is required"),
    ],
    CategoryController.createCategory
)


router.get('/fetch/:username',CategoryController.fetchCategory)

router.put(
    '/add-subcategory',
    [
        body("username").isLength({min:6}).withMessage("Username is invalid"),
        body("categoryName").isLength({min:2}).withMessage("Category name is invalid"),
        body("subCategory").isLength({min:2}).withMessage("Subcategory name is invalid"),
    ],
    CategoryController.addSubCategoryInArr
)
router.delete('/delete/:id',CategoryController.deleteCategory)

module.exports = router;
