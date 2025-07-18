import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User, UserDocument } from '../models/User';

export class UserController {
    private userService = new UserService();

    constructor() {
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.login = this.login.bind(this);
    }
    
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json({ status: 'success', data: users });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: 'Failed to fetch users' });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.user_id);
            const user = await this.userService.getUserById(id);
            if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
            return res.status(200).json({ status: 'success', data: user });
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

        // Simple password check (replace with bcrypt in production)
        const isPasswordValid = user.password === password;

        if (!isPasswordValid) {
            return res.status(401).json({ status: 'error', message: 'Invalid password' });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                user_id: user.user_id,
                username: user.username,                // <-- Added this line
                user_email: user.user_email,
                user_mobile_number: user.user_mobile_number,
                user_gender: user.user_gender,
                user_allow_dark_mode: user.user_allow_dark_mode,
                user_round_up_pref: user.user_round_up_pref,
                user_discount_donate: user.user_discount_donate,
                user_default_donation_method: user.user_default_donation_method
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
            return res.status(201).json({ status: 'success', data: user });
        } catch (err) {
            console.error('Create User Error:', err); // 🔍 This will print the exact problem
            return res.status(500).json({ status: 'error', message: 'Failed to create user' });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.user_id);
            const updated = await this.userService.updateUser(id, req.body as UpdateUserDto);
            return res.status(200).json({ status: 'success', data: updated });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: 'Failed to update user' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.user_id);
            const result = await this.userService.deleteUser(id);
            if (!result) return res.status(404).json({ status: 'error', message: 'User not found' });
            return res.status(200).json({ status: 'success', message: 'User deleted' });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: 'Failed to delete user' });
        }
    }

    async updateUsername(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.user_id);
        const { username } = req.body;

        if (!username || username.trim().length < 2) {
            return res.status(400).json({ status: 'error', message: 'Invalid username' });
        }

        const updatedUser = await this.userService.updateUsername(userId, username);

        if (!updatedUser) return res.status(404).json({ status: 'error', message: 'User not found' });

        return res.status(200).json({ status: 'success', message: 'Username updated', data: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', message: 'Failed to update username' });
    }
}

async updatePassword(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.user_id);
        const { password } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({ status: 'error', message: 'Password must be at least 6 characters' });
        }

        const updatedUser = await this.userService.updatePassword(userId, password);

        if (!updatedUser) return res.status(404).json({ status: 'error', message: 'User not found' });

        return res.status(200).json({ status: 'success', message: 'Password updated', data: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', message: 'Failed to update password' });
    }
}

async updateEmail(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.user_id);
        const { user_email } = req.body;

        if (!user_email || !user_email.includes('@')) {
            return res.status(400).json({ status: 'error', message: 'Invalid email' });
        }

        const updatedUser = await this.userService.updateEmail(userId, user_email);

        if (!updatedUser) return res.status(404).json({ status: 'error', message: 'User not found' });

        return res.status(200).json({ status: 'success', message: 'Email updated', data: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', message: 'Failed to update email' });
    }
}

async updateMobile(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.user_id);
        const { user_mobile_number } = req.body;

        if (!user_mobile_number || user_mobile_number.length < 8) {
            return res.status(400).json({ status: 'error', message: 'Invalid mobile number' });
        }

        const updatedUser = await this.userService.updateMobile(userId, user_mobile_number);

        if (!updatedUser) return res.status(404).json({ status: 'error', message: 'User not found' });

        return res.status(200).json({ status: 'success', message: 'Mobile number updated', data: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', message: 'Failed to update mobile number' });
    }
}
}