## Full-stack boilerplate

A full stack [project](youtu.be/i6ypd7qv3z8) by [@benawad](https://github.com/benawad) from scratch using React, Typescript and GraphQL.

### Server

-   mikro-orm to interact(CRUD operations) with the database.
-   postgreSQL as the database.
-   type-graphql to define GraphQL schemas including types.
-   apollo and express as the server.
-   argon2 for password hasing and not bcrypt.js because of [this reason](https://security.stackexchange.com/questions/193351/in-2018-what-is-the-recommended-hash-to-store-passwords-bcrypt-scrypt-argon2).
