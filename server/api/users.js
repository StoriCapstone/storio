const router = require('express').Router();
const { User, } = require('../db/models');
const db = require('../db/');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', ],
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/not-in/:groupid', (req, res, next) => {
  const sql = `
  SELECT
  "public".users."id",
  "public".users."firstName",
  "public".users."lastName",
  "public".users."displayName",
  "public".users.email
  FROM
  "public".users
  where "public".users."id" NOT IN
  (SELECT
  "public".users."id"
  FROM
  "public".users
  JOIN "public"."UserGroup"
  ON "public".users."id" = "public"."UserGroup"."userId"
  WHERE
  "public"."UserGroup"."groupId" = ${req.params.groupid})
  order by "public".users."id"
  `;
  db
    .query(sql, { type: db.QueryTypes.SELECT, })
    .then(users => res.json(users))
    .catch(next);
});
