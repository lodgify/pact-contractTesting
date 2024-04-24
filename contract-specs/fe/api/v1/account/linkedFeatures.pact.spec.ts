/**
 * @jest-environment node
 */

import { PactV4 } from "@pact-foundation/pact";
import path from "path";

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
        .given("state", { property_owner_id: 466151 })
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
