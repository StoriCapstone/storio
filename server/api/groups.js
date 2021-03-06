const router = require('express').Router();
const { Group, User, } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  //get all groups
  Group.scope('populated')
    .findAll()
    .then(result => res.json(result))
    .catch(next);
});

router.post('/addusers', async (req, res, next) => {
  //create a group
  const userIds = req.body.usersIds;
  const group = await Group.findById(req.body.group)
  .catch(next)
  const userPromises = userIds.map(id => User.findById(id));
  Promise.all(userPromises)
    .then(users => group.addUsers(users))
    .then(result => res.json(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  //get a single group
  Group.scope('populated')
    .findById(req.params.id)
    .then(result => res.json(result))
    .catch(next);
});
// group.addUsers([...usersToAssociate, ], {
//   through: 'UserGroup',
// })
router.post('/', (req, res, next) => {
  //create a group
  Group.scope('populated')
    .create(req.body.newGroup)
    .then(group => group.addUser(req.body.user))
    .then(group => res.json(group))
    .catch(next);
});


router.put('/:id', (req, res, next) => {
  //update a group
  Group.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(_ => Group.scope('populated').findById(req.params.id)) ///and return the updated group
    .then(reloadedGroup => res.json(reloadedGroup))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  //delete a group
  Group.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(deleted => {
      res.status(204).json(deleted);
    })
    .catch(next);
});
