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
const { User } = require('../server/db/models');
const chance = require('chance')(50015); // seeded with a number for 'repeated' randomizations

// Constants for seeding dynamically
const usersToCreate = 50; // minimum of 2 hard coded users will be generated

// Generator Functions
const createUsers = numToCreate => {
  const userPromises = [
    User.create({
      email: 'cody@email.com',
      displayName: 'cody',
      firstName: 'Cody',
      lastName: 'Codeman',
      password: '123'
    }),
    User.create({
      email: 'murphy@email.com',
      displayName: 'murphy',
      firstName: 'Murphy',
      lastName: 'Murphman',
      password: '123'
    })
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
      displayName: userNames.pop().slice(1) // twitter handles start with @
    });
    userPromises.push(userPromise);
  }

  return userPromises;
};
async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all(createUsers(usersToCreate));
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
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

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
