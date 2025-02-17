import { LOGIN, LOGOUT, MODAL_SUBSCRIPTION, TOKEN, USER_DETAIL, SUBSCRIPTION_SCREEN } from './AuthActions';

const initialState = {
  subscriptionScreen : '',
  isAuthenticated: true,
  isSubscribed: false,
  token: null,
  userInfo: {
    username: 'Alexender',
    useremail: 'alexanderjbaum@gmail.com',
    userstatus: 'active'
  },

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case USER_DETAIL:
      return {
        ...state,
        userInfo: action.payload
      };
    case MODAL_SUBSCRIPTION:
      return {
        ...state,
        isSubscribed: true,
      };

      case SUBSCRIPTION_SCREEN:
        return {
          ...state,
          subscriptionScreen: action.payload
        };

    default:
      return state;
  }
};

export default authReducer;
