# Practical Session 2: Merchant CRUD

## 2a. Set Up Merchant DTO

**TODO 1. Create Merchant Request and Response DTO**

Create `merchant_dto.ts` file in `dtos` folder.

<u>File: merchant_dto.ts</u>

Use the `export interface` syntax to define the `MerchantReqDTO` interface. 
- This Data Transfer Object (DTO) will define the structure of the request body.

```typescript
export interface MerchantReqDTO {
    // Complete variable(s)
}
```

Add the variable(s) below into the `MerchantReqDTO`.

**merchant_name**: A string representing the name of the merchant.

```typescript
merchant_name: string;
```
<br>

Use the `export interface` syntax to define the `MerchantResDTO` interface.
- This Data Transfer Object (DTO) will define the structure of the response body.

```typescript
export interface MerchantResDTO {
    // Complete variable(s)
}
```

Add the variable(s) below into `MerchantResDTO`.

**merchant_id**: A number representing the id of the merchant.<br>
**merchant_name**: A string representing the name of the merchant.

```typescript
merchant_id: number;
merchant_name: string;
```

<br><br>

## 2b. POST API: Create Merchant

**TODO 2. Create Merchant Service**

Create `merchant_service.ts` file in `services` folder.

<u>File: merchant_service.ts</u>

- Import `MerchantReqDTO`, `MerchantResDTO` from `../dtos/merchant_dto`.
- Import `Merchant` from `../models/merchant`.

```typescript
import { MerchantReqDTO, MerchantResDTO  } from "../dtos/merchant_dto";
import Merchant from "../models/merchant";
```

Create an asynchronous function named `createMerchant` that takes `merchantData` of type `MerchantReqDTO` and returns a `Promise<MerchantResDTO>`.

```typescript
export const createMerchant = async (merchantData: MerchantReqDTO): Promise<MerchantResDTO> => {
    // Complete try-catch
};
```
 
Use a `try-catch` bloc to handle any errors during the creation process. Console and throw if there are any.

```typescript
try {
    // Complete newMerchant
    // Complete return newMerchant
} catch (error) {
    console.error(error);
    throw error;
}
```

- `await` response `merchantData` from `Merchant` model `create` method and assign to `newMerchant`.
- Return `newMerchant` and convert it `toJSON()` and cast as `MerchantResDTO`.

```typescript
const newMerchant = await Merchant.create(merchantData as any);
return newMerchant.toJSON() as MerchantResDTO;
```

Create `index.ts` file in `services` folder.
- `index.ts` is a file directory of all the files in the `services` folder. Files in the same `services` folder will be specified in `index.ts` so that files outside the `services` folder are able to access the files specified in the `index.ts`
- In this case, files outside of the `services` folder will be able to access the files in the `services` folder
- `index.ts` files are usually found in `services`, `controllers` and `routes`

<u>File: index.ts</u>

Re-export merchant service modules.
- This line of code is a TypeScript export statement. It re-exports all the modules from the `./merchant_service` under the namespace `merchantService`. This means that anything exported from `./merchant_service` can be accessed publicly through `merchantService`.

```typescript
export * as merchantService from "./merchant_service"
```

<br><br>

**TODO 3. Create Merchant Controller**

Create `merchants` folder in `controllers` folder.

Create `merchant_controller.ts` file in `controllers/merchants` folder.

<u>File: merchant_controller.ts</u>

Services that are exported in TODO 2 can now be imported.

- Import `Request`, `Response` from `express`.
- Import `merchantService` from `../../services`.
- Import `MerchantReqDTO` from `../../dtos/merchant_dto`.

```typescript
import { Request, Response } from 'express';
import { merchantService } from "../../services"
import { MerchantReqDTO } from "../../dtos/merchant_dto";
```

Create an asynchronous function named `createMerchant` that takes `req` of type `Request` and `res` of type `Response`.

```typescript
export const createMerchant = async (req: Request, res: Response) => {
    // Complete merchantData
    // Complete try-catch
}
```

Assign `merchantData` `MerchantReqDTO` with `req.body`.

```typescript
const merchantData: MerchantReqDTO = req.body;
```

Use a `try-catch` bloc to handle any errors during the creation process.

```typescript
try {
    // Complete if statement of merchant_name
    // Complete newMerchant
    // Complete status(201)
} catch (error) {
    // Complete status(500)
}
```

Return `status(400)` with a message if `merchant_name` is null.

```typescript
if (!merchantData.merchant_name) {
    return res.status(400).json({ message: 'Merchant name is required' });
}
```

- `await` response `merchantData` from `merchantService` `createMerchant` function and assign to `newMerchant`.
- If successful, send `status(201)` with the `newMerchant`.

```typescript
const newMerchant = await merchantService.createMerchant(merchantData);
res.status(201).json(newMerchant);
```

