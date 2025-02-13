const { Op } = require("sequelize");
const Contact = require("../models/contact.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//Validations functions.

//Validate new contact input values.
async function validateContactData(data) {
  if (!data.name || typeof data.name !== "string") {
    return "Name is required and must be a string.";
  }
  if (!data.email || typeof data.email !== "string") {
    return "Email is required and must be a string.";
  }
  if (!data.phone || typeof data.phone !== "string") {
    return "Phone is required and must be a string.";
  }

  const existingContact = await Contact.findOne({
    where: {
      [Op.or]: [{ email: data.email }, { phone: data.phone }],
    },
  });

  if (existingContact) {
    return "Email or Phone number already exists.";
  }

  return null;
}

//Validate update contact input values.
function validateUpdationData(data) {
  if (!data.name && !data.email && !data.phone) {
    return "At least one field (name, email, phone) is required for update.";
  }
  if (data.name && typeof data.name !== "string") {
    return "Name must be a string.";
  }
  if (data.email && typeof data.email !== "string") {
    return "Email must be a string.";
  }
  if (data.phone && typeof data.phone !== "string") {
    return "Phone must be a string.";
  }
  return null;
}

//Validate registration user input values.
async function validateUserData(username, email, password) {
  if (!username || typeof username !== "string") {
    return "Username is required and must be a string.";
  }
  if (!email || typeof email !== "string") {
    return "Email is required and must be a string.";
  }
  if (!password || typeof password !== "string") {
    return "Password is required and must be a string.";
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return "User already exist. Please login.";
  }

  return null;
}

//Validate user login input values.
async function validateLoginData(email, password) {
  if (!email || typeof email !== "string") {
    return "Email is required and must be a string.";
  }
  if (!password || typeof password !== "string") {
    return "Password is required and must be a string.";
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return "User not found. Please register.";
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return "Invalid password. Please try again.";
  }

  return null;
}

module.exports = {
  validateContactData,
  validateUpdationData,
  validateUserData,
  validateLoginData,
};
