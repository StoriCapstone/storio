import {createStore, combineReducers, applyMiddleware, } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools, } from 'redux-devtools-extension'
import user from './user'
import {default as addMediaForm, } from './addMediaForm';
import {default as waveform, } from './waveform';
import {default as commentForm, } from './comments';
import {default as story, } from './story'

const reducer = combineReducers({
  user,
  addMediaForm,
  waveform,
  commentForm,
  story,
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
export * from './comments'
export * from './story'
