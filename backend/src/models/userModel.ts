import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from "bcrypt";
import Booking from './bookingModel';
import Room from './roomModel'

interface UserAttributes {
  id: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  firstName: string;
  avatar?: string;
  lastName: string;
  role?: 'admin' | 'user';
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
 
  // class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public passwordConfirm!: string;
  public avatar!: string;
  public firstName!: string;
  public lastName!: string;
  //public role!: string;
  public role?: 'admin' | 'user';

    // Virtual property for full name
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    // Instance method for password comparison
    public async correctPassword(candidatePassword: string, userPassword: string): Promise<boolean> {
      return await bcrypt.compare(candidatePassword, userPassword);
    }
  }




  User.init({

  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 60],
        msg: 'Password must be between 8 and 60 characters',
      },
    },
  },
  passwordConfirm: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 60],
        msg: 'Password Confirm must be between 8 and 60 characters',
      },
    },
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: 'https://ca.slack-edge.com/T0266FRGM-U2Q173U05-g863c2a865d7-512',
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 60],
        msg: 'First Name must be between 3 and 60 characters',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 60],
        msg: 'Last Name must be between 1 and 60 characters',
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    validate: {
      isIn: [['admin', 'user']],
    },
  },
}, {
  modelName: 'User',
  sequelize,
  timestamps: true,
  hooks: {
    beforeSave: async (user: User) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
        user.passwordConfirm = await bcrypt.hash(user.passwordConfirm, 12);
      }
    },
  },
});
// Ensure TypeScript knows about the getter method
interface User {
  fullName: string;
}

User.hasMany(Room, { foreignKey: 'userId', as: 'rooms' });
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Room.belongsTo(User, { foreignKey: 'userId', as: 'user' });

//export { User };
export default User;