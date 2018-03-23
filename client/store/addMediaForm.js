//action type

const CHANGE_MEDIA_ENTRY_METHOD = 'CHANGE_MEDIA_ENTRY_METHOD';
const CURRENT_TIME = 'CURRENT_TIME';
const SELECT_MP3_TO_EDIT = 'SELECT_MP3_TO_EDIT'
//action creators

export const changeMediaEntryMethod = selectedOption => ({
    selectedOption,
    type: CHANGE_MEDIA_ENTRY_METHOD,
})

export const currentTime = time => ({
    time,
    type: CURRENT_TIME,
})

export const selectMP3toEdit = (blob) => ({ type: SELECT_MP3_TO_EDIT, blob, })

//initial state

var initialState = {
    selectedOption: 'file',
    time: 0,
    currentMP3: null,
}

//reducer

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_MEDIA_ENTRY_METHOD:
            return { ...state, selectedOption: action.selectedOption, }
        case CURRENT_TIME:
            return { ...state, time: action.time, }
        case SELECT_MP3_TO_EDIT:
            return { ...state, currentMP3: action.blob, }
        default:
            return state
    }
}
