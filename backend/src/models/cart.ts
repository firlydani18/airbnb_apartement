// cartItemModel.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import Booking from './bookingModel';
import Room from './roomModel';

interface CartItemAttributes {
  id: string;
  //bookingId: string; // Foreign key to Booking
  roomId: string;    // Foreign key to Room
  quantity: number;
  price: number;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id'> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  public id!: string;
  //public bookingId!: string;
  public roomId!: string;
  public quantity!: number;
  public price!: number;
}

CartItem.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // bookingId: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  //   references: {
  //     model: Booking,
  //     key: 'id',
  //   },
  // },
  roomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Room,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'CartItem',
  timestamps: true,
});

export default CartItem;
