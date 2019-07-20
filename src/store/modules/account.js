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
    login: false,
    object: null
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN_LOCAL:
            sessionStorage.setItem("userObject", JSON.stringify(action.payload.object));
            return {
                ...state,
                login: true,    
                object: action.payload.object
            };

        case LOGOUT:
            sessionStorage.userObject = undefined;
            return {
                ...state,
                login: false,
                object: null
            }
        
        default:
            return state;
    }
};

export default reducer;