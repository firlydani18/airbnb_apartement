import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import RoomAvailability from './roomAvailabilityModel';


interface AvailabilityAttributes {
  id: string;
  roomAvailabilityId: string; // Foreign key to RoomAvailability
  date: Date;
  availableRooms: number;
  price: number;
}

interface AvailabilityCreationAttributes extends Optional<AvailabilityAttributes, 'id'> {}

class Availability extends Model<AvailabilityAttributes, AvailabilityCreationAttributes> implements AvailabilityAttributes {
  public id!: string;
  public roomAvailabilityId!: string;
  public date!: Date;
  public availableRooms!: number;
  public price!: number;

  // public static associate(models: any) {
  //   // Associating Availability with RoomAvailability
  //   Availability.belongsTo(models.RoomAvailability, { foreignKey: 'roomAvailabilityId', as: 'roomAvailability' });
  // }
  // Additional attributes go here
}

Availability.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  roomAvailabilityId: {
    type: DataTypes.UUID,
    //allowNull: false,
    references: {
      model: RoomAvailability,
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  availableRooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Availability',
  timestamps: true,
});

// Associations
//Availability.belongsTo(RoomAvailability, { foreignKey: 'roomAvailabilityId', as: 'roomAvailability' });


export default Availability;
