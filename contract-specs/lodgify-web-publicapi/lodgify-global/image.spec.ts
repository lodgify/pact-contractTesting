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
  describe("/api/v1/image/{id}", () => {
    test("GET - /api/v1/image/{id}", async () => {
      await pact
        .addInteraction()
        .uponReceiving("A request for an image file")
        .given("state", { property_owner_id: 466151 })
        .withRequest(
          "GET",
          "/api/v1/image/b59337ac-4017-45a3-903b-69206f68fee2"
        )
        .willRespondWith(200, (builder) => {
          builder.jsonBody(
            like({
              id: "b59337ac-4017-45a3-903b-69206f68fee2",
              width: 100,
              height: 100,
              size: 2420448,
              dateCreated: "2023-01-03T22:44:05",
              dateModified: "2023-01-03T22:44:05",
              type: "Jpeg",
            })
          );
        })
        .executeTest((mockServer) => {
          return fetch(
            `${mockServer.url}/api/v1/image/b59337ac-4017-45a3-903b-69206f68fee2`
          ).then((res) => expect(res.status).toBe(200));
        });
    });
  });
});
