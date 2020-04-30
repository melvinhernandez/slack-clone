export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "Username must be alphanumeric.",
        },
        len: {
          args: [3, 25],
          msg: "Username must be between 3 and 25 characters long.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 100],
          msg: "Password must be between 3 and 25 characters long.",
        },
      },
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: "member",
      foreignKey: { name: "userId", field: "user_id" },
    });
    User.belongsToMany(models.Channel, {
      through: "channel_member",
      foreignKey: { name: "userId", field: "user_id" },
    });
  };

  return User;
};
