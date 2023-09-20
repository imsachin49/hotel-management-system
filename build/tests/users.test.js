"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const index_2 = require("../index");
let authToken;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(index_1.default)
        .post("/login")
        .send({ email: "admin@admin.com", password: "password" });
    authToken = response.body.token;
}));
afterAll((done) => {
    index_2.server.close(done);
});
describe("GET /getAllUsers", () => {
    test("should return a non-empty array of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .get("/api/users/getAllUsers")
            .set("Authorization", `Bearer ${authToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.data.length).toBeGreaterThan(0);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.every((item) => typeof item === "object")).toBe(true);
    }));
    describe("GET /getOneUser/:id", () => {
        test("should return a user", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .get('/api/users/getOneUser/"ef80dbf5-1351-45ce-887e-d2a6f5ad572e"')
                .set("Authorization", `Bearer ${authToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        }));
        test("should return 404 for invalid URL", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .get("/api/users/invalidURL")
                .set("Authorization", `Bearer ${authToken}`);
            expect(response.statusCode).toBe(404);
        }));
    });
});
describe("DELETE /deleteOneUser/:id", () => {
    test("should delete a user with a valid ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            id: "ef80dbf5-1351-45ce-887e-d2a6f5ad572e",
            fullName: "John Doe",
            email: "a@a.com",
            joinDate: new Date(),
            description: "the best",
            status: true,
            number: "123456789",
        };
        const createResponse = yield (0, supertest_1.default)(index_1.default)
            .post("/api/users/createUser")
            .send(newUser)
            .set("Authorization", `Bearer ${authToken}`);
        const createdUser = createResponse.body;
        const deleteResponse = yield (0, supertest_1.default)(index_1.default)
            .delete(`/api/users/deleteUser/${createdUser.id}`)
            .set("Authorization", `Bearer ${authToken}`);
        expect(deleteResponse.statusCode).toBe(200);
        // expect(deleteResponse.body).toMatchObject(createdUser);
    }));
    test("should return 404 for invalid ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteResponse = yield (0, supertest_1.default)(index_1.default)
            .delete("/api/users/invalidID")
            .set("Authorization", `Bearer ${authToken}`);
        expect(deleteResponse.statusCode).toBe(404);
    }));
    describe("PATCH /updateUser/:id", () => {
        it("should update a user with a valid ID", () => __awaiter(void 0, void 0, void 0, function* () {
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
            const createResponse = yield (0, supertest_1.default)(index_1.default)
                .post("/api/users/createUser")
                .send(newUser)
                .set("Authorization", `Bearer ${authToken}`);
            const createdUser = createResponse.body;
            const updatedUser = Object.assign(Object.assign({}, createdUser), { fullName: "Jane Doe" });
            const updateResponse = yield (0, supertest_1.default)(index_1.default)
                .patch(`/api/users/updateUser/${updatedUser.id}`)
                .send(updatedUser)
                .set("Authorization", `Bearer ${authToken}`);
            expect(updateResponse.status).toBe(200);
            expect(updateResponse.body.fullName).toBe("Jane Doe");
        }));
    });
});
