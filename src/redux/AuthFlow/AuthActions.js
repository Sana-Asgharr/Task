export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const TOKEN = 'token';
export const USER_DETAIL = 'USER_DETAIL';
export const MODAL_SUBSCRIPTION = 'MODAL_SUBSCRIPTION';
export const SUBSCRIPTION_SCREEN = 'SUBSCRIPTION_SCREEN';



export const login = () => ({
  type: LOGIN,
});


export const logout = () => ({
  type: LOGOUT,
});


export const setAuthToken = (token) => ({
  type: TOKEN,
  payload: token
});


export const userDetails = (data) => ({
  type : USER_DETAIL,
  payload : data
})

export const modalSubscription = () => ({
  type: MODAL_SUBSCRIPTION,
});

export const screenSubscription = (data) => ({
  type: SUBSCRIPTION_SCREEN,
  payload : data
});

