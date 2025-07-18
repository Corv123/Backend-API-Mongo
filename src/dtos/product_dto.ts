export interface ProductReqDTO {
    merchant_id: number;
    product_name: string;
}

export interface ProductResDTO {
    merchant_id: number;
    merchant_name: string;
    product_id: number;
    product_name: string;
}