If an error occurs, send `status(500)` with an error message.

```typescript
res.status(500).json({ message: 'Internal server error' });
```

Create `index.ts` file in `controllers/merchants` folder

<u>File: index.ts</u>

Export merchant controller modules can be accessed publicly through `merchantController`.

```typescript
export * as merchantController from "./merchant_controller";
```

<br><br>

**TODO 4. Create Merchant Route**

Create `merchants` folder in `routes` folder.

Create `merchant_route.ts` file in `routes/merchants` folder.

<u>File: merchant_route.ts</u>

Controllers that are exported in TODO 3 can now be imported.

- Import `merchantController` from `../../controllers/merchants`.
- Import `express` from `express`.

```typescript
import { merchantController } from "../../controllers/merchants";
import express from 'express';
```

Assign `express.Router()` to `router` as a new router object that can handle requests in a modular and organized way.

```typescript
const router = express.Router();
```

Create a `post` with the route `/api/v1/merchants` and call the `createMerchant` function from `merchantController`.
```typescript
/* /api/v1/merchants */
router.post("/", merchantController.createMerchant);
```

This completes the api route for `createMerchant`.


Export the `merchantRoute` from `router` to allow other files to import the route(s).

```typescript
export const merchantRoute = router;
```

Create `index.ts` file in `routes/merchants` folder.

<u>File: index.ts</u>

Merchant Router Setup
- The `index.ts` sets up an Express router
- It imports route module (`merchantRoute`) and attaches them to specific paths
- This `index.ts` combines and organizes routes

```typescript
import express from 'express';
import { merchantRoute } from "../merchants/merchant_route";

const router = express.Router();

/* /api/v1/merchants */
router.use("/", merchantRoute); 

export default router;
```

<br>

Create `routes.ts` file in `routes` folder.

<u>File: routes.ts</u>

- Import `express` from `express`.
- Import `merchantRoutes` from `./merchants`

```typescript
import express from "express";
import merchantRoutes from "./merchants";
```

Assign `express.Router()` to `router` as a new router object that can handle requests in a modular and organized way.

```typescript
const router = express.Router();
```

Create a `use` with the route `/api/v1/merchants` and call the `merchantRoutes`.

```typescript
/* /api/v1/merchants */
router.use("/merchants", merchantRoutes);
```

Export the `allRoutes` from `router` to allow other files to import it.

```typescript
export const allRoutes = router;
```

<br><br>

**TODO 5. Setup API Server Settings**

<u>File: app.ts</u>

Import `allRoutes` from `./routes/routes.js`.

```typescript
import { allRoutes } from './routes/routes.js';
```

Use `server.use("/api/v1", allRoutes)` to set up the main API routes. Add this after the `server.use(express.json());`.

```typescript
server.use("/api/v1", allRoutes);
```

<br><br>

## 2c. GET API: Get All Merchants
**TODO 6. Create Merchant Service**

<u>File: merchant_service.ts</u>

Create an asynchronous function named `getAllMerchants` that returns a `Promise<MerchantResDTO[] | null>`.

```typescript
export const getAllMerchants = async (): Promise<MerchantReqDTO[] | null> => {
    // Complete try-catch
}
```

Use a `try-catch` bloc to handle any errors during the get all process. Console and throw errors if there are any.

```typescript
try {
    // Complete merchants
    // Complete null merchants
    // Complete return merchants
} catch (error) {
    console.error(error);
    throw error;
}
```

`await` response from `Merchant` model `findAll()` method and assign to `merchants`.

```typescript
const merchants = await Merchant.findAll();
```

Check if there are any `merchants` and return `null` if there are none.

```typescript
if (!merchants) {
    return null;
}
```

`.map` the `merchants` to get `merchant_id` and `merchant_name` for each merchant and return it as a `MerchantReqDTO`.

```typescript
return merchants.map(merchant => ({
    merchant_id: merchant.merchant_id,
    merchant_name: merchant.merchant_name
} as MerchantReqDTO));
```

<br><br>

**TODO 7. Create Merchant Controller**

<u>File: merchant_controller.ts</u>

Create an asynchronous function named `getAllMerchants` that takes `req` of type `Request` and `res` of type `Response`.

```typescript
export const getAllMerchants = async (req: Request, res: Response) => {
    // Complete try-catch
}
```

Use a `try-catch` bloc to handle any errors during the get process.

```typescript
try {
    // Complete data
    // Complete if data null
    // Complete return status(200)
} catch (error) {
    // Complete return status(500)
}
```

`await` response from `merchantService` `getAllMerchants()` function and assign to `data`.

```typescript
const data = await merchantService.getAllMerchants();
```

Return `status(404)` with a message if `data` is null.

