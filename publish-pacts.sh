#!/bin/bash

export PACT_BROKER_BASE_URL="https://pact-broker.lodgify.net"

docker run --rm \
 --platform=linux/arm64 \
 --network="host" \
 -v ${PWD}:${PWD} \
 -e PACT_BROKER_BASE_URL \
  pactfoundation/pact-cli:latest \
  publish \
  ${PWD}/contract-specs/lodgify-web-publicapi/pacts \
  --consumer-app-version 1.0.0 \
