export interface CreateUserDto {
    username: string; // <-- Added
    user_mobile_number: string;
    user_email: string;
    password: string; // <-- Usually required on creation

    user_allow_dark_mode?: boolean;
    user_round_up_pref?: number;
    user_discount_donate?: number;
    user_gender?: string;
    user_default_donation_method?: 'Round Up' | 'Discount Donate';
}

export interface UpdateUserDto {
    username?: string; // <-- Added
    user_mobile_number?: string;
    user_email?: string;
    user_allow_dark_mode?: boolean;
    user_round_up_pref?: number;
    user_discount_donate?: number;
    user_gender?: string;
    user_default_donation_method?: 'Round Up' | 'Discount Donate';
}

export interface UserResponseDto {
    user_id: number;
    username: string; // <-- Added
    user_mobile_number: string;
    user_email: string;
    user_allow_dark_mode: boolean;
    user_round_up_pref: number;
    user_discount_donate: number;
    user_login_status: boolean;
    user_login_datetime: Date | null;
    user_gender: string | null;
    user_default_donation_method: 'Round Up' | 'Discount Donate';
}