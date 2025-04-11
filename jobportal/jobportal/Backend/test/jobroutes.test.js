const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jobRoutes = require("../routes/jobRoutes");
const Job = require("../models/Job");

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = express();
  app.use(express.json());
  app.use("/api/jobs", jobRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Job.deleteMany();
});

describe("Job API", () => {
  it("should create a job", async () => {
    const newJob = {
      title: "Cleaner Needed",
      description: "Need someone to clean my house",
      budget: 80,
      location: "NY",
    };

    const res = await request(app).post("/api/jobs").send(newJob);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Cleaner Needed");
  });

  it("should get all jobs", async () => {
    await Job.create({ title: "Gardener", description: "Lawn work", budget: 50, location: "LA" });

    const res = await request(app).get("/api/jobs");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
