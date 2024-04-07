// Redux/Category/action.js
import * as types from './actionType';

export const fetchCategories = (token) => async (dispatch) => {
  dispatch({ type: types.FETCH_CATEGORY_REQUEST });
  try {
    const res = await fetch(`https://arba-api-v28s.onrender.com/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch({ type: types.FETCH_CATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: types.FETCH_CATEGORY_FAILURE, payload: error.message });
  }
};

export const fetchProducts = (token) => async (dispatch) => {
  dispatch({ type: types.FETCH_PRODUCTS_REQUEST });
  try {
    const res = await fetch(`https://arba-api-v28s.onrender.com/product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch({ type: types.FETCH_PRODUCTS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: types.FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const deleteCategory = (categoryId, token) => async (dispatch) => {
  dispatch({ type: types.DELETE_CATEGORY_REQUEST });
  try {
    const res = await fetch(`https://arba-api-v28s.onrender.com/category/delete/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      dispatch({ type: types.DELETE_CATEGORY_SUCCESS });
    } else {
      throw new Error('Failed to delete category');
    }
  } catch (error) {
    dispatch({ type: types.DELETE_CATEGORY_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId, token) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });
  try {
    const res = await fetch(`https://arba-api-v28s.onrender.com/product/delete/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      dispatch({ type: types.DELETE_PRODUCT_SUCCESS });
    } else {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};
