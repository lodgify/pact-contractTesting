/**
 * @jest-environment node
 */

import { PactV4 } from "@pact-foundation/pact";
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
  describe("/api/v1/city/{id}", () => {
    test("GET - /api/v1/city/{id}", async () => {
      await pact
        .addInteraction()
        .uponReceiving("A request for a city")
        .withRequest("GET", "/api/v1/city/222")
        .willRespondWith(200, (builder) => {
          builder.jsonBody({
            id: 222,
            countryId: 107,
            regionId: 2005,
            name: "Chandār",
            latitude: 32.2666667,
            longitude: 49.0833333,
            isCountryCapital: false,
            isRegionCapital: false,
            population: 0,
          });
        })
        .executeTest((mockServer) => {
          return fetch(`${mockServer.url}/api/v1/city/222`).then((res) =>
            expect(res.status).toBe(200)
          );
        });
    });
  });
});
