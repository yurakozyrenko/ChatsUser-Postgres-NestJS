import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { User } from '../users/users.model';
import { UserChats } from '../user-chats/user-chats.model';
import { UsersModule } from 'src/users/users.module';
import { UserChatsModule } from 'src/user-chats/user-chats.module';

@Module({
    controllers: [ChatsController],
    providers: [ChatsService],
    imports: [
        SequelizeModule.forFeature([Chat, User, UserChats]),
        UsersModule,
        UserChatsModule,
    ],
    exports: [ChatsService],
})
export class ChatsModule {}
