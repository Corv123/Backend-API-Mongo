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
            return res.status(200).json({ status: 'success', result: { data: users } });
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to fetch users', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.user_id);
            if (isNaN(id)) {
                return res.status(400).json({ status: 'error', message: 'Invalid user_id parameter' });
            }
            const user = await this.userService.getUserById(id);
            if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
            return res.status(200).json({ status: 'success', result: { data: user } });
        } catch (error) {
            console.error('Error in getUserById:', error);
            return res.status(500).json({ status: 'error', message: 'Error fetching user', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

async login(req: Request, res: Response) {
    try {
        const { user_email, password } = req.body;
        if (!user_email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
        }
        const user = await this.userService.findByEmail(user_email) as { password?: string } | null;
        if (!user || user.password !== password) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
        }
        // For now, just return user info (excluding password)
        const { password: _, ...userInfo } = user;
        return res.status(200).json({ status: 'success', result: { data: [userInfo] } });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' });
    }
}

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body as CreateUserDto);
            return res.status(201).json({ status: 'success', result: { data: [{ profile_message: 'profile information posted successfully' }] } });
        } catch (error) {
            console.error('Create User Error:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to create user', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.user_id);
            const updated = await this.userService.updateUser(id, req.body as UpdateUserDto);
            return res.status(200).json({ status: 'success', result: { data: updated } });
        } catch (error) {
            console.error('Error in updateUser:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to update user', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.user_id);
            const result = await this.userService.deleteUser(id);
            if (!result) return res.status(404).json({ status: 'error', message: 'User not found' });
            return res.status(200).json({ status: 'success', message: 'User deleted' });
        } catch (error) {
            console.error('Error in deleteUser:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to delete user', details: error instanceof Error ? error.message : 'Unknown error' });
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

            return res.status(200).json({ status: 'success', message: 'Username updated', result: { data: updatedUser } });
        } catch (error) {
            console.error('Error in updateUsername:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to update username', details: error instanceof Error ? error.message : 'Unknown error' });
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