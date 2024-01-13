import { SET_LOADING, REMOVE_LOADING } from "../actions/types";
const initialState = {
    isLoading: false
};

export const loading = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case SET_LOADING:
            return {
                isLoading: true
            };
        case REMOVE_LOADING:
            return {
                isLoading: false
            };
        default:
            return state;
    }
};