export interface OrderItemDto {
    product_id: string;
    product_name: string;
    quantity: number;
    price_per_unit: number;
    special_request?: string; // Optional, allows null/undefined
}

export interface CreateOrderDto {
    order_cost: number;
    total_order_cost: number;
    order_type: 'Takeaway' | 'Dine-In' | 'Delivery';
    merchant_name: string;
    merchant_location: string;
    donation_id?: number;
    user_id: number;
    order_status?: string;
    order_complete_datetime?: Date;
    order_items: OrderItemDto[];
}

export interface OrderResponseDto {
    order_id: number;
    order_status: string;
    order_cost: number;
    total_order_cost: number;
    order_type: string;
    merchant_name: string;
    merchant_location: string;
    donation_id: string | null;
    order_complete_datetime: Date | null;
    user_id: string;

    // Add this
    order_items: OrderItemDto[];
}

export interface OrderQueryDto {
    user_id: number;
    order_id?: number;
}