import * as types from './actionType';

const initialState = {
    updatingProfile: false,
    changingPassword: false,
    userData: null,
    loading: false,
    error: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updatingProfile: true,
                error: null,
            };
        case types.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updatingProfile: false,
            };
        case types.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                updatingProfile: false,
                error: action.payload,
            };
        case types.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                changingPassword: true,
                error: null,
            };
        case types.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changingPassword: false,
            };
        case types.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                changingPassword: false,
                error: action.payload,
            };
        case types.FETCH_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                loading: false,
            };
        case types.FETCH_USER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};