
//action type

const NEW_COMMENT_CONTENT = 'NEW_COMMENT_CONTENT';
const CLEAR_COMMENT_FORM = 'CLEAR_COMMENT_FORM';

//action creators

export const newCommentContent = content => ({
    type: NEW_COMMENT_CONTENT,
    content,
})

export const clearCommentForm = () => ({
    type: CLEAR_COMMENT_FORM,
})

//initial state
let initialState = {
    content: '',
}

//reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_COMMENT_CONTENT:
            return { ...state, content: action.content, }
        case CLEAR_COMMENT_FORM:
            return { ...state, content: '', }
        default:
            return state
    }
}
