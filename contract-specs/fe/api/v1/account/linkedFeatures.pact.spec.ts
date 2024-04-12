/**
 * @jest-environment node
 */

const { PactV4 } = require("@pact-foundation/pact");
const path = require("path");

const pact = new PactV4({
  dir: path.resolve(process.cwd(), "contract-specs/fe/pacts"),
  consumer: "fe",
  provider: "lodgify-global",
});

describe("Pact Lodgify Consumer", () => {
  describe("Linked Features", () => {
    test("Get linkedFeatures", async () => {
      await pact
        .addInteraction()
        .uponReceiving("A request for linked features")
        .withRequest("GET", "/api/v1/account/linkedFeatures")
        .willRespondWith(200, (builder) => {
          builder.jsonBody({
            accountId: 466151,
            features: [],
          });
        })
        .executeTest((mockServer) => {
          return fetch(`${mockServer.url}/api/v1/account/linkedFeatures`).then(
            (res) => expect(res.status).toBe(200)
          );
        });
    });
  });
});
