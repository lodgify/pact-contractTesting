/**
 * @jest-environment node
 */

const { PactV3, MatchersV3 } = require("@pact-foundation/pact");
const path = require("path");

const { eachLike } = MatchersV3;

const provider = new PactV3({
  dir: path.resolve(process.cwd(), "pacts"),
  consumer: "fe",
  provider: "lodgify-global",
  port: 9292,
  host: "127.0.0.1",
});

describe("Pact Lodgify Consumer", () => {
  describe("Linked Features", () => {
    test("Get linkedFeatures", async () => {
      await provider
        .given("I need to get linked features for an account")
        .uponReceiving("A request for linked features")
        .withRequest({
          method: "GET",
          path: "/account/linkedFeatures",
        })
        .willRespondWith({
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: eachLike({
            accountId: 466151,
            features: [],
          }),
        });

      await provider.executeTest(async (mockServer) => {
        const response = await fetch(
          `${mockServer.url}/account/linkedFeatures`
        );
        expect(await response.json()).toEqual([
          {
            accountId: 466151,
            features: [],
          },
        ]);
      });
    });
  });
});
