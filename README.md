## Project Setup Instructions

Follow these steps to set up and run the project:

### Download Project

Clone or download the repository and switch to the master branch.

### Server Setup

1. Navigate to the server folder.
2. Install all the packages by running the command: `npm install`.
3. Create a PostgreSQL database named "lunch_menu_management" and import the SQL file provided in the db folder.

### db.js File

```javascript
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lunch_menu_management",
  password: "postgres",
  port: 5432,
});

module.exports = pool;
```


### Admin Setup

1. Navigate to the `admin` folder.
2. Install all the packages by running the command: npm install
3. Set the Axios base URL same as the server URL hooks/axios.js file.

```javascript
const axios = require("axios");

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});
```


### Client Setup

1. Navigate to the `client` folder.
2. Install all the packages by running the command: npm install
3. Set the Axios base URL same as the server URL in hooks/axios.js file.

```javascript
const axios = require("axios");

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});
```

### Run The Project

After installing packages, return to the root directory.

Ensure that you have globally installed `concurrently` and `nodemon`.

Run the command: npm run dev

### Login Credentials

- For admin login, use email: `admin@gmail.com`, password: `123456`.
- For employees, register as an employee first and then login.





