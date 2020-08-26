## Full-stack boilerplate

A full stack [project](youtu.be/i6ypd7qv3z8) from scratch using React, Typescript and GraphQL inspired by [@benawad](https://github.com/benawad).

### Server

-   mikro-orm to interact(CRUD operations) with the database.
-   postgreSQL as the database.
-   type-graphql to define GraphQL schemas including types.
-   apollo and express as the server.
-   argon2 for password hasing and not bcrypt.js because of [this reason](https://security.stackexchange.com/questions/193351/in-2018-what-is-the-recommended-hash-to-store-passwords-bcrypt-scrypt-argon2).
-   express-session for session authentication.
-   redis for session store with connect-redis middleware.

### Session Flow

-   Set the user.id as userId in session after successful login or register such as {userId: 1}.
-   Send {userId: 1} to redis.
-   redis will create an unique key and store this value such as sess:qwe123qwe -> {userId: 1}.
-   express-session will create a singed token from the redis key and set it as a cookie in the user's browser such as qweghus87adjhv81.
-   whenever the user makes a request this token will be sent to the server.
-   On the server it gets decrypted and turns qweghus87adjhv81 -> sess:qwe123qwe
-   Then make a request to redis and fetch the value with the key such as sess:qwe123qwe -> {userId: 1}.

### Client

-   Next.js with Chakra UI
