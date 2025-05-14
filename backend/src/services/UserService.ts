import { prisma } from '../lib/prisma';
import { User } from '../models/User';
import { UserData } from '../types';
import bcrypt from 'bcrypt';

export class UserService {
  async findAll() {
    const users = await prisma.user.findMany();
    return users.map(user => new User(user));
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    return user ? new User(user) : null;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    return user ? new User(user) : null;
  }

  async create(data: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });
    return new User(user);
  }

  async update(id: string, data: Partial<UserData>) {
    const user = await prisma.user.update({
      where: { id },
      data
    });
    return new User(user);
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: { id }
    });
  }

  async validatePassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }
} 