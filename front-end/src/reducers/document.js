import {
  DOCUMENT_LOADED,
} from "../actions/types";

const initialState = {
  documents: [],
  filters: {},
  isLoading: true
};

export const document = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DOCUMENT_LOADED:
      return {
        documents: payload.documents,
        filters: payload.filters ? payload.filters : state.filters,
        isLoading: false,
      };
    default:
      return state;
  }
};