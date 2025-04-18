// import React, { useContext, useState } from "react";
// import { ExpesesContext } from "../context/ExpesesProvider";
// import axios from "axios";

// function ExpenseForm() {
//   const { categories, getExpenses, updateBalance } = useContext(ExpesesContext);
//   // if (categories) {
//   //   console.log(categories);
//   // }
//   const [show, setShow] = useState(false);
//   const [expense, setExpense] = useState({
//     category: "",
//     amount: 0,
//     date: null,
//   });
//   const ChangeHandler = (event) => {
//     setExpense({ ...expense, [event.target.name]: event.target.value });
//   };
//   const submitHandler = (event) => {
//     event.preventDefault();
//     setShow(false);
//     console.log(expense);
//     postExpense(expense).then(() => {
//       updateBalance(Number(expense.amount))
//       getExpenses(); // refresh expenses after adding a new one
//       console.log("Expense added successfully");
//     });
//     setExpense({ category: "", amount: 0, date: null });
//   };
//   const postExpense = async (newExpense) => {
//     try {
//       await axios.post("http://localhost:3000/expenses", newExpense);
//     } catch (error) {
//       console.error("Error posting expense", error);
//     }
//   };
//   return (
//     <>
//       {!show ? (
//         <button onClick={() => setShow(true)}> + </button>
//       ) : (
//         <form className="expenses-form" onSubmit={submitHandler}>
//           <select name="category" id="" onChange={ChangeHandler}>
//             <option value="">Select Category</option>
//             {categories.map((category, index) => (
//               <optgroup key={index} label={category.name}>
//                 {category.subCategories.map((subCategories, index) => (
//                   <option key={index} value={category.name}>
//                     {subCategories}
//                   </option>
//                 ))}
//               </optgroup>
//             ))}
//           </select>
//           <input
//             type="text"
//             name="amount"
//             onChange={ChangeHandler}
//             placeholder="Amount"
//           />
//           <button
//             type="submit"
//             onClick={() =>
//               setExpense({
//                 ...expense,
//                 date: new Date().toUTCString().split(" "),
//               })
//             }
//           >
//             Add
//           </button>
//         </form>
//       )}
//     </>
//   );
// }

// export default ExpenseForm;
import React, { useContext, useState } from "react";
import { ExpesesContext } from "../context/ExpesesProvider";
import axios from "axios";

function ExpenseForm() {
  const { categories, getExpenses, updateBalance } = useContext(ExpesesContext);

  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expense, setExpense] = useState({
    category: "",
    subCategories: "",
    amount: 0,
    date: null,
  });

  const ChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      setSelectedCategory(value);
      setExpense({ ...expense, category: value, subCategories: "" }); // Reset subCategories when category changes
    } else {
      setExpense({ ...expense, [name]: value });
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setShow(false);

    // Adding date
    const newExpense = {
      ...expense,
      date: new Date().toUTCString().split(" "),
    };

    try {
      const username = localStorage.getItem("user");
      await axios.post("http://127.0.0.1:4000/expense/create", {username,...newExpense});
      updateBalance(Number(expense.amount));
      getExpenses(); // Refresh expenses after adding a new one
      console.log("Expense added successfully");
    } catch (error) {
      console.error("Error posting expense", error);
    }

    // Reset form
    setExpense({ category: "", subCategories: "", amount: 0, date: null });
  };

  return (
    <>
      {!show ? (
        <button onClick={() => setShow(true)}> + </button>
      ) : (
        <form className="expenses-form" onSubmit={submitHandler}>
          {/* Category Selection */}
          <select
            name="category"
            onChange={ChangeHandler}
            value={expense.category}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
          {/* Amount Input */}
          <input
            type="text"
            name="amount"
            onChange={ChangeHandler}
            placeholder="Amount"
          />

          {/* subCategories Selection */}
          <select
            name="subCategories"
            onChange={ChangeHandler}
            value={expense.subCategories}
            disabled={!selectedCategory}
          >
            <option value="">Select subCategories</option>
            {selectedCategory &&
              categories
                .find((cat) => cat.categoryName === selectedCategory)
                ?.subCategories.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
          </select>

          {/* Submit Button */}
          <button type="submit">Add</button>
        </form>
      )}
    </>
  );
}

export default ExpenseForm;
