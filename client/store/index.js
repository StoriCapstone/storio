import { createStore, combineReducers, applyMiddleware, } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools, } from 'redux-devtools-extension'
import user from './user'
import {default as addMediaForm, } from './addMediaForm';
import {default as waveform, } from './waveform';
import {default as commentForm, } from './comments';
import {default as story, } from './story'
import {default as media, } from './media'
import { default as groups, } from './groups';
import { default as stories, } from './stories';
import {SET_MEDIA, } from './stories'

const reducer = combineReducers({
  user,
  addMediaForm,
  waveform,
  groups,
  stories,
  commentForm,
  story,
  media: (state = {}, {type, id, blob, }) =>
    (type === SET_MEDIA
      ? {...state, [id]: blob, }
      : state),
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true, })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './addMediaForm'
export * from './waveform'
export * from './groups'
export * from './stories'
export * from './comments'
export * from './story'
export * from './media'
