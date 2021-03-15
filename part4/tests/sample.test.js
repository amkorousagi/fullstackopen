//ex 4.3
//Initializing the database before tests
require("express-async-errors")
const Blog = require("../models/blog")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const listHelper = require("../utils/list_helper")
const mongoose = require("mongoose")

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log("cleared")

  const blogObjects = listHelper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
  console.log("initialized")
})

test("dummy returns one", () => {
  expect(listHelper.dummy([])).toBe(1)
})

//ex 4.4
describe("total likes", () => {
  test("when list has only one blog, equals then likes of that", () => {
    expect(listHelper.totalLikes(listHelper.initialBlogs[1])).toBe(5)
  })

  test("when list has many blogs, equals sum of likes of them", () => {
    expect(listHelper.totalLikes(listHelper.initialBlogs)).toBe(36)
  })

  //ex 4.5
  test("favorite", () => {
    expect(listHelper.favoriteBlog(listHelper.initialBlogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })

  //ex 4.6
  test("most author", () => {
    expect(listHelper.mostBlogs(listHelper.initialBlogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    })
  })

  //ex 4.7
  test("mostLikes", () => {
    expect(listHelper.mostLikes(listHelper.initialBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})

//ex 4.8
describe("http test get", () => {
  test("get request to the /api/blogs", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .end((err, res) => {
        if (err) throw err
      })
  })
  //ex 4.9
  test("post request to the /api/blogs", async () => {
    const res = await api.get("/api/blogs")
    expect(res.body.id).toBeDefined()
  })
})

//ex 4.10
describe("http test post", () => {
  test("new blog", async () => {
    const priorCount = await Blog.countDocuments({}, (err, cnt) => {
      console.log("cnt1", cnt)
      return cnt
    })
    const res = await api.post("/api/blogs").send({
      title: "mytitle",
      author: "myauthor",
      url: "myurl",
      likes: 22,
    })
    expect(
      await Blog.countDocuments({}, (err, cnt) => {
        console.log("cnt1", cnt)
        return cnt
      })
    ).toBe(priorCount + 1)
  })

  //ex 4.11
  test("new blog missing likes", async () => {
    const res = await api.post("/api/blogs").send({
      title: "mytitle",
      author: "myauthor",
      url: "myurl",
      //missing likes
    })
    console.log(res.body)
    expect(res.body.likes).toBe(0)
  })

  //ex 4.12
  test("new blog missing tile, url", async () => {
    const res = await api
      .post("/api/blogs")
      .send({
        //title is missing
        author: "myauthor",
        //url is missing
        //missing likes
      })
      .expect(400)
  })
})
//ex 4.13
describe("delete", () => {
  test("delete with a valid id", async () => {
    const valid = await Blog.findOne({}, (err, res) => {
      return res
    })
    await api.delete(`/api/blogs/${valid._id}`).expect(200)
  })

  test("delete with an invalid id", async () => {
    const invalidId = "iminvlaidid"
    const response = await api.delete(`/api/blogs/${invalidId}`).expect(400)
  })
})

//ex 4.14
describe("update", () => {
  test("update with a valid id", async () => {
    const valid = await Blog.findOne({}, (err, res) => {
      return res
    })
    const res = await api
      .patch(`/api/blogs/${valid._id}`)
      .send({ url: "updated url" })

    expect(res.body).toMatchObject({ url: "updated url" })
  })

  test("update with an invalid id", async () => {
    const invalidId = "iminvlaidid"
    const response = await api.delete(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe("authorization", async () => {
  test("new blog success", async () => {
    const userRes = await api.post("/api/users").send({
      username: "myusername2",
      password: "mypassword2",
      name: "myname",
    })

    const loginRes = await api
      .post("/api/login")
      .send({ username: "myusername2", password: "mypassword2" })
    console.log("token ", loginRes.body.token)
    const blogRes = await api
      .post("/api/blogs")
      .set("Accept", "application/json")
      .auth(loginRes.body.token, { type: "bearer" })
      .send({ title: "a3", url: "a", likes: 7 })

    console.log("blog ", blogRes.body)

    expect(blogRes.body).toMatchObject({ username: "myusername2" })
  })
  test.only("new blog failed", async () => {
    const userRes = await api.post("/api/users").send({
      username: "myusername3",
      password: "mypassword3",
      name: "myname",
    })

    const loginRes = await api
      .post("/api/login")
      .send({ username: "myusername3", password: "mypassword3" })
    console.log("token ", loginRes.body.token)
    const blogRes = await api
      .post("/api/blogs")
      .set("Accept", "application/json")
      .auth("invalid token", { type: "bearer" })
      .send({ title: "a3", url: "a", likes: 7 })

    console.log("blog ", blogRes.body)

    expect(blogRes.status).toBe(401)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
