import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Chat } from '../chats/chats.model';
import { UserChats } from 'src/user-chats/user-chats.model';
import { UserChatsService } from './user-chats.service';
import { UserChatsController } from './user-chats.controller';

@Module({
    controllers: [UserChatsController],
    providers: [UserChatsService],
    imports: [SequelizeModule.forFeature([User, Chat, UserChats])],
    exports: [UserChatsService],
})
export class UserChatsModule {}
