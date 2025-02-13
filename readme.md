# MyContactsBackend

## 📌 Overview

MyContactsBackend is a RESTful API built using Node.js, Express, and Sequelize for contact management. This API provides user authentication, CRUD operations, and JWT security to ensure secure access. 🚀

## 🚀 Features

✅ **User Authentication** (Register, Login, JWT-based authentication)  
✅ **CRUD operations for Contacts** (Create, Read, Update, Delete)  
✅ **Middleware for Secure Routes**  
✅ **Validation for User and Contact Data**  
✅ **Testing with Jest & Supertest**

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (Sequelize ORM)
- **Authentication:** JWT
- **Testing:** Jest, Supertest
- **Environment Variables:** dotenv

---

## 📢 API Endpoints

### **User Routes**

| Method   | Endpoint              | Description         |
| -------- | --------------------- | ------------------- |
| **POST** | `/api/users/register` | Register a new user |
| **POST** | `/api/users/login`    | Login & get a token |
| **GET**  | `/api/users/current`  | Get current user    |

### **Contact Routes**

| Method     | Endpoint                   | Description        |
| ---------- | -------------------------- | ------------------ |
| **POST**   | `/api/contacts/`           | Create new contact |
| **GET**    | `/api/contacts/`           | Get all contacts   |
| **GET**    | `/api/contacts/:id`        | Get contact by ID  |
| **PUT**    | `/api/contacts/update/:id` | Update contact     |
| **DELETE** | `/api/contacts/delete/:id` | Delete contact     |

---

✨ Author  
👨‍💻 Yash Jatav  
🔗 GitHub: [Yash7jatav](https://github.com/Yash7jatav)
