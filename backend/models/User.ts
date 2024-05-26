import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface UserAttributes {
  id: string;
  name: string;
  user: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public user!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    user: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    sequelize,
  }
);

export default User;
