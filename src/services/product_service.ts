import { ProductReqDTO, ProductResDTO } from "../dtos/product_dto";
import Product from "../models/product";
import Merchant from "../models/merchant";

export const createProduct = async (productData: ProductReqDTO) : Promise<ProductReqDTO> => {
    try {
        const newProduct = await Product.new {
            ...productData
        });
        return newProduct. as ProductReqDTO;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getAllProducts = async (): Promise<ProductReqDTO[] | null> => {
    try {
        const products = await Product.find();
            {/*Specifies the alias of the relationship between the tables.
                ===as: "merchant"
                Specifies the model to retrieve data from.
                ===model: Merchant
                Defines the column(s) to retrieve from the model.
                    to retrieve all columns, remove the attributes.
                ===attributes: ["merchant_name"]
                Ensures that only records that have an association with the model is returned.
                ===required: true
                */
                // include removed for Mongoose [
                    {
                        as: "merchant",
                        model: Merchant,
                        attributes: ["merchant_name"],
                        required: true
                    }
                ]
            }
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
        const products = await Product.find(  
            {
                where: {
                    merchant_id: merId
                },
                // include removed for Mongoose [
                        {
                            as: "merchant",
                            model: Merchant,
                            attributes: ["merchant_name"],
                            required: true
                        }
                ]
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

export const findByIdAndUpdateProduct = async (productId: number, productData: Partial<ProductReqDTO>): Promise<ProductReqDTO | null> => {
    try {
        if (!productData) {
            return null;
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return null;
        }

        await product.findByIdAndUpdate(productData);
        return product. as ProductReqDTO;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export const deleteProduct = async (productId: number): Promise<boolean> => {
    try {
        const deletedCount = await Product.deleteOne({ where: { product_id: productId } });
        return deletedCount > 0;
    } catch (e) {
        console.error(e);
        throw e;
    }
}