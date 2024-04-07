import * as types from './actionTypes';

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
