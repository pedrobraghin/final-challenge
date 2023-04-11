<h1 align="center">Final challenge</h1>

<p align="center">
  <i>Final challenge of the Compass UOL Scholarship Program: Back-end Journey (Node.js) - AWS Cloud Context - 01/16/2023.</i>
  <p align="center">The goal of this challenge is to implement a RESTful API to do car rentals.</p>
</p>

<hr>

# Summary

- [**Deploy and Swagger**](#deploy-and-swagger)
- [**How to Run Locally**](#how-to-run-locally)

# Deploy and Swagger

- **Deploy Base URL**: https://final-challenge-pb.up.railway.app/api/v1
- **Swagger URL**: https://final-challenge-pb.up.railway.app/api/v1/api-docs

# How to run locally

### Prerequisites

- Install <strong>[Git][git]</strong> and <strong>[Node.js][node]</strong> (which includes [Node Package Manager][npm])

<hr>

1. Certify that Node v18.13.0 or any posterior Major 18 version is installed;

2. Have a MongoDB connection of your own (with a connection string and password);

3. Clone the repository:

```
git clone https://github.com/pedrobraghin/final-challenge
```

4. Change to project directory:

```
cd final-challenge
```

5. Install necessary dependencies:

```
npm install
```

6. Make a .env file following the contents of .env.example:

- DB_URL: MongoDB connection string
- BCRYPT_SALT: For encryption, can be any number above 0. Minimum 12 recommended. The higher the number, the longer it will take to encrypt the password.
- JWT_EXPIRES_IN: The time in which a JWT expires.
- JWT_SECRET: For JWT authentication, needs to be a safety string.

7. Build the application:

```
npm run build
```

8. Start the application:

```
npm start
```

9. For running the automated tests, use:

```
npm run test
```

[git]: https://git-scm.com
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/get-npm
