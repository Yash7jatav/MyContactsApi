const express = require("express");
const cors = require("cors");
const { connectDB } = require("./database/init");
const homeRouter = require("./routes/home.route");
const contactRouter = require("./routes/contact.route");
const userRouter = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(cors());

//Database connection.
connectDB();

//Home page.
app.use("/", homeRouter);

//Contacts API Routes.
app.use("/api/contacts", contactRouter);

//User API Routes.
app.use("/api/users", userRouter);

module.exports = app;
