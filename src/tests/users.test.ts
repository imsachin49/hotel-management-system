import { UserType } from "./../@types/userTypes";
import agent from "supertest";
import app from "../index";

import { server } from "../index";

let authToken: string;

beforeAll(async () => {
  const response = await agent(app)
    .post("/login")
    .send({ email: "admin@admin.com", password: "password" });
  authToken = response.body.token;
});

afterAll((done) => {
  server.close(done);
});

describe("GET /getAllUsers", () => {
  test("should return a non-empty array of users", async () => {
    const response = await agent(app)
      .get("/api/users/getAllUsers")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(
      response.body.data.every((item: UserType) => typeof item === "object")
    ).toBe(true);
  });

  describe("GET /getOneUser/:id", () => {
    test("should return a user", async () => {
      const response = await agent(app)
        .get('/api/users/getOneUser/"ef80dbf5-1351-45ce-887e-d2a6f5ad572e"')
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
    });

    test("should return 404 for invalid URL", async () => {
      const response = await agent(app)
        .get("/api/users/invalidURL")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.statusCode).toBe(404);
    });
  });
});

describe("DELETE /deleteOneUser/:id", () => {
  test("should delete a user with a valid ID", async () => {
    const newUser = {
      id: "ef80dbf5-1351-45ce-887e-d2a6f5ad572e",
      fullName: "John Doe",
      email: "a@a.com",
      joinDate: new Date(),
      description: "the best",
      status: true,
      number: "123456789",
    };
    const createResponse = await agent(app)
      .post("/api/users/createUser")
      .send(newUser)
      .set("Authorization", `Bearer ${authToken}`);
    const createdUser = createResponse.body;

    const deleteResponse = await agent(app)
      .delete(`/api/users/deleteUser/${createdUser.id}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(deleteResponse.statusCode).toBe(200);
    // expect(deleteResponse.body).toMatchObject(createdUser);
  });

  test("should return 404 for invalid ID", async () => {
    const deleteResponse = await agent(app)
      .delete("/api/users/invalidID")
      .set("Authorization", `Bearer ${authToken}`);
    expect(deleteResponse.statusCode).toBe(404);
  });

  describe("PATCH /updateUser/:id", () => {
    it("should update a user with a valid ID", async () => {
      // Create a sample user
      const newUser = {
        id: "ef80dbf5-1351-45ce-887e-d2a6f5ad572e",
        fullName: "John Doe",
        email: "a@a.com",
        joinDate: new Date(),
        description: "the best",
        status: true,
        number: "123456789",
      };

      const createResponse = await agent(app)
        .post("/api/users/createUser")
        .send(newUser)
        .set("Authorization", `Bearer ${authToken}`);
      const createdUser = createResponse.body;

      const updatedUser = {
        ...createdUser,
        fullName: "Jane Doe",
      };
      const updateResponse = await agent(app)
        .patch(`/api/users/updateUser/${updatedUser.id}`)
        .send(updatedUser)
        .set("Authorization", `Bearer ${authToken}`);
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.fullName).toBe("Jane Doe");
    });
  });
});
