
import { User, UserDocument } from '../models/User';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import bcrypt from 'bcryptjs';

export class UserService {
    async updateUser(userId: number, updateData: UpdateUserDto) {
        const updatePayload: any = { ...updateData };

        if (updateData.password) {
            const hashedPassword = await bcrypt.hash(updateData.password, 10);
            updatePayload.password = hashedPassword;
        }

        const updatedUser = await User.findOneAndUpdate(
            { user_id: userId },
            updatePayload,
            { new: true }
        ).lean();

        return updatedUser;
    }

    async createUser(data: CreateUserDto) {
        data.password = await bcrypt.hash(data.password, 10);
        const user = new User(data);
        return user.save();
    }

    async getAllUsers() {
        return User.find().lean();
    }

    async getUserById(userId: number) {
        return User.findOne({ user_id: userId }).lean();
    }

    async getUserByEmail(email: string) {
        return User.findOne({ user_email: email }).lean();
    }

    async resetPasswordByEmail(email: string, newPassword: string) {
        const hashed = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findOneAndUpdate(
            { user_email: email },
            { password: hashed },
            { new: true }
        ).lean();

        return updatedUser;
    }
}