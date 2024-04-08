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
    console.log(data);
    dispatch({ type: types.FETCH_CATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: types.FETCH_CATEGORY_FAILURE, payload: error.message });
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
      return res
    } else {
      throw new Error('Failed to delete category');
    }
  } catch (error) {
    dispatch({ type: types.DELETE_CATEGORY_FAILURE, payload: error.message });
  }
};


export const handleAddCategory = (categoryData, token) => async (dispatch) => {
  dispatch({ type: types.ADD_CATEGORY_REQUEST });
  try {
    const res = await fetch(`https://arba-api-v28s.onrender.com/category/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });

    if (!res.ok) {
      throw new Error('Failed to add category');
    }

    dispatch({ type: types.ADD_CATEGORY_SUCCESS });
    return res
  } catch (error) {
    dispatch({ type: types.ADD_CATEGORY_FAILURE, payload: error.message });
  }
};

export const handleEditCategory = (categoryId, categoryData, token) => async (dispatch) => {
  dispatch({ type: types.EDIT_CATEGORY_REQUEST });
  try {
    const res = await fetch(`https://arba-api-v28s.onrender.com/category/update/${categoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });

    if (!res.ok) {
      throw new Error('Failed to edit category');
    }

    dispatch({ type: types.EDIT_CATEGORY_SUCCESS });
    return res
  } catch (error) {
    dispatch({ type: types.EDIT_CATEGORY_FAILURE, payload: error.message });
  }
};
