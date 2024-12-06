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
