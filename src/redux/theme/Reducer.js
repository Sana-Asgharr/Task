import { TOGGLE_THEME } from './Actions';

const initialState = {
  theme: 'light', 
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
