//action type

const CHANGE_MEDIA_ENTRY_METHOD = 'CHANGE_MEDIA_ENTRY_METHOD';
const CURRENT_TIME = 'CURRENT_TIME';

//action creators

export const changeMediaEntryMethod = selectedOption => ({
    selectedOption,
    type: CHANGE_MEDIA_ENTRY_METHOD
})

export const currentTime = time => ({
    time,
    type: CURRENT_TIME
})

//initial state

var initialState = {
    selectedOption: 'file',
    time: 0,
}

//reducer

export default function (state = initialState, action){
    switch (action.type){
        case CHANGE_MEDIA_ENTRY_METHOD:
            return {... state, selectedOption: action.selectedOption}
            case CURRENT_TIME:
            return {... state, time: action.time}
        default:
        return state
    }
}
