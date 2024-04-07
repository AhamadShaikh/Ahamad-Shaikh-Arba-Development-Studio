import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    SIGNIN_ERROR,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from "./actionType";

export const handleSignUp = (signupData) => async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
        let res = await fetch(`https://arba-api-v28s.onrender.com/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });
        return res
        dispatch()
    } catch (error) {
        console.log(error);
    }
};

export const handleLogin = (loginData) => async (dispatch) => {
    dispatch({ type: SIGNIN_REQUEST });
    try {
        let res = await fetch(`https://arba-api-v28s.onrender.com/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        let data = await res.json()
        console.log(data);
        if (data.token) {
            dispatch({ type: SIGNIN_SUCCESS, payload: data.token })
        }
        return data;
    } catch (error) {
        dispatch({ type: SIGNIN_ERROR });
    }
};

export const handleLogoutUser = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({ type: LOGOUT_REQUEST });
    try {
        const res = await fetch(
            "https://arba-api-v28s.onrender.com/user/logout",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: LOGOUT_SUCCESS });
        return res
    } catch (err) {
        throw err;
    }
};