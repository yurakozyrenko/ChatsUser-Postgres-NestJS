import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Chat } from '../chats/chats.model';

@Table({ tableName: 'user_chats', createdAt: false, updatedAt: false })
export class UserChats extends Model<UserChats> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;

    @ForeignKey(() => Chat)
    @Column({
        type: DataType.INTEGER,
    })
    chatId: number;
}
