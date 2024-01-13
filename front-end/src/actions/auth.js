import {
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
} from "../actions/types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// import setAuthToken from "../utils/setAuthToken";

//load user by Google 

// export const loadUser = (access_token) => {
//     return async (dispatch) => {
//         const body = { access_token };
//         try {
//             const res = await axios.post(`http://localhost:8000/api/user/google-signin`, body);
//             if (res && res.data && res.data.result) {
//                 setAuthToken(res.data.result.token);
//                 localStorage.setItem('google_token', access_token);
//                 localStorage.setItem('token', res.data.result.token);
//                 dispatch({
//                     type: USER_LOADED,
//                     payload: res.data.result.user,
//                 });
//             }else{
//                 dispatch({
//                     type: AUTH_ERROR,
//                 });
//             }

            
//         } catch (err) {
//             dispatch({
//                 type: AUTH_ERROR,
//             });
//         }
//     };
// };

export const loadUser = (email,password) => {
    return async (dispatch) => {
        const body = { email,password };
        try {
           // const res = await axios.post(`http://localhost:8000/api/user/google-signin`, body);
           const res = await axios.post(`http://localhost:8000/api/user/login`, body);
            if (res && res.data && res.data.result) {
                setAuthToken(res.data.result.access_token);
                localStorage.setItem('google_token', res.data.result.access_token);
                localStorage.setItem('token', res.data.result.access_token);
                dispatch({
                    type: USER_LOADED,
                    payload: res.data.result.user,
                });
            }else{
                dispatch({
                    type: AUTH_ERROR,
                });
            }

            
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };
};


//logout

export const logout = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LOGOUT
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };
};