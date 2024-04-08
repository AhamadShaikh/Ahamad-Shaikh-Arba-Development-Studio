import * as types from './actionType';

export const handleUpdateProfile = (profileData) => async (dispatch) => {
    dispatch({ type: types.UPDATE_PROFILE_REQUEST });
    try {
        const res = await fetch(`https://arba-api-v28s.onrender.com/user/update-profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!res.ok) {
            throw new Error('Failed to update profile');
        }

        dispatch({ type: types.UPDATE_PROFILE_SUCCESS });
        return res
    } catch (error) {
        dispatch({ type: types.UPDATE_PROFILE_FAILURE, payload: error.message });
    }
};

export const handleChangePassword = (data) => async (dispatch) => {
    dispatch({ type: types.CHANGE_PASSWORD_REQUEST });
    try {
        const res = await fetch(`https://arba-api-v28s.onrender.com/user/change-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error('Failed to change password');
        }

        dispatch({ type: types.CHANGE_PASSWORD_SUCCESS });
        return res
    } catch (error) {
        dispatch({ type: types.CHANGE_PASSWORD_FAILURE, payload: error.message });
    }
};


export const handleFetchUserData = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
        const response = await fetch("https://arba-api-v28s.onrender.com/user/myuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        dispatch({
            type: types.FETCH_USER_DATA_SUCCESS,
            payload: userData,
        });
    } catch (error) {
        dispatch({
            type: types.FETCH_USER_DATA_FAILURE,
            payload: error,
          });
    }
};
