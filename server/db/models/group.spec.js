const {expect, } = require('chai')
const db = require('../index')
const Group = db.model('group')

describe('Group model', () => {
  beforeEach(() => {
    return db.sync({force: true, })
  })

      it('returns true if the model has a name column', () => {
        expect(Group.attributes.name).to.be.an('object')
      })

    })
