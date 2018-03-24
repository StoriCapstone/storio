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
const { User, Group, Story, Comment, } = require('../server/db/models');
const chance = require('chance')(50015); // seeded with a number for 'repeated' randomizations
const moment = require('moment');

// Constants for seeding dynamically
const usersToCreate = 50; // minimum of 2 hard coded users will be generated
const groupsToCreate = 15;
const maxGroupNameWords = 5;

const minGroupMembers = 1;
const maxGroupMembers = 15; // if larger than usersToCreate, it will default to usersToCreate

const maxStoryTitle = 3;
const storiesToCreate = 20;
const maxStoryGroups = 3; // this represents the maximum number of groups that will be assigned. Not guaranteed

const maxStoryComments = 30 // we will randomly generate up to these many comments, max 1 per user thus it is possible for no comments
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

  const avatars = ['/Test_assets/portraits/portrait1.jpeg', '/Test_assets/portraits/portrait2.jpeg', '/Test_assets/portraits/portrait3.jpeg', '/Test_assets/portraits/portrait4.jpeg', '/Test_assets/portraits/portrait5.jpeg', '/Test_assets/portraits/portrait6.jpg', , '/Test_assets/portraits/portrait7.jpg', '/Test_assets/portraits/portrait8.jpg', '/Test_assets/portraits/portrait9.jpg', '/Test_assets/portraits/portrait10.jpg', '/noAvatar.png', '/noAvatar.png', '/noAvatar.png', '/noAvatar.png', '/noAvatar.png', '/noAvatar.png'] //higher chance of default image

  const numToGen = numToCreate - userPromises.length;
  const emails = chance.unique(chance.email, numToGen);
  const userNames = chance.unique(chance.twitter, numToGen);
  for (let i = userPromises.length; i < numToCreate; i++) {
    const userPromise = User.create({
      email: emails.pop(),
      password: chance.string(),
      firstName: chance.first(),
      lastName: chance.last(),
      avatarUrl: avatars[chance.integer({ min: 0, max: avatars.length - 1, })],
      displayName: userNames.pop().slice(1), // twitter handles start with @
    });
    userPromises.push(userPromise);
  }

  return userPromises;
};

const genName = max => {
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
      name: genName(maxGroupNameWords),
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
    const groupPromise = group.addUsers([...usersToAssociate,], {
      through: 'UserGroup',
    });
    groupPromises.push(groupPromise);
  }

  return groupPromises;
};

const createStories = numToCreate => {
  const storyPromises = [];
  const genres = [
    'Crime',
    'Memorial',
    'History',
    'Family',
    'Scary',
    'Funny',
    'Educational',
  ];
  const stories = [
    {
      url:
        'https://upload.wikimedia.org/wikipedia/commons/5/5e/Ada_Lovelace_%28As_Told_By_U.S._Chief_Technology_Officer_Megan_Smith%29.mp3',
      mediaLength: 42,
    },
    {
      url:
        'https://upload.wikimedia.org/wikipedia/commons/a/a5/Uncle_Josh_and_the_Insurance_Company_-_Cal_Stewart.mp3',
      mediaLength: 152,
    },
    {
      url: 'http://www.obamadownloads.com/mp3s/cairo-speech.mp3',
      mediaLength: 3302,
    },
    {
      url: 'http://www.obamadownloads.com/mp3s/reelection-speech.mp3',
      mediaLength: 1226,
    },
    {
      url: 'http://www.obamadownloads.com/mp3s/nobel-peace-speech.mp3',
      mediaLength: 2160,
    },
  ];

  //const thumbnails = [`http://lorempixel.com/400/200/?v='] //higher chance of default image
  const MAX_RANDOM_UPVOTES = 300
  const MAX_RANDOM_DOWNVOTES = 40

  for (let i = 0; i < numToCreate; i++) {
    const name = genName(maxStoryTitle);
    const genre = genres[chance.integer({ min: 0, max: genres.length - 1, })];
    const thumbnailUrl = `http://lorempixel.com/400/200/?v=${chance.integer({ min: 0, max: 100, })}`
    const releaseDate = chance.bool({ likelihood: 20, }) ?
      moment(chance.date({ year: chance.integer({ min: 2019, max: 2100, }), })).format('YYYY-MM-DD hh:mm:ss') :
      null
    const { url, mediaLength, } = stories[
      chance.integer({ min: 0, max: stories.length - 1, })
    ];
    const upvotes = chance.integer({ min: 0, max: MAX_RANDOM_UPVOTES, });
    const downvotes = chance.integer({ min: 0, max: MAX_RANDOM_DOWNVOTES, });
    const storyPromise = Story.create({
      name,
      genre,
      thumbnailUrl,
      releaseDate,
      url,
      mediaLength,
      upvotes,
      downvotes
    });
    storyPromises.push(storyPromise);
  }
  return storyPromises
};

const setStoryOwners = (stories, users) => {
  const storyPromises = []
  for (let story of stories) {
    const storyPromise = story.setUser(users[chance.integer({ min: 0, max: users.length - 1, })])
    storyPromises.push(storyPromise)
  }
  return storyPromises
}

const setStoryGroups = async (stories, maxGroups) => {
  const storyGroupPromises = []
  for (let story of stories) {
    const user = await story.getUser()
    const groups = await user.getGroups()
    let i = 0
    while (i++ < maxGroups && groups.length) {
      const randomGroupIdx = chance.integer({ min: 0, max: groups.length - 1, })
      const storyGroupPromise = await story.addGroups(groups[randomGroupIdx])
      storyGroupPromises.push(storyGroupPromise)
      groups.slice(randomGroupIdx, 1)
    }
  }
  return storyGroupPromises
}

const genStoryComments = async (stories, maxComments) => {
  const commentPromises = []
  for (let story of stories) {
    const users = await story.getUsersWhoCanView()
    const commentsToCreate = chance.integer({ min: 0, max: maxComments, })
    let i = 0
    while (i++ < commentsToCreate && users.length) {
      const randomUserIdx = chance.integer({ min: 0, max: users.length - 1, })
      const content = chance.paragraph({ sentences: 2, })
      const newComment = await Comment.create({ content, })
      await newComment.setUser(users[randomUserIdx])
      const storyPromise = await story.addComment(newComment)
      users.splice(randomUserIdx, 1)
      commentPromises.push(storyPromise)
    }
  }

  return commentPromises
}

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

  const stories = await Promise.all(createStories(storiesToCreate))
  console.log(`seeded ${stories.length} stories`);

  const storyOwners = await Promise.all(setStoryOwners(stories, users))
  console.log(`associated ${storyOwners.length} stories to owners`);

  const storyGroups = await setStoryGroups(storyOwners, maxStoryGroups)
  console.log(`There are now ${storyGroups.length} stories to group associations`);

  const storyComments = await genStoryComments(stories, maxStoryComments)
  console.log(`There are now ${storyComments.length} comments on stories`);
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
