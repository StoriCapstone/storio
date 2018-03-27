//action type

const SET_CURRENT_WAVEFORM = 'SET_CURRENT_WAVEFORM';
const TOGGLE_ADD_MEDIA_FORM = 'TOGGLE_ADD_MEDIA_FORM'

//action creators

export const setCurrentWaveform = waveform => ({
    waveform,
    type: SET_CURRENT_WAVEFORM,
})

export const toggleAddMediaForm = () => ({
    type: TOGGLE_ADD_MEDIA_FORM,
})


//initial state

var initialState = {
    currentWaveform: {},
    toggleAddMediaForm: true,
}

//reducer

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_WAVEFORM:
            return { ...state, currentWaveform: action.waveform, }
        case TOGGLE_ADD_MEDIA_FORM:
            return { ...state, toggleAddMediaForm: !state.toggleAddMediaForm, }
        default:
            return state
    }
}
