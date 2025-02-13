const { sequelize, connectDB } = require("../database/init");
const Contact = require("../models/contact.model");
const User = require("../routes/user.route");

async function seedData() {
  try {
    await connectDB();
    await sequelize.sync({ force: true });
    await Contact.bulkCreate([]);
    await User.bulkCreate([]);
    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error({ message: "Error in seeding the data.", error });
  }
}

seedData();
