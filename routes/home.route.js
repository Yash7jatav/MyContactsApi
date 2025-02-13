const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to MyContacts API",
    description:
      "This API allows users to register, log in, and manage their contacts securely.",
    authentication: {
      type: "Bearer Token",
      how_to_use:
        "Include token in Authorization header as 'Bearer YOUR_TOKEN'",
    },
    routes: {
      users: {
        register: {
          method: "POST",
          endpoint: "/api/users/register",
          description:
            "Register a new user with username, email, and password.",
          request_body: {
            username: "string",
            email: "string",
            password: "string",
          },
          response: {
            id: "integer",
            username: "string",
            email: "string",
            password: "string (hash password)",
          },
        },
        login: {
          method: "POST",
          endpoint: "/api/users/login",
          description: "Login user and get authentication token.",
          request_body: {
            email: "string",
            password: "string",
          },
          response: {
            token: "string",
            userID: "integer",
          },
        },
        current_user: {
          method: "GET",
          endpoint: "/api/users/current",
          description: "Fetch the currently logged-in user (requires token).",
        },
      },
      contacts: {
        create_contact: {
          method: "POST",
          endpoint: "/api/contacts",
          description: "Create a new contact (Requires authentication).",
          request_body: {
            name: "string",
            email: "string",
            phone: "string",
          },
          response: {
            id: "integer",
            name: "string",
            email: "string",
            phone: "string",
            userId: "integer",
          },
        },
        get_all_contacts: {
          method: "GET",
          endpoint: "/api/contacts",
          description: "Fetch all contacts for the logged-in user.",
        },
        get_contact_by_id: {
          method: "GET",
          endpoint: "/api/contacts/:id",
          description: "Fetch a specific contact by ID.",
        },
        update_contact: {
          method: "PUT",
          endpoint: "/api/contacts/update/:id",
          description: "Update a contact by ID.",
          request_body: {
            name: "string (optional)",
            email: "string (optional)",
            phone: "string (optional)",
          },
        },
        delete_contact: {
          method: "DELETE",
          endpoint: "/api/contacts/delete/:id",
          description: "Delete a contact by ID.",
        },
      },
    },
  });
});

module.exports = router;
