const TEAM_SELECTED = "team/TEAM_SELECTED";

export const selectTeam = (payload) => {
    return ({
        type: TEAM_SELECTED,
        payload
    })
}

const initialState = {
    teamSelected: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TEAM_SELECTED:
            return ({
                ...state,
                teamSelected: action.payload.teamSelected
            });
        default:
            return state;
    }
}

export default reducer;