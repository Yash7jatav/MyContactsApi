const { Sequelize } = require("sequelize");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, process.env.DB_FILE),
  logging: process.env.NODE_ENV !== "test",
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(
      `Database connection established successfully :- ${process.env.DB_FILE}`
    );
  } catch (error) {
    console.error({ message: "Unable to connect with database", error });
  }
}

module.exports = { sequelize, connectDB };
