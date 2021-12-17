const router = require('express').Router();
const sequelize = require('../config/connection');
const { Job, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    // res.render('dashboard', { loggedIn: true });
    try{
       const jobs = await Job.findAll({
          where: {
            // use the ID from the session
            user_id: req.session.user_id,
          },
          where:{
            interested: req.session.interested
          },
          attributes: [
            'id',
            'title',
            'description',
            'salary',
            'category_id',
            'created_at',
          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
        })
        const displayJobs = jobs.map(job => job.get({ plain: true }))
            // serialize data before passing to template
            res.render('dashboard', { displayJobs, loggedIn: true });
          
    }      catch(err)  {
            console.log(err);
            res.status(500).json(err);
         };
});
