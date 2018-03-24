import {createStore, combineReducers, applyMiddleware, } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools, } from 'redux-devtools-extension'
import user from './user'
import {default as addMediaForm, } from './addMediaForm';
import {default as waveform, } from './waveform';
<<<<<<< HEAD
import {default as groups, } from './groups';
import {default as stories, } from './stories';

=======
import {default as commentForm, } from './comments';
import {default as story, } from './story'
>>>>>>> master

const reducer = combineReducers({
  user,
  addMediaForm,
  waveform,
<<<<<<< HEAD
  groups,
  stories
=======
  commentForm,
  story,
>>>>>>> master
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true, })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './addMediaForm'
export * from './waveform'
<<<<<<< HEAD
export * from './groups'
export * from './stories'

=======
export * from './comments'
export * from './story'
>>>>>>> master
