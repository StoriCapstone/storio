//action type

const CHANGE_MEDIA_ENTRY_METHOD = 'CHANGE_MEDIA_ENTRY_METHOD';
const CURRENT_TIME = 'CURRENT_TIME';
const SELECT_MP3_TO_EDIT = 'SELECT_MP3_TO_EDIT';
const UPDATE_FORM_CONTENT = 'UPDATE_FORM_CONTENT';
const CLEAR_ADD_MEDIA_FORM = 'CLEAR_ADD_MEDIA_FORM';
//action creators

export const changeMediaEntryMethod = selectedOption => ({
    selectedOption,
    type: CHANGE_MEDIA_ENTRY_METHOD,
})

export const currentTime = time => ({
    time,
    type: CURRENT_TIME,
})

export const selectMP3toEdit = (blob, story) => ({ type: SELECT_MP3_TO_EDIT, blob, story, })

export const updateFormContent = (content) => ({type: UPDATE_FORM_CONTENT, content, })

export const clearAddMediaForm = () => ({type: CLEAR_ADD_MEDIA_FORM, })
//initial state

var initialState = {
    selectedOption: 'file',
    time: 0,
    currentMP3: null,
    story: null,
    duration: '',
    caption: '',
    name: '',
    src: '',
}

//reducer

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_MEDIA_ENTRY_METHOD:
            return { ...state, selectedOption: action.selectedOption, }
        case CURRENT_TIME:
            return { ...state, time: action.time, }
        case SELECT_MP3_TO_EDIT:
            return { ...state, currentMP3: action.blob, story: action.story, }
        case UPDATE_FORM_CONTENT:
            return Object.assign({}, state, action.content)
        case CLEAR_ADD_MEDIA_FORM:
            return {...state,
            duration: '',
            caption: '',
            name: '',
            src: '', }
        default:
            return state
    }
}
