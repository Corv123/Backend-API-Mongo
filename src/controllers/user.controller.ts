import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User, UserDocument } from '../models/User';
import bcrypt from 'bcryptjs';

export class UserController {
    private userService = new UserService();

    constructor() {
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.login = this.login.bind(this);
        this.checkExists = this.checkExists.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.resetPasswordByEmail = this.resetPasswordByEmail.bind(this);
    }
    
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            // Map each user to include user_object_id
            const usersWithObjectId = users.map((user: any) => ({
                ...user,
                user_object_id: user._id
            }));
            return res.status(200).json({ status: 'success', data: usersWithObjectId });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: 'Failed to fetch users' });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.user_id);
            const user = await this.userService.getUserById(id);
            if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
            // Add user_object_id to response
            return res.status(200).json({ status: 'success', data: { ...user, user_object_id: user._id } });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: 'Error fetching user' });
        }
    }

async login(req: Request, res: Response) {
    try {
        const { user_email, password } = req.body;

        const user = await User.findOne<UserDocument>({ user_email });

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Use bcrypt to compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: 'error', message: 'Invalid password' });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                user_id: user.user_id,
                user_object_id: user._id,
                username: user.username,
                user_email: user.user_email,
                user_mobile_number: user.user_mobile_number,
                    user_gender: user.user_gender,
                user_round_up_pref: user.user_round_up_pref,
                user_discount_donate: user.user_discount_donate,
                user_default_donation_method: user.user_default_donation_method,
                default_charity: user.default_charity
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body as CreateUserDto);
            // Add user_object_id to response
            return res.status(201).json({ status: 'success', data: { ...user.toObject(), user_object_id: user._id } });
        } catch (err) {
            console.error('Create User Error:', err); // 🔍 This will print the exact problem
            return res.status(500).json({ status: 'error', message: 'Failed to create user' });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.user_id);
            const updated = await this.userService.updateUser(id, req.body as UpdateUserDto);
            // Add user_object_id to response
            return res.status(200).json({ status: 'success', data: { ...updated, user_object_id: updated._id } });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: 'Failed to update user' });
        }
    }

    async checkExists(req: Request, res: Response) {
        try {
            const { email, phone } = req.body;
            if (!email && !phone) {
                return res.status(400).json({ status: 'error', message: 'Email or phone is required' });
            }
            const result = await this.userService.checkExists(email, phone);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ status: 'error', message: 'Failed to check user existence' });
        }
    }

    async verifyPassword(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);
            const { password } = req.body;
            if (!password) {
                return res.status(400).json({ status: 'error', message: 'Password is required' });
            }
            const user = await User.findOne({ user_id: userId });
            if (!user) {
                return res.status(404).json({ status: 'error', message: 'User not found' });
            }
            const isValid = await bcrypt.compare(password, user.password);
            return res.status(200).json({ valid: isValid });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: 'Failed to verify password' });
        }
    }
    async getUserByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email as string;

            if (!email) {
            return res.status(400).json({ status: 'error', message: 'Email is required' });
            }

            const user = await User.findOne<UserDocument>({ user_email: email });

            if (!user) {
            return res.status(404).json({ status: 'error', message: 'Email not found' });
            }

            return res.status(200).json({
            status: 'success',
            data: {
                user_id: user.user_id,
                username: user.username,
                user_email: user.user_email
            }
            });
        } catch (err) {
            console.error('getUserByEmail Error:', err);
            return res.status(500).json({ status: 'error', message: 'Failed to verify email' });
        }
    }

    async resetPasswordByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email as string;
            const { password } = req.body;

            if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const updatedUser = await this.userService.resetPasswordByEmail(email, password);

            if (!updatedUser) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
            }

            return res.status(200).json({ status: 'success', message: 'Password reset successfully', data: updatedUser });
        } catch (err) {
            console.error('resetPasswordByEmail Error:', err);
            return res.status(500).json({ status: 'error', message: 'Failed to reset password' });
        }
        }
}