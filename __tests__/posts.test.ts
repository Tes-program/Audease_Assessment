import supertest from "supertest";
import { app } from "../src/server";


const request = supertest(app);



describe("Blog Post API", () => {
    let token: string;
    let postId: string;
    let userId: string;

    beforeAll(async () => {
        const _res = await request.post("/api/users/register").send({
            username: "testuser",
            password: "testpassword",
        });
        expect(_res.status).toBe(201);
    }
    );

    it("should login user", async () => {
        const res = await request.post("/api/users/login").send({
            username: "testuser",
            password: "testpassword",
        });
        userId = res.body.id;
        token = res.body.token.access;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    it("should create a blog post", async () => {
        const res = await request.post("/api/blogs/post").set("Authorization", `Bearer ${token}`).send({
            title: "Test Blog",
            content: "This is a test blog post",
        });
        postId = res.body.id;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("title");
    });

    it("should get all blog posts", async () => {
        const res = await request.get("/api/blogs/");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
    });

    it("should get all blog posts by author", async () => {
        const res = await request.get("/api/blogs/author").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
    });

    it("should get a blog post by id", async () => {
        const res = await request.get(`/api/blogs/post/${postId}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("title");
    });

    it("should update a blog post", async () => {
        const res = await request.put(`/api/blogs/post/${postId}`).set("Authorization", `Bearer ${token}`).send({
            title: "Updated Test Blog",
            content: "This is an updated test blog post",
        });
        expect(res.status).toBe(200);
        expect(res.body.title).toBe("Updated Test Blog");
    });

    it("should delete a blog post", async () => {
        const res = await request.delete(`/api/blogs/post/${postId}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(204);
    });

    afterAll(async () => {
        await request.delete(`/api/users/delete/${userId}`).set("Authorization", `Bearer ${token}`);
    });
}
);
