import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }

  async uploadProfilePic(userId: number, files: any) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    //serve static file
    const profilePicUrl = `http://localhost:3333/${files.filename}`;
    if (user) {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profilePic: profilePicUrl,
        },
      });
      return {
        message: 'Profile picture uploaded successfully',
        profilePicUrl: profilePicUrl,
      };
    } else {
      throw new ForbiddenException('User not found');
    }
  }
}
