import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { UsersModule } from 'src/users/users.module';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
    providers: [MessagesService],
    controllers: [MessagesController],
    imports: [SequelizeModule.forFeature([Message]), UsersModule, ChatsModule],
})
export class MessagesModule {}
