const User = require('./user')
const Group = require('./group')
const Media = require('./media')
const Story = require('./story')
const Comment = require('./comment')
const UserGroup = require('./userGroup')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Story.belongsTo(User);
User.hasMany(Story);

Story.hasMany(Comment);
Comment.belongsTo(Story);
User.hasMany(Comment);
Comment.belongsTo(User);

User.belongsToMany(Group, {through: 'UserGroups', });
Group.belongsToMany(User, {through: 'UserGroups', });

Story.hasMany(Media);
Media.belongsTo(Story);

Story.belongsToMany(Group, {through: 'StoryGroup', } );
Group.belongsToMany(Story, {through: 'StoryGroup', } );

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  UserGroup,
  Group,
  User,
  Media,
  Comment,
  Story,
}
