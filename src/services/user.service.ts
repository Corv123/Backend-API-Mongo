import { User } from '../models';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

export class UserService {
  async createUser(data: CreateUserDto) {
    try {
        const user = new User(data);
        return await user.save();
    } catch (error) {
        console.error('Mongoose Create User Error:', error); // Add this line
        throw error;
    }
}

  async getUserById(userId: number) {
    return await User.findOne({ user_id: userId }).lean();
  }

  async getAllUsers() {
    return await User.find().lean();
  }

  async updateUser(userId: number, updateData: UpdateUserDto) {
    return await User.findOneAndUpdate({ user_id: userId }, updateData, { new: true }).lean();
  }

  async deleteUser(userId: number) {
    const result = await User.deleteOne({ user_id: userId });
    return result.deletedCount > 0;
  }

  async findByEmail(email: string) {
    return await User.findOne({ user_email: email }).lean();
  }

  async updateUsername(userId: number, username: string) {
    return await User.findOneAndUpdate({ user_id: userId }, { username }, { new: true }).lean();
}

async updatePassword(userId: number, password: string) {
    return await User.findOneAndUpdate({ user_id: userId }, { password }, { new: true }).lean();
}

async updateEmail(userId: number, user_email: string) {
    return await User.findOneAndUpdate({ user_id: userId }, { user_email }, { new: true }).lean();
}

async updateMobile(userId: number, user_mobile_number: string) {
    return await User.findOneAndUpdate({ user_id: userId }, { user_mobile_number }, { new: true }).lean();
}
}