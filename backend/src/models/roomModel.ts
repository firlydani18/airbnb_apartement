// roomModel.ts
import { Model, DataTypes, Optional, Association } from 'sequelize';
import sequelize from '../config/db';
import { BookingType, RoomAvailabilityType, RoomType } from '../shared/types';
import RoomAvailability from './roomAvailabilityModel';
import User from './userModel';
import CartItem from './cart';


// Define the Room attributes, allowing some fields to be optional during model creation
interface RoomAttributes {
  id: string;
  userId: string;
  name: string;
  city: string;
  description: string;
  breakfast: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  // roomAvailabilitys?: RoomAvailabilityType[];
  // bookings?: BookingType[];
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}

// Define the Room model extending from Sequelize's Model class
class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
  public id!: string;
  public userId!: string;
  public name!: string;
  public city!: string;
  public description!: string;
  public breakfast!: string;
  public type!: string;
  public adultCount!: number;
  public childCount!: number;
  public facilities!: string[];
  public starRating!: number;
  public imageUrls!: string[];
  public lastUpdated!: Date;
  public readonly roomAvailabilities?: RoomAvailability[];
  // public roomAvailabilitys?: RoomAvailabilityType[];
  // public bookings?: BookingType[];


  // public static associate(p0: { RoomAvailability: typeof RoomAvailability; }) {
  //   //Room.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  //   Room.hasMany(RoomAvailability, { foreignKey: 'roomId', as: 'roomAvailabilities' });
  // }
  // Additional model attributes go here
  public static associations: {
    roomAvailabilities: Association<Room, RoomAvailability>;
  };
}

Room.init({
  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    //defaultValue:DataTypes.UUIDV4,
   // allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breakfast: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
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
  // facilities: {
  //   type: DataTypes.ARRAY(DataTypes.STRING),
  //   allowNull: false,
  // },
  facilities: {
    type: DataTypes.JSON, // Ganti dari VARCHAR(255)[] menjadi JSON
    allowNull: false,
  },
  starRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  // imageUrls: {
  //   type: DataTypes.ARRAY(DataTypes.STRING),
  //   allowNull: false,
  // },
  imageUrls: {
    type: DataTypes.JSON, // Ganti dari VARCHAR(255)[] menjadi JSON
    allowNull: false,
  },
  lastUpdated: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // roomAvailabilitys: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  // },
  // bookings: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  // }

}, {
  sequelize,
  modelName: 'Room',
  timestamps: true,
});

// Associations
//Room.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Room.hasMany(RoomAvailability, { foreignKey: 'roomId', as: 'roomAvailabilities' });
// Room.belongsToMany(Booking, { through: 'RoomBookings', as: 'bookings', foreignKey: 'roomId' });
// Room.hasMany(Booking, { foreignKey: 'roomId', as: 'bookings' });

RoomAvailability.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
CartItem.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });

export default Room;
