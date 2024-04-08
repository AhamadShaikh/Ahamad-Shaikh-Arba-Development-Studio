// Redux/Category/reducer.js
import * as types from './actionType';

const initialState = {
  categoryData: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORY_REQUEST:
    case types.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryData: action.payload,
        loading: false,
      };

    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.FETCH_CATEGORY_FAILURE:
    case types.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case types.ADD_CATEGORY_REQUEST:
        return {
          ...state,
          adding: true,
          error: null,
        };
      case types.ADD_CATEGORY_SUCCESS:
        return {
          ...state,
          adding: false,
        };
      case types.ADD_CATEGORY_FAILURE:
        return {
          ...state,
          adding: false,
          error: action.payload,
        };
      case types.EDIT_CATEGORY_REQUEST:
        return {
          ...state,
          editing: true,
          error: null,
        };
      case types.EDIT_CATEGORY_SUCCESS:
        return {
          ...state,
          editing: false,
        };
      case types.EDIT_CATEGORY_FAILURE:
        return {
          ...state,
          editing: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };