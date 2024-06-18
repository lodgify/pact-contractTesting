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
  describe("/api/v2/currency", () => {
    test("GET - /api/v2/currency", async () => {
      await pact
        .addInteraction()
        .uponReceiving("A request for list of currencies")
        .given("state", { property_owner_id: 466151 })
        .withRequest("GET", "/api/v2/currency")
        .willRespondWith(200, (builder) => {
          builder.jsonBody(
            like([
              {
                id: 50,
                code: "USD",
                name: "US dollar",
                euroForex: 1.0865,
                symbol: "$  ",
                obsolete: false,
                decimalPlaces: 2,
              },
            ])
          );
        })
        .executeTest((mockServer) => {
          return fetch(`${mockServer.url}/api/v2/currency`).then((res) =>
            expect(res.status).toBe(200)
          );
        });
    });
  });
});
