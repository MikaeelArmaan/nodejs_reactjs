import {
  ORDER_LOADED,
} from "../actions/types";

const initialState = {
  orders: [],
  filters: {},
  isLoading: true
};

export const orders = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_LOADED:
      return {
        orders: payload.orders,
        filters: payload.filters ? payload.filters : state.filters,
        isLoading: false,
      };
    default:
      return state;
  }
};