//action type

const CHANGE_MEDIA_ENTRY_METHOD = 'CHANGE_MEDIA_ENTRY_METHOD';

//action creators

export const changeMediaEntryMethod = selectedOption => ({ 
    selectedOption, 
    type:CHANGE_MEDIA_ENTRY_METHOD
})

//initial state

var initialState = "file"

//reducer

export default function (state = initialState, action){
    switch(action.type){
        case CHANGE_MEDIA_ENTRY_METHOD:
            return action.selectedOption
        default:
        return state
    }
}
