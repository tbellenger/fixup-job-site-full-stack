const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
  static score(body, models) {
    return models.UserRatings.create({
      user_id: body.user_id,
      job_id: body.post_id
    }).then(() => {
      return Job.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'title',
          'description',
          'salary',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM like WHERE job.id = like.job_id)'), 'likes_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'job_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}

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
    rating: {
      type: DataTypes.INTEGER,
    },
    // no need to store jobs completed or offered as that can be counted in the database
    last_login: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
