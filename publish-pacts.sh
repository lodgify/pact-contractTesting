#!/bin/bash

export PACT_BROKER_BASE_URL="https://pact-broker.lodgify.net/"
export PACT_BROKER_USERNAME="dXfltyFMgNOFZAxr8io9wJ37iUpY42M"
export PACT_BROKER_PASSWORD="O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1"

#!/bin/bash

# Define the Docker command as a variable
DOCKER_COMMAND="docker run --rm \
 --platform=linux/arm64 \
 --network=\"host\" \
 -v ${PWD}:${PWD} \
 -e PACT_BROKER_BASE_URL \
 -e PACT_BROKER_USERNAME \
 -e PACT_BROKER_PASSWORD \
 pactfoundation/pact-cli:latest \
 publish \
 /pacts \
 --consumer-app-version 1.0.0"

# Execute the Docker command
eval $DOCKER_COMMAND
