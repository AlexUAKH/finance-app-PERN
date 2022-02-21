const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING, length: 20, defaultValue: "" },
  isMailConfermed: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Profile = sequelize.define("profile", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING }
});

const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.TEXT }
});

const Record = sequelize.define("record", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING, length: 4 },
  date: { type: DataTypes.DATE },
  uah: { type: DataTypes.INTEGER, unsigned: true, defaultValue: 0 },
  usd: { type: DataTypes.INTEGER, defaultValue: 0 },
  euro: { type: DataTypes.INTEGER, defaultValue: 0 },
  userName: { type: DataTypes.STRING, length: 20 }
});

const Summary = sequelize.define("summary", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  total: { type: DataTypes.INTEGER },
  offering: { type: DataTypes.INTEGER },
  spending: { type: DataTypes.INTEGER }
});

const ChartModel = sequelize.define("chart", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  spend: { type: DataTypes.STRING },
  offer: { type: DataTypes.STRING }
});

User.hasOne(Token);
Token.belongsTo(User);

User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Record);
Record.belongsTo(User);

module.exports = {
  User,
  Token,
  Profile,
  Record,
  Summary,
  ChartModel
};

//
// const User = sequelize.define('user', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//   email: {type: DataTypes.STRING, unique: true},
//   password: {type: DataTypes.STRING},
//   role: {type: DataTypes.STRING, defaultValue: "USER"}
// });
//
// const Basket = sequelize.define('basket', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
// });
//
// const BasketDevice = sequelize.define('basket_device', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
// });
//
// const Device = sequelize.define('device', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//   name: {type: DataTypes.STRING, unique: true, allowNull: false},
//   price: {type: DataTypes.INTEGER, allowNull: false},
//   rate: {type: DataTypes.INTEGER, defaultValue: 0},
//   img: {type: DataTypes.STRING, allowNull: false}
// });
//
// const Rate = sequelize.define('rate', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//   rate: {type: DataTypes.INTEGER, allowNull: false}
// });
//
// const DeviceInfo = sequelize.define('device_info', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//   title: {type: DataTypes.STRING, allowNull: false},
//   description: {type: DataTypes.STRING, allowNull: false}
// });
//
// const Brand = sequelize.define('brand', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//   name: {type: DataTypes.STRING, unique: true, allowNull: false}
// });
//
// const Type = sequelize.define('type', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//   name: {type: DataTypes.STRING, unique: true, allowNull: false}
// });
//
// const TypeBrand = sequelize.define('type_brand', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
// });
//
// User.hasOne(Basket);
// Basket.belongsTo(User);
//
// User.hasMany(Rate);
// Rate.belongsTo(User);
//
// Basket.hasMany(BasketDevice);
// BasketDevice.belongsTo(Basket);
//
// Type.hasMany(Device);
// Device.belongsTo(Type);
//
// Brand.hasMany(Device);
// Device.belongsTo(Brand);
//
// Device.hasMany(Rate);
// Rate.belongsTo(Device);
//
// Device.hasMany(BasketDevice);
// BasketDevice.belongsTo(Device);
//
// Device.hasMany(DeviceInfo, {as: 'info'});
// DeviceInfo.belongsTo(Device);
//
// Type.belongsToMany(Brand, {through: TypeBrand});
// Brand.belongsToMany(Type, {through: TypeBrand});
//
// module.exports = {
//   User,
//   Basket,
//   BasketDevice,
//   Device,
//   Type,
//   Brand,
//   Rate,
//   TypeBrand,
//   DeviceInfo
// };
