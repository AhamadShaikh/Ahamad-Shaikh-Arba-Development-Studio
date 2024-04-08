import * as types from './actionTypes';

const initialState = {
  productsData: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_REQUEST:
    case types.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsData: action.payload,
        loading: false,
      };

    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.FETCH_PRODUCTS_FAILURE:
    case types.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        adding: true,
        error: null,
      };
    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        adding: false,
      };
    case types.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        adding: false,
        error: action.payload,
      };
    case types.EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        editing: true,
        error: null,
      };
    case types.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        editing: false,
      };
    case types.EDIT_PRODUCT_FAILURE:
      return {
        ...state,
        editing: false,
        error: action.payload,
      };
    default:
      return state;
  }
};