import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Category.css";
import { ExpesesContext } from "../context/ExpesesProvider";

function Category({ setShow }) {
  const { user } = useContext(ExpesesContext);
  const { categories, getCategory } = useContext(ExpesesContext);

  const [category, setCategory] = useState({
    categoryName: "",
    subCategories: "",
  });

  const ChangeHandler = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };
  const postCategory = async () => {
    let CategoryNames = categories.map((category) => category.categoryName);
    console.log(CategoryNames);
    if (CategoryNames.includes(category.categoryName.trim())) {
      UpdateWithNewsubCategories();
    } else {
      // await axios.post("http://localhost:3000/category", {
      //   categoryName: category.categoryName,
      //   subCategories: category.subCategories,
      // });
      await axios.post("http://127.0.0.1:4000/category/create", {
        username: localStorage.getItem("user"),
        categoryName: category.categoryName,
        subCategories: [category.subCategories],
      });
      console.log("Category added successfully");
    }
  };
  const SubmitHandler = (event) => {
    event.preventDefault();
    console.log(`Category: ${category.categoryName}`);
    console.log(`Sub-Category: ${category.subCategories}`);
    postCategory().then(() => getCategory());
    setCategory({ categoryName: "", subCategories: "" });
  };
  const deleteCategory = async (id) => {
    const responce = await axios.delete(`http://127.0.0.1:4000/category/delete/${id}`);
    console.log("Category deleted successfully",responce);
    getCategory();
  };
  const UpdateWithNewsubCategories = async () => {
    let update = { ...category };
    let original = categories.find((category) => {
      return category.categoryName == update.categoryName;
    });
    // let newSubCategories = [...original.subCategories, update.subCategories];
    // original.subCategories = newSubCategories;
    // await axios.put(`http://localhost:3000/category/${original.id}`, original);
    await axios.put(`http://127.0.0.1:4000/category/add-subcategory`, {
      username: original.username,
      categoryName: update.categoryName,
      subCategory: update.subCategories,
    });
    console.log("Sub-Category updated successfully");
    getCategory();
  };
  return (
    <div className="category-container">
      <button className="close" onClick={() => setShow(false)}>
        {" "}
        ×{" "}
      </button>
      <div className="category-form">
        <h3>Create Category</h3>
        <form onSubmit={SubmitHandler}>
          <input
            type="text"
            value={category.categoryName}
            placeholder="Category Name"
            name="categoryName"
            onChange={ChangeHandler}
          />
          <input
            type="text"
            value={category.subCategories}
            placeholder="Sub-Category Name"
            name="subCategories"
            onChange={ChangeHandler}
          />
          <input type="submit" value="Add" />
        </form>
      </div>
      <hr />
      <div className="category-list">
        <h3>Category List</h3>
        <table>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!categories ? (
              <tr>
                <td>Hello</td>
              </tr>
            ) : (
              categories.map((category, index) => {
                return (
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td>{category.categoryName}</td>
                    <td>{category.subCategories.join(", ")}</td>
                    <td>
                      <button onClick={() => deleteCategory(category._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
