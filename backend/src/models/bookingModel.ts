import { DataTypes, Model, Optional } from 'sequelize';
// Sesuaikan dengan path ke instance Sequelize
import { CartItemType } from '../shared/types';
import sequelize from '../config/db';
import User from './userModel';
import Room from './roomModel';
import CartItem from './cart';

interface BookingAttributes {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  paymentIntentId?: string;
  status: "pending" | "acc" | "cancel";
  cartId: string;
}

type BookingCreationAttributes = Optional<BookingAttributes, 'id'>;

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {

  
  public id!: string;
  public userId!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public adultCount!: number;
  public childCount!: number;
  public checkIn!: Date;
  public checkOut!: Date;
  public totalCost!: number;
  public paymentIntentId?: string;
  public status!: "pending" | "acc" | "cancel";
  public cartId!: string;
}

Booking.init({
  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    //allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adultCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  childCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  checkIn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  checkOut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalCost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentIntentId: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  cartId: {
     type: DataTypes.JSON,
     allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Booking',
  timestamps: true,
});

// Associations
//Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
//Booking.belongsToMany(Room, { through: 'RoomBookings', as: 'rooms', foreignKey: 'bookingId' });
CartItem.belongsTo(Booking, { foreignKey: 'cartId', as: 'cart' });
Room.belongsToMany(Booking, { through: 'RoomBookings', as: 'bookings', foreignKey: 'roomId' });
// Room.hasMany(Booking, { foreignKey: 'roomId', as: 'bookings' });
export default Booking;