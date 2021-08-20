import { SET_ACCESS_TOKEN, GET_USER_PROFILE } from "../actions";

const initialState = {
    accessToken: null,
    currentUser: null,
    expireTime: null
}

export default loginReducer = (state = initialState, action) => {
    switch (action.type) {   
        case SET_ACCESS_TOKEN:       
             console.log(action.payload);
            return { ...state, accessToken: action.payload }
        case GET_USER_PROFILE:
            console.log(GET_USER_PROFILE);
            return { ...state, currentUser: action.payload }
        default:
            return state
    }
}
