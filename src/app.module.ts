import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { Chat } from './chats/chats.model';
import { Message } from './messages/messages.model';
import { UserChats } from './user-chats/user-chats.model';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: String(process.env.DB_PASSWORD),
            database: process.env.DB_DATABASE,
            models: [User, Chat, Message, UserChats],
            autoLoadModels: true,
        }),
        UsersModule,
        ChatsModule,
        MessagesModule,
    ],
})
export class AppModule {}
