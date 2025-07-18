export interface CreateDonationDto {
    donation_datetime: Date;
    donation_dsgd_amt: number;
    charity_id: number;
    donation_status: string;
    donation_amt: number;
    donation_type: string;
    donation_cause: string;
    user_id: number;
}

export interface DonationQueryDto {
    user_id: number;
    donation_id?: number;
}

export interface DonationResponseDto {
    donation_id: number;
    donation_datetime: Date;
    donation_dsgd_amt: number;
    charity_id: number;
    donation_status: string;
    donation_amt: number;
    donation_type: string;
    donation_cause: string;
    user_id: number;
} 