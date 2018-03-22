/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User, Group, } = require('../server/db/models');
const chance = require('chance')(50015); // seeded with a number for 'repeated' randomizations

// Constants for seeding dynamically
const usersToCreate = 50; // minimum of 2 hard coded users will be generated
const groupsToCreate = 15;
const maxGroupNameWords = 5;

const minGroupMembers = 1;
const maxGroupMembers = 15; // if larger than usersToCreate, it will default to usersToCreate

// Generator Functions
const createUsers = numToCreate => {
  const userPromises = [
    User.create({
      email: 'cody@email.com',
      displayName: 'cody',
      firstName: 'Cody',
      lastName: 'Codeman',
      password: '123',
    }),
    User.create({
      email: 'murphy@email.com',
      displayName: 'murphy',
      firstName: 'Murphy',
      lastName: 'Murphman',
      password: '123',
    }),
  ];
  const numToGen = numToCreate - userPromises.length;
  const emails = chance.unique(chance.email, numToGen);
  const userNames = chance.unique(chance.twitter, numToGen);
  for (let i = userPromises.length; i < numToCreate; i++) {
    const userPromise = User.create({
      email: emails.pop(),
      password: chance.string(),
      firstName: chance.first(),
      lastName: chance.last(),
      displayName: userNames.pop().slice(1), // twitter handles start with @
    });
    userPromises.push(userPromise);
  }

  return userPromises;
};

const genGroupName = max => {
  const min = 1;
  const words = chance.integer({ min, max, });
  const wordArr = [];
  for (let i = 0; i < words; i++) {
    wordArr.push(chance.word());
  }
  return wordArr.join(' ');
};

const createGroups = numToCreate => {
  const groupPromises = [];
  for (let i = 0; i < numToCreate; i++) {
    const groupPromise = Group.create({
      name: genGroupName(maxGroupNameWords),
    });
    groupPromises.push(groupPromise);
  }
  return groupPromises;
};

const addMembersToGroups = (groups, users, min, max) => {
  const groupPromises = [];
  for (let group of groups) {
    const members = chance.integer({ min, max, });
    const addEveryone = users.length < members;
    const usersToAssociate = addEveryone ? new Set(users) : new Set();
    if (!addEveryone) {
      while (usersToAssociate.size < members) {
        const randomUser = chance.integer({ min: 0, max: users.length, });
        usersToAssociate.add(users[randomUser]);
      }
    }
    const groupPromise = group.addUsers([...usersToAssociate, ], {
      through: 'UserGroup',
    });
    groupPromises.push(groupPromise);
  }

  return groupPromises;
};

//Seeding begins here!

async function seed() {
  await db.sync({ force: true, });
  console.log('db synced!');

  const users = await Promise.all(createUsers(usersToCreate));
  console.log(`seeded ${users.length} users`);

  const groups = await Promise.all(createGroups(groupsToCreate));
  console.log(`seeded ${groups.length} groups`);

  const associatedGroups = await Promise.all(
    addMembersToGroups(groups, users, minGroupMembers, maxGroupMembers),
  );
  console.log(`associated ${associatedGroups.length} groups`);
  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

console.log('seeding...');