```typescript
if (!data) {
    return res.status(404).json({ message: 'Merchants not found' });
}
```

If successful, send `status(200)` with the `data`.

```typescript
res.status(200).json(data);
```

If an erorr occurs, send `status(500)` with an error message.

```typescript
res.status(500).json({ message: 'Internal server error' });
```
<br><br>

**TODO 8. Create Merchant Route**

<u>File: merchant_route.ts</u>

Create a `get` with the route `/api/v1/merchants` and call the `getAllMerchants` function from the `merchantController`.

```typescript
/* /api/v1/merchants */
router.get("/", merchantController.getAllMerchants);
```

This completes the api route for `getAllMerchants`.
<br><br>

## 2d. Get Merchant API
**TODO 9. Create Merchant Service**

<u>File: merchant_service.ts</u>

Create an asynchronous function named `getMerchant` that takes `merchantId` of type `number` and returns `Promise<MerchantResDTO | null>`.

```typescript
export const getMerchant = async (merchantId: number): Promise<MerchantResDTO | null> => {
    // Complete try-catch
}
```

Use a `try-catch` bloc to handle any errors during the get process. Console and throw the error if there are any.

```typescript
try {
    // Complete merchant
    // Complete null merchant
    // Complete return merchant
} catch (error) {
    console.error(error);
    throw error;
}
```

`await` response `merchantId` from `Merchant` model `findByPk()` method and assign to `merchant`.

```typescript
const merchant = await Merchant.findByPk(merchantId);
```

Check if there is a `merchant` and return `null` if there are none.

```typescript
if (!merchant) {
    return null;
}
```

Return the `merchant_id` and `merchant_name` of the `merchant`.

```typescript
return {
    merchant_id: merchant.merchant_id,
    merchant_name: merchant.merchant_name
};
```
<br><br>

**TODO 10. Create Merchant Controller**

<u>File: merchant_controller.ts</u>

Create an asynchronous function named `getMerchant` that takes `req` of type `Request` and `res` of type `Response`.

```typescript
export const getMerchant = async (req: Request, res: Response) => {
    // Complete merchantId
    // Complete try-catch
}
```

`parseInt()` `req.params.merchant_id` and assign to `merchantId` as a constant.

```typescript
const merchantId = parseInt(req.params.merchant_id);
```

Use a `try-catch` bloc to handle any errors during the get process.

```typescript
try {
    // Complete data
    // Complete if data null
    // Complete return status(200)
} catch (error) {
    // Complete return status(500)
}
```

`await` response `merchantId` from `merchantService` `getMerchant` function and assign to `data`.

```typescript
const data = await merchantService.getMerchant(merchantId);
```

Return `status(404)` with a message if `data` is null.

```typescript
if (!data) {
    return res.status(404).json({ message: 'Merchants not found' });
}
```

If successful, send `status(200)` with the `data`.

```typescript
res.status(200).json(data);
```

If an erorr occurs, send `status(500)` with an error message.

```typescript
res.status(500).json({ message: 'Internal server error' });
```
<br><br>

**TODO 11. Create Merchant Route**

<u>File: merchant_route.ts</u>

Create a `get` with the route `/api/v1/merchants/:merchant_id` and call the `getMerchant` function from the `merchantController`.

```typescript
/* /api/v1/merchants/:merchant_id */
router.get("/:merchant_id", merchantController.getMerchant);
```

This completes the api route for `getMerchant`.
<br><br>

## 2e. Update Merchant API
**TODO 12. Create Merchant Service**

<u>File: merchant_service.ts</u>

Create an asynchronous function named `updateMerchant` that takes in `merchantId` of type `number` and `merchantData` that takes in `Partial<MerchantReqDTO>` and returns `Promise<MerchantResDTO | null>`.

```typescript
export const updateMerchant = async (merchantId: number, merchantData: Partial<MerchantReqDTO>): Promise<MerchantResDTO | null> => {
    // Complete try-catch
}
```

Use a `try-catch` bloc to handle any errors during the getAll process. Console and throw the error if there are any.

```typescript
try {
    // Complete merchant
    // Complete null merchant
    // Complete update merchant
    // Complete return merchant
} catch (error) {
    console.error(error);
    throw error;
}
```

`await` response `merchantId` from `Merchant` model `findByPk` method and assign to `merchant`.

```typescript
const merchant = await Merchant.findByPk(merchantId);
```

Return `null` if merchant is null.

```typescript
if (!merchant) {
    return null;
}
```

Update the `merchant` with the `merchantData`.

```typescript
await merchant.update(merchantData);
```

Return the `merchant.toJSON()` as `MerchantResDTO`.

```typescript
return merchant.toJSON() as MerchantResDTO;
```
<br><br>


**TODO 13. Create Merchant Controller**

