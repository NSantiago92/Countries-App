const { Country, Activity, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("----------Country model----------", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if any (name|code|continent|capital) is null", () => {
        Country.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when you provide minimum attributes (name, code, continent, capital)", (done) => {
        Country.create({
          name: "Argentina",
          code: "ARG",
          continent: "South America",
          capital: "Buenos Aires",
        })
          .then((res) => {
            done();
          })
          .catch((err) => done(err));
      });
      it("should work when you provide all attributes (name, code, continent, capital, flagImg, subRegion, area, population)", (done) => {
        Country.create({
          name: "Argentina",
          code: "ARG",
          continent: "South America",
          capital: "Buenos Aires",
          flagImg: "http://image.com",
          subRegion: "America",
          area: 1000,
          population: 123,
        })
          .then((res) => {
            const resJSON = res.toJSON();
            expect(resJSON.flagImg).to.equal("http://image.com");
            expect(resJSON.subRegion).to.equal("America");
            expect(resJSON.area).to.equal(1000);
            expect(resJSON.population).to.equal(123);
            done();
          })
          .catch((err) => done(err));
      });
      it("should create timestamps rows", (done) => {
        Country.create({
          name: "Argentina",
          code: "ARG",
          continent: "South America",
          capital: "Buenos Aires",
        })
          .then((res) => {
            expect(res).to.have.property("createdAt");
            expect(res).to.have.property("updatedAt");
            done();
          })
          .catch((err) => done(err));
      });
      it("flagImg shouldn't accept non URL strings", (done) => {
        Country.create({
          name: "Argentina",
          code: "ARG",
          continent: "South America",
          capital: "Buenos Aires",
          flagImg: "image",
        })
          .then((res) => {
            done(new Error("it shouldn't allow non url"));
          })
          .catch(() => done());
      });
      it("should create virtual attribute: continentColor", (done) => {
        Country.create({
          name: "Argentina",
          code: "ARG",
          continent: "South America",
          capital: "Buenos Aires",
          flagImg: "http://image.com",
          subRegion: "America",
          area: 1000,
          population: 123,
        })
          .then((res) => {
            expect(res.toJSON()).to.have.property("continentColor");
            done();
          })
          .catch((err) => done(err));
      });
    });
  });
});
