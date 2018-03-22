import io from 'socket.io-client'
import store, {getNewComment, } from './store';

const socket = io(window.location.origin)

socket.on('new-comment', comment => {
  store.dispatch(getNewComment(comment))
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
