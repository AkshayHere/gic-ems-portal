#!/bin/bash

if [ -d docker_test_db/ ]; then
    echo "Directory exists. Removing it."
    rm -r docker_test_db/
fi
# set the STRING variable
# STRING="Hello World!"
# print the contents of the variable on screen
echo "Building container..."
docker compose -f docker-compose.yml up -d
echo "Container built."