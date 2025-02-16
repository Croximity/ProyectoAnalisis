import { authConstanst } from "../actions/constants"

const initState = {

    firstName: '',
    lastName: '',
    email: '',
    authentication: false,
    authenticated:false,
    error: null

}

export default (state = initState, action) => {
    switch (action.type) {
        case `${authConstanst.USER_LOGIN_LOGIN}_REQUEST`:
            state = {
                ...state,
                authenticated: true
            }
            break;
        case `${authConstanst.USER_LOGIN_LOGIN}_SUCCESS`:
            state = {
                ...state,
                ...action.payload.user, 
                authenticated: true,
                authenticating: false
            }
            break;
        case `${authConstanst.USER_LOGIN_LOGIN}_FAILURE`: 
            state = {
                ...state,
                authenticated: false,
                authenticating: false,
                error: action.payload.error
            }    
            break;    
    }

return state;

}
