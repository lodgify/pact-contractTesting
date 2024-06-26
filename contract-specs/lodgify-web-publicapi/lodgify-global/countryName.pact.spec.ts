/**
 * @jest-environment node
 */

import { PactV4 } from "@pact-foundation/pact";
import { like } from "@pact-foundation/pact/src/v3/matchers";
import path from "path";

const pact = new PactV4({
  dir: path.resolve(
    process.cwd(),
    "contract-specs/lodgify-web-publicapi/pacts"
  ),
  consumer: "lodgify-web-publicapi",
  provider: "lodgify-global",
});

describe("Pact Lodgify Consumer", () => {
  describe("/api/v1/country-name/{id}/{language}", () => {
    test("GET - /api/v1/country-name/{id}/{language}", async () => {
      await pact
        .addInteraction()
        .uponReceiving("A request for country name")
        .given("state", { property_owner_id: 466151 })
        .withRequest("GET", "/api/v1/country-name/22/en")
        .willRespondWith(200, (builder) => {
          builder.jsonBody(
            like({
              countryId: 22,
              language: "en",
              name: "Burkina Faso",
            })
          );
        })
        .executeTest((mockServer) => {
          return fetch(`${mockServer.url}/api/v1/country-name/22/en`).then(
            (res) => expect(res.status).toBe(200)
          );
        });
    });
  });
});
