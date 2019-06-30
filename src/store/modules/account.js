const LOGIN_LOCAL = 'account/LOGIN_LOCAL';
const LOGOUT = 'account/LOGOUT';

export const loginLocal = (payload) => {
    return ({
        type: LOGIN_LOCAL,
        payload
    });
};

export const logout = (payload) => {
    return ({
        type: LOGOUT,
        payload
    })
}

const initialState = {
    durumiId: ''
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN_LOCAL:
            return {
                ...state,
               durumiId: action.payload._id
            };

        case LOGOUT:
            return {
                ...state,
                durumiId: ''
            }
        
        default:
            return state;
    }
};

export default reducer;