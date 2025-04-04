#!/bin/bash

if [ -d postgres_db/ ]; then
    echo "Directory exists. Removing it."
    rm -r postgres_db/
fi

# We should remove the node_modules folder if it exists
if [ -d server/node_modules/ ]; then
    echo "Removing node_modules."
    rm -r server/node_modules/
fi

# set the STRING variable
# STRING="Hello World!"
# print the contents of the variable on screen
echo "Building container..."
# docker compose -f docker-compose.yml up -d --build
echo docker compose -f docker-compose.yml down -v

# This means we will clean it up and create a new container
# echo "Current variable is $1"
if [[ $1 == "new" ]]; then
    echo "Prompt to build new container."        
    docker compose -f docker-compose.yml up -d --build
else
    echo "Prompt to resync container." 
    docker compose -f docker-compose.yml up -d
fi

echo "Container built."
