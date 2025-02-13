const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Contact = require("../models/contact.model");
const User = require("../models/user.model");
dotenv.config();

//Function to create a new contact.
async function addNewContact(contactData, userId) {
  const contact = await Contact.create({ ...contactData, userId });
  return { message: "New contact added successfully.", contact };
}

//Function to fetch all contacts.
async function fetchAllContacts(userId) {
  const contacts = await Contact.findAll({ where: { userId } });
  if (contacts.length === 0) {
    return { message: "No contacts found.", contacts: [] };
  }
  return { contacts };
}

//Function to fetch contact by ID.
async function fetchContactById(id, userId) {
  const contact = await Contact.findOne({ where: { id, userId } });
  if (!contact) {
    return { error: "Contact not found for ID : " + id };
  }
  return { contact };
}

//Function to find contact by ID and update details.
async function findContactByIdAndUpdate(id, dataToUpdate, userId) {
  const contact = await Contact.findByPk(id);
  if (!contact) {
    return { error: `Contact not found for update with ID: ${id}` };
  }
  if (contact.userId !== userId) {
    return {
      error: "You do not have permission to update this contact.",
    };
  }
  await contact.set(dataToUpdate);
  const updatedContact = await contact.save();
  return { message: "Contact details updated successfully", updatedContact };
}

//Function to find contact by ID and delete.
async function findContactByIDAndDelete(id, userId) {
  const contact = await Contact.findByPk(id);
  if (!contact) {
    return { error: `Contact not found for delete with ID: ${id}` };
  }
  if (contact.userId !== userId) {
    return {
      error: "You do not have permission to delete this contact.",
    };
  }
  const deletedContact = await contact.destroy();
  return {
    message: "Contact deleted successfully.",
    contactID: deletedContact.id,
  };
}

//Function to create a register user.
async function registerUser(username, email, password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  return { message: "User registered successfully.", user };
}

//Function to login a user with access token.
async function loginUserWithToken(email) {
  const user = await User.findOne({ where: { email } });
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: "1h",
  });
  return {
    message: "User login successfully",
    userId: user.id,
    accessToken: token,
  };
}

//Function to fetch current user login details.
async function fetchCurrentUser(data) {
  if (!data || !data.id) {
    return null;
  }
  return { currentUser: data };
}

module.exports = {
  fetchAllContacts,
  addNewContact,
  fetchContactById,
  findContactByIdAndUpdate,
  findContactByIDAndDelete,
  registerUser,
  loginUserWithToken,
  fetchCurrentUser,
};
