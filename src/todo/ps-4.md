# Milestone 4: Product CRUD with Table Joins

## Product Service
### 4a. Set Up Product Service
**TODO 1. Copy n Paste Product Service**

Create `product_service.ts` file in `services` folder.

<u>File: product_service.ts</u>

We have completed the basic CRUD for you :)

```typescript
import { ProductReqDTO, ProductResDTO } from "../dtos/product_dto";
import Product from "../models/product";
import Merchant from "../models/merchant";

export const createProduct = async (productData: ProductReqDTO) : Promise<ProductReqDTO> => {
    try {
        const newProduct = await Product.create({
            ...productData
        });
        return newProduct.toJSON() as ProductReqDTO;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getAllProducts = async (): Promise<ProductReqDTO[] | null> => {
    try {
        const products = await Product.findAll();
        
        if (!products || products.length == 0) {
            return null;
        }

        return products.map(product => ({
            merchant_id: product.merchant_id,
            merchant_name: product.merchant.merchant_name,
            product_id: product.product_id,
            product_name: product.product_name,
        } as ProductReqDTO));
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getAllProductsByMerchant = async (merId: number): Promise<ProductReqDTO[] | null> => {
    try {
        const products = await Product.findAll(
            {
                where: {
                    merchant_id: merId
                }
            }
        );
        
        if (!products || products.length == 0) {
            return null;
        }

        return products.map(product => ({
            merchant_id: product.merchant_id,
            merchant_name: product.merchant.merchant_name,
            product_id: product.product_id,
            product_name: product.product_name,
        } as ProductReqDTO));
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getProduct = async (productId: number): Promise<ProductResDTO | null> => {
    try {
        const product = await Product.findByPk(
            productId
        );

        if (!product) {
            return null;
        }

        return {
            merchant_id: product.merchant_id,
            merchant_name: product.merchant.merchant_name,
            product_id: product.product_id,
            product_name: product.product_name
        };
    } catch (e) {
        console.error(e);
        throw e;
    }
} 

export const updateProduct = async (productId: number, productData: Partial<ProductReqDTO>): Promise<ProductReqDTO | null> => {
    try {
        if (!productData) {
            return null;
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return null;
        }

        await product.update(productData);
        return product.toJSON() as ProductReqDTO;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export const deleteProduct = async (productId: number): Promise<boolean> => {
    try {
        const deletedCount = await Product.destroy({ where: { product_id: productId } });
        return deletedCount > 0;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
```

Modify `index.ts` file in `services` folder.

<u>File: index.ts</u>

Export `productService` from `product_service`.

```typescript
export * as productService from "./product_service"
```

### 4b. Get All Products API

**TODO 2. Create Product Service Table Join for getAllProducts**

Add an `include: []` in the `findAll()` to retrieve data of `Product` inclusive of its `merchant_name`.

Specifies the alias of the relationship between the tables.

```typescript
as: "merchant"
```

Specifies the model to retrieve data from.

```typescript
model: Merchant
```

Defines the column(s) to retrieve from the model.
- to retrieve all columns, remove the `attributes`.

```typescript
attributes: ["merchant_name"]
```

Ensures that only records that have an association with the model is returned.

```typescript
required: true
```

This is what it looks like when compiled. Add this into the `findAll()` method.

```typescript
{
    include: [
        {
            as: "merchant",
            model: Merchant,
            attributes: ["merchant_name"],
            required: true
        }
    ]
}
```
<br><br>

**TODO 3. Create Product Service Table Join  for getAllProductsByMerchant**

Add an `include: []` in the `findAll()` to retrieve data of `Product` inclusive of its `merchant_name`.

```typescript
include: [
    {
        as: "merchant",
        model: Merchant,
        attributes: ["merchant_name"],
        required: true
    }
]
```
<br><br>

### 4c. Get Product API
**TODO 4. Create Product Service Table Join for getProduct**

Add an `include: []` in the `findByPk()` to retrieve data of `Product` inclusive of its `merchant_name`.

```typescript
{
    include: [
        {
            as: "merchant",
            model: Merchant,
            attributes: ["merchant_name"],
            required: true
        }
    ]
}
```

## Product Controller
**TODO 5. Copy n Paste Product Controller**

Create `products` folder in `controllers` folder.

Create `product_controller.ts` file in `controllers/products` folder.

<u>File: product_controller.ts</u>

```typescript
import { Request, Response } from 'express';
import { productService } from "../../services"
import { ProductReqDTO } from "../../dtos/product_dto";

export const createProduct = async (req: Request, res: Response) => {
    const productData: ProductReqDTO = req.body;
    try {
        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const merId = req.query.merchant_id as unknown as number;
        var data;
        if (merId != null) {
            data = await productService.getAllProductsByMerchant(merId);
        } else {
            data = await productService.getAllProducts();
        }
        

        if (!data) {
            return res.status(404).json({ message: 'Products not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.product_id;

        const data = await productService.getProduct(productId as unknown as number)

        if (!data) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.product_id;
    const productData: Partial<ProductReqDTO> = req.body;

    try {
        const updatedProduct = await productService.updateProduct(Number(productId), productData);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.product_id;

    try {
        const deleted = await productService.deleteProduct(Number(productId));

        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
```

Create `index.ts` file in `controllers/products` folder.

<u>File: index.ts</u>

Export merchant controller modules.

```typescript
export * as productController from "./product_controller";
```

## Product Route
**TODO 6. Copy n Paste Product Route**

Create `products` folder in `routes/merchants` folder.

Create `product_route.ts` in `products` folder.

<u>File: product_route.ts</u>

```typescript
import { productController } from "../../../controllers/products";
import express from 'express';

const router = express.Router();

/* /api/v1/merchants/products?merchant_id */
router.get("/", productController.getAllProducts)

/* /api/v1/merchants/products/:product_id */
router.get("/:product_id", productController.getProduct)

/* /api/v1/merchants/products */
router.post("/", productController.createProduct)

/* /api/v1/merchants/products/:product_id */
router.put("/:product_id", productController.updateProduct)

/* /api/v1/merchants/products/:product_id */
router.delete("/:product_id", productController.deleteProduct)

export const productRoute = router;
```

Create `index.ts` file in `routes/merchants/products` folder.

<u>File: index.ts</u>

Set Up the Product Router.

```typescript
import express from "express"
import { productRoute } from "./product_route";

const router = express.Router();

router.use('/', productRoute)

export default router;
```

Modify `index.ts` file in `routes/merchants` folder.

<u>File: index.ts</u>

Import `productRoute` from `./products/product_route`.

```typescript
import { productRoute } from "./products/product_route";
```

Set up the route for products before the `merchantRoute`.

```typescript
/* /api/v1/merchants/products */
router.use("/products", productRoute);
```