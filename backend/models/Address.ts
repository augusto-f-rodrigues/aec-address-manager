import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface AddressAttributes {
  id?: string;
  cep: string;
  address: string;
  complement?: string;
  neighborhood: string;
  city: string;
  uf: string;
  number: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, "id"> {}

class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id?: string;
  public cep!: string;
  public address!: string;
  public complement?: string;
  public neighborhood!: string;
  public city!: string;
  public uf!: string;
  public number!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cep: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    complement: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    neighborhood: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    uf: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    number: {
      type: new DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    tableName: "address",
    sequelize,
  }
);

export default Address;
