import {
    Column,
    DataType,
    Model,
    Table,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Chat } from 'src/chats/chats.model';
import { User } from 'src/users/users.model';

interface MessageCreationAttrs {
    text: string;
}

@Table({ tableName: 'messages', updatedAt: false })
export class Message extends Model<Message, MessageCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Chat)
    @ApiProperty({
        example: '<CHAT_ID>',
        description:
            ' Индентификатор чата, в который было отправлено сообщение',
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    chat: number;

    @ForeignKey(() => User)
    @ApiProperty({
        example: '<USER_ID>',
        description: 'Индентификатор отправителя сообщения',
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    author: number;

    @ApiProperty({
        example: 'Hello',
        description: 'Текст отправленного сообщения',
    })
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    text: string;

    @BelongsTo(() => User)
    user: User;
}
