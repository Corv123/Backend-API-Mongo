import { User } from '../models';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

function getRandom4DigitId() {
    return Math.floor(1000 + Math.random() * 9000);
}

async function generateUnique4DigitUserId(): Promise<number> {
    let id: number;
    let exists = true;
    do {
        id = getRandom4DigitId();
        const user = await User.findOne({ user_id: id }).lean();
        exists = !!user;
    } while (exists);
    return id;
}

export class UserService {
  async createUser(data: CreateUserDto) {
    try {
        // Always generate unique 4-digit user_id for new users
        const user_id = await generateUnique4DigitUserId();
        const user = new User({ ...data, user_id });
        const saved = await user.save();
        return saved.toObject();
    } catch (error) {
        console.error('Mongoose Create User Error:', error);
        throw error;
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await User.findOne({ user_id: userId }).lean();
      return user;
    } catch (error) {
      console.error('Error in getUserById service:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find().lean();
      return users;
    } catch (error) {
      console.error('Error in getAllUsers service:', error);
      throw error;
    }
  }

  async updateUser(userId: number, updateData: UpdateUserDto) {
    try {
      const updated = await User.findOneAndUpdate({ user_id: userId }, updateData, { new: true }).lean();
      return updated;
    } catch (error) {
      console.error('Error in updateUser service:', error);
      throw error;
    }
  }

  async deleteUser(userId: number) {
    try {
      const result = await User.deleteOne({ user_id: userId });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error in deleteUser service:', error);
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await User.findOne({ user_email: email }).lean();
      return user;
    } catch (error) {
      console.error('Error in findByEmail service:', error);
      throw error;
    }
  }

  async updateUsername(userId: number, username: string) {
    try {
      const updated = await User.findOneAndUpdate({ user_id: userId }, { username }, { new: true }).lean();
      return updated;
    } catch (error) {
      console.error('Error in updateUsername service:', error);
      throw error;
    }
  }

  async updatePassword(userId: number, password: string) {
    try {
      const updated = await User.findOneAndUpdate({ user_id: userId }, { password }, { new: true }).lean();
      return updated;
    } catch (error) {
      console.error('Error in updatePassword service:', error);
      throw error;
    }
  }

  async updateEmail(userId: number, user_email: string) {
    try {
      const updated = await User.findOneAndUpdate({ user_id: userId }, { user_email }, { new: true }).lean();
      return updated;
    } catch (error) {
      console.error('Error in updateEmail service:', error);
      throw error;
    }
  }

  async updateMobile(userId: number, user_mobile_number: string) {
    try {
      const updated = await User.findOneAndUpdate({ user_id: userId }, { user_mobile_number }, { new: true }).lean();
      return updated;
    } catch (error) {
      console.error('Error in updateMobile service:', error);
      throw error;
    }
  }
}