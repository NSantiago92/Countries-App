/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn, Activity } = require("../../src/db.js");
const qs = require("qs");
const agent = session(app);
const request = require("supertest");
const country = [
  {
    name: "Argentina",
    code: "ARG",
    continent: "South America",
    capital: "Buenos Aires",
  },
  {
    name: "Chile",
    code: "CHI",
    continent: "South America",
    capital: "Santiago",
  },
  {
    name: "United States",
    code: "UST",
    continent: "North America",
    capital: "Washington DC",
  },
];

describe("----------Country routes----------", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(async () => {
    await conn.sync({ force: true });
    await Country.create(country[0]);
    const act = await Activity.create({
      name: "Test activity",
      difficulty: 2,
      duration: 4,
      season: "Summer",
    });
    await act.addCountries([1]);
  });
  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
    it("should get all countries by default", async () => {
      await Country.create(country[1]);
      return request(app)
        .get("/countries")
        .expect(200)
        .then((res) => {
          expect(res.body.length).equal(2);
        });
    });

    it("should get the countries that match the name", async () => {
      await Country.create(country[1]);
      await Country.create(country[2]);
      await request(app)
        .get("/countries")
        .query({ name: "arg" })
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(1);
          expect(res.body[0].name).to.equal("Argentina");
        });
      await request(app)
        .get("/countries")
        .query({ name: "i" })
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(3);
        });
      return request(app)
        .get("/countries")
        .query({ name: "xx" })
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(0);
        });
    });

    it("should filter by continent", async () => {
      await request(app)
        .get("/countries")
        .query(qs.stringify({ continents: ["South America"] }))
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(1);
          expect(res.body[0].name).to.equal("Argentina");
        });
      await request(app)
        .get("/countries")
        .query(qs.stringify({ continents: ["Europe"] }))
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(0);
        });
      await Country.create(country[1]);
      await Country.create(country[2]);
      await request(app)
        .get("/countries")
        .query(qs.stringify({ continents: ["South America"] }))
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(2);
        });
      await request(app)
        .get("/countries")
        .query(qs.stringify({ continents: ["North America"] }))
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(1);
        });
    });

    it("should filter by activities", async () => {
      await Country.create(country[1]);
      await Country.create(country[2]);

      await request(app)
        .get("/countries")
        .query(qs.stringify({ activities: [1] }))
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(1);
        });
      await request(app)
        .get("/countries")
        .query(qs.stringify({ activities: [10] }))
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(0);
        });
      const act = await Activity.create({
        name: "Test activity 2",
        difficulty: 2,
        duration: 4,
        season: "Summer",
      });
      await act.addCountries([1, 2, 3]);
      await request(app)
        .get("/countries")
        .query(qs.stringify({ activities: [1, 2] }))
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(1);
        });
      return await request(app)
        .get("/countries")
        .query(qs.stringify({ activities: [2] }))
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(3);
        });
    });
  });
});

// describe("-----Continents routes ", () => {
//   before(() =>
//     conn.authenticate().catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     })
//   );
//   beforeEach(() =>
//     Country.sync({ force: true }).then(async () => {
//       await Country.create(country[0]);
//       await Country.create(country[1]);
//       await Country.create(country[2]);
//     })
//   );
//   describe("GET /continents", () => {
//     it("should get 200", () => agent.get("/continents").expect(200));
//     it("should get all uniques continents", (done) => {
//       request(app)
//         .get("/continents")
//         .expect(200)
//         .then((res) => {
//           expect(res.body.length).equal(2);
//           done();
//         })
//         .catch((err) => done(err));
//     });
//   });
// });