<u>File: merchant_controller.ts</u>

Create an asynchronous function named `updateMerchant` that takes `req` of type `Request` and `res` of type `Response`.

```typescript
export const updateMerchant = async (req: Request, res: Response) => {
    // Complete merchantId
    // Complete merchantData
    // Complete try-catch
}
```

`parseInt()` `req.params.merchant_id` and assign to `merchantId`.

```typescript
const merchantId = parseInt(req.params.merchant_id);
```

Assign `merchantData` `Partial<MerchantReqDTO>` with `req.body`.

```typescript
const merchantData: Partial<MerchantReqDTO> = req.body;
```

Use a `try-catch` bloc to handle any errors during the get process.

```typescript
try {
    // Complete data
    // Complete if data null
    // Complete return status(200)
} catch (error) {
    // Complete return status(500)
}
```

`await` response `merchantId` and `merchantData` from `merchantService` `updateMerchant` function and assign to `data`.

```typescript
const data = await merchantService.updateMerchant(merchantId, merchantData);
```

Return `status(404)` with a message `data` is null.

```typescript
if (!data) {
    return res.status(404).json({ message: 'Merchant not found' });
}
```

If successful, send `status(200)` with the `data`.

```typescript
res.status(200).json(data);
```

If an erorr occurs, send `status(500)` with an error message.

```typescript
res.status(500).json({ message: 'Internal server error' });
```
<br><br>

**TODO 14. Create Merchant Route**

<u>File: merchant_route.ts</u>

Create a `put` with the route `/api/v1/merchants/:merchant_id` and call the `updateMerchant` function from the `merchantController`.

```typescript
/* /api/v1/merchants/:merchant_id */
router.put("/:merchant_id", merchantController.updateMerchant);
```

This completes the api route for `updateMerchant`.
<br><br>

## 2f. Delete Merchant API
**TODO 15. Create Merchant Service**

<u>File: merchant_service.ts</u>

Create an asynchronous function named `deleteMerchant` that takes `merchantId` of type `number` and returns `Promise<boolean>`.

```typescript
export const deleteMerchant = async (merchantId: number): Promise<boolean> => {
    // Complete try-catch
}
```

Use a `try-catch` bloc to handle any errors during the get process. Console and throw error if there is any.

```typescript
try {
    // Complete merchant
    // Complete false deleted
    // Complete destroy merchant
    // Complete return deleted
} catch (error) {
    console.error(error);
    throw error;
}
```

`await` response `merchantId` from `Merchant` model `findByPk()` method and assign to `merchant`.

```typescript
const merchant = await Merchant.findByPk(merchantId);
```

Return `false` if `merchant` is null.

```typescript
if (!merchant) {
    return false;
}
```

`await` response where `merchant_id`: `merchantId` from `Merchant` model `destroy()` method and assign to `deleted`.

```typescript
const deleted = await Merchant.destroy({ where: { merchant_id: merchantId } });
```

Return if deleted or not.
- If `deleted` is 0, `!!deleted` is false.
- If `deleted` is 1, `!!deleted` is true.

```typescript
return !!deleted;
```
<br><br>

**TODO 16. Create Merchant Controller**

<u>File: merchant_controller.ts</u>

Create an asynchronous function named `deleteMerchant` that takes `req` of type `Request` and `res` of type `Response`.

```typescript
export const deleteMerchant = async (req: Request, res: Response) => {
    // Complete merchantId
    // Complete try-catch
}
```

`parseInt()` `req.params.merchant_id` and assign to `merchantId`.

```typescript
const merchantId = parseInt(req.params.merchant_id);
```

Use a `try-catch` bloc to handle any errors during the delete process.

```typescript
try {
    // Complete data
    // Complete if data null
    // Complete return status(200)
} catch (error) {
    // Complete return status(500)
}
```

`await` response `merchantId` from `merchantService` `deleteMerchant` function and assign to `data`. 

```typescript
const data = await merchantService.deleteMerchant(merchantId);
```

Return `status(404)` with a message if `data` is null.

```typescript
if (!data) {
    return res.status(404).json({ message: 'Merchants not found' });
}
```

If successful, send `status(200)` with the `data`.

```typescript
res.status(200).json({ message: 'Merchant deleted!' });
```

If an erorr occurs, send `status(500)` with an error message.

```typescript
res.status(500).json({ message: 'Internal server error' });
```
<br><br>

**TODO 17. Create Merchant Route**

<u>File: merchant_route.ts</u>

Create a `delete` with the route `/api/v1/merchants/:merchant_id` and call the `deleteMerchant` function from the `merchantController`.

```typescript
/* /api/v1/merchants/:merchant_id */
router.delete("/:merchant_id", merchantController.deleteMerchant);
```

This completes the api route for `deleteMerchant`.