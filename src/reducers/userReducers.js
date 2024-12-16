export const registerUserReducer = (state={} , action) => {
    switch(action.type) {
        case 'USER_REGISTER_REQUEST' : return {
            loading: true   // indicates registration is in progress
        }
        case 'USER_REGISTER_SUCCESS' : return {
            loading: false,   // registration completed
            success: true   // registration was successful
      }
      case 'USER_REGISTER_FAILED' : return {
            loading: false,   // registration completed
            error: action.payload   // stores error details if registration failed
      }
      default: return state   // returns the current state for unknown actions
    }
}

export const loginUserReducer = (state={} , action) => {
    switch(action.type) {
        case 'USER_LOGIN_REQUEST' : return {
            loading: true   // indicates login is in progress
        }
        case 'USER_LOGIN_SUCCESS' : return {
            loading: false,   // login completed
            success: true,   // login was successful
            currentUser: action.payload   // stores the logged-in user's data
      }
      case 'USER_LOGIN_FAILED' : return {
            loading: false,   // login completed
            error: action.payload   // stores error details if login failed
      }
      default: return state   // returns the current state for unknown actions
    }
}

export const getAllUsersReducer = (state={users : [] } , action) => {
    switch(action.type) {
        case 'GET_USERS_REQUEST' : return {
            loading : true,
            ...state
        }
        case 'GET_USERS_SUCCESS' : return {
            loading : false ,
            users : action.payload
        }
        case 'GET_USERS_FAILED' : return {
            error : action.payload ,
            loading : false
        }
        default : return state
    }
}

export const updateUserStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_USER_STATUS_REQUEST":
            return { loading: true };
        case "UPDATE_USER_STATUS_SUCCESS":
            return { loading: false, success: true };
        case "UPDATE_USER_STATUS_FAILED":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
