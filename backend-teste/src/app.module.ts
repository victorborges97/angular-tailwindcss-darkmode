/* eslint-disable prettier/prettier */
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

//Models
import { UsersModule } from './users/model.module';
import { ForunsModule } from './foruns/module';
import { TopicsModule } from './topics/module';
import { CommentsModule } from './comments/module';

@Module({
    imports: [PrismaModule, UsersModule, AuthModule, ForunsModule, TopicsModule, CommentsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
