const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Post model
class Job extends Model {
  static opinion(body, models) {
    return models.Like.create({
      user_id: body.user_id,
      job_id: body.post_id,
    }).then(() => {
      return Job.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          "id",
          "title",
          "description",
          "salary",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM like WHERE job.id = like.job_id)"
            ),
            "likes_count",
          ],
        ],
        include: [
          {
            model: models.Comment,
            attributes: [
              "id",
              "comment_text",
              "job_id",
              "user_id",
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

// create fields/columns for Post model
Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // we can create a table to track applicants - there will be more than
    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // don't think we need a different table for the join. Just store id with job
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "location",
        key: "id",
      },
    },
    job_status: {
      type: DataTypes.ENUM("open", "filled", "complete"),
    },
    // interested: {
    //   type: DataTypes.BOOLEAN,
    // }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "job",
  }
);

module.exports = Job;
