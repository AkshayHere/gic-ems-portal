
### Employee Management Portal (EMS)

To kickstart the project off, run the below command
```bash
.\start-container.sh
```

This will start the project instance in your local machine.

Navigate to the [http:localhost:7999](http:localhost:7999) to start browsing the application.

You may use the side menu to navigate to various pages.

You can use the below sets of commands to start to debug the containers

```bash
# DB Data seeding and table management
npx prisma generate
npx prisma migrate
npx prisma migrate status

# sh into the client or server
docker compose -f docker-compose.yml exec -it {client/server} bash

# Rebuild the client or server
docker compose up -d --no-deps --build {client/server}

```

### Packages

Below are some of the packages used in the project

1. [Node.js with express](https://expressjs.com/)
2. [Ant Design](https://ant.design/) for frontend development
3. [Prisma](https://www.prisma.io/) for PostgresDB management
4. [Zod](https://zod.dev/) for validating requests.
5. [Faker.js](https://fakerjs.dev/api/) for populating data.
