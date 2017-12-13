import Api from "./Api"

const url = "https://jsonplaceholder.typicode.com/"

describe("API", () => {
  let api
  beforeEach(() => {
    api = new Api(url)
  })
  it("sets urls", () => {
    expect(api.baseUrl).toBe(url)
    expect(api.url("/posts/1")).toBe(`${url}/posts/1`)
  })
  it("gets", async () => {
    const post = await api.get("/posts/1")
    expect(post).toHaveProperty("id")
  })
  it("posts", async () => {
    const data = {
      userId: 1,
      title: "foo",
      content: "bar",
    }
    const post = await api.post("/posts", data)
    expect(post).toMatchObject(data)
  })
  it("patch", async () => {
    const data = {
      userId: 1,
      title: "foo",
      content: "bar",
    }
    const post = await api.patch("/posts/1", data)
    expect(post).toMatchObject(data)
  })
  it("delete", async () => {
    const post = await api.del("/posts/1")
    expect(post).not.toBeInstanceOf(Error)
  })
  /*it("fails on bad url", async () => {
    const api = new Api("")
    const err = await api.get("/")
    expect(err).toBeInstanceOf(Error)
  })*/
})
