import { Request, Response } from 'express';
import { merchantService } from "../../services"
import { MerchantReqDTO } from "../../dtos/merchant_dto";

export const createMerchant = async (req: Request, res: Response) => {
    const merchantData: MerchantReqDTO = req.body;
    try {
        if (!merchantData.merchant_name) {
            return res.status(400).json({ message: 'Merchant name is required' });
        }

        const newMerchant = await merchantService.createMerchant(merchantData);
        res.status(201).json(newMerchant);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getAllMerchants = async (req: Request, res: Response) => {
    try {
        // get all merchants from service
        const data = await merchantService.getAllMerchants();
        // if merchants not found return status(404)
        if (!data) {
            return res.status(404).json({ message: 'Merchants not found' });
        }
        // if success return status(200)
        res.status(200).json(data);
    } catch (error) {
        // Complete return status(500)
    }
}

export const getMerchant = async (req: Request, res: Response) => {
    const merchantId = parseInt(req.params.merchant_id);
    try {
        const data = await merchantService.getMerchant(merchantId);
        // if merchants not found return status(404)
        if (!data) {
            return res.status(404).json({ message: 'Merchants not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateMerchant = async (req: Request, res: Response) => {
    const merchantId = parseInt(req.params.merchant_id);
    const merchantData: Partial<MerchantReqDTO> = req.body;
    try {
        //await response merchantId and merchantData from merchantService updateMerchant function and assign to data.
        const data = await merchantService.updateMerchant(merchantId, merchantData);
        //Return status(404) with a message data is null.
        if (!data) {
            return res.status(404).json({ message: 'Merchant not found' });
        }
        //If successful, send status(200) with the data.
        res.status(200).json(data);

    } catch (error) {
        //If an error occurs, send status(500) with an error message.
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteMerchant = async (req: Request, res: Response) => {
    const merchantId = parseInt(req.params.merchant_id);
    try {
        //await response merchantId from merchantService deleteMerchant function and assign to data.

        const data = await merchantService.deleteMerchant(merchantId);
        //Return status(404) with a message if data is null.
        
        if (!data) {
            return res.status(404).json({ message: 'Merchants not found' });
        }
        //If successful, send status(200) with the data.
        
        res.status(200).json({ message: 'Merchant deleted!' });

    } catch (error) {
        //If an error occurs, send status(500) with an error message.
        
        res.status(500).json({ message: 'Internal server error' });
    }
}