const {expect} = require('chai')
const db = require('../index')
const Group = db.model('group')

describe('Group model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

    //   beforeEach(() => {
    //     return Group.create({
    //       name: 'friends'
    //     })
    //       .then(group => {
    //         friends = group
    //       })
     // })

      it('returns true if the model has a name column', () => {
        expect(Group.attributes.name).to.be.an('object')
      })

    }) // end describe('correctPassword')
 // }) // end describe('instanceMethods')
//}) // end describe('User model')
