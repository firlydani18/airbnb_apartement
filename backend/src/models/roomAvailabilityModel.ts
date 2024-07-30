// roomAvailabilityModel.ts
import { Model, DataTypes, Optional, Association } from 'sequelize';
import sequelize from '../config/db';
import Availability from './Availability';
import Room from './roomModel';
//import { RoomAvailabilityType, AvailabilityType } from '../shared/types'; // Adjust the import based on your structure

// interface AvailabilityAttributes {
//   date: Date;
//   availableRooms: number;
//   price: number;
// }

// Define the attributes for RoomAvailability
interface RoomAvailabilityAttributes {
  id: string;
  roomId: string; // Use roomId to reference Room model
  roomName: string;
  // availability: AvailabilityAttributes [];
}

interface RoomAvailabilityCreationAttributes extends Optional<RoomAvailabilityAttributes, 'id'> {}

// Define the RoomAvailability model extending from Sequelize's Model class
class RoomAvailability extends Model<RoomAvailabilityAttributes, RoomAvailabilityCreationAttributes> implements RoomAvailabilityAttributes {
  public id!: string;
  public roomId!: string;
  public roomName!: string;
  public readonly availabilities?: Availability[];
  //public availability!: AvailabilityAttributes [];
  // public availabilities?: Availability[];
  // public static associate(p0: { Availability: typeof Availability; }) {
  //   //RoomAvailability.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
  //   RoomAvailability.hasMany(Availability, { foreignKey: 'roomAvailabilityId', as: 'availabilities' });
  // }

  public static associations: {
    availabilities: Association<RoomAvailability, Availability>;
  };
}

// Initialize the RoomAvailability model with attributes and options
RoomAvailability.init({
  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true
  },
  roomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Room,
      key: 'id',
    },
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // availability: {
  //   type: DataTypes.JSON, // Adjust as necessary, or use a custom type if available
  //   allowNull: false,
  // },
}, {
  sequelize,
  modelName: 'RoomAvailability',
  timestamps: true,
});


// Associations
//RoomAvailability.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
RoomAvailability.hasMany(Availability, { foreignKey: 'roomAvailabilityId', as: 'availabilities' });

Availability.belongsTo(RoomAvailability, { foreignKey: 'roomAvailabilityId', as: 'roomAvailabilities' });

export default RoomAvailability;
