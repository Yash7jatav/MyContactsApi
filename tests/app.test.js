const request = require("supertest");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = require("../app");
const { sequelize } = require("../database/init");
dotenv.config({ path: ".env.test" });

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  token = jwt.sign({ id: 1, username: "testuser" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Users & Contacts routes", () => {
  it("POST /api/users/register should return 201 Created and successfully register a user", async () => {
    const response = await request(app).post("/api/users/register").send({
      username: "user1",
      email: "user1@gmail.com",
      password: "user@12345",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.user.id).toEqual(1);
  });

  it("POST /api/users/login should return 200 OK and the logged-in user with a token", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "user1@gmail.com",
      password: "user@12345",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toEqual(1);
  });

  it("GET /api/contacts should return 200 OK with an empty array when no contacts exist", async () => {
    const response = await request(app)
      .get("/api/contacts")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "No contacts found.",
      contacts: [],
    });
  });

  it("POST /api/contacts should return 201 Created and successfully create a new contact", async () => {
    const response = await request(app)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "555-123-4567",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.contact.id).toEqual(1);
    expect(response.body.contact.userId).toEqual(1);
  });

  it("GET /api/contacts/:id should return 200 OK and get contact by ID", async () => {
    const response = await request(app)
      .get("/api/contacts/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.contact.id).toEqual(1);
  });

  it("PUT /api/contacts/update/:id should return 200 OK and successfully update the contact", async () => {
    const response = await request(app)
      .put("/api/contacts/update/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated contact" });
    expect(response.statusCode).toBe(200);
    expect(response.body.updatedContact.name).toEqual("Updated contact");
  });

  it("DELETE /api/contacts/delete/:id should return 200 OK and successfully delete the contact", async () => {
    const response = await request(app)
      .delete("/api/contacts/delete/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.contactID).toEqual(1);
  });
});
