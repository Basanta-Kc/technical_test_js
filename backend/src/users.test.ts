import request from "supertest";
import app from "./app";

describe("GET /users/:user_id/recommendations", () => {
  it("should retrieve saved recommendations", async () => {
    const user_id = "test_user";

    // First, generate recommendations for the user
    await request(app)
      .post("/recommendations")
      .send({
        user_id,
        preferences: [
          "science fiction",
          "artificial intelligence",
          "space exploration",
        ],
      });

    const response = await request(app).get(
      `/users/${user_id}/recommendations`
    );

    expect(response.body.user_id).toBe(user_id);
    expect(Array.isArray(response.body.recommendations)).toBe(true);
  });

  it("should give 404 not found", async () => {
    const user_id = "test_user_2";

    const response = await request(app).get(
      `/users/${user_id}/recommendations`
    );

    expect(response.status).toBe(404);
    expect(Array.isArray(response.body.errors)).toBe(true);
  });
});
