import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { User } from '../users/users.model';
import { UserChats } from '../user-chats/user-chats.model';

interface ChatCreationAttrs {
    name: string;
    users: number;
}

@Table({ tableName: 'chats', updatedAt: false })
export class Chat extends Model<Chat, ChatCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Соседи', description: 'Уникальное имя чата' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        example: '["<USER_ID_1>", "<USER_ID_2>"]',
        description: 'Cписок пользователей в чате',
    })
    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
    })
    users: number;

    @BelongsToMany(() => User, () => UserChats)
    authors: User[];
}
