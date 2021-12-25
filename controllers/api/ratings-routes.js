//require the express routes package
const router = require("express").Router();
const { Ratings, User } = require("../../models");

// router.get("/", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         id: req.user.id,
//       },
//       include: [
//         {
//           model: Ratings,
//           as: "user_ratings",
//           attributes: ["id", "user_id", "rating"],
//         },
//       ],
//     });
//     // const rating = await Ratings.findAll();
//     // res.json(rating);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get("/", async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "username", "email"],
      include: [
        {
          model: Ratings,
          as: "user_ratings",
          attributes: ["rating"],
        },
      ],
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "username", "email"],
      include: [
        {
          model: Ratings,
          as: "user_ratings",
          attributes: ["rating"],
        },
      ],
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Ratings,
          as: "user_ratings",
          attributes: ["id", "user_id", "rating"],
        },
      ],
    });
    const rating = await Ratings.create({
      where: {
        user_id: req.body.user_id,
      },

      rating: req.body.rating,
    });
    if (!rating) {
      res.status(404).json({ message: "No rating with that ID" });
      return;
    } else {
      res.json(rating);
      const total1 = [];
      for (let i = 0; i < user.user_ratings.length; i++) {
        console.log(
          user.user_ratings[i].rating + typeof user.user_ratings[i].rating
        );

        total1.push(user.user_ratings[i].rating);
        console.log(total1);
        const avg = (arr) => {
          const sum = arr.reduce((acc, cur) => acc + cur);
          const average = sum / arr.length;
          // console.log(average);
          return average;
        };
        const userAverage = avg(total1).toFixed(1);
        console.log(userAverage + typeof userAverage);
      }
    }
  } catch (err) {
    console.log(err.errors);
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "username", "email"],
      include: [
        {
          model: Ratings,
          as: "user_ratings",
          attributes: ["rating"],
        },
      ],
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
