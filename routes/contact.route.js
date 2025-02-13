const express = require("express");
const {
  validateContactData,
  validateUpdationData,
} = require("../validations/index");
const {
  fetchAllContacts,
  addNewContact,
  fetchContactById,
  findContactByIdAndUpdate,
  findContactByIDAndDelete,
} = require("../controllers/index");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

// Apply validateToken to all routes
router.use(validateToken);

//Create new contact.
router.post("/", async (req, res) => {
  try {
    const contactData = req.body;
    const error = await validateContactData(contactData);
    if (error) return res.status(400).json({ error });
    const newContact = await addNewContact(contactData, req.user.id);
    return res.status(201).json(newContact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Fetch all contacts.
router.get("/", async (req, res) => {
  try {
    const contacts = await fetchAllContacts(req.user.id);
    if (contacts.message) return res.status(200).json(contacts);
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Fetch contact by id.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await fetchContactById(id, req.user.id);
    if (contact.error) return res.status(404).json(contact);
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Find contact by ID and update.
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const error = await validateUpdationData(dataToUpdate);
    if (error) return res.status(400).json({ error });
    const updatedContact = await findContactByIdAndUpdate(
      id,
      dataToUpdate,
      req.user.id
    );
    if (updatedContact.error) {
      return res
        .status(
          updatedContact.error === `Contact not found for update with ID: ${id}`
            ? 404
            : 403
        )
        .json({ error: updatedContact.error });
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Find contact by ID and delete.
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await findContactByIDAndDelete(id, req.user.id);
    if (deletedContact.error) {
      return res
        .status(
          deletedContact.error === `Contact not found for delete with ID: ${id}`
            ? 404
            : 403
        )
        .json({ error: deletedContact.error });
    }
    return res.status(200).json(deletedContact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
