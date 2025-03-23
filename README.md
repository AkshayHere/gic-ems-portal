npx prisma generate
npx prisma migrate
npx prisma migrate status



# Server
docker compose -f docker-compose.yml exec -it server bash
npx prisma migrate dev
npx prisma migrate reset
npx prisma db seed

# Client
docker compose -f docker-compose.yml exec -it client bash

docker compose -f docker-compose.yml up -d --build
 
docker compose up -d --no-deps --build client


https://stackoverflow.com/questions/67406780/not-able-to-start-docker-desktop-in-windows

wsl -l -v

wsl --unregister docker-desktop

wsl --unregister docker-desktop


Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:7999 -> 127.0.0.1:0: listen tcp 0.0.0.0:7999: 
bind: An attempt was made to access a socket in a way forbidden by its access permissions

https://stackoverflow.com/questions/65272764/ports-are-not-available-listen-tcp-0-0-0-0-50070-bind-an-attempt-was-made-to