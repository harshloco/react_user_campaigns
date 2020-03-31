const request = require("supertest");
const app = require("../server");
describe("Post Endpoints", () => {
  it("should login user", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "min@macrosoft.com",
        password: "422456456"
      });
    // expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });
});
