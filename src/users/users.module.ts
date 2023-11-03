import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Chat } from '../chats/chats.model';
import { UserChats } from 'src/user-chats/user-chats.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User, Chat, UserChats])],
    exports: [UsersService],
})
export class UsersModule {}
