# Practical Session 1: Setup Merchant Model, Database Connection & Server

**TODO 1. Create Merchant Model**

Create `merchant.ts` file in `models` folder.

<u>File: merchant.ts</u>

Import `Table`, `Column`, `Model`, `DataType` from `sequelize-typescript`.

```typescript
import { Table, Column, Model, DataType } from 'sequelize-typescript';
```

Use the `@Table` decorator to define the table name and other table options like `timestamps`.

```typescript
@Table({
    tableName: 'entity_merchant',
    timestamps: true,
})
```

Define a class `Merchant` that extends `Model`.

```typescript
export class Merchant extends Model {
    // Define columns here
}
```

Define `merchant_id` and `merchant_name` columns.
- **Primary Key Column**<br>
    Use the `@Column` decorator with `primaryKey: true` to define the primary key column with auto-increment.

- **String Column**<br>
    Use the `@Column` decorator with `type: DataType.STRING` to define a string column.

```typescript
@Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
})
merchant_id!: number;

@Column({
    type: DataType.STRING,
    allowNull: false,
})
merchant_name!: string;
```

Use `export default Merchant` to export the model class.

```typescript
export default Merchant
```
<br><br>

**TODO 2. Setup Database Connection**

Create `connection.ts` file in `database` folder.

<u>File: connection.ts</u>

- Import `Sequelize` from `sequelize-typescript`.
- Import `path` from `path`.

```typescript
import { Sequelize } from "sequelize-typescript";
import path from 'path';
```

Create an asynchronous function named `connect_db`.

```typescript
export const connect_db = async () => {
    // Complete try-catch
}
```

Use a `try-catch` block to handle any errors during the connection process.

```typescript
try {
    // Complete parentDir
    // Complete sqlServerDb
    // Complete authenticate()
    // Complete sync()
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
```

Use `path.dirname(__dirname)` to get the parent directory.

```typescript
const parentDir = path.dirname(__dirname);
```

Instantiate a new `Sequelize` object with the following options:
- **Dialect**: Set to `'mssql'`.
- **Host**: Set to `'localhost'`.
- **Port**: Parse the port number from `process.env.DB_PORT`.
- **Database**: Set to `process.env_NAME`.
- **Username**: Set to `process.env.DB_USER`.
- **Password**: Set to `process.env.DB_PASSWORD`.
- **Models**: Point to the directory containing all the models.
- **Logging**: Set to `false` (change to `true` if you need to see logs).
- **Dialect Options**: Set options for encryption and server certificate trust.
- **Connection Pool**: Configure the connection pool with `max`, `min`, `acquire`, and `idle` settings.

```typescript
const sqlServerDb = new Sequelize({
    dialect: 'mssql',
    host: 'localhost',
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: [parentDir + '/models'], // point to directory with all the models
    logging: false, // change to true if you need to see logs
    dialectOptions: {
        options: {
            encrypt: false, // For Azure SQL Server, keep this true. For local SQL Server, you might set it to false.
            trustServerCertificate: true, // For local development. In production, you should use a proper certificate.
        },
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        },
    });
```

Use `sqlServerDb.authenticate()` to authenticate the connection.

```typescript
await sqlServerDb.authenticate();
console.log('Database connection has been established successfully.');
```

Use `sqlServer.sync({ alter: true })` to sync the database schema.

```typescript
await sqlServerDb.sync({ alter: true });
console.log("Database sync complete");
```

<br><br>

**TODO 3. Setup API Server Settings**

Create `app.ts` file in `src` folder.

<u>File: app.ts</u>

- Import `express`, `Request`, `Response`, `Application`, and `NextFunction` from `express`.
- Import `dotenv` from `dotenv`.
- Import and execute the database connection from `./database/connection.js`.
- Import `connect_db` from `./database/connection.js`.
- Import `cors` from `cors`.

```typescript
import express, { Request, Response, Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import './database/connection.js';
import { connect_db } from './database/connection.js';
import cors from "cors";
```

Define an array `CORS_WHITELIST` to specify allowed origins for CORS.

```typescript
export const CORS_WHITELIST = [];
```

Use `dotenv.config()` to load environment variables from an `.env` file.

```typescript
dotenv.config();
```

Call `connect_db()` to establish a database connection.

```typescript
connect_db();
```

Create an Express application instance using `express()` and assign to `server`.

```typescript
const server: Application = express();
```

Retrieve the port number from environment variables and assign to `PORT`.

```typescript
const PORT = process.env.PORT;
```

- Use `cors` middleware with the `CORS_WHITELIST` array.
- Set up a middleware function to add CORS headers to responses.
- Use `express.json()` middleware to parse JSON request bodies.

```typescript
server.use(cors({ origin: CORS_WHITELIST }));
   
server.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
    
server.use(express.json());
```

Define a root route that responds with "Server running...".

```typescript
server.get("/", (req: Request, res: Response) => res.send("Server running..."));
```

Start the server and listen on the specified port, logging a message when the server is running.

```typescript
server.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });
```