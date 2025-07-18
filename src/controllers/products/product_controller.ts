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