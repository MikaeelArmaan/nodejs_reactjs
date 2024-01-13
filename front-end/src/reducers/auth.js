import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/types";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading:true
  };
  
  export const auth = (state = initialState, action) => {
    const { type, payload } = action;
  console.log(payload)
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          user: payload,
          loading:false
        };

      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
        localStorage.removeItem('google_token');
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading:false
        };
      default:
        return state;
    }
  };