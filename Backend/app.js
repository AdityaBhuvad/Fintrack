const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const dotenv = require("dotenv");
const connect_to_db = require("./database/db");
const UserRouter = require("./routes/user.routes");
const CategoryRouter = require("./routes/category.routes");
const ExpenseRouter = require("./routes/expense.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

dotenv.config();
connect_to_db();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/users", UserRouter);
app.use("/category", CategoryRouter);
app.use("/expense", ExpenseRouter);

app.get("/", (req, res) => {
  res.send("Hello, From Fintrack");
});

const port = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("Press CTRL + C to stop the server");
  console.log(chalk.blue(`http://127.0.0.1:${port}`));
});
