import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';;
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/uploads'),
      renderPath: '/uploads',
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    
  ],
})
export class AppModule {}
