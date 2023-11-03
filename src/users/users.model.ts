import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Chat } from '../chats/chats.model';
import { UserChats } from 'src/user-chats/user-chats.model';
import { Message } from 'src/messages/messages.model';

interface UserCreationAttrs {
    username: string;
}

@Table({ tableName: 'users', updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 'Yura',
        description: 'Уникальное имя пользователя',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    username: string;

    @BelongsToMany(() => Chat, () => UserChats)
    chats: Chat[];

    @HasMany(() => Message)
    messages: Message[];
}
