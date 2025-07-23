
export interface CreateUserDto {
    username: string;
    user_mobile_number: string;
    user_email: string;
    password: string;
    tokens: number;
    user_round_up_pref?: number;
    user_discount_donate?: number;
    user_gender?: string;
    user_default_donation_method?: 'Round Up' | 'Discount Donate';
    default_charity?: string;
}

export interface UpdateUserDto {
    username?: string;
    user_mobile_number?: string;
    user_email?: string;
    password?: string;
    tokens?: number;
    user_round_up_pref?: number;
    user_discount_donate?: number;
    user_gender?: string;
    user_default_donation_method?: 'Round Up' | 'Discount Donate';
    default_charity?: string;
}

export interface UserResponseDto {
    user_id: number;
    username: string; // <-- Added
    user_mobile_number: string;
    user_email: string;
    password?: string;
    tokens?: number;
    user_round_up_pref: number;
    user_discount_donate: number;
    user_login_status: boolean;
    user_login_datetime: Date | null;
    user_gender: string | null;
    user_default_donation_method: 'Round Up' | 'Discount Donate';
    default_charity?: string;
}