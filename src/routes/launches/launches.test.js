import request from "supertest";
import app from "../../app";
describe("Test GET /launches", () => {
  test("It should response with status 200", async () => {
    const response = await request(app).get("launches");
    expect(response.statusCode).toBe(200);
  });
});
