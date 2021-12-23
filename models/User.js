//require the sequelize package to manipulate the model and datatypes
const { Model, DataTypes } = require("sequelize");
//require the sequelize connection
const sequelize = require("../config/connection");
//require the hashing of sensitive information
const bcrypt = require("bcrypt");
//declare the User model and condition to hash the password
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
  static score(body, models) {
    return models.UserRatings.create({
      user_id: body.user_id,
    }).then(() => {
      return User.findOne({
        where: {
          id: body.user_id,
        },
        attributes: [
          "id",
          "username",
          "email",
          "rating",
          "last_login",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM ratings WHERE user.id = ratings.user_id)"
            ),
            "ratings",
          ],
        ],
        //include related data to the User model
        include: [
          {
            model: models.Job,
            attributes: [
              "id",
              "title",
              "owner_id",
              "employee_id",
              "created_at",
            ],
            include: {
              model: models.User,
              attributes: ["username"],
            },
          },
        ],
      });
    });
  }
}
//declare the User table , cloumns and dataypes
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE

    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // other columns will go here
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
    user_rating: {
      type: DataTypes.DECIMAL,
      // references: {
      //   model: "ratings",
      //   key: "id",
      // },
    },
    // no need to store jobs completed or offered as that can be counted in the database
    last_login: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  // call the hash function before the user create the password
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    //call the sequelize and actions to be taken in this model
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
//exports the User model
module.exports = User;
