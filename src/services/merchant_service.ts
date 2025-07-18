import { MerchantReqDTO, MerchantResDTO  } from "../dtos/merchant_dto";
import Merchant from "../models/merchant";

export const createMerchant = async (merchantData: MerchantReqDTO): Promise<MerchantResDTO> => {
    try {
        const newMerchant = await Merchant.new merchantData as any);
        return newMerchant. as MerchantResDTO;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllMerchants = async (): Promise<MerchantReqDTO[] | null> => {
    try {
        const merchants = await Merimport { MerchantReqDTO, MerchantResDTO } from "../dtos/merchant_dto";
import Merchant from "../models/merchant";

// Create a new merchant
export const createMerchant = async (merchantData: MerchantReqDTO): Promise<MerchantResDTO> => {
    try {
        const newMerchant = new Merchant(merchantData);
        const savedMerchant = await newMerchant.save();
        return savedMerchant.toObject() as MerchantResDTO;
    } catch (error) {
        console.error("Error in createMerchant:", error);
        throw error;
    }
};

// Get all merchants
export const getAllMerchants = async (): Promise<MerchantResDTO[]> => {
    try {
        const merchants = await Merchant.find().lean();
        return merchants.map(merchant => ({
            merchant_id: merchant.merchant_id,
            merchant_name: merchant.merchant_name
        }));
    } catch (error) {
        console.error("Error in getAllMerchants:", error);
        throw error;
    }
};

// Get a merchant by merchant_id
export const getMerchant = async (merchantId: number): Promise<MerchantResDTO | null> => {
    try {
        const merchant = await Merchant.findOne({ merchant_id: merchantId }).lean();
        return merchant
            ? {
                  merchant_id: merchant.merchant_id,
                  merchant_name: merchant.merchant_name
              }
            : null;
    } catch (error) {
        console.error("Error in getMerchant:", error);
        throw error;
    }
};

// Update a merchant by merchant_id
export const findByIdAndUpdateMerchant = async (
    merchantId: number,
    merchantData: Partial<MerchantReqDTO>
): Promise<MerchantResDTO | null> => {
    try {
        const updatedMerchant = await Merchant.findOneAndUpdate(
            { merchant_id: merchantId },
            merchantData,
            { new: true }
        ).lean();

        return updatedMerchant
            ? {
                  merchant_id: updatedMerchant.merchant_id,
                  merchant_name: updatedMerchant.merchant_name
              }
            : null;
    } catch (error) {
        console.error("Error in findByIdAndUpdateMerchant:", error);
        throw error;
    }
};

// Delete a merchant by merchant_id
export const deleteMerchant = async (merchantId: number): Promise<boolean> => {
    try {
        const result = await Merchant.deleteOne({ merchant_id: merchantId });
        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error in deleteMerchant:", error);
        throw error;
    }
};chant.find();

        if (!merchants) {
            return null;
        }

        return merchants.map(merchant => ({
            merchant_id: merchant.merchant_id,
            merchant_name: merchant.merchant_name
        } as MerchantReqDTO));
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMerchant = async (merchantId: number): Promise<MerchantResDTO | null> => {
    try {
        // Find the merchant by ID
        const merchant = await Merchant.findByPk(merchantId);

        // Check if merchant exists
        if (!merchant) {
            return null;
        }
        // Return the merchant data as a MerchantResDTO
        return {
            merchant_id: merchant.merchant_id,
            merchant_name: merchant.merchant_name
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const findByIdAndUpdateMerchant = async (merchantId: number, merchantData: Partial<MerchantReqDTO>): Promise<MerchantResDTO | null> => {
    try {
        // Find the merchant by ID
        const merchant = await Merchant.findByPk(merchantId);

        // Check if merchant exists
        if (!merchant) {
            return null;
        }
        //Update the merchant with the merchantData.
        await merchant.findByIdAndUpdate(merchantData);

        // Return the merchant. as MerchantResDTO.
        return merchant. as MerchantResDTO;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteMerchant = async (merchantId: number): Promise<boolean> => {
    try {
        //await response merchantId from Merchant model findByPk() method and assign to merchant.

        const merchant = await Merchant.findByPk(merchantId);
        //Return false if merchant is null.
        
        if (!merchant) {
            return false;
        }
        //await response where merchant_id: merchantId from Merchant model deleteOne() method and assign to deleted.
        
        const deleted = await Merchant.deleteOne({ where: { merchant_id: merchantId } });
        //Return if deleted or not.
        
        //If deleted is 0, !!deleted is false.
        //If deleted is 1, !!deleted is true.
        return !!deleted;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function updateMerchant(merchantId: number, merchantData: Partial<MerchantReqDTO>) {
    throw new Error('Function not implemented.');
}